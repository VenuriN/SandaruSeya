import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { getUploadedPhotos } from '../utils/galleryStorage'

const ArtAndYou = () => {
  const theme = useTheme()
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [uploadedPhotos, setUploadedPhotos] = useState([])

  useEffect(() => {
    getUploadedPhotos().then(setUploadedPhotos).catch(() => alert('Could not load uploaded photos.'))
  }, [])

  const allPhotos = uploadedPhotos.filter(photo => {
    const collection = photo.collection?.trim().toLowerCase() || ''
    const category = photo.category?.toLowerCase() || ''
    return ['art & you', 'arts & you'].includes(collection) || (!collection && (
      category === 'birthday' || category === 'art & you' || category === 'arts & you' ||
      category.startsWith('art & you -') || category.startsWith('arts & you -')
    ))
  })
  const getPhotoType = photo => {
    const category = photo.category?.toLowerCase() || ''
    if (category.includes('graduation')) return 'Graduation'
    return category.includes('event') ? 'Event' : 'Birthday'
  }
  const photos = selectedCategory === 'All'
    ? allPhotos
    : allPhotos.filter(photo => getPhotoType(photo) === selectedCategory)
  const getAlbumName = photo => photo.album?.trim() || `${getPhotoType(photo)} Photos`
  const albums = [...new Set(photos.map(getAlbumName))].map(name => ({
    name,
    photos: photos.filter(photo => getAlbumName(photo) === name)
  }))
  const activeAlbum = albums.find(album => album.name === selectedAlbum)

  const featuredPhoto = photos[0]
  const heroImage = featuredPhoto?.url 
  const pageStyles = {
    minHeight: '100vh',
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    paddingTop: '80px'
  }

  return (
    <main style={pageStyles}>
      <section style={{ position: 'relative', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', overflow: 'hidden', backgroundColor: theme.colors.surface }}>
        <img src={heroImage} alt="Colorful birthday celebration decorations" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: theme.isDark ? 0.52 : 0.42 }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, ${theme.colors.background} 0%, ${theme.colors.background}dd 45%, transparent 100%)` }} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'relative', zIndex: 1, width: 'min(1200px, 100%)', margin: '0 auto', padding: '100px 2rem 4rem' }}>
          <img src="/A&Ulogo.png" alt="Arts & You Photography" style={{ display: 'block', width: 'min(260px, 70vw)', maxHeight: '120px', objectFit: 'contain', objectPosition: 'left center', filter: theme.isDark ? 'brightness(0) invert(1)' : 'none', marginBottom: '1.5rem' }} />
          <div style={{ color: theme.colors.accent, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Birthday, graduation &amp; event photography</div>
          <h1 style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', lineHeight: 0.98, fontWeight: '300', margin: '0 0 1.5rem', maxWidth: '800px' }}>Arts <span style={{ color: theme.colors.accent }}>&amp;</span> You</h1>
          <p style={{ maxWidth: '560px', fontSize: '1.2rem', lineHeight: 1.8, color: theme.colors.textSecondary, margin: '0 0 2rem' }}>A little place for the laughter, people, details and happy moments that make every birthday and event yours.</p>
          <a href="#celebrations" style={{ display: 'inline-block', padding: '0.9rem 1.5rem', border: `1px solid ${theme.colors.accent}`, borderRadius: '3px', color: theme.colors.text, textDecoration: 'none', letterSpacing: '1px' }}>Explore the photographs ↓</a>
        </motion.div>
      </section>

      <section id="celebrations" style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem) 6rem', scrollMarginTop: '100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div>
            <div style={{ color: theme.colors.accent, letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Art &amp; You Gallery</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', lineHeight: 1.12, fontWeight: '300', margin: 0, maxWidth: '100%', overflowWrap: 'break-word' }}>{selectedAlbum || 'Little Moments, Big Memories'}</h2>
          </div>
          {/* <p style={{ color: theme.colors.textSecondary, margin: 0 }}>{photos.length} {photos.length === 1 ? 'photograph' : 'photographs'}</p> */}
        </div>

        <div className="gallery-category-tabs" role="group" aria-label="Filter Art and You gallery" style={{ display: selectedAlbum ? 'none' : 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {['All', 'Birthday', 'Event','Graduation'].map(category => (
            <button key={category} type="button" onClick={() => { setSelectedCategory(category); setSelectedAlbum(null) }} aria-pressed={selectedCategory === category} style={{ padding: '0.7rem 1.2rem', border: `1px solid ${theme.colors.accent}`, borderRadius: '3px', backgroundColor: selectedCategory === category ? theme.colors.accent : 'transparent', color: selectedCategory === category ? (theme.isDark ? '#000' : '#fff') : theme.colors.text, cursor: 'pointer', letterSpacing: '1px' }}>
              {category}
            </button>
          ))}
        </div>

        {selectedCategory === 'All' && photos.length > 0 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '1.5rem' }}>
              {photos.slice(0, 4).map((photo, index) => (
                <motion.button key={photo.id} type="button" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.04, 0.3) }} whileHover={{ scale: 1.03 }} onClick={() => setSelectedPhoto(photo)} aria-label={`View ${photo.title}`} style={{ padding: 0, border: `1px solid ${theme.colors.border}`, borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', backgroundColor: theme.colors.surface }}>
                  <img src={photo.url} alt={photo.title} style={{ display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }} />
                </motion.button>
              ))}
            </div>
            <Link to="/gallery?collection=arts-you&category=all" style={{ display: 'inline-block', marginTop: '1.5rem', padding: '0.9rem 1.5rem', backgroundColor: theme.colors.accent, color: theme.isDark ? '#000' : '#fff', borderRadius: '3px', textDecoration: 'none', fontWeight: '600' }}>
               View Arts &amp; You Gallery
            </Link>
          </>
        )}
        {selectedCategory === 'All' && photos.length === 0 && (
          <div style={{ padding: '5rem 2rem', textAlign: 'center', border: `1px solid ${theme.colors.border}`, borderRadius: '4px', color: theme.colors.textSecondary }}>
            <h3 style={{ color: theme.colors.text, fontWeight: '400', margin: '0 0 0.75rem' }}>The first birthday story is waiting</h3>
            <p style={{ margin: 0 }}>Upload photos in Admin and choose Arts &amp; You, Birthday, or Event. They will appear here.</p>
          </div>
        )}
        <div style={{ display: selectedCategory === 'All' ? 'none' : undefined }}>
        {(selectedAlbum ? activeAlbum?.photos.length : albums.length) ? (
          <>
          {selectedAlbum && <button type="button" onClick={() => setSelectedAlbum(null)} style={{ padding: '0.7rem 1.1rem', marginBottom: '1.25rem', border: `1px solid ${theme.colors.border}`, borderRadius: '3px', color: theme.colors.text, backgroundColor: theme.colors.surface, cursor: 'pointer' }}>← Back to albums</button>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
            {selectedAlbum
              ? activeAlbum.photos.slice(0, 4).map((photo, index) => (
                <motion.button key={photo.id} type="button" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.04, 0.3) }} whileHover={{ y: -4 }} onClick={() => setSelectedPhoto(photo)} aria-label={`View ${photo.title}`} style={{ padding: 0, border: `1px solid ${theme.colors.border}`, borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', backgroundColor: theme.colors.surface }}>
                  <img src={photo.url} alt={photo.title} style={{ display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }} />
                </motion.button>
              ))
              : albums.map(album => (
                <motion.button key={album.name} type="button" whileHover={{ y: -4 }} onClick={() => setSelectedAlbum(album.name)} style={{ padding: 0, border: `1px solid ${theme.colors.border}`, borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', backgroundColor: theme.colors.surface, color: theme.colors.text, textAlign: 'left' }}>
                  <img src={album.photos[0].url} alt={album.name} style={{ display: 'block', width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }} />
                  <div style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '600', marginBottom: '0.35rem' }}>{album.name}</div>
                    <div style={{ color: theme.colors.textSecondary, fontSize: '0.9rem' }}>{album.photos.length} {album.photos.length === 1 ? 'photo' : 'photos'}</div>
                  </div>
                </motion.button>
              ))}
          </div>
          {selectedAlbum && activeAlbum && (
            <Link to={`/gallery?collection=arts-you&category=${getPhotoType(activeAlbum.photos[0]).toLowerCase()}&album=${encodeURIComponent(selectedAlbum)}`} style={{ display: 'inline-block', marginTop: '1.5rem', padding: '0.9rem 1.5rem', backgroundColor: theme.colors.accent, color: theme.isDark ? '#000' : '#fff', borderRadius: '3px', textDecoration: 'none', fontWeight: '600' }}>
              View Gallery
            </Link>
          )}
          </>
        ) : (
          <div style={{ padding: '5rem 2rem', textAlign: 'center', border: `1px solid ${theme.colors.border}`, borderRadius: '4px', color: theme.colors.textSecondary }}>
            <div aria-hidden="true" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎂</div>
            <h3 style={{ color: theme.colors.text, fontWeight: '400', margin: '0 0 0.75rem' }}>The first birthday story is waiting</h3>
            <p style={{ margin: 0 }}>Upload photos in Admin and choose Art &amp; You, Birthday, or Event. They will appear here under their matching category.</p>
          </div>
        )}
        </div>
      </section>

      <section style={{ borderTop: `1px solid ${theme.colors.border}`, borderBottom: `1px solid ${theme.colors.border}`, padding: '3.5rem 2rem', textAlign: 'center', backgroundColor: theme.colors.surface }}>
        <p style={{ color: theme.colors.accent, letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem', margin: '0 0 1rem' }}>Art &amp; You</p>
        <p style={{ maxWidth: '680px', margin: '0 auto', color: theme.colors.textSecondary, lineHeight: 1.8 }}>Every birthday and event has its own feeling. These photographs keep the joy, colour and little in-between moments close long after the celebration ends.</p>
      </section>

      <section id="contact" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
        <p style={{ color: theme.colors.accent, letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem', margin: '0 0 1rem' }}>Let’s make a plan</p>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '300', margin: '0 0 1rem' }}>Enquire about your event</h2>
        <p style={{ color: theme.colors.textSecondary, lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 2rem' }}>Get in touch to talk about birthday or event photography and keeping your favourite moments.</p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <a href="https://wa.me/94712299634?text=Hi%21%20I%27d%20like%20to%20ask%20about%20birthday%20or%20event%20photography." target="_blank" rel="noopener noreferrer" style={{ padding: '0.9rem 1.4rem', borderRadius: '3px', backgroundColor: '#25D366', color: '#fff', textDecoration: 'none', fontWeight: '600' }}>Chat on WhatsApp</a>
          <a href="tel:+94712299634" style={{ padding: '0.9rem 1.4rem', borderRadius: '3px', border: `1px solid ${theme.colors.border}`, color: theme.colors.text, textDecoration: 'none' }}>Call 071 229 9634</a>
          <a href="mailto:pasindusandaruwan29@gmail.com" style={{ padding: '0.9rem 1.4rem', borderRadius: '3px', border: `1px solid ${theme.colors.border}`, color: theme.colors.text, textDecoration: 'none' }}>Send an email</a>
          <a href="https://www.facebook.com/profile.php?id=100092629110136" target="_blank" rel="noopener noreferrer" aria-label="Arts & You Facebook" style={{ padding: '0.9rem 1.4rem', borderRadius: '3px', border: `1px solid ${theme.colors.border}`, color: theme.colors.text, textDecoration: 'none' }}>Facebook</a>
        </div>
        <Link to="/contact" style={{ display: 'inline-block', marginTop: '1.5rem', color: theme.colors.textSecondary }}>Visit the full Contact page →</Link>
      </section>

      {selectedPhoto && (
        <div onClick={() => setSelectedPhoto(null)} role="presentation" style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backgroundColor: 'rgba(0, 0, 0, 0.94)', cursor: 'zoom-out' }}>
          <button onClick={() => setSelectedPhoto(null)} aria-label="Close photo" style={{ position: 'absolute', top: '1rem', right: '1.5rem', border: 0, background: 'transparent', color: '#fff', fontSize: '2.5rem', cursor: 'pointer' }}>×</button>
          <div onClick={event => event.stopPropagation()} style={{ maxWidth: '92vw', maxHeight: '90vh', textAlign: 'center' }}>
            <img src={selectedPhoto.url} alt={selectedPhoto.title} style={{ maxWidth: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: '4px' }} />
            <div style={{ color: '#fff', paddingTop: '0.75rem' }}>{selectedPhoto.title}{selectedPhoto.date ? ` · ${selectedPhoto.date}` : ''}</div>
          </div>
        </div>
      )}
    </main>
  )
}

export default ArtAndYou
