import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminAuthGate from './components/AdminAuthGate'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
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
