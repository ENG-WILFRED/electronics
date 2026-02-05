'use client'

import React, { useState, useEffect } from 'react'
import { sendContactAction } from '@/actions/contact'
import { Section, Card } from '@/components/Section'
import { getContent } from '@/actions/content'

type Form = { name: string; email: string; message: string; phone?: string; subject?: string; company?: string }

export default function Contact() {
  const [form, setForm] = useState<Form>({ name: '', email: '', message: '', phone: '', subject: '', company: '' })
  const [status, setStatus] = useState<string | null>(null)
  const [content, setContent] = useState<any>(null)

  useEffect(() => {
    getContent().then(setContent).catch(console.error)
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all required fields')
      return
    }
    setStatus('sending')
    try {
      await sendContactAction(form)
      setStatus('sent')
      setForm({ name: '', email: '', message: '', phone: '', subject: '', company: '' })
      setTimeout(() => setStatus(null), 5000)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  if (!content) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-magna-cream text-magna-black">
      {/* Navigation */}
      <nav className="bg-magna-cream/50 backdrop-blur-lg border-b border-magna-red/10 sticky top-0 z-50">
        <div className="w-full px-4 md:px-8 lg:px-20 py-4 flex items-center justify-between">
          <a href="/" className="text-xl md:text-2xl font-bold text-magna-red hover:text-magna-orange transition">
            Electrical & Services
          </a>
          <a href="/" className="btn btn-outline px-4 md:px-6 py-2 text-sm md:text-base">← Back</a>
        </div>
      </nav>
      {/* HERO */}
      <section className="w-full bg-gradient-to-br from-magna-red/15 to-magna-orange/20">
        <div className="w-full px-6 md:px-20 py-12 md:py-14">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-magna-red mb-4">
              Get in Touch
            </h1>

            <p className="text-lg md:text-xl text-magna-black/70 leading-relaxed">
              We'd love to hear from you. Tell us about your project, question, or idea — our team will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>


      {/* CONTACT FORM & INFO */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* FORM */}
          <div className="bg-gradient-to-br from-white to-magna-cream/30 rounded-4xl p-10 md:p-12 shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-magna-red">Send us a Message</h2>
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-3 text-magna-black">Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full p-3 border-2 border-magna-red/20 rounded-lg bg-white text-magna-black placeholder-magna-black/40 focus:outline-none focus:ring-2 focus:ring-magna-red focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-magna-black">Company</label>
                <input
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  placeholder="Your company (optional)"
                  className="w-full p-3 border-2 border-magna-red/20 rounded-lg bg-white text-magna-black placeholder-magna-black/40 focus:outline-none focus:ring-2 focus:ring-magna-red focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-magna-black">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your.email@company.com"
                  className="w-full p-3 border-2 border-magna-red/20 rounded-lg bg-white text-magna-black placeholder-magna-black/40 focus:outline-none focus:ring-2 focus:ring-magna-red focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-magna-black">Phone</label>
                <input
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full p-3 border-2 border-magna-red/20 rounded-lg bg-white text-magna-black placeholder-magna-black/40 focus:outline-none focus:ring-2 focus:ring-magna-red focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-magna-black">Subject</label>
                <input
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder="Project inquiry, support, etc."
                  className="w-full p-3 border-2 border-magna-red/20 rounded-lg bg-white text-magna-black placeholder-magna-black/40 focus:outline-none focus:ring-2 focus:ring-magna-red focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-magna-black">Message *</label>
                <textarea
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your project or question..."
                  className="w-full p-3 border-2 border-magna-red/20 rounded-lg bg-white text-magna-black placeholder-magna-black/40 focus:outline-none focus:ring-2 focus:ring-magna-red focus:border-transparent h-32 resize-none"
                />
              </div>

              <button className="btn btn-primary w-full py-3 font-bold text-lg" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'sent' && (
                <div className="p-4 bg-green-100 text-green-800 rounded-lg border-2 border-green-300">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-100 text-red-800 rounded-lg border-2 border-red-300">
                  ✗ Error sending message. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* INFO */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-magna-red mb-8">Contact Information</h2>
            
            <Card className="bg-gradient-to-br from-magna-orange/10 to-magna-red/5">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-magna-red">Email</span>
                <a href={`mailto:${content.contact.email}`} className="text-magna-red hover:text-magna-orange font-semibold transition">
                  {content.contact.email}
                </a>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-magna-red/10 to-magna-orange/5">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-magna-red">Phone</span>
                <a href={`tel:${content.contact.phone}`} className="text-magna-red hover:text-magna-orange font-semibold transition">
                  {content.contact.phone}
                </a>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-magna-orange/10 to-magna-red/5">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-magna-red">Address</h3>
                <p className="text-magna-black">{content.contact.address}</p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-magna-red/10 to-magna-orange/5">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-magna-red">Response Time</h3>
                <p className="text-magna-black">
                  We typically respond within <span className="font-semibold text-magna-red">24 hours</span> during business days.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="w-full max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-magna-red">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-magna-red to-magna-orange mx-auto mb-12"></div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-white to-magna-cream/20 rounded-4xl p-8 shadow-lg hover:shadow-xl transition">
              <h4 className="font-semibold text-xl mb-3 text-magna-red">How quickly can you start a project?</h4>
              <p className="text-magna-black/70 text-base">We typically have availability to start new projects within 1-2 weeks. Rush engagements can be accommodated for urgent needs.</p>
            </div>
            <div className="bg-gradient-to-r from-white to-magna-cream/20 rounded-4xl p-8 shadow-lg hover:shadow-xl transition">
              <h4 className="font-semibold text-xl mb-3 text-magna-red">What industries do you serve?</h4>
              <p className="text-magna-black/70 text-base">We work across aerospace, industrial automation, IoT, consumer electronics, medical devices, and custom embedded systems.</p>
            </div>
            <div className="bg-gradient-to-r from-white to-magna-cream/20 rounded-4xl p-8 shadow-lg hover:shadow-xl transition">
              <h4 className="font-semibold text-xl mb-3 text-magna-red">Do you offer remote collaboration?</h4>
              <p className="text-magna-black/70 text-base">Yes! We support hybrid and fully remote projects using industry-standard tools and communication platforms.</p>
            </div>
            <div className="bg-gradient-to-r from-white to-magna-cream/20 rounded-4xl p-8 shadow-lg hover:shadow-xl transition">
              <h4 className="font-semibold text-xl mb-3 text-magna-red">What is your typical project size?</h4>
              <p className="text-magna-black/70 text-base">We handle everything from small consulting engagements to large-scale multi-month development projects.</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
