import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import ServiceIcon from '../components/ServiceIcon'

const serviceGroups = [
  {
    title: 'Sandaru Seya Photography',
    description: 'From the anticipation of a pre-shoot to the beauty of a wedding day and the polish of commercial imagery, we create refined photographs that preserve meaningful moments and tell every story with intention.',
    services: [
      { title: 'Wedding Photography', description: 'From the preparations to the final celebration, we capture the people, details, and moments that make your wedding yours.', icon: 'wedding' },
      { title: 'PreShoot Photography', description: 'Celebrate your love before the wedding with relaxed couple portraits, creative concepts, and beautiful pre-wedding moments.', icon: 'portrait' },
      { title: 'Commercial Photography', description: 'Professional product and brand photography for businesses, campaigns, and marketing materials.', icon: 'commercial' }
    ]
  },
  {
    title: 'Arts & You Photography',
    
    description: 'From joyful birthdays and proud graduations to energetic sports, heartfelt get-togethers, maternity sessions, and portraits, we capture every milestone with warmth, artistry, and a lasting sense of connection.',
    services: [
      { title: 'Birthday Photography', description: 'Joyful birthday celebrations captured through candid moments, colourful details, and memories to cherish.', icon: 'birthday' },
      { title: 'Graduation Photography', description: 'Celebrate your achievement with polished graduation portraits, cap-and-gown photos, and keepsakes with family and friends.', icon: 'graduation' },
      { title: 'Event Photography', description: 'Photography for sports events, get-togethers, and maternity photoshoots, capturing the energy and moments you want to remember.', icon: 'event' },

      // { title: 'Portrait Photography', description: 'Personal portraits for individuals, couples, and families, capturing the character and connection that make each portrait special.', icon: 'portrait' }
    ]
  }
]

const Services = () => {
  const theme = useTheme()

  return (
    <main className="services-page" style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
      <div className="services-page__inner">
        <motion.header className="services-page__header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span style={{ color: theme.colors.accent }}>WHAT WE OFFER</span>
          <h1 style={{ color: theme.colors.text }}>Photography <em style={{ color: theme.colors.accent }}>Services</em></h1>
          <p style={{ color: theme.colors.textSecondary }}>Thoughtful photography for the people, celebrations, and stories you want to remember.</p>
          {/* <p style={{ color: theme.colors.textSecondary, maxWidth: '760px', margin: '0.75rem auto 0' }}>Sandaru Seya Photography offers wedding, pre-shoot, and commercial photography. Arts &amp; You Photography covers birthdays, graduations, sports events, get-togethers, and maternity photoshoots.</p> */}
        </motion.header>

        {serviceGroups.map((group, groupIndex) => (
          <section key={group.title} style={{ marginBottom: '3rem', paddingTop: '1.5rem', borderTop: `1px solid ${theme.colors.border}` }}>
            <div className="services-page__group-title" style={{ color: theme.colors.accent, letterSpacing: '3px', textTransform: 'uppercase', fontSize: '2.4rem', marginBottom: '0.75rem' }}>{group.title}</div>
            {/* <h2 style={{ color: theme.colors.text, fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: '400', margin: '0 0 0.75rem' }}>{group.title}</h2> */}
            <p style={{ color: theme.colors.textSecondary, width: '100%', fontSize: '1.05rem', lineHeight: 1.8, margin: '0 0 1.5rem' }}>{group.description}</p>
            <div className="services-page__grid">
              {group.services.map((service, index) => (
                <motion.article
                  className="services-page__card"
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * (groupIndex * group.services.length + index) }}
                  whileHover={{ y: -5 }}
                  style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
                >
                  <ServiceIcon type={service.icon} color={theme.colors.accent} />
                  <h2 style={{ color: theme.colors.text }}>{service.title}</h2>
                  <p style={{ color: theme.colors.textSecondary }}>{service.description}</p>
                </motion.article>
              ))}
            </div>
          </section>
        ))}

        <div className="services-page__cta">
          <p style={{ color: theme.colors.textSecondary }}>Have a moment or idea in mind?</p>
          <Link to="/contact" style={{ backgroundColor: theme.colors.accent, color: theme.isDark ? '#000' : '#fff' }}>Book a session</Link>
        </div>
      </div>
    </main>
  )
}

export default Services
