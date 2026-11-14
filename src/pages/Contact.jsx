import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useTheme } from '../contexts/ThemeContext'

const Contact = () => {
  const theme = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } = import.meta.env
    if (!VITE_EMAILJS_SERVICE_ID || !VITE_EMAILJS_TEMPLATE_ID || !VITE_EMAILJS_PUBLIC_KEY) {
      setSubmitError('Booking email is not configured yet. Please contact us by WhatsApp or email.')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')
    try {
      await emailjs.sendForm(
        VITE_EMAILJS_SERVICE_ID,
        VITE_EMAILJS_TEMPLATE_ID,
        e.currentTarget,
        { publicKey: VITE_EMAILJS_PUBLIC_KEY }
      )
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', eventType: '', date: '', message: '' })
    } catch {
      setSubmitError('Your booking request could not be sent. Please try again or contact us by WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const whatsappNumber = '94712299634'
  const whatsappMessage = encodeURIComponent('Hi! I would like to inquire about photography services.')
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.background,
      paddingTop: '100px',
      paddingBottom: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 1rem' : '0 2rem' }}>
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '300',
            color: theme.colors.text,
            marginBottom: '0.25rem'
          }}>
            Get in Touch
          </h1>
          <p style={{
            fontSize: '1rem',
            color: theme.colors.textSecondary
          }}>
            Let's create something beautiful together
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 1000 ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: isMobile ? '2rem' : '3rem',
          alignItems: 'start'
        }}>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '500',
              color: theme.colors.text,
              marginBottom: '1.5rem'
            }}>
              Contact Information
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
               <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: theme.isDark ? '#050505' : '#FFFFFF',
                  border: theme.isDark ? '1px solid #555555' : '1px solid #E0E0E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <img src="/contact icon/call.png" alt="Phone" width="42" height="42" style={{ filter: theme.isDark ? 'brightness(0) invert(1)' : 'brightness(0)' }} />
                </div>
                <div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: theme.colors.textSecondary,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '0.25rem'
                  }}>
                    Phone
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    color: theme.colors.text,
                    fontWeight: '500'
                  }}>
                    <a href="tel:+94712299634" style={{ color: 'inherit', textDecoration: 'none' }}>071 229 9634</a>
                  </div>
                </div>
              </div>
              

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: theme.isDark ? '#050505' : '#FFFFFF',
                  border: theme.isDark ? '1px solid #555555' : '1px solid #E0E0E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <img src="/contact icon/email.png" alt="Email" width="42" height="42" style={{ filter: theme.isDark ? 'brightness(0) invert(1)' : 'brightness(0)' }} />
                </div>
                <div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: theme.colors.textSecondary,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '0.25rem'
                  }}>
                    Email
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    color: theme.colors.text,
                    fontWeight: '500'
                  }}>
                    <a href="mailto:pasindusandaruwan29@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>pasindusandaruwan29@gmail.com</a>
                  </div>
                </div>
              </div>

             <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: theme.isDark ? '#050505' : '#FFFFFF',
                  border: theme.isDark ? '1px solid #555555' : '1px solid #E0E0E0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <img src="/contact icon/gps.png" alt="Location" width="42" height="42" style={{ filter: theme.isDark ? 'brightness(0) invert(1)' : 'brightness(0)' }} />
                </div>
                <div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: theme.colors.textSecondary,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '0.25rem'
                  }}>
                    Location
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    color: theme.colors.text,
                    fontWeight: '500'
                  }}>
                    169/C, Oruwalpitiya Road, Athurugiriya, Colombo, Sri Lanka, 10150
                  </div>
                </div>
              </div>
            </div>

            <div style={{ width: '100%', margin: '0 0 2rem', overflow: 'hidden', borderRadius: '8px', border: `1px solid ${theme.colors.border}` }}>
              <iframe
                title="Map showing 169/C, Oruwalpitiya Road, Athurugiriya"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3961.108604744014!2d79.99794399999999!3d6.8775900000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwNTInMzkuMyJOIDc5wrA1OSc1Mi42IkU!5e0!3m2!1sen!2slk!4v1793976811928!5m2!1sen!2slk"
                width="100%"
                height="450"
                style={{ display: 'block', width: '100%', height: 'clamp(320px, 55vw, 450px)', border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                href="https://maps.app.goo.gl/XBjeuT8KCqRQgWFu9"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', padding: '0.85rem 1rem', backgroundColor: theme.colors.surface, color: theme.colors.text, textDecoration: 'none', fontWeight: '500' }}
              >
                Open in Google Maps →
              </a>
            </div>

          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: '500',
              color: theme.colors.text,
              marginBottom: '1rem'
            }}>
              Book a Session
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  backgroundColor: '#4CAF50',
                  color: '#FFFFFF',
                  padding: '2rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '1.2rem',
                  fontWeight: '600'
                }}
              >
                Thank you! Your booking request has been submitted. I'll get back to you soon.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                backgroundColor: theme.colors.surface,
                padding: '1rem',
                borderRadius: '8px',
                border: `1px solid ${theme.colors.border}`
              }}>
                {submitError && (
                  <p role="alert" style={{ color: '#c0392b', marginBottom: '1rem' }}>
                    {submitError}
                  </p>
                )}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                <div style={{ marginBottom: 0 }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: theme.colors.text,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '0.75rem',
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

                <div style={{ marginBottom: 0 }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: theme.colors.text,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '0.75rem',
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

                <div style={{ marginBottom: 0 }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: theme.colors.text,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '0.75rem',
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

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '0.75rem 1rem'
                }}>
                <div style={{ marginBottom: 0 }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: theme.colors.text,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '0.75rem',
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
                    <option value="">Select event type</option>
                    <option value="portrait">Portrait Session</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="event">Event Photography</option>
                    <option value="fashion">Fashion Shoot</option>
                    <option value="commercial">Commercial Photography</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div style={{ marginBottom: 0 }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: theme.colors.text,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '0.75rem',
                      backgroundColor: theme.colors.background,
                      colorScheme: theme.isDark ? 'dark' : 'light',
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
                </div>

                <div style={{ marginBottom: 0 }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: theme.colors.text,
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={2}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '0.75rem',
                      backgroundColor: theme.colors.background,
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: '4px',
                      color: theme.colors.text,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = theme.colors.accent}
                    onBlur={(e) => e.target.style.borderColor = theme.colors.border}
                  />
                </div>

                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, boxShadow: '0 12px 28px rgba(201, 169, 98, 0.32)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.65rem',
                    padding: '1.1rem 2rem',
                    background: 'linear-gradient(135deg, #D9BC78, #C29B4D)',
                    color: '#17140D',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '1.05rem',
                    fontWeight: '700',
                    cursor: isSubmitting ? 'wait' : 'pointer',
                    opacity: isSubmitting ? 0.75 : 1,
                    transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                    letterSpacing: '0.01em',
                    boxShadow: '0 5px 16px rgba(201, 169, 98, 0.2)'
                  }}
                >
                  {isSubmitting ? 'Sending Request…' : "Let's Plan Your Session"}
                  {!isSubmitting && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  )}
                </motion.button>
              </form>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.25rem' }}>
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, backgroundColor: '#25D366', color: '#FFFFFF', borderColor: '#25D366' }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.5rem', backgroundColor: theme.colors.surface, color: theme.colors.text, textDecoration: 'none', fontSize: '1rem', fontWeight: '600', borderRadius: '8px', border: '1px solid rgba(37, 211, 102, 0.55)', cursor: 'pointer' }}
              >
                <img src="/contact icon/whatsapp.png" alt="" width="24" height="24" aria-hidden="true" />
                Chat on WhatsApp
              </motion.a>

              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '500', color: theme.colors.text, margin: '0 0 0.75rem' }}>Follow Us</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="https://www.instagram.com/sandaru_seya?xtok=a2FveDk1NmhncnRm" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Sandaru Seya Instagram" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'grid', placeItems: 'center', color: theme.colors.text, backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
                  </a>
                  <a href="https://web.facebook.com/pasindu.sandaruwan.39?__tn__=-UC*F" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Sandaru Seya Facebook" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'grid', placeItems: 'center', color: theme.colors.text, backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" /></svg>
                  </a>
                  <a href="https://www.tiktok.com/@sandaru_seya?_r=1&_t=ZS-9AWevw1NJkv" target="_blank" rel="noopener noreferrer" aria-label="TikTok" title="Sandaru Seya TikTok" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'grid', placeItems: 'center', color: theme.colors.text, backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.6 7.1a6 6 0 0 1-3.7-1.3v8.1a5.8 5.8 0 1 1-5-5.7v3.2a2.7 2.7 0 1 0 1.9 2.5V2.5h3.1c.2 2 1.6 3.6 3.7 3.9v.7Z" /></svg>
                  </a>
                   {/* <a href="https://web.facebook.com/pasindu.sandaruwan.39?__tn__=-UC*F" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Arts & You Facebook" style={{ width: '48px', height: '48px', borderRadius: '50%', display: 'grid', placeItems: 'center', color: theme.colors.text, backgroundColor: theme.colors.surface, border: `1px solid ${theme.colors.border}` }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.3v3.2h2.8V21h3.4Z" /></svg>
                  </a> */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact
