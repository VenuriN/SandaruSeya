import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { deletePhoto as deleteStoredPhoto, getUploadedPhotos, saveUploadedPhotos, uploadPhoto } from '../utils/galleryStorage'

const Admin = () => {
  const theme = useTheme()
  const [uploadData, setUploadData] = useState({
    title: '',
    collection: '',
    category: '',
    album: '',
    isFavorite: false
  })
  const [uploadedPhotos, setUploadedPhotos] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [selectedAdminAlbum, setSelectedAdminAlbum] = useState(null)
  const [uploadProgress, setUploadProgress] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    getUploadedPhotos().then(setUploadedPhotos).catch(() => alert('Could not load saved gallery photos.'))
  }, [])

  const collectionCategories = {
    SandaruSeya: ['Wedding', 'Preshoot', 'Commercial'],
    'Arts & You': ['Birthday', 'Event','Graduation']
  }
  const categories = collectionCategories[uploadData.collection] || []

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(files)
    if (files.length) {
      Promise.all(files.map(file => new Promise(resolve => {
      const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(file)
      }))).then(setPreviewUrls)
    } else {
      setPreviewUrls([])
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    
    if (!selectedFiles.length || !uploadData.collection || !uploadData.category) {
      alert('Please fill in all required fields and select an image')
      return
    }

    setIsUploading(true)
    try {
      const newPhotos = []
      for (const [index, file] of selectedFiles.entries()) {
        setUploadProgress(`Compressing and uploading photo ${index + 1} of ${selectedFiles.length}…`)
        const fileTitle = file.name.replace(/\.[^.]+$/, '')
        newPhotos.push(await uploadPhoto(file, {
          title: selectedFiles.length === 1 && uploadData.title.trim() ? uploadData.title.trim() : fileTitle,
          collection: uploadData.collection,
          category: uploadData.category,
          album: uploadData.album.trim(),
          isFavorite: uploadData.isFavorite,
          date: new Date().toLocaleDateString()
        }))
      }
      const updatedPhotos = [...newPhotos, ...uploadedPhotos]
      setUploadedPhotos(updatedPhotos)
      setSelectedAdminAlbum(uploadData.album.trim() || 'Unassigned photos')
    } catch (error) {
      alert(`Could not save this photo. ${error.message || 'Check your Supabase setup and try again.'}`)
      setUploadProgress('')
      setIsUploading(false)
      return
    }
    setUploadData({ title: '', collection: '', category: '', album: '', isFavorite: false })
    setPreviewUrls([])
    setSelectedFiles([])
    setUploadProgress('')
    setIsUploading(false)
    
    // Reset file input
    const fileInput = document.getElementById('photo-upload')
    if (fileInput) fileInput.value = ''
  }

  const deletePhoto = async (id) => {
    const updatedPhotos = uploadedPhotos.filter(photo => photo.id !== id)
    await deleteStoredPhoto(id)
    setUploadedPhotos(updatedPhotos)
    if (selectedAdminAlbum && !updatedPhotos.some(photo => (photo.album || 'Unassigned photos') === selectedAdminAlbum)) {
      setSelectedAdminAlbum(null)
    }
  }

  const toggleFavorite = async (id) => {
    const updatedPhotos = uploadedPhotos.map(photo => photo.id === id ? { ...photo, isFavorite: !photo.isFavorite } : photo)
    await saveUploadedPhotos(updatedPhotos)
    setUploadedPhotos(updatedPhotos)
  }

  const adminAlbums = [...new Set(uploadedPhotos.map(photo => photo.album?.trim() || 'Unassigned photos'))]
    .map(name => ({ name, photos: uploadedPhotos.filter(photo => (photo.album?.trim() || 'Unassigned photos') === name) }))

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
            Admin Panel
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: theme.colors.textSecondary
          }}>
            Manage your photo gallery
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '3rem'
        }}>
          {/* Upload Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div style={{
              backgroundColor: theme.colors.surface,
              padding: '2rem',
              borderRadius: '8px',
              border: `1px solid ${theme.colors.border}`,
              position: 'sticky',
              top: '100px'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '500',
                color: theme.colors.text,
                marginBottom: '1.5rem'
              }}>
                Upload Photo
              </h2>

              <form onSubmit={handleUpload}>
                {/* File Upload */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: theme.colors.text,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Photos *
                  </label>
                  <div
                    style={{
                      border: `2px dashed ${theme.colors.border}`,
                      borderRadius: '8px',
                      padding: '2rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.colors.accent}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.colors.border}
                  >
                    {previewUrls.length ? (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '0.5rem', maxHeight: '220px', overflowY: 'auto' }}>
                        {previewUrls.map((url, index) => (
                          <div key={`${selectedFiles[index]?.name}-${index}`}>
                            <img src={url} alt={selectedFiles[index]?.name || 'Photo preview'} style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '4px' }} />
                            <small style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: theme.colors.textSecondary }}>{selectedFiles[index]?.name}</small>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
                        <div style={{ color: theme.colors.textSecondary }}>
                          Click to upload or drag and drop
                        </div>
                      </div>
                    )}
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif,image/bmp,image/avif,image/heic,image/heif"
                      multiple
                      onChange={handleFileChange}
                      required
                      style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0,
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                </div>

                {/* Title */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: theme.colors.text,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Title (single photo only)
                  </label>
                  <input
                    type="text"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                    placeholder="Leave blank to use the file name"
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      backgroundColor: theme.colors.background,
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: '4px',
                      color: theme.colors.text,
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.colors.accent}
                    onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                  />
                </div>

                {/* Collection */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: theme.colors.text,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Collection *
                  </label>
                  <select
                    value={uploadData.collection}
                    onChange={(e) => setUploadData({ ...uploadData, collection: e.target.value, category: '' })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.875rem',
                      backgroundColor: theme.colors.background,
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: '4px',
                      color: theme.colors.text,
                      fontSize: '1rem',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.colors.accent}
                    onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                  >
                    <option value="">Select collection</option>
                    {Object.keys(collectionCategories).map((collection) => (
                      <option key={collection} value={collection}>{collection}</option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: theme.colors.text, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Category *
                  </label>
                  <select
                    value={uploadData.category}
                    onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                    required
                    disabled={!uploadData.collection}
                    style={{ width: '100%', padding: '0.875rem', backgroundColor: theme.colors.background, border: `1px solid ${theme.colors.border}`, borderRadius: '4px', color: theme.colors.text, fontSize: '1rem', transition: 'border-color 0.3s ease', opacity: uploadData.collection ? 1 : 0.6 }}
                    onFocus={(e) => e.target.style.borderColor = theme.colors.accent}
                    onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                  >
                    <option value="">{uploadData.collection ? 'Select category' : 'Select a collection first'}</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="photo-album" style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: theme.colors.text, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Album
                  </label>
                  <input
                    id="photo-album"
                    list="existing-albums"
                    value={uploadData.album}
                    onChange={(e) => setUploadData({ ...uploadData, album: e.target.value })}
                    placeholder="Create or choose an album"
                    style={{ width: '100%', padding: '0.875rem', backgroundColor: theme.colors.background, border: `1px solid ${theme.colors.border}`, borderRadius: '4px', color: theme.colors.text, fontSize: '1rem' }}
                  />
                  <small style={{ display: 'block', marginTop: '0.5rem', color: theme.colors.textSecondary }}>
                    Enter a new album name or choose an existing one. Upload each photo into the same album.
                  </small>
                  <datalist id="existing-albums">
                    {[...new Set(uploadedPhotos.map(photo => photo.album).filter(Boolean))].map(album => <option key={album} value={album} />)}
                  </datalist>
                </div>

                {/* Favorite Toggle */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={uploadData.isFavorite}
                      onChange={(e) => setUploadData({ ...uploadData, isFavorite: e.target.checked })}
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: theme.colors.accent
                      }}
                    />
                    <span style={{
                      fontSize: '1rem',
                      color: theme.colors.text,
                      fontWeight: '500'
                    }}>
                      Mark as Favorite
                    </span>
                  </label>
                </div>

                <motion.button
                  type="submit"
                  disabled={isUploading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    padding: '1rem 2rem',
                    backgroundColor: theme.colors.accent,
                    color: theme.isDark ? '#000000' : '#FFFFFF',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: isUploading ? 'wait' : 'pointer',
                    opacity: isUploading ? 0.7 : 1,
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {isUploading ? uploadProgress : `Upload ${selectedFiles.length > 1 ? `${selectedFiles.length} Photos` : 'Photo'}`}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Uploaded Photos Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              color: theme.colors.text,
              marginBottom: '1.5rem'
            }}>
              {selectedAdminAlbum ? `${selectedAdminAlbum} (${uploadedPhotos.filter(photo => (photo.album?.trim() || 'Unassigned photos') === selectedAdminAlbum).length})` : `Albums (${adminAlbums.length})`}
            </h2>

            {uploadedPhotos.length === 0 ? (
              <div style={{
                backgroundColor: theme.colors.surface,
                padding: '3rem',
                borderRadius: '8px',
                border: `1px solid ${theme.colors.border}`,
                textAlign: 'center',
                color: theme.colors.textSecondary
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📸</div>
                <div style={{ fontSize: '1.1rem' }}>
                  No photos uploaded yet. Start by uploading your first photo!
                </div>
              </div>
            ) : selectedAdminAlbum === null ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                {adminAlbums.map(album => (
                  <motion.button
                    key={album.name}
                    type="button"
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedAdminAlbum(album.name)}
                    style={{ padding: 0, border: `1px solid ${theme.colors.border}`, borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', backgroundColor: theme.colors.surface, textAlign: 'left', color: theme.colors.text }}
                  >
                    <img src={album.photos[0].url} alt={album.name} style={{ display: 'block', width: '100%', height: '180px', objectFit: 'cover' }} />
                    <div style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '600', marginBottom: '0.35rem' }}>{album.name}</div>
                      <div style={{ color: theme.colors.textSecondary, fontSize: '0.9rem' }}>{album.photos.length} {album.photos.length === 1 ? 'photo' : 'photos'}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <>
                <button type="button" onClick={() => setSelectedAdminAlbum(null)} style={{ marginBottom: '1rem', padding: '0.65rem 1rem', backgroundColor: theme.colors.surface, color: theme.colors.text, border: `1px solid ${theme.colors.border}`, borderRadius: '4px', cursor: 'pointer' }}>
                  ← Back to albums
                </button>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem'
              }}>
                {uploadedPhotos.filter(photo => (photo.album?.trim() || 'Unassigned photos') === selectedAdminAlbum).map((photo) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      backgroundColor: theme.colors.surface,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: `1px solid ${theme.colors.border}`,
                      position: 'relative'
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      padding: '1rem'
                    }}>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: theme.colors.text,
                        marginBottom: '0.25rem'
                      }}>
                        {photo.title}
                      </div>
                      <div style={{
                        fontSize: '0.85rem',
                        color: theme.colors.textSecondary,
                        marginBottom: '0.5rem'
                      }}>
                        {photo.collection ? `${photo.collection} · ` : ''}{photo.category}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: theme.colors.textSecondary
                      }}>
                        {photo.date}
                      </div>
                      {photo.isFavorite && (
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          backgroundColor: theme.colors.accent,
                          color: theme.isDark ? '#000000' : '#FFFFFF',
                          width: '25px',
                          height: '25px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem'
                        }}>
                          ♥
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      aria-label={photo.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      title={photo.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      onClick={() => toggleFavorite(photo.id)}
                      style={{ position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px', border: 'none', borderRadius: '50%', cursor: 'pointer', backgroundColor: photo.isFavorite ? theme.colors.accent : 'rgba(0, 0, 0, 0.55)', color: '#FFFFFF', fontSize: '1.2rem' }}
                    >
                      {photo.isFavorite ? '♥' : '♡'}
                    </button>
                    <button
                      onClick={() => deletePhoto(photo.id)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#e74c3c',
                        color: '#FFFFFF',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#c0392b'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#e74c3c'}
                    >
                      Delete
                    </button>
                  </motion.div>
                ))}
              </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Admin
