import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { getUploadedPhotos } from '../utils/galleryStorage'

const Gallery = () => {
  const theme = useTheme()
  const [searchParams] = useSearchParams()
  const isArtsYou = searchParams.get('collection') === 'arts-you'
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('category') || 'all')
  const [selectedAlbum, setSelectedAlbum] = useState(() => searchParams.get('album') || 'all')
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [uploadedPhotos, setUploadedPhotos] = useState([])

  const categories = isArtsYou ? ['All', 'Birthday', 'Graduation', 'Event'] : ['All', 'Wedding', 'Preshoot', 'Commercial', 'Thankyou card']

  useEffect(() => {
    getUploadedPhotos().then(setUploadedPhotos).catch(() => alert('Could not load gallery photos.'))
  }, [])

  const galleryPhotos = uploadedPhotos.filter(photo => {
    const category = photo.category?.toLowerCase() || ''
    const collection = photo.collection?.trim().toLowerCase() || ''
    if (isArtsYou) {
      return ['art & you', 'arts & you'].includes(collection) || (!collection && ['birthday', 'graduation', 'event'].includes(category))
    }
    return photo.collection === 'SandaruSeya' || (!photo.collection && category !== 'birthday' && !category.startsWith('arts & you') && !category.startsWith('arts & you'))
  })
  const allPhotos = galleryPhotos
  const getAlbumName = photo => photo.album?.trim() || (isArtsYou ? `${photo.category || 'Other'} Photos` : '')
  const categoryGalleryPhotos = selectedCategory === 'all'
    ? galleryPhotos
    : galleryPhotos.filter(photo => photo.category?.toLowerCase() === selectedCategory)
  const albums = [...new Set(categoryGalleryPhotos.map(getAlbumName).filter(Boolean))]
    .map(name => ({
      name,
      photos: categoryGalleryPhotos.filter(photo => getAlbumName(photo) === name)
    }))

  const stories = [...new Set(galleryPhotos.map(getAlbumName).filter(Boolean))].map(album => {
    const photos = galleryPhotos.filter(photo => getAlbumName(photo) === album)
    return {
      id: album,
      album,
      url: photos[0].url,
      title: album,
      category: photos[0].category
    }
  })

  const categoryPhotos = selectedCategory === 'all'
    ? allPhotos 
    : allPhotos.filter(photo => photo.category.toLowerCase() === selectedCategory.toLowerCase())
  const filteredPhotos = selectedAlbum === 'all'
    ? selectedCategory === 'all' ? categoryPhotos : categoryPhotos.filter(photo => !photo.album)
    : categoryPhotos.filter(photo => getAlbumName(photo) === selectedAlbum)

  const favoritePhotos = allPhotos.filter(photo => photo.isFavorite)

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      paddingTop: '120px',
      paddingBottom: '4rem'
    }}>
      <div className="gallery-page__inner" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
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
            {isArtsYou ? 'Arts & You Gallery' : 'Gallery'}
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: theme.colors.textSecondary
          }}>
            {/* Explore our collection of captured moments */}
            Explore a collection of timeless moments, genuine emotions, and beautiful stories captured through our lens.
          </p>
        </motion.div>

        {/* Stories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: '4rem', display: selectedAlbum === 'all' && stories.length ? undefined : 'none' }}
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
                onClick={() => {
                  setSelectedCategory(story.category.toLowerCase())
                  setSelectedAlbum(story.album)
                }}
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
          style={{ marginBottom: '4rem', display: selectedAlbum === 'all' ? undefined : 'none' }}
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))',
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
          <div className="gallery-category-tabs" style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category.toLowerCase())
                  setSelectedAlbum('all')
                }}
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
          {selectedAlbum === 'all' && selectedCategory !== 'all' && albums.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '2rem' }}>
              {albums.map((album) => (
                <motion.button
                  key={album.name}
                  type="button"
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedAlbum(album.name)}
                  style={{ padding: 0, border: `1px solid ${theme.colors.border}`, borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', backgroundColor: theme.colors.surface, color: theme.colors.text, textAlign: 'left' }}
                >
                  <img src={album.photos[0].url} alt={album.name} style={{ display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }} />
                  <div style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '1.05rem', fontWeight: '600', marginBottom: '0.35rem' }}>{album.name}</div>
                    <div style={{ color: theme.colors.textSecondary, fontSize: '0.9rem' }}>{album.photos.length} {album.photos.length === 1 ? 'photo' : 'photos'}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Full Gallery Grid */}
        {selectedAlbum !== 'all' && (
          <div style={{ marginBottom: '1.5rem' }}>
            <button type="button" onClick={() => setSelectedAlbum('all')} style={{ padding: '0.65rem 1rem', border: `1px solid ${theme.colors.border}`, borderRadius: '4px', color: theme.colors.text, backgroundColor: theme.colors.surface, cursor: 'pointer', marginBottom: '1rem' }}>
              ← Back to albums
            </button>
            <h2 style={{ margin: 0, color: theme.colors.text, fontSize: '1.8rem', fontWeight: '500' }}>{selectedAlbum}</h2>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
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
              {photo.isFavorite && (
                <div aria-label="Favorite photo" style={{ position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: theme.colors.accent, color: theme.isDark ? '#000000' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  ♥
                </div>
              )}
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
