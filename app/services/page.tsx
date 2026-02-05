import { getContent } from '@/actions/content'
import { Section, SectionHeading, Card, Grid } from '@/components/Section'

const SERVICE_DETAILS: Record<number, { icon: string; details: string[] }> = {
  1: {
    icon: '📐',
    details: [
      'High-speed PCB design up to 40 GHz',
      'Multi-layer HDI technology',
      'Signal integrity analysis',
      'Thermal design & optimization',
      'DFM consultation & support'
    ]
  },
  2: {
    icon: '⚙️',
    details: [
      'C/C++ firmware development',
      'Real-time OS integration',
      'Bootloader & HAL development',
      'Debugger integration & profiling',
      'OTA update mechanisms'
    ]
  },
  3: {
    icon: '🔧',
    details: [
      'Component-level repair',
      'Micro-soldering services',
      'Power supply troubleshooting',
      'Calibration & verification',
      'Test & measurement services'
    ]
  }
}

export default async function Services() {
  const content = await getContent()
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
      <Section centered>
        <div className="w-full bg-gradient-to-br from-orange-600/80 to-red-600/50 text-white rounded-xl p-12 md:p-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl opacity-95">Comprehensive electronics engineering solutions tailored to your needs</p>
        </div>
      </Section>

      <Section>
        <Grid cols={3}>
          {content.services.map(s => (
            <Card key={s.id} className="bg-gradient-to-br from-red-600/80 to-orange-600/60 text-white">
              <h3 className="text-2xl font-semibold mb-4">{s.title}</h3>
              <p className="text-base text-white/90 mb-6">{s.description}</p>
              <a href="/contact" className="btn btn-primary bg-white text-red-600 hover:bg-gray-100 inline-block">Request Service</a>
            </Card>
          ))}
        </Grid>
      </Section>
    </div>
  )
}
