import Image from 'next/image'

export interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export default function Logo({ size = 'medium', className = '' }: LogoProps) {
  const sizeMap = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  return (
    <div className={`${sizeMap[size]} ${className} flex items-center justify-center`}>
      <Image
        src="/logo.jpeg"
        alt="Electronics & Services Logo"
        width={64}
        height={64}
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  )
}
