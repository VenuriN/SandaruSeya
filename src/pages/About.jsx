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
              Don't let your memories fade...<br />
              <span style={{ color: theme.colors.accent }}>We capture your memories forever...</span>
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
              maxHeight: '75vh'
            }}
          >
            <img
              src="/phtographer-cutout.png" width="800" alt="Pasindu Sandaruwan"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '75vh',
                objectFit: 'contain'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2rem',
              color: '#FFFFFF',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.9)'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>Pasindu Sandaruwan</div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Professional Photographer</div>
            </div>
          </motion.div>
        </motion.div>

        {/* My Story */}
        <motion.div
          className="about-story"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            width: '100vw',
            marginInline: 'calc(50% - 50vw)',
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${theme.colors.surface}, ${theme.colors.background})`,
            borderTop: `1px solid ${theme.colors.border}`,
            borderBottom: `1px solid ${theme.colors.border}`,
            padding: '5rem max(2rem, calc((100vw - 1100px) / 2))',
            marginBottom: '4rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="about-story__layout">
            <div className="about-story__intro">
              <span className="about-story__eyebrow" style={{ color: theme.colors.accent }}>01 / THE STORY</span>
              <h2 style={{ color: theme.colors.text }}>My <em style={{ color: theme.colors.accent }}>Story</em></h2>
              <p className="about-story__lead" style={{ color: theme.colors.textSecondary }}>
                Photography is more than what I do; it&apos;s how I see the world, tell stories, and preserve the emotions that make every moment unforgettable.
              </p>
            </div>

            <div className="about-story__copy" style={{ color: theme.colors.textSecondary }}>
              <p>
                My journey began years ago with a passion for capturing the beauty in life&apos;s fleeting moments. Since then, I&apos;ve dedicated myself to mastering the art of photography, exploring the interplay of light, emotion, and composition to create images that speak beyond words.
              </p>
              <blockquote style={{ borderLeftColor: theme.colors.accent, color: theme.colors.text }}>
                “Every story deserves to be told beautifully.”
              </blockquote>
              <p>
                As the photographer behind Sandaru Seya Photography, I believe this deeply. Whether it&apos;s the quiet intimacy of a portrait, the magic of a wedding, or the energy of a special celebration, my goal is to capture every detail with creativity, authenticity, and an artistic touch, turning moments into timeless memories you&apos;ll treasure for years to come.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
