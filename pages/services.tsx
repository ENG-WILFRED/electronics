import { GetStaticProps } from 'next'
import { getContent } from '../actions/content'

type Service = { id: number; title: string; description: string }

export default function Services({ services }: { services: Service[] }) {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Our Services</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map(s => (
            <div key={s.id} className="card">
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.description}</p>
              <div className="mt-4">
                <a href="/contact" className="btn btn-primary">Get Quote</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const content = await getContent()
  const services = (content as { services: Service[] }).services ?? []
  return { props: { services }, revalidate: 10 }
}
