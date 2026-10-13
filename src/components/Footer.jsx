import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'

const Footer = () => {
  const { colors, isDark } = useTheme()

  return (
    <footer
      className="site-footer"
      style={{
        backgroundColor: colors.surface,
        color: colors.text,
        borderTop: `1px solid ${colors.border}`
      }}
    >
      <div className="site-footer__main">
        <div className="site-footer__brand">
          <Link
            to="/"
            className="site-footer__logo"
            aria-label="SandaruSeya home"
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <img
              src="/logo.jpg"
              alt="SandaruSeya"
              style={{ display: 'block', width: 'auto', height: '64px', maxWidth: '100%', objectFit: 'contain', filter: isDark ? 'invert(1)' : 'none' }}
            />
          </Link>
          <p style={{ color: colors.textSecondary }}>
            Capturing the moments you&apos;ll want to remember.
          </p>
        </div>

        <div className="site-footer__column">
          <h2 style={{ color: colors.text }}>Explore</h2>
          <Link to="/gallery" style={{ color: colors.textSecondary }}>Gallery</Link>
          <Link to="/about" style={{ color: colors.textSecondary }}>About</Link>
          <Link to="/contact" style={{ color: colors.textSecondary }}>Get in touch</Link>
        </div>

        <div className="site-footer__column">
          <h2 style={{ color: colors.text }}>Contact</h2>
          <a href="mailto:pasindusandaruwan29@gmail.com" style={{ color: colors.textSecondary }}>
            pasindusandaruwan29@gmail.com
          </a>
          <a href="tel:+94712299634" style={{ color: colors.textSecondary }}>
            +94 71 229 9634
          </a>
          <span style={{ color: colors.textSecondary }}>Colombo, Sri Lanka</span>
        </div>

        <div className="site-footer__column">
          <h2 style={{ color: colors.text }}>Follow</h2>
          <a href="https://www.instagram.com/sandaru_seya" target="_blank" rel="noopener noreferrer" style={{ color: colors.textSecondary }}>Instagram</a>
          <a href="https://web.facebook.com/pasindu.sandaruwan.39" target="_blank" rel="noopener noreferrer" style={{ color: colors.textSecondary }}>Facebook</a>
          <a href="https://www.tiktok.com/@pasindusandaruwan" target="_blank" rel="noopener noreferrer" style={{ color: colors.textSecondary }}>TikTok</a>
        </div>
      </div>

      <div className="site-footer__bottom" style={{ borderTop: `1px solid ${colors.border}`, color: colors.textSecondary }}>
        <span>© {new Date().getFullYear()} SandaruSeya Photography. All rights reserved.</span>
        {/* <span>Turning moments into timeless stories.</span> */}
        <Link to="/admin" className="site-footer__admin" style={{ color: colors.textSecondary }}>Admin</Link>
      </div>
    </footer>
  )
}

export default Footer
