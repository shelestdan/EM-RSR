import fs from 'node:fs'
import path from 'node:path'

const envFiles = ['.env.production', '.env', '.env.local']

function stripQuotes(value) {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function loadEnvFile(file) {
  const fullPath = path.join(process.cwd(), file)
  if (!fs.existsSync(fullPath)) return

  const lines = fs.readFileSync(fullPath, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const index = trimmed.indexOf('=')
    if (index === -1) continue

    const key = trimmed.slice(0, index).trim()
    const value = stripQuotes(trimmed.slice(index + 1))
    if (key && process.env[key] === undefined) {
      process.env[key] = value
    }
  }
}

envFiles.forEach(loadEnvFile)

const required = [
  'DATABASE_URI',
  'PAYLOAD_SECRET',
  'NEXT_PUBLIC_SITE_URL',
]

const optionalRecommended = [
  'PAYLOAD_API_KEY',
  'SMTP_HOST',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM',
  'NOTIFY_EMAIL',
]

const errors = []
const warnings = []

for (const key of required) {
  if (!process.env[key]) errors.push(`${key} is missing`)
}

if (process.env.DATABASE_URI && !process.env.DATABASE_URI.startsWith('postgresql://')) {
  errors.push('DATABASE_URI must start with postgresql://')
}

if (process.env.PAYLOAD_SECRET && process.env.PAYLOAD_SECRET.length < 32) {
  errors.push('PAYLOAD_SECRET must be at least 32 characters')
}

if (process.env.PAYLOAD_SECRET && /replace|paste|change/i.test(process.env.PAYLOAD_SECRET)) {
  errors.push('PAYLOAD_SECRET still looks like a placeholder')
}

if (process.env.PAYLOAD_API_KEY && /replace|paste|change/i.test(process.env.PAYLOAD_API_KEY)) {
  errors.push('PAYLOAD_API_KEY still looks like a placeholder')
}

if (process.env.NEXT_PUBLIC_SITE_URL) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL)
    if (url.protocol !== 'https:') warnings.push('NEXT_PUBLIC_SITE_URL should use https:// in production')
  } catch {
    errors.push('NEXT_PUBLIC_SITE_URL must be a valid URL')
  }
}

if (process.env.PAYLOAD_INTERNAL_URL) {
  try {
    new URL(process.env.PAYLOAD_INTERNAL_URL)
  } catch {
    errors.push('PAYLOAD_INTERNAL_URL must be a valid URL')
  }
}

for (const key of optionalRecommended) {
  if (!process.env[key]) warnings.push(`${key} is not set`)
}

if (warnings.length) {
  console.warn('Warnings:')
  warnings.forEach((item) => console.warn(`- ${item}`))
}

if (errors.length) {
  console.error('Production env check failed:')
  errors.forEach((item) => console.error(`- ${item}`))
  process.exit(1)
}

console.log('Production env check passed.')
