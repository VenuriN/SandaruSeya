import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { getUploadedPhotos } from '../utils/galleryStorage'

const Gallery = () => {
  const theme = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const categories = ['All', 'Portrait', 'Wedding', 'Nature', 'Event', 'Fashion', 'Landscape']

  // Sample gallery photos
  const samplePhotos = [
    { id: 1, url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800', title: 'Portrait Excellence', category: 'Portrait', isFavorite: true },
    { id: 2, url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', title: 'Wedding Moments', category: 'Wedding', isFavorite: true },
    { id: 3, url: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800', title: 'Natural Beauty', category: 'Nature', isFavorite: false },
    { id: 4, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', title: 'Celebration', category: 'Event', isFavorite: true },
    { id: 5, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', title: 'Fashion Art', category: 'Fashion', isFavorite: false },
    { id: 6, url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800', title: 'Landscape Stories', category: 'Landscape', isFavorite: true },
    { id: 7, url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800', title: 'Elegant Pose', category: 'Portrait', isFavorite: false },
    { id: 8, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', title: 'Bride & Groom', category: 'Wedding', isFavorite: true },
    { id: 9, url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800', title: 'Waterfall', category: 'Nature', isFavorite: false },
    { id: 10, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', title: 'Party Time', category: 'Event', isFavorite: false },
    { id: 11, url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800', title: 'Runway', category: 'Fashion', isFavorite: true },
    { id: 12, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', title: 'Mountain View', category: 'Landscape', isFavorite: false }
  ]

  const allPhotos = [...getUploadedPhotos(), ...samplePhotos]

  const stories = [
    { id: 1, url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', title: 'Wedding Story', date: '2024' },
    { id: 2, url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400', title: 'Portrait Session', date: '2024' },
    { id: 3, url: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=400', title: 'Nature Journey', date: '2023' },
    { id: 4, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', title: 'Event Highlights', date: '2024' }
  ]

  const filteredPhotos = selectedCategory === 'all' 
    ? allPhotos 
    : allPhotos.filter(photo => photo.category.toLowerCase() === selectedCategory.toLowerCase())

  const favoritePhotos = allPhotos.filter(photo => photo.isFavorite)

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      paddingTop: '120px',
      paddingBottom: '4rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '3rem' }}
        >
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '300',
            color: theme.colors.text,
            marginBottom: '0.5rem'
          }}>
            Gallery
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: theme.colors.textSecondary
          }}>
            Explore my collection of captured moments
          </p>
        </motion.div>

        {/* Stories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '500',
            color: theme.colors.text,
            marginBottom: '1.5rem'
          }}>
            Selected Stories
          </h2>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            paddingBottom: '1rem'
          }}>
            {stories.map((story) => (
              <motion.div
                key={story.id}
                whileHover={{ scale: 1.05 }}
                style={{
                  flexShrink: 0,
                  width: '200px',
                  height: '280px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <img
                  src={story.url}
                  alt={story.title}
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
                  padding: '1rem',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  color: '#FFFFFF'
                }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{story.title}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{story.date}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Favourites Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: '4rem' }}
        >
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '500',
            color: theme.colors.text,
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ color: theme.colors.accent }}>♥</span> A Few Favourites
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {favoritePhotos.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedPhoto(photo)}
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  aspectRatio: '3/4'
                }}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: theme.colors.accent,
                  color: theme.isDark ? '#000000' : '#FFFFFF',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}>
                  ♥
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: '2rem' }}
        >
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: selectedCategory === category.toLowerCase() 
                    ? theme.colors.accent 
                    : theme.colors.surface,
                  color: selectedCategory === category.toLowerCase()
                    ? theme.isDark ? '#000000' : '#FFFFFF'
                    : theme.colors.text,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Full Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedPhoto(photo)}
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
                aspectRatio: '4/3'
              }}
            >
              <img
                src={photo.url}
                alt={photo.title}
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
                padding: '1.5rem',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                color: '#FFFFFF',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
              >
                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{photo.title}</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{photo.category}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedPhoto.url}
            alt={selectedPhoto.title}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
          <button
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '2px solid #FFFFFF',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '1.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            ×
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default Gallery
