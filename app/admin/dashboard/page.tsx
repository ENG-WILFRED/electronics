'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { getContent, setContent } from '@/actions/content'
import { checkAuthAction } from '@/actions/login'
import { Section, Card } from '@/components/Section'

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

  if (!content) return <div className="min-h-screen bg-magna-cream flex items-center justify-center text-magna-black text-xl">Loading...</div>

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
    <div className="min-h-screen bg-magna-cream text-magna-black">
      {/* Navigation */}
      <nav className="bg-magna-cream/50 backdrop-blur-lg border-b border-magna-red/10 sticky top-0 z-50">
        <div className="w-full px-4 md:px-8 lg:px-20 py-4 flex items-center justify-between">
          <a href="/" className="text-xl md:text-2xl font-bold text-magna-red hover:text-magna-orange transition">
            E&S
          </a>
          <a href="/" className="btn btn-outline px-4 md:px-6 py-2 text-sm md:text-base">← Back</a>
        </div>
      </nav>

      <Section>
        <Card className="w-full max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-700">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <div>
              <a className="btn btn-primary bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600" href="/">View Site</a>
            </div>
          </div>

          <label className="block mb-3 font-semibold text-gray-200 text-base">Site Title</label>
          <input className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 mb-6" value={content.siteTitle} onChange={e=>setContentState({...content, siteTitle: e.target.value})} />

          <label className="block mb-3 font-semibold text-gray-200 text-base">Team Names (comma separated)</label>
          <input className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 mb-6" value={content.teamNames.join(', ')} onChange={e=>setContentState({...content, teamNames: e.target.value.split(',').map(s=>s.trim())})} />

          <label className="block mb-3 font-semibold text-gray-200 text-base">Services (format: title|desc; separate with new lines)</label>
          <textarea className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 mb-6 h-40" value={content.services.map((s:any)=>`${s.title}|${s.description}`).join('\n')} onChange={e=>{
            const lines = e.target.value.split('\n').map((l,i)=>{
              const [title,desc] = l.split('|')
              return { id: i+1, title: title?.trim()||'', description: desc?.trim()||'' }
            })
            setContentState({...content, services: lines})
          }} />

          <label className="block mb-3 font-semibold text-gray-200 text-base">Contact Email</label>
          <input className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 mb-6" value={content.contact.email} onChange={e=>setContentState({...content, contact: {...content.contact, email: e.target.value}})} />

          <label className="block mb-3 font-semibold text-gray-200 text-base">Contact Phone</label>
          <input className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 mb-8" value={content.contact.phone} onChange={e=>setContentState({...content, contact: {...content.contact, phone: e.target.value}})} />

          <div className="flex gap-4 pt-4">
            <button className="btn btn-primary bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 px-8 py-3" onClick={save} disabled={saving}>{saving? 'Saving…' : 'Save Changes'}</button>
            <button className="btn bg-gray-700 hover:bg-gray-600 text-white px-8 py-3" onClick={()=>router.push('/')}>Preview</button>
          </div>
        </Card>
      </Section>
    </div>
  )
}
