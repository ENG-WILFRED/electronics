'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <header className="w-full bg-magna-cream/50 backdrop-blur-lg border-b border-magna-red/10 sticky top-0 z-50">
        <div className="w-full px-4 md:px-8 lg:px-20 py-4 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-magna-red to-magna-orange bg-clip-text text-transparent hover:opacity-80 transition">
            Electrical & Services
          </h2>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#services" className="text-sm md:text-base font-semibold text-magna-black hover:text-magna-red transition duration-200">
              Services
            </a>
            <a href="#team" className="text-sm md:text-base font-semibold text-magna-black hover:text-magna-red transition duration-200">
              Team
            </a>
            <a href="#gallery" className="text-sm md:text-base font-semibold text-magna-black hover:text-magna-red transition duration-200">
              Gallery
            </a>
            <a href="#company" className="text-sm md:text-base font-semibold text-magna-black hover:text-magna-red transition duration-200">
              About
            </a>
            <a href="/contact" className="btn btn-primary px-5 py-2 text-sm md:text-base">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-magna-red/10 rounded-lg transition z-50"
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-magna-red transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-magna-red transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-5 h-0.5 bg-magna-red transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <nav className="md:hidden bg-magna-cream/80 backdrop-blur-lg border-t border-magna-red/10 px-4 py-4 flex flex-col gap-2 animate-fadeIn">
            <a
              href="#services"
              className="text-base font-semibold text-magna-black hover:text-magna-red transition py-3 px-4 rounded-lg hover:bg-magna-red/10"
              onClick={closeMenu}
            >
              Services
            </a>
            <a
              href="#team"
              className="text-base font-semibold text-magna-black hover:text-magna-red transition py-3 px-4 rounded-lg hover:bg-magna-red/10"
              onClick={closeMenu}
            >
              Team
            </a>
            <a
              href="#gallery"
              className="text-base font-semibold text-magna-black hover:text-magna-red transition py-3 px-4 rounded-lg hover:bg-magna-red/10"
              onClick={closeMenu}
            >
              Gallery
            </a>
            <a
              href="#company"
              className="text-base font-semibold text-magna-black hover:text-magna-red transition py-3 px-4 rounded-lg hover:bg-magna-red/10"
              onClick={closeMenu}
            >
              About
            </a>
            <a href="/contact" className="btn btn-primary px-5 py-3 text-center text-base w-full" onClick={closeMenu}>
              Contact
            </a>
          </nav>
        )}
      </header>
    </>
  )
}
