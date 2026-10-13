import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = () => {
  const theme = useTheme()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
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
      padding: '1.5rem 3rem',
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
              color: location.pathname === link.path ? theme.colors.accent : theme.colors.text,
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: location.pathname === link.path ? '600' : '400',
              transition: 'color 0.3s ease',
              letterSpacing: '1px'
            }}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={theme.toggleTheme}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: theme.colors.accent,
            color: theme.isDark ? '#000000' : '#FFFFFF',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          {theme.isDark ? '☀️ Light' : '🌙 Dark'}
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
                color: location.pathname === link.path ? theme.colors.accent : theme.colors.text,
                textDecoration: 'none',
                fontSize: '1.2rem',
                fontWeight: location.pathname === link.path ? '600' : '400',
                padding: '0.5rem 0'
              }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={theme.toggleTheme}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: theme.colors.accent,
              color: theme.isDark ? '#000000' : '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              alignSelf: 'flex-start'
            }}
          >
            {theme.isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
