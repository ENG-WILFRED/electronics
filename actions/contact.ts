import { prisma } from './db'

let sendgrid: any = null
let Twilio: any = null

try {
  sendgrid = require('@sendgrid/mail')
} catch {
  console.log('SendGrid not installed, email sending will be disabled')
}

try {
  Twilio = require('twilio')
} catch {
  console.log('Twilio not installed, SMS sending will be disabled')
}

export async function sendContact(payload: { name: string; email: string; message: string; phone?: string }) {
  const { name, email, message, phone } = payload
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
  if (SENDGRID_API_KEY && sendgrid) {
    try {
      sendgrid.setApiKey(SENDGRID_API_KEY)
      await sendgrid.send({
        to: process.env.CONTACT_EMAIL || 'hello@example.com',
        from: process.env.FROM_EMAIL || 'no-reply@example.com',
        subject: `Website contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
      })
    } catch (e: any) {
      console.error('SendGrid error', e?.message)
    }
  } else {
    console.log('Email not sent (SENDGRID_API_KEY not set or SendGrid not installed). Message:', { name, email, phone, message })
  }

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
