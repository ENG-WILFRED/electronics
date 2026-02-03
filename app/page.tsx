import { getContent } from '@/actions/content'
import { Section, SectionHeading, Card, Grid } from '@/components/Section'

export default async function Home() {
  const content = await getContent()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HERO */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {content.siteTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {content.hero.tagline}
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8">
            {content.hero.subtitle}
          </p>

          <div className="flex justify-center gap-4">
            <a href="/contact" className="btn btn-primary">
              Get in Touch
            </a>
            <a href="/services" className="btn btn-outline">
              Our Services
            </a>
          </div>
        </div>
      </header>

      {/* SERVICES */}
      <Section>
        <SectionHeading>Our Services</SectionHeading>
        <Grid cols={3}>
          {content.services.map(s => (
            <Card key={s.id}>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {s.description}
              </p>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* WHY US */}
      <Section dark centered>
        <SectionHeading>Why Choose Us</SectionHeading>
        <Grid cols={3}>
          <div>
            <h3 className="font-semibold mb-2">Experienced Engineers</h3>
            <p className="text-gray-400 text-sm">
              Our team brings deep technical expertise across hardware and software systems.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Reliable Delivery</h3>
            <p className="text-gray-400 text-sm">
              We follow structured processes to deliver on time and within scope.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Client-Focused</h3>
            <p className="text-gray-400 text-sm">
              Every solution is tailored to your specific business and technical needs.
            </p>
          </div>
        </Grid>
      </Section>

      {/* STATS */}
      <Section centered>
        <Grid cols={3}>
          <div>
            <p className="text-4xl font-bold text-blue-600">{content.stats.projects}+</p>
            <p className="text-gray-600">Projects Completed</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600">{content.stats.clients}+</p>
            <p className="text-gray-600">Satisfied Clients</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-red-600">{content.stats.years}+</p>
            <p className="text-gray-600">Years of Experience</p>
          </div>
        </Grid>
      </Section>

      {/* TEAM */}
      <Section>
        <SectionHeading>Our Team</SectionHeading>
        <Grid cols={3}>
          {content.team.map((m, i) => (
            <Card key={i}>
              <p className="font-semibold text-lg mb-1">{m.name}</p>
              <p className="text-sm text-gray-600">{m.role}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* TESTIMONIALS */}
      <Section dark>
        <SectionHeading>What Our Clients Say</SectionHeading>
        <Grid cols={2}>
          {content.testimonials.map((t, i) => (
            <Card key={i}>
              <p className="text-gray-300 mb-4 italic">
                "{t.message}"
              </p>
              <p className="font-semibold text-white">{t.name}</p>
              <p className="text-sm text-gray-400">{t.company}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* SHOWCASE */}
      <Section centered>
        <SectionHeading>Project Showcase</SectionHeading>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={content.hero.video}
            className="w-full h-96"
            title="Company showcase video"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </Section>

      {/* FOOTER / CONTACT */}
      <Section dark centered>
        <h3 className="text-2xl font-bold mb-4">
          Let's Work Together
        </h3>

        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
          Reach out to discuss your next project or technical challenge.
        </p>

        <div className="space-y-2 text-sm mb-6">
          <p><strong>Email:</strong> {content.contact.email}</p>
          <p><strong>Phone:</strong> {content.contact.phone}</p>
          <p><strong>Address:</strong> {content.contact.address}</p>
        </div>

        <a href="/contact" className="btn btn-primary">
          Contact Us
        </a>
      </Section>
    </div>
  )
}
