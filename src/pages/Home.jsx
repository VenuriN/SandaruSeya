import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const theme = useTheme()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Sample photos - replace with actual photos
  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920',
      title: 'Portrait Excellence',
      category: 'Portrait'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920',
      title: 'Wedding Moments',
      category: 'Wedding'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1920',
      title: 'Natural Beauty',
      category: 'Nature'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920',
      title: 'Celebration',
      category: 'Event'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920',
      title: 'Fashion Art',
      category: 'Fashion'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920',
      title: 'Landscape Stories',
      category: 'Landscape'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length)
    }, 20000)
    return () => clearInterval(interval)
  }, [photos.length])

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      paddingTop: '80px'
    }}>
      {/* Hero Section with Full Screen Slideshow */}
      <div className="home-hero" style={{
        position: 'relative',
        width: '100%',
        height: 'calc(100vh - 80px)',
        overflow: 'hidden'
      }}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: [1, 1.1, 1] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1 },
              scale: {
                duration: 20,
                times: [0, 0.5, 1],
                ease: ['easeInOut', 'easeInOut']
              }
            }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${photos[currentIndex].url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </AnimatePresence>

        {/* Photo Info Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '10%',
            color: '#FFFFFF',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.85)',
            zIndex: 10
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              fontSize: '0.9rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              color: theme.colors.accent
            }}
          >
            {photos[currentIndex].category}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              fontSize: '4rem',
              fontWeight: '300',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}
          >
            {photos[currentIndex].title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Link
              to="/gallery"
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                backgroundColor: theme.colors.accent,
                color: theme.isDark ? '#000000' : '#FFFFFF',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              View Gallery
            </Link>
          </motion.div>
        </motion.div>

        {/* Navigation Arrows */}
        <button
          className="home-slide-arrow home-slide-arrow--previous"
          type="button"
          aria-label="Previous photo"
          onClick={prevPhoto}
          style={{
            position: 'absolute',
            left: '2rem',
            bottom: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            border: 'none',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = theme.colors.accent}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
        >
          ←
        </button>

        <button
          className="home-slide-arrow home-slide-arrow--next"
          type="button"
          aria-label="Next photo"
          onClick={nextPhoto}
          style={{
            position: 'absolute',
            right: '2rem',
            bottom: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            border: 'none',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = theme.colors.accent}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
        >
          →
        </button>

        {/* Dots Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.75rem',
          zIndex: 10
        }}>
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: index === currentIndex ? '30px' : '10px',
                height: '10px',
                borderRadius: '5px',
                backgroundColor: index === currentIndex ? theme.colors.accent : 'rgba(255, 255, 255, 0.5)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
