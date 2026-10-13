import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const Admin = () => {
  const theme = useTheme()
  const [uploadData, setUploadData] = useState({
    title: '',
    category: '',
    isFavorite: false
  })
  const [uploadedPhotos, setUploadedPhotos] = useState([])
  const [previewUrl, setPreviewUrl] = useState(null)

  const categories = ['Portrait', 'Wedding', 'Nature', 'Event', 'Fashion', 'Landscape']

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()
    
    if (!previewUrl || !uploadData.title || !uploadData.category) {
      alert('Please fill in all required fields and select an image')
      return
    }

    const newPhoto = {
      id: Date.now(),
      url: previewUrl,
      title: uploadData.title,
      category: uploadData.category,
      isFavorite: uploadData.isFavorite,
      date: new Date().toLocaleDateString()
    }

    setUploadedPhotos([...uploadedPhotos, newPhoto])
    setUploadData({ title: '', category: '', isFavorite: false })
    setPreviewUrl(null)
    
    // Reset file input
    const fileInput = document.getElementById('photo-upload')
    if (fileInput) fileInput.value = ''
  }

  const deletePhoto = (id) => {
    setUploadedPhotos(uploadedPhotos.filter(photo => photo.id !== id))
  }

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
                    Photo *
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
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                      />
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
                      accept="image/*"
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
                    Title *
                  </label>
                  <input
                    type="text"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                    required
                    placeholder="Enter photo title"
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

                {/* Category */}
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
                    Category *
                  </label>
                  <select
                    value={uploadData.category}
                    onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
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
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
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
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  Upload Photo
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
              Uploaded Photos ({uploadedPhotos.length})
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
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem'
              }}>
                {uploadedPhotos.map((photo) => (
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
                        {photo.category}
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
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Admin
