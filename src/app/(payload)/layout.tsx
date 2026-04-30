import type { ReactNode } from 'react'
import type { LanguageOptions } from 'payload'

import { initI18n } from '@payloadcms/translations'
import { ProgressBar, RootProvider, defaultTheme } from '@payloadcms/ui'
import { getClientConfig } from '@payloadcms/ui/utilities/getClientConfig'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import { cookies as nextCookies, headers as nextHeaders } from 'next/headers'
import {
  createLocalReq,
  executeAuthStrategies,
  getAccessResults,
  getPayload,
  getRequestLanguage,
  parseCookies,
} from 'payload'
import { applyLocaleFiltering } from 'payload/shared'

import configPromise from '@payload-config'
import { importMap } from './admin/importMap'
import '@payloadcms/next/css'

const acceptedThemes = ['dark', 'light'] as const
const isAcceptedTheme = (theme: string): theme is (typeof acceptedThemes)[number] =>
  acceptedThemes.includes(theme as (typeof acceptedThemes)[number])

const serverFunction = async (args: any) => {
  'use server'

  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

const getTheme = ({
  config,
  cookies,
  headers,
}: {
  config: Awaited<typeof configPromise>
  cookies: ReturnType<typeof parseCookies>
  headers: Headers
}) => {
  if (config.admin.theme !== 'all' && acceptedThemes.includes(config.admin.theme)) {
    return config.admin.theme
  }

  const themeCookie = cookies.get(`${config.cookiePrefix || 'payload'}-theme`)

  if (themeCookie && isAcceptedTheme(themeCookie)) {
    return themeCookie
  }

  const themeFromHeader = headers.get('Sec-CH-Prefers-Color-Scheme')

  if (themeFromHeader && isAcceptedTheme(themeFromHeader)) {
    return themeFromHeader
  }

  return defaultTheme
}

export default async function PayloadLayout({ children }: { children: ReactNode }) {
  const config = await configPromise
  const headers = await nextHeaders()
  const cookies = parseCookies(headers)
  const payload = await getPayload({ config, cron: true, importMap })
  const languageCode = getRequestLanguage({ config, cookies, headers })
  const i18n = await initI18n({
    config: config.i18n,
    context: 'client',
    language: languageCode,
  })
  const { responseHeaders, user } = await executeAuthStrategies({ headers, payload })
  const req = await createLocalReq(
    {
      req: {
        headers,
        host: headers.get('host') || undefined,
        i18n,
        responseHeaders,
        user,
      },
    },
    payload,
  )
  const permissions = await getAccessResults({ req })
  const theme = getTheme({ config, cookies, headers })
  const languageOptions: LanguageOptions = Object.entries(config.i18n.supportedLanguages || {}).reduce(
    (acc, [language, languageConfig]) => {
      if (Object.keys(config.i18n.supportedLanguages).includes(language)) {
        acc.push({
          label: languageConfig.translations.general.thisLanguage,
          value: language as LanguageOptions[number]['value'],
        })
      }

      return acc
    },
    [] as LanguageOptions,
  )

  async function switchLanguageServerAction(lang: string): Promise<void> {
    'use server'

    const cookies = await nextCookies()
    cookies.set({
      name: `${config.cookiePrefix || 'payload'}-lng`,
      path: '/',
      value: lang,
    })
  }

  const clientConfig = getClientConfig({
    config,
    i18n,
    importMap,
    user: user as any,
  })

  await applyLocaleFiltering({ clientConfig, config, req })

  return (
    <RootProvider
      config={clientConfig}
      dateFNSKey={i18n.dateFNSKey}
      fallbackLang={config.i18n.fallbackLanguage}
      isNavOpen
      languageCode={languageCode}
      languageOptions={languageOptions}
      locale={req.locale || undefined}
      permissions={permissions}
      serverFunction={serverFunction}
      switchLanguageServerAction={switchLanguageServerAction}
      theme={theme}
      translations={i18n.translations}
      user={user}
    >
      <ProgressBar />
      {children}
    </RootProvider>
  )
}
