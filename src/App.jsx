import { Routes, Route } from 'react-router-dom'
import AgeModal from './components/AgeModal.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'

import Brands from './components/Brands.jsx'
import Products from './components/Products.jsx'
import HowToOrder from './components/HowToOrder.jsx'
import Reviews from './components/Reviews.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'
import Admin from './pages/Admin.jsx'

function Home() {
  return (
    <>
      <AgeModal />
      <Navbar />
      <Hero />
      <Features />
      <Brands />
      <Products />
      <HowToOrder />
      <Reviews />
      <ContactForm />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App