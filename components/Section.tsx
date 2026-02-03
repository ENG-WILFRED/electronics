interface SectionProps {
  children: React.ReactNode
  className?: string
  dark?: boolean
  centered?: boolean
}

export function Section({ children, className = '', dark = false, centered = false }: SectionProps) {
  return (
    <section className={`${dark ? 'bg-gray-900 text-gray-100' : 'bg-white'} ${className}`}>
      <div className={`max-w-6xl mx-auto px-6 py-16 ${centered ? 'text-center' : ''}`}>
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
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${centered ? 'text-center' : ''}`}>{children}</h2>
      {subtitle && <p className={`text-gray-600 ${centered ? 'text-center max-w-2xl mx-auto' : ''} mb-10`}>{subtitle}</p>}
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
    <div className={`bg-white p-6 rounded-lg ${hover ? 'shadow-sm hover:shadow-md' : 'shadow-sm'} transition ${className}`}>
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
    small: 'gap-4',
    medium: 'gap-8',
    large: 'gap-12'
  }[gap]

  return <div className={`grid ${colClass} ${gapClass}`}>{children}</div>
}
