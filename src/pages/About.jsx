import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const About = () => {
  const theme = useTheme()

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      paddingTop: '120px',
      paddingBottom: '4rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '4rem'
          }}
        >
          <div>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: '300',
              color: theme.colors.text,
              marginBottom: '1.5rem',
              lineHeight: 1.2
            }}>
              Every Frame Holds a Feeling.<br />
              <span style={{ color: theme.colors.accent }}>The Art of Seeing. The Beauty of Feeling.</span>
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: theme.colors.textSecondary,
              lineHeight: 1.8,
              marginBottom: '2rem'
            }}>
              I'm Pasindu Sandaruwan, the photographer behind Sandaru Seya Photography. I see photography as more than capturing an image. It's about preserving emotions, telling untold stories, and finding beauty in moments that pass too quickly. From intimate portraits and timeless weddings to life's most meaningful celebrations, I create visual stories that let you relive not just how a moment looked, but how it felt.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              aspectRatio: '4/5',
              maxHeight: '75vh'
            }}
          >
            <img
              src="/phtographer.jpg" width="800" alt="Pasindu Sandaruwan"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2rem',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              color: '#FFFFFF'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>Pasindu Sandaruwan</div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Professional Photographer</div>
            </div>
          </motion.div>
        </motion.div>

        {/* My Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            backgroundColor: theme.colors.surface,
            padding: '3rem',
            borderRadius: '8px',
            marginBottom: '4rem'
          }}
        >
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '500',
            color: theme.colors.text,
            marginBottom: '1.5rem'
          }}>
            My Story
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: theme.colors.textSecondary,
            lineHeight: 1.8,
            marginBottom: '1.5rem'
          }}>
            Photography is more than what I do; it's how I see the world, tell stories, and preserve the emotions that make every moment unforgettable.<br></br>
            My journey began over adda footer for this years ago with a passion for capturing the beauty in life's fleeting moments. Since then, I've dedicated myself to mastering the art of photography, exploring the interplay of light, emotion, and composition to create images that speak beyond words.<br></br>
            As the photographer behind Sandaru Seya Photography, I believe every story deserves to be told beautifully. Whether it's the quiet intimacy of a portrait, the magic of a wedding, or the energy of a special celebration, my goal is to capture every detail with creativity, authenticity, and an artistic touch, turning moments into timeless memories you'll treasure for years to come.
          </p>
          
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '500',
            color: theme.colors.text,
            marginBottom: '2rem'
          }}>
            Services
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: 'Portrait Photography',
                description: 'Professional portraits that capture your unique personality and style. Perfect for individuals, couples, and families.',
                icon: '📸'
              },
              {
                title: 'Wedding Photography',
                description: 'Comprehensive wedding coverage from preparation to reception, documenting every special moment of your big day.',
                icon: '💒'
              },
              {
                title: 'Event Photography',
                description: 'Corporate events, parties, and celebrations captured with a professional touch and attention to detail.',
                icon: '🎉'
              },
              {
                title: 'Fashion Photography',
                description: 'Creative fashion shoots for portfolios, lookbooks, and brand campaigns with artistic vision.',
                icon: '👗'
              },
              {
                title: 'Nature & Landscape',
                description: 'Stunning nature and landscape photography that captures the beauty of the world around us.',
                icon: '🌄'
              },
              {
                title: 'Commercial Photography',
                description: 'Product and commercial photography for businesses, brands, and marketing materials.',
                icon: '🏢'
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{
                  backgroundColor: theme.colors.surface,
                  padding: '2rem',
                  borderRadius: '8px',
                  border: `1px solid ${theme.colors.border}`,
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  color: theme.colors.text,
                  marginBottom: '0.75rem'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: theme.colors.textSecondary,
                  lineHeight: 1.6
                }}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
