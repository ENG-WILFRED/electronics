'use server'

import { prisma } from './db'

let nodemailer: any = null
let Twilio: any = null

try {
  nodemailer = require('nodemailer')
} catch (e) {
  console.log('nodemailer not installed; SMTP email sending disabled')
}

try {
  Twilio = require('twilio')
} catch {
  console.log('Twilio not installed, SMS sending will be disabled')
}

export async function sendContactAction(payload: { name: string; email: string; message: string; phone?: string }) {
  const { name, email, message, phone } = payload

  // Attempt SMTP send via nodemailer if configured
  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PORT = process.env.SMTP_PORT
  const SMTP_USER = process.env.SMTP_USER
  const SMTP_PASS = process.env.SMTP_PASS
  const SMTP_SECURE = process.env.SMTP_SECURE === 'true'

  if (SMTP_HOST && nodemailer) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT ? Number(SMTP_PORT) : 587,
        secure: SMTP_SECURE || (SMTP_PORT ? Number(SMTP_PORT) === 465 : false),
        auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
      })

      const toAddress = process.env.CONTACT_EMAIL || process.env.FROM_EMAIL || 'hello@example.com'
      const fromAddress = process.env.FROM_EMAIL || SMTP_USER || 'no-reply@example.com'

      await transporter.sendMail({
        to: toAddress,
        from: fromAddress,
        subject: `Website contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
      })
    } catch (e: any) {
      console.error('SMTP send error', e?.message || e)
    }
  } else {
    console.log('Email not sent (SMTP not configured or nodemailer not installed). Message:', { name, email, phone, message })
  }

  // Twilio SMS (optional)
  const TW_SID = process.env.TWILIO_SID
  const TW_AUTH = process.env.TWILIO_AUTH_TOKEN
  const TW_FROM = process.env.TWILIO_FROM
  const TW_TO = process.env.TWILIO_TO
  if (TW_SID && TW_AUTH && TW_FROM && TW_TO && Twilio) {
    try {
      const client = Twilio(TW_SID, TW_AUTH)
      await client.messages.create({ body: `Msg from ${name}: ${message}`, from: TW_FROM, to: TW_TO })
    } catch (e: any) {
      console.error('Twilio error', e?.message)
    }
  } else {
    console.log('SMS not sent (Twilio vars missing or not installed).')
  }

  // store submission via Prisma
  try {
    await prisma.contactSubmission.create({ data: { name, email, phone: phone ?? null, message } })
  } catch (e: any) {
    console.error('Store submission error', e?.message)
  }

  return true
}
