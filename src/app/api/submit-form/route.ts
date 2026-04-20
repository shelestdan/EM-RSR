export const dynamic = 'force-static'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Имя обязательно')
    .max(80, 'Имя слишком длинное')
    .regex(/^[A-Za-zА-Яа-яЁё\s.'-]+$/, 'Некорректное имя'),
  company: z.string().trim().max(120, 'Название компании слишком длинное').optional(),
  phone: z
    .string()
    .trim()
    .max(24, 'Телефон слишком длинный')
    .refine((value) => {
      const digits = value.replace(/\D/g, '')
      return digits.length >= 10 && digits.length <= 15
    }, 'Некорректный телефон'),
  email: z.string().trim().email('Некорректный email').max(120),
  message: z.string().trim().min(10, 'Опишите задачу').max(1200, 'Описание слишком длинное'),
  consent: z.boolean().refine((v) => v === true, 'Необходимо согласие'),
  source: z.string().max(100).optional(),
  website: z.string().max(0).optional(), // honeypot: must be empty
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ ok: true }) // silently succeed
    }

    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 })
    }

    const { name, company, phone, email, message, source } = parsed.data
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

    // Save to Payload CMS via internal API
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    await fetch(`${baseUrl}/api/form-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${process.env.PAYLOAD_API_KEY || ''}`,
      },
      body: JSON.stringify({
        name,
        company,
        phone,
        email,
        message,
        consentGiven: true,
        consentTimestamp: new Date().toISOString(),
        ipAddress: ip,
        source,
      }),
    }).catch(() => {}) // non-blocking, don't fail if CMS unreachable

    // Send email notification
    await sendEmailNotification({ name, company, phone, email, message, source })

    // Send Telegram notification
    await sendTelegramNotification({ name, company, phone, email, message, source })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Form submission error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function sendEmailNotification(data: {
  name: string
  company?: string
  phone: string
  email?: string
  message?: string
  source?: string
}) {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM, NOTIFY_EMAIL } =
    process.env

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFY_EMAIL) {
    console.warn('Email not configured, skipping notification')
    return
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || '465'),
    secure: SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const subject = `Новая заявка с сайта — ${data.name}${data.company ? ` (${data.company})` : ''}`
  const html = `
    <h2 style="color:#23273F;font-family:sans-serif;">Новая заявка с сайта ЕМ-ПСП</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;" cellpadding="8">
      <tr><td style="color:#666;width:120px;">Имя:</td><td><strong>${data.name}</strong></td></tr>
      ${data.company ? `<tr><td style="color:#666;">Компания:</td><td>${data.company}</td></tr>` : ''}
      <tr><td style="color:#666;">Телефон:</td><td><a href="tel:${data.phone}" style="color:#3E5854;">${data.phone}</a></td></tr>
      ${data.email ? `<tr><td style="color:#666;">Email:</td><td><a href="mailto:${data.email}" style="color:#3E5854;">${data.email}</a></td></tr>` : ''}
      ${data.message ? `<tr><td style="color:#666;">Сообщение:</td><td>${data.message}</td></tr>` : ''}
      <tr><td style="color:#666;">Источник:</td><td>${data.source || 'не указан'}</td></tr>
      <tr><td style="color:#666;">Время:</td><td>${new Date().toLocaleString('ru-RU')}</td></tr>
    </table>
  `

  await transporter.sendMail({
    from: SMTP_FROM,
    to: NOTIFY_EMAIL,
    subject,
    html,
  })
}

async function sendTelegramNotification(data: {
  name: string
  company?: string
  phone: string
  email?: string
  message?: string
  source?: string
}) {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return

  const text = [
    `🔔 *Новая заявка с сайта ЕМ-ПСП*`,
    ``,
    `👤 *Имя:* ${data.name}`,
    data.company ? `🏢 *Компания:* ${data.company}` : null,
    `📞 *Телефон:* ${data.phone}`,
    data.email ? `📧 *Email:* ${data.email}` : null,
    data.message ? `💬 *Сообщение:* ${data.message}` : null,
    `📍 *Источник:* ${data.source || 'сайт'}`,
    `🕐 *Время:* ${new Date().toLocaleString('ru-RU')}`,
  ]
    .filter(Boolean)
    .join('\n')

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'Markdown',
    }),
  })
}
