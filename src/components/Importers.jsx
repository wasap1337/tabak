import { useEffect, useRef } from 'react'

export default function Importers() {
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const partners = [
    { country: '🇨🇺', name: 'CUBA', desc: 'Прямые поставки сигар с фабрик Гаваны' },
    { country: '🇩🇴', name: 'DOMINICANA', desc: 'Эксклюзивные бленды от лучших табачных домов' },
    { country: '🇳🇮', name: 'NICARAGUA', desc: 'Крепкий табак премиум-сегмента' },
    { country: '🇦🇪', name: 'UAE', desc: 'Кальянный табак и аксессуары из ОАЭ' },
    { country: '🇪🇬', name: 'EGYPT', desc: 'Al Fakher и другие ближневосточные бренды' },
    { country: '🇷🇺', name: 'RUSSIA', desc: 'Российские производители табака' },
  ]

  return (
    <section id="importers" style={{ padding: '120px 24px', maxWidth: 1400, margin: '0 auto' }}>
      <div ref={ref} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
        <div className="section-tag" style={{ justifyContent: 'center' }}>Партнёры</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>РАБОТАЕМ С ВЕДУЩИМИ ИМПОРТЕРАМИ</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: 16 }}>Прямые контракты с производителями и официальными дистрибьюторами. Только оригинальная продукция.</p>
      </div>
      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {partners.map(p => (
          <div key={p.name} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 4, padding: 32, transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>{p.country}</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10, letterSpacing: '0.06em', fontFamily: "'Montserrat', sans-serif" }}>{p.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}