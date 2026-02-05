interface SectionProps {
  children: React.ReactNode
  className?: string
  centered?: boolean
}

export function Section({ children, className = '', centered = false }: SectionProps) {
  return (
    <section className={`w-full bg-magna-cream text-magna-black py-16 ${className}`}>
      <div className={`w-full px-6 md:px-12 ${centered ? 'text-center' : ''}`}>
        {children}
      </div>
    </section>
  )
}

interface SectionHeadingProps {
  children: React.ReactNode
  subtitle?: string
  centered?: boolean
}

export function SectionHeading({ children, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-magna-black ${centered ? 'text-center' : ''}`}>{children}</h2>
      {subtitle && <p className={`text-magna-black/70 ${centered ? 'text-center max-w-3xl mx-auto' : ''} mb-8`}>{subtitle}</p>}
    </>
  )
}

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div className={`p-6 rounded-4xl ${hover ? 'shadow-md hover:shadow-xl hover:scale-[1.02]' : 'shadow-md'} transition duration-200 ${className} bg-white border border-gray-200 text-magna-black`}>
      {children}
    </div>
  )
}

interface GridProps {
  children: React.ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: 'small' | 'medium' | 'large'
}

export function Grid({ children, cols = 3, gap = 'medium' }: GridProps) {
  const colClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[cols]

  const gapClass = {
    small: 'gap-6',
    medium: 'gap-10',
    large: 'gap-16'
  }[gap]

  return <div className={`grid ${colClass} ${gapClass} w-full`}>{children}</div>
}
