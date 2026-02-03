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
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-600">
            Comprehensive electronics engineering solutions tailored to your needs
          </p>
        </div>
      </header>

      {/* DETAILED SERVICES */}
      <Section>
        <Grid cols={1}>
          {content.services.map(s => {
            const detail = SERVICE_DETAILS[s.id]
            return (
              <div key={s.id} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-blue-600">
                <div className="flex gap-6 items-start">
                  <span className="text-4xl">{detail?.icon || '✓'}</span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
                    <p className="text-gray-600 mb-4">{s.description}</p>
                    <h4 className="font-semibold text-sm mb-2">Includes:</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mb-4">
                      {detail?.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                    <a href="/contact" className="btn btn-primary inline-block">
                      Request Service
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </Grid>
      </Section>

      {/* PROCESS */}
      <Section dark centered>
        <SectionHeading>Our Process</SectionHeading>
        <Grid cols={4}>
          <div>
            <p className="text-3xl font-bold text-blue-400 mb-2">1</p>
            <h4 className="font-semibold mb-2">Discovery</h4>
            <p className="text-sm text-gray-400">Understand your requirements and constraints</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-400 mb-2">2</p>
            <h4 className="font-semibold mb-2">Design</h4>
            <p className="text-sm text-gray-400">Create optimized solutions and prototypes</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-yellow-400 mb-2">3</p>
            <h4 className="font-semibold mb-2">Testing</h4>
            <p className="text-sm text-gray-400">Validate and verify all functionality</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-red-400 mb-2">4</p>
            <h4 className="font-semibold mb-2">Delivery</h4>
            <p className="text-sm text-gray-400">Support and handoff to production</p>
          </div>
        </Grid>
      </Section>

      {/* CAPABILITIES */}
      <Section>
        <SectionHeading centered>Our Capabilities</SectionHeading>
        <Grid cols={3}>
          <Card>
            <h4 className="font-semibold mb-2">🏭 Manufacturing Support</h4>
            <p className="text-sm text-gray-600">Design for manufacturing review, supplier coordination, and production support</p>
          </Card>
          <Card>
            <h4 className="font-semibold mb-2">📊 Testing & Validation</h4>
            <p className="text-sm text-gray-600">Comprehensive test plans, automated testing, and compliance verification</p>
          </Card>
          <Card>
            <h4 className="font-semibold mb-2">📱 Cross-Platform</h4>
            <p className="text-sm text-gray-600">Embedded systems, IoT, industrial, aerospace, and consumer electronics</p>
          </Card>
        </Grid>
      </Section>

      {/* CTA */}
      <Section dark centered>
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
          Contact us today to discuss how we can help bring your ideas to life.
        </p>
        <a href="/contact" className="btn btn-primary">
          Get Started
        </a>
      </Section>
    </div>
  )
}
