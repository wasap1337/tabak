import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#features', label: 'Почему мы' },
    { href: '#brands', label: 'Бренды' },
    { href: '#products', label: 'Каталог' },
    { href: '#order', label: 'Как заказать' },
    { href: '#reviews', label: 'Отзывы' },
    { href: '#contact', label: 'Контакты' },
  ]

  const scrollTo = (href) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(5,5,5,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5)' : 'none'
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto', padding: '0 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 76
        }}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, background: 'var(--accent)', borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, color: '#000', fontSize: 22,
              fontFamily: "'Montserrat', sans-serif", boxShadow: '0 0 20px var(--accent-glow)'
            }}>ТО</div>
            <div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1.1 }}>
                ТАБАЧОК<span style={{ color: 'var(--accent)' }}>-</span>ОПТОВИЧОК
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase' }}>Оптовые поставки табака</div>
            </div>
          </a>

          <ul style={{ display: 'flex', gap: 28, listStyle: 'none', alignItems: 'center' }} className="desktop-nav">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href) }}
                  style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'color 0.2s', textDecoration: 'none', fontFamily: "'Montserrat', sans-serif" }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >{l.label}</a>
              </li>
            ))}
            <li><Link to="/admin" style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Montserrat', sans-serif" }}>Админ</Link></li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a href="tel:+73831234567" style={{ color: 'var(--accent)', fontWeight: 800, fontSize: 15, textDecoration: 'none', fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.04em' }} className="desktop-nav">
              +7 (383) 123-45-67
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{
              display: 'none', background: 'none', border: 'none', color: 'var(--text)',
              cursor: 'pointer', padding: 8
            }} className="mobile-menu-btn">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {mobileOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                ) : (
                  <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 76, left: 0, right: 0,
          background: 'var(--bg-elevated)', borderBottom: '2px solid var(--accent)',
          padding: 28, zIndex: 999, animation: 'slideUp 0.3s ease'
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); setMobileOpen(false) }}
              style={{ display: 'block', padding: '14px 0', color: 'var(--text-secondary)', fontSize: 16, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--border)', fontFamily: "'Montserrat', sans-serif" }}>
              {l.label}
            </a>
          ))}
          <Link to="/admin" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '14px 0', color: 'var(--accent)', fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Montserrat', sans-serif" }}>
            Админ-панель
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}
