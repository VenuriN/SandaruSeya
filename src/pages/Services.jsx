import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import ServiceIcon from '../components/ServiceIcon'

const services = [
  { title: 'Portrait Photography', description: 'Professional portraits that capture your unique personality and style. Perfect for individuals, couples, and families.', icon: 'portrait' },
  { title: 'Wedding Photography', description: 'Comprehensive wedding coverage from preparation to reception, documenting every special moment of your big day.', icon: 'wedding' },
  { title: 'Event Photography', description: 'Corporate events, parties, and celebrations captured with a professional touch and attention to detail.', icon: 'event' },
  { title: 'Fashion Photography', description: 'Creative fashion shoots for portfolios, lookbooks, and brand campaigns with artistic vision.', icon: 'fashion' },
  { title: 'Birthday Photography', description: 'Joyful birthday celebrations captured through candid moments, colourful details, and memories to cherish.', icon: 'birthday' },
  { title: 'Commercial Photography', description: 'Product and commercial photography for businesses, brands, and marketing materials.', icon: 'commercial' }
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
        </motion.header>

        <div className="services-page__grid">
          {services.map((service, index) => (
            <motion.article
              className="services-page__card"
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index }}
              whileHover={{ y: -5 }}
              style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
            >
              <ServiceIcon type={service.icon} color={theme.colors.accent} />
              <h2 style={{ color: theme.colors.text }}>{service.title}</h2>
              <p style={{ color: theme.colors.textSecondary }}>{service.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="services-page__cta">
          <p style={{ color: theme.colors.textSecondary }}>Have a moment or idea in mind?</p>
          <Link to="/contact" style={{ backgroundColor: theme.colors.accent, color: theme.isDark ? '#000' : '#fff' }}>Book a session</Link>
        </div>
      </div>
    </main>
  )
}

export default Services
