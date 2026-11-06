import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { getUploadedPhotos } from '../utils/galleryStorage'

const ArtAndYou = () => {
  const theme = useTheme()
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const allPhotos = getUploadedPhotos().filter(photo => {
    const collection = photo.collection?.trim().toLowerCase() || ''
    const category = photo.category?.toLowerCase() || ''
    return ['art & you', 'arts & you'].includes(collection) || (!collection && (
      category === 'birthday' || category === 'art & you' || category === 'arts & you' ||
      category.startsWith('art & you -') || category.startsWith('arts & you -')
    ))
  })
  const getPhotoType = photo => {
    const category = photo.category?.toLowerCase() || ''
    return category.includes('event') ? 'Event' : 'Birthday'
  }
  const photos = selectedCategory === 'All'
    ? allPhotos
    : allPhotos.filter(photo => getPhotoType(photo) === selectedCategory)

  const featuredPhoto = photos[0]
  const heroImage = featuredPhoto?.url || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=2200&q=85'
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
          <div style={{ color: theme.colors.accent, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Birthday &amp; event photography</div>
          <h1 style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', lineHeight: 0.98, fontWeight: '300', margin: '0 0 1.5rem', maxWidth: '800px' }}>Arts <span style={{ color: theme.colors.accent }}>&amp;</span> You</h1>
          <p style={{ maxWidth: '560px', fontSize: '1.2rem', lineHeight: 1.8, color: theme.colors.textSecondary, margin: '0 0 2rem' }}>A little place for the laughter, people, details and happy moments that make every birthday and event yours.</p>
          <a href="#celebrations" style={{ display: 'inline-block', padding: '0.9rem 1.5rem', border: `1px solid ${theme.colors.accent}`, borderRadius: '3px', color: theme.colors.text, textDecoration: 'none', letterSpacing: '1px' }}>Explore the photographs ↓</a>
        </motion.div>
      </section>

      <section id="celebrations" style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 5vw, 2rem) 6rem', scrollMarginTop: '100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <div>
            <div style={{ color: theme.colors.accent, letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Art &amp; You Gallery</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', lineHeight: 1.12, fontWeight: '300', margin: 0, maxWidth: '100%', overflowWrap: 'break-word' }}>Little Moments, Big Memories</h2>
          </div>
          {/* <p style={{ color: theme.colors.textSecondary, margin: 0 }}>{photos.length} {photos.length === 1 ? 'photograph' : 'photographs'}</p> */}
        </div>

        <div role="group" aria-label="Filter Art and You gallery" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {['All', 'Birthday', 'Event'].map(category => (
            <button key={category} type="button" onClick={() => setSelectedCategory(category)} aria-pressed={selectedCategory === category} style={{ padding: '0.7rem 1.2rem', border: `1px solid ${theme.colors.accent}`, borderRadius: '3px', backgroundColor: selectedCategory === category ? theme.colors.accent : 'transparent', color: selectedCategory === category ? (theme.isDark ? '#000' : '#fff') : theme.colors.text, cursor: 'pointer', letterSpacing: '1px' }}>
              {category}
            </button>
          ))}
        </div>

        {photos.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '1.25rem' }}>
            {photos.map((photo, index) => (
              <motion.button key={photo.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.04, 0.3) }} whileHover={{ y: -4 }} onClick={() => setSelectedPhoto(photo)} aria-label={`View ${photo.title}`} style={{ padding: 0, border: `1px solid ${theme.colors.border}`, borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', backgroundColor: theme.colors.surface, textAlign: 'left', color: theme.colors.text }}>
                <div style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}><img src={photo.url} alt={photo.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }} /></div>
               
              </motion.button>
            ))}
          </div>
        ) : (
          <div style={{ padding: '5rem 2rem', textAlign: 'center', border: `1px solid ${theme.colors.border}`, borderRadius: '4px', color: theme.colors.textSecondary }}>
            <div aria-hidden="true" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎂</div>
            <h3 style={{ color: theme.colors.text, fontWeight: '400', margin: '0 0 0.75rem' }}>The first birthday story is waiting</h3>
            <p style={{ margin: 0 }}>Upload photos in Admin and choose Art &amp; You, Birthday, or Event. They will appear here under their matching category.</p>
          </div>
        )}
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
