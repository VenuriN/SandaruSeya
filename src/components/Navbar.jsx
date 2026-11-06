import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = () => {
  const theme = useTheme()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const nextThemeLabel = theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'

  const ThemeIcon = () => theme.isDark ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
    </svg>
  )

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/art-and-you', label: 'Arts & You' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    // { path: '/admin', label: 'Admin' }
  ]

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: '80px',
      padding: '1rem 3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderBottom: `1px solid ${theme.colors.border}`,
      transition: 'all 0.3s ease'
    }}>
      <Link 
        to="/" 
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
          flexShrink: 0
        }}
        aria-label="SandaruSeya home"
      >
        <img
          src="/logo.jpg"
          alt="SandaruSeya"
          style={{ display: 'block', width: 'auto', height: '48px', maxWidth: '180px', objectFit: 'contain', filter: theme.isDark ? 'invert(1)' : 'none' }}
        />
      </Link>

      {/* Desktop Navigation */}
      <div style={{
        display: 'flex',
        gap: '2.5rem',
        alignItems: 'center'
      }}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: (location.pathname + location.search) === link.path || location.pathname === link.path ? theme.colors.accent : theme.colors.text,
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: (location.pathname + location.search) === link.path || location.pathname === link.path ? '600' : '400',
              transition: 'color 0.3s ease',
              letterSpacing: '1px'
            }}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={theme.toggleTheme}
          type="button"
          aria-label={nextThemeLabel}
          title={nextThemeLabel}
          style={{
            display: 'grid',
            placeItems: 'center',
            width: '42px',
            height: '42px',
            padding: 0,
            backgroundColor: 'transparent',
            color: theme.colors.text,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease'
          }}
        >
          <ThemeIcon />
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: '5px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '5px'
        }}
      >
        <span style={{
          width: '25px',
          height: '3px',
          backgroundColor: theme.colors.text,
          transition: 'all 0.3s ease'
        }} />
        <span style={{
          width: '25px',
          height: '3px',
          backgroundColor: theme.colors.text,
          transition: 'all 0.3s ease'
        }} />
        <span style={{
          width: '25px',
          height: '3px',
          backgroundColor: theme.colors.text,
          transition: 'all 0.3s ease'
        }} />
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          backgroundColor: theme.colors.background,
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          borderBottom: `1px solid ${theme.colors.border}`,
          zIndex: 999
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                color: (location.pathname + location.search) === link.path || location.pathname === link.path ? theme.colors.accent : theme.colors.text,
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: (location.pathname + location.search) === link.path || location.pathname === link.path ? '600' : '400',
                padding: '0.5rem 0'
              }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={theme.toggleTheme}
            type="button"
            aria-label={nextThemeLabel}
            title={nextThemeLabel}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              padding: 0,
              backgroundColor: 'transparent',
              color: theme.colors.text,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: '50%',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              transition: 'color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease'
            }}
          >
            <ThemeIcon />
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
