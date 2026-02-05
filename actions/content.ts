'use server'

import { prisma } from './db'

export type ContentType = {
  siteTitle: string
  hero: { subtitle: string; video: string; tagline: string }
  services: { id: number; title: string; description: string }[]
  team: { name: string; role: string }[]
  testimonials: { name: string; company: string; message: string }[]
  stats: { projects: number; clients: number; years: number }
  contact: { email: string; phone: string; address: string }
  company: {
    name: string
    founded: number
    employees: number
    headquarters: string
    description: string
    expertise: string[]
    certifications: string[]
    achievements: string[]
  }
}

export async function getContent(): Promise<ContentType> {
  const row = await prisma.siteContent.findFirst()
  if (!row || !row.data || Object.keys(row.data as object).length === 0) {
    return {
      siteTitle: 'Electronics & Systems',
      hero: {
        subtitle: 'Reliable electronics engineering and repair',
        video: 'https://player.vimeo.com/video/76979871',
        tagline: 'Engineering Excellence for Complex Systems'
      },
      services: [
        { id: 1, title: 'PCB Design', description: 'Schematic capture, PCB layout, and prototyping.' },
        { id: 2, title: 'Embedded Firmware', description: 'C/C++/RTOS firmware development for microcontrollers.' },
        { id: 3, title: 'Repair & Calibration', description: 'Diagnostics, repair, and recalibration services.' }
      ],
      team: [
        { name: 'Alex Morgan', role: 'Founder & Lead Engineer' },
        { name: 'Priya Singh', role: 'Senior Firmware Engineer' },
        { name: 'Marcus Chen', role: 'PCB Design Specialist' }
      ],
      testimonials: [
        { name: 'John Smith', company: 'Tech Innovations Inc', message: 'Outstanding work on our embedded systems. Delivered ahead of schedule with exceptional quality.' },
        { name: 'Sarah Johnson', company: 'Manufacturing Solutions', message: 'Their PCB design expertise saved us months of development time. Highly recommended.' }
      ],
      stats: { projects: 150, clients: 45, years: 12 },
      contact: { email: 'hello@electronics-systems.com', phone: '+1-555-0123', address: '123 Tech Street, Silicon Valley, CA 94025' },
      company: {
        name: 'Electronics & Systems Inc.',
        founded: 2012,
        employees: 12,
        headquarters: 'Silicon Valley, CA',
        description: 'Leading provider of electronics engineering services with expertise in PCB design, embedded firmware, and electronics repair.',
        expertise: ['High-speed PCB Design', 'Embedded Systems', 'Real-time OS Integration', 'Signal Integrity Analysis', 'Power Supply Design'],
        certifications: ['ISO 9001:2015', 'IPC-A-610', 'ESD Protection Certified'],
        achievements: ['150+ Projects Completed', '45+ Satisfied Clients', '12 Years Industry Experience']
      }
    }
  }
  return row.data as ContentType
}

export async function setContent(data: any) {
  const row = await prisma.siteContent.findFirst()
  if (row) {
    await prisma.siteContent.update({ where: { id: row.id }, data: { data } })
  } else {
    await prisma.siteContent.create({ data: { data } })
  }
  return true
}
