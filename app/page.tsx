import { getContent } from '@/actions/content'

type Service = { id: number; title: string; description: string }
type Content = {
  siteTitle: string
  hero: { subtitle: string; video: string }
  services: Service[]
  teamNames: string[]
  contact: { email: string; phone: string }
}

export default async function Home() {
  const content: Content = await getContent()

  return (
    <div className="min-h-screen p-8">
      <header className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">{content.siteTitle}</h1>
        <p className="text-lg text-gray-700">{content.hero.subtitle}</p>
      </header>

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Services</h2>
          <ul className="space-y-4">
            {content.services.map(s => (
              <li key={s.id} className="p-4 border rounded-md hover:scale-102 transition-transform">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="card flex flex-col gap-4">
          <h2 className="text-2xl font-bold">About & Contact</h2>
          <p className="text-gray-700">We provide design, development and repair services for consumer and industrial electronics.</p>
          <div>
            <strong>Team</strong>
            <ul className="list-disc pl-5">
              {content.teamNames.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>
          <div>
            <strong>Email:</strong> {content.contact.email}
            <br />
            <strong>Phone:</strong> {content.contact.phone}
          </div>
          <div className="mt-4">
            <a className="btn btn-primary" href="/contact">Contact Us</a>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4">Showcase</h2>
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe src={content.hero.video} className="w-full h-80" title="hero video" frameBorder="0" allowFullScreen></iframe>
        </div>
      </section>
    </div>
  )
}
