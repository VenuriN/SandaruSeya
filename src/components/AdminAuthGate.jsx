import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { supabase } from '../lib/supabaseClient'

const AdminAuthGate = ({ children }) => {
  const theme = useTheme()
  const [session, setSession] = useState(null)
  const [isCheckingSession, setIsCheckingSession] = useState(Boolean(supabase))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) return undefined

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setIsCheckingSession(false)
    })

    supabase.auth.getSession()
      .then(({ data, error: sessionError }) => {
        if (sessionError) setError('Could not check your sign-in. Please refresh and try again.')
        setSession(data?.session ?? null)
      })
      .catch(() => setError('Could not connect to Supabase. Check your settings and try again.'))
      .finally(() => setIsCheckingSession(false))

    return () => subscription.unsubscribe()
  }, [])

  const handleSignIn = async (event) => {
    event.preventDefault()
    if (!supabase) return

    setIsSigningIn(true)
    setError('')
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) setError('Email or password is incorrect. Please try again.')
    } catch {
      setError('Could not connect to Supabase. Check your connection and try again.')
    } finally {
      setIsSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) setError('Could not sign out. Please try again.')
  }

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '4px',
    color: theme.colors.text,
    fontSize: '1rem'
  }

  if (isCheckingSession) {
    return <div role="status" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', color: theme.colors.textSecondary }}>Checking admin session…</div>
  }

  if (session) {
    return (
      <>
        <button
          type="button"
          onClick={handleSignOut}
          style={{
            position: 'absolute',
            top: '96px',
            right: '2rem',
            zIndex: 5,
            padding: '0.6rem 1rem',
            color: theme.colors.text,
            backgroundColor: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sign out
        </button>
        {children}
      </>
    )
  }

  return (
    <main style={{ minHeight: '100vh', padding: '140px 1.5rem 4rem', backgroundColor: theme.colors.background }}>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: 'min(100%, 440px)',
          margin: '0 auto',
          padding: '2rem',
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: '8px'
        }}
      >
        <h1 style={{ marginBottom: '0.5rem', fontSize: '1.8rem', fontWeight: 500 }}>Admin sign in</h1>
        <p style={{ marginBottom: '1.5rem', color: theme.colors.textSecondary }}>
          Sign in with the admin account created in Supabase.
        </p>

        {!supabase ? (
          <p role="alert" style={{ color: '#c0392b', lineHeight: 1.5 }}>
            Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local, then restart the app.
          </p>
        ) : (
          <form onSubmit={handleSignIn}>
            <label htmlFor="admin-email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              style={{ ...inputStyle, marginBottom: '1rem' }}
            />

            <label htmlFor="admin-password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              style={{ ...inputStyle, marginBottom: '1rem' }}
            />

            {error && <p role="alert" style={{ color: '#c0392b', marginBottom: '1rem' }}>{error}</p>}

            <button
              type="submit"
              disabled={isSigningIn}
              style={{
                width: '100%',
                padding: '0.9rem 1rem',
                backgroundColor: theme.colors.accent,
                color: theme.isDark ? '#000' : '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: isSigningIn ? 'wait' : 'pointer',
                opacity: isSigningIn ? 0.7 : 1
              }}
            >
              {isSigningIn ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        )}
      </motion.section>
    </main>
  )
}

export default AdminAuthGate
