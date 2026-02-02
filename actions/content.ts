'use server'

import { prisma } from './db'

export type ContentType = {
  siteTitle: string
  hero: { subtitle: string; video: string }
  services: { id: number; title: string; description: string }[]
  teamNames: string[]
  contact: { email: string; phone: string }
}

export async function getContent(): Promise<ContentType> {
  const row = await prisma.siteContent.findFirst()
  if (!row || !row.data || Object.keys(row.data as object).length === 0) {
    return {
      siteTitle: 'Electronics & Systems',
      hero: { subtitle: 'Reliable electronics engineering and repair', video: 'https://player.vimeo.com/video/76979871' },
      services: [
        { id: 1, title: 'PCB Design', description: 'Schematic capture, PCB layout, and prototyping.' },
        { id: 2, title: 'Embedded Firmware', description: 'C/C++/RTOS firmware development for microcontrollers.' },
        { id: 3, title: 'Repair & Calibration', description: 'Diagnostics, repair, and recalibration services.' }
      ],
      teamNames: ['Founder: Alex Morgan', 'Engineer: Priya Singh'],
      contact: { email: 'hello@example.com', phone: '+10000000000' }
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
