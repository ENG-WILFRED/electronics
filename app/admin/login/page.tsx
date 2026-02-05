'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Section, Card } from '@/components/Section'

export default function Login() {
  const [form, setForm] = useState({ user: '', pass: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // Temporary: skip API call
    setTimeout(() => {
      router.push('/admin/dashboard')
    }, 400)
  }

  return (
    <div className="min-h-screen bg-magna-cream flex items-center justify-center px-4">
      <nav className="fixed top-0 left-0 right-0 bg-magna-cream/50 backdrop-blur-lg border-b border-magna-red/10 z-50">
        <div className="w-full px-4 md:px-8 lg:px-20 py-4 flex items-center justify-between">
          <a href="/" className="text-xl md:text-2xl font-bold text-magna-red hover:text-magna-orange transition">
            E&S
          </a>
          <a href="/" className="btn btn-outline px-4 md:px-6 py-2 text-sm md:text-base">← Back</a>
        </div>
      </nav>
      <Section centered className="w-full max-w-xl mt-20">
        <Card className="p-8 md:p-12 shadow-xl bg-white border-2 border-magna-red/20">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-magna-red">
              Admin Portal
            </h1>
            <p className="mt-2 text-sm text-magna-black/60">
              Sign in to manage the platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-magna-black mb-1">
                Username
              </label>
              <input
                value={form.user}
                onChange={e => setForm({ ...form, user: e.target.value })}
                placeholder="admin@example.com"
                required
                className="w-full rounded-md border-2 border-magna-red/20 px-4 py-3 text-sm text-magna-black focus:outline-none focus:ring-2 focus:ring-magna-red focus:border-transparent bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-magna-black mb-1">
                Password
              </label>
              <input
                type="password"
                value={form.pass}
                onChange={e => setForm({ ...form, pass: e.target.value })}
                placeholder="••••••••"
                required
                className="w-full rounded-md border-2 border-magna-red/20 px-4 py-3 text-sm text-magna-black focus:outline-none focus:ring-2 focus:ring-magna-red focus:border-transparent bg-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md btn btn-primary py-3 text-sm font-semibold disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-magna-black/50">
            © {new Date().getFullYear()} Magna electronics. All rights reserved.
          </div>
        </Card>
      </Section>
    </div>
  )
}
