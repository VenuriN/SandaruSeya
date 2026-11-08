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
            Don't let your memories fade. <br></br>We capture your memories forever.
          </p>
        </div>

        <div className="site-footer__column">
          <h2 style={{ color: colors.text }}>Explore</h2>
          <Link to="/gallery" style={{ color: colors.textSecondary }}>Gallery</Link>
          <Link to="/services" style={{ color: colors.textSecondary }}>Services</Link>
          <Link to="/about" style={{ color: colors.textSecondary }}>About</Link>
          <Link to="/contact" style={{ color: colors.textSecondary }}>Get in touch</Link>
        </div>

        <div className="site-footer__column">
          <h2 style={{ color: colors.text }}>Contact</h2>
          <a href="tel:+94712299634" style={{ color: colors.textSecondary }}>
            071 229 9634
          </a>
          <a href="mailto:pasindusandaruwan29@gmail.com" style={{ color: colors.textSecondary }}>
            pasindusandaruwan29@gmail.com
          </a>
          {/* <a href="tel:+94712299634" style={{ color: colors.textSecondary }}>
            071 229 9634
          </a> */}
          <span style={{ color: colors.textSecondary }}>169/C, Oruwalpitiya Road, Athurugiriya, Colombo, Sri Lanka, 10150</span>
        </div>

        <div className="site-footer__column">
          <h2 style={{ color: colors.text }}>Follow</h2>
          <div className="site-footer__socials">
            <a className="site-footer__social-link" href="https://www.instagram.com/sandaru_seya" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Sandaru Seya Instagram" style={{ color: colors.text }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.8" r="1.2" fill="currentColor" />
              </svg>
            </a>
            <a className="site-footer__social-link" href="https://web.facebook.com/pasindu.sandaruwan.39" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Sandaru Seya Facebook" style={{ color: colors.text }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.027 1.792-4.7 4.533-4.7 1.312 0 2.686.236 2.686.236v2.953h-1.513c-1.49 0-1.955.93-1.955 1.885v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
            </a>
            <a className="site-footer__social-link" href="https://www.tiktok.com/@sandaru_seya?_r=1&_t=ZS-9AWevw1NJkv" target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="Sandaru Seya TikTok" style={{ color: colors.text }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.83 4.63 1.38 1.77 3.42 2.92 5.72 3.25v4.01c-2.18-.08-4.55-.82-6.41-2.36v8.88c0 1.54-.45 3.08-1.36 4.32-1.26 1.76-3.35 2.9-5.51 3.11-2.8.28-5.76-.94-7.2-3.37-1.65-2.71-1.29-6.58 1.08-8.76 1.64-1.56 4.03-2.13 6.22-1.75v4.34c-1.99-.66-4.41.5-4.64 2.7-.42 2.21 1.85 4.07 4.02 3.62 1.45-.27 2.51-1.68 2.48-3.15.04-7.33 0-14.66.03-21.99z" transform="scale(.88) translate(1.6 1.6)" />
              </svg>
            </a>
             <a className="site-footer__social-link" href="https://web.facebook.com/pasindu.sandaruwan.39" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Arts & You Facebook" style={{ color: colors.text }}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.027 1.792-4.7 4.533-4.7 1.312 0 2.686.236 2.686.236v2.953h-1.513c-1.49 0-1.955.93-1.955 1.885v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom" style={{ borderTop: `1px solid ${colors.border}`, color: colors.textSecondary }}>
        <span>© {new Date().getFullYear()} SandaruSeya Photography. All rights reserved.</span>
        {/* <span>Turning moments into timeless stories.</span> */}
        <Link to="/admin" className="site-footer__admin" style={{ color:'colors.accent' }}>Admin</Link>
      </div>
    </footer>
  )
}

export default Footer
