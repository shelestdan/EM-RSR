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

if (process.env.NEXT_PUBLIC_SITE_URL) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL)
    if (url.protocol !== 'https:') warnings.push('NEXT_PUBLIC_SITE_URL should use https:// in production')
  } catch {
    errors.push('NEXT_PUBLIC_SITE_URL must be a valid URL')
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
