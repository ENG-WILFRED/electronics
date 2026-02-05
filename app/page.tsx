import { getContent } from '@/actions/content'
import { Section, SectionHeading, Card, Grid } from '@/components/Section'
import Gallery from '@/components/Gallery'
import Logo from '@/components/Logo'
import Navbar from '@/components/Navbar'

export default async function Home() {
  const content = await getContent()

  return (
    <div className="min-h-screen bg-magna-cream text-magna-black">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO – FULL WIDTH */}
      <section className="w-full bg-gradient-to-br from-magna-red/10 to-magna-orange/10 border-b border-magna-red/20">
        <div className="w-full px-6 md:px-20 py-28 text-center">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Logo size="large" />
            <h1 className="text-4xl font-bold text-magna-red">{content.company.name}</h1>
          </div>

          <h2 className="text-6xl font-bold mb-4">{content.siteTitle}</h2>
          <p className="text-2xl text-magna-red font-semibold mb-6">{content.hero.tagline}</p>
          <p className="max-w-3xl mx-auto text-lg text-magna-black/70 mb-6">
            {content.hero.subtitle}
          </p>

          <div className="flex justify-center gap-6">
            <a href="/contact" className="btn btn-primary px-10 py-4">Get in Touch</a>
            <a href="/services" className="btn btn-outline px-10 py-4">Our Services</a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="w-full py-24" id="services">
        <div className="w-full px-6 md:px-16">
          <Grid cols={3}>
            {content.services.map(s => (
              <Card key={s.id} className="border-2 border-magna-red/20">
                <h3 className="text-2xl font-semibold text-magna-red mb-4">{s.title}</h3>
                <p className="text-magna-black/70 leading-relaxed">{s.description}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      {/* STATS – EDGE TO EDGE */}
      <section className="w-full bg-transparent border-y border-magna-red/10 py-20">
        <Grid cols={3}>
          <Card className="text-center bg-white">
            <p className="text-5xl font-bold text-magna-orange">{content.stats.projects}+</p>
            <p className="font-semibold mt-2">Projects Completed</p>
          </Card>
          <Card className="text-center bg-white">
            <p className="text-5xl font-bold text-magna-red">{content.stats.clients}+</p>
            <p className="font-semibold mt-2">Satisfied Clients</p>
          </Card>
          <Card className="text-center bg-white">
            <p className="text-5xl font-bold">{content.stats.years}+</p>
            <p className="font-semibold mt-2">Years Experience</p>
          </Card>
        </Grid>
      </section>

      {/* TEAM */}
      <section className="w-full py-24" id="team">
        <div className="w-full px-6 md:px-16">
          <Grid cols={3}>
            {content.team.map((m, i) => (
              <Card key={i}>
                <p className="text-xl font-semibold text-magna-red">{m.name}</p>
                <p className="text-magna-black/70">{m.role}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full bg-gradient-to-r from-magna-orange/5 to-magna-red/5 py-24">
        <div className="w-full px-6 md:px-16">
          <Grid cols={2}>
            {content.testimonials.map((t, i) => (
              <Card key={i}>
                <p className="italic text-lg mb-6">"{t.message}"</p>
                <p className="font-semibold text-magna-red">{t.name}</p>
                <p className="text-sm text-magna-black/60">{t.company}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      {/* GALLERY – FULL BLEED */}
      <section className="w-full py-24" id="gallery">
        <Gallery images={[
          'https://picsum.photos/id/1011/1200/800',
          'https://picsum.photos/id/1027/1200/800',
          'https://picsum.photos/id/1035/1200/800',
          'https://picsum.photos/id/1043/1200/800'
        ]} />
      </section>

      {/* COMPANY INFORMATION */}
      <section className="w-full bg-gradient-to-r from-magna-red/5 to-magna-orange/10 py-20" id="company">
        <div className="w-full px-6 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-magna-red mb-2">About Our Company</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-magna-red to-magna-orange mx-auto"></div>
          </div>

          {/* Company Overview */}
          <Card className="mb-10 bg-gradient-to-br from-magna-red/5 to-magna-orange/5 border-2 border-magna-red/20">
            <h3 className="text-3xl font-bold text-magna-red mb-4">{content.company.name}</h3>
            <p className="text-magna-black/70 text-lg mb-6">{content.company.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="text-center bg-white border-2 border-magna-orange/20">
                <p className="text-4xl font-bold text-magna-orange">{content.company.founded}</p>
                <p className="text-magna-black text-sm mt-2 font-semibold">Founded Year</p>
              </Card>
              <Card className="text-center bg-white border-2 border-magna-red/20">
                <p className="text-4xl font-bold text-magna-red">{content.company.employees}</p>
                <p className="text-magna-black text-sm mt-2 font-semibold">Team Members</p>
              </Card>
              <Card className="text-center bg-white border-2 border-magna-orange/20">
                <p className="text-2xl font-bold text-magna-black">Global</p>
                <p className="text-magna-black text-sm mt-2 font-semibold">Operations</p>
              </Card>
              <Card className="text-center bg-white border-2 border-magna-red/20">
                <p className="text-2xl font-bold text-magna-black">24/7</p>
                <p className="text-magna-black text-sm mt-2 font-semibold">Support</p>
              </Card>
            </div>
          </Card>

          {/* Expertise */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-magna-red mb-6 text-center">Our Expertise</h3>
            <Grid cols={4}>
              {content.company.expertise.map((exp, i) => (
                <Card key={i} className="text-center bg-white border-2 border-magna-orange/20">
                  <p className="text-magna-black font-semibold text-base">{exp}</p>
                </Card>
              ))}
            </Grid>
          </div>

          {/* Certifications & Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-bold text-magna-red mb-6">Certifications</h3>
              <div className="space-y-4">
                {content.company.certifications.map((cert, i) => (
                  <Card key={i} className="flex items-center bg-white border-2 border-magna-orange/20">
                    <div className="w-3 h-3 bg-magna-orange rounded-full mr-4"></div>
                    <p className="text-magna-black text-base font-semibold">{cert}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-2xl font-bold text-magna-red mb-6">Key Achievements</h3>
              <div className="space-y-4">
                {content.company.achievements.map((achievement, i) => (
                  <Card key={i} className="flex items-center bg-gradient-to-r from-magna-orange/10 to-magna-red/10 border-2 border-magna-orange/30">
                    <div className="w-3 h-3 bg-magna-red rounded-full mr-4"></div>
                    <p className="text-magna-black text-base font-semibold">{achievement}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <footer className="w-full bg-gradient-to-r from-magna-red/10 to-magna-orange/10 py-28">
        <div className="w-full px-6 md:px-20 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-4xl font-bold text-magna-red mb-6">Let's Work Together</h3>
            <p className="text-xl text-magna-black/70 mb-8">
              Reach out to discuss your next project.
            </p>
            <p className="text-lg">{content.contact.email}</p>
            <p className="text-lg">{content.contact.phone}</p>
          </div>

          <Card className="text-center p-12">
            <h4 className="text-2xl font-bold text-magna-red mb-4">Ready to Start?</h4>
            <p className="text-magna-black/70 mb-8">Let's build something great.</p>
            <a href="/contact" className="btn btn-primary px-10 py-4">Contact Us</a>
          </Card>
        </div>
      </footer>

    </div>
  )
}
