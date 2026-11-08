import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminAuthGate from './components/AdminAuthGate'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import ArtAndYou from './pages/ArtAndYou'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

const PageWatermark = () => {
  const { pathname, search } = useLocation()
  const theme = useTheme()
  const isArtsYouGallery = pathname === '/gallery' && new URLSearchParams(search).get('collection') === 'arts-you'

  if (pathname === '/' || pathname === '/art-and-you') return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        display: 'grid',
        placeItems: 'center',
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: 0.045
      }}
    >
      <img
        src={isArtsYouGallery ? '/A&Ulogo.png' : '/logo.jpg'}
        alt=""
        style={{
          width: 'min(58vw, 620px)',
          maxWidth: '80vw',
          height: 'auto',
          filter: theme.isDark ? (isArtsYouGallery ? 'brightness(0) invert(1)' : 'invert(1)') : 'none'
        }}
      />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <PageWatermark />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/art-and-you" element={<ArtAndYou />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminAuthGate><Admin /></AdminAuthGate>} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}

export default App
