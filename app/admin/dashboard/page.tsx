'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { getContent, setContent } from '@/actions/content'
import { checkAuthAction } from '@/actions/login'

export default function Dashboard() {
  const [content, setContentState] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    async function checkAuth() {
      const isAuthed = await checkAuthAction()
      if (!isAuthed.ok) {
        router.push('/admin/login')
        return
      }
      const data = await getContent()
      setContentState(data)
    }
    checkAuth()
  }, [router])

  if (!content) return <div className="p-8">Loading...</div>

  async function save() {
    setSaving(true)
    try {
      await setContent(content)
      setSaving(false)
      alert('Saved')
    } catch (e) {
      setSaving(false)
      alert('Save failed')
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto card">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div>
            <a className="btn" href="/">View Site</a>
          </div>
        </div>

        <label className="block mb-2">Site Title</label>
        <input className="w-full p-2 border rounded mb-4" value={content.siteTitle} onChange={e=>setContentState({...content, siteTitle: e.target.value})} />

        <label className="block mb-2">Team Names (comma separated)</label>
        <input className="w-full p-2 border rounded mb-4" value={content.teamNames.join(', ')} onChange={e=>setContentState({...content, teamNames: e.target.value.split(',').map(s=>s.trim())})} />

        <label className="block mb-2">Services (format: title|desc; separate with new lines)</label>
        <textarea className="w-full p-2 border rounded mb-4 h-36" value={content.services.map((s:any)=>`${s.title}|${s.description}`).join('\n')} onChange={e=>{
          const lines = e.target.value.split('\n').map((l,i)=>{
            const [title,desc] = l.split('|')
            return { id: i+1, title: title?.trim()||'', description: desc?.trim()||'' }
          })
          setContentState({...content, services: lines})
        }} />

        <label className="block mb-2">Contact Email</label>
        <input className="w-full p-2 border rounded mb-4" value={content.contact.email} onChange={e=>setContentState({...content, contact: {...content.contact, email: e.target.value}})} />

        <label className="block mb-2">Contact Phone</label>
        <input className="w-full p-2 border rounded mb-4" value={content.contact.phone} onChange={e=>setContentState({...content, contact: {...content.contact, phone: e.target.value}})} />

        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={save} disabled={saving}>{saving? 'Saving…' : 'Save Changes'}</button>
          <button className="btn" onClick={()=>router.push('/')}>Preview</button>
        </div>
      </div>
    </div>
  )
}
