'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from '@/actions/login'

export default function Login() {
  const [form, setForm] = useState({ user: '', pass: '' })
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const result = await loginAction(form.user, form.pass)
    if (result.ok) router.push('/admin/dashboard')
    else alert('Login failed')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="card w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={submit} className="space-y-3">
          <input value={form.user} onChange={e=>setForm({...form,user:e.target.value})} placeholder="Username" className="w-full p-2 border rounded" />
          <input type="password" value={form.pass} onChange={e=>setForm({...form,pass:e.target.value})} placeholder="Password" className="w-full p-2 border rounded" />
          <div>
            <button className="btn btn-primary" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
