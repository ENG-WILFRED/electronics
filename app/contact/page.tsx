'use client'

import { useState } from 'react'
import { sendContactAction } from '@/actions/contact'

type Form = { name: string; email: string; message: string; phone?: string }

export default function Contact() {
  const [form, setForm] = useState<Form>({ name: '', email: '', message: '', phone: '' })
  const [status, setStatus] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      await sendContactAction(form)
      setStatus('sent')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto card">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <form onSubmit={submit} className="space-y-4">
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Name" className="w-full p-2 border rounded" />
          <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email" className="w-full p-2 border rounded" />
          <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="Phone (for SMS)" className="w-full p-2 border rounded" />
          <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Message" className="w-full p-2 border rounded h-32" />
          <div>
            <button className="btn btn-primary" type="submit">Send</button>
            {status === 'sending' && <span className="ml-3">Sending…</span>}
            {status === 'sent' && <span className="ml-3 text-green-600">Sent</span>}
            {status === 'error' && <span className="ml-3 text-red-600">Error sending</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
