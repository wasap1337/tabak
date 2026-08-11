import { useEffect, useRef } from 'react'

export default function Hero() {
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', paddingTop: 76,
      background: 'radial-gradient(ellipse at 70% 20%, rgba(255,42,42,0.08) 0%, transparent 50%), radial-gradient(ellipse at 30% 80%, rgba(255,149,0,0.05) 0%, transparent 50%)'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
      }} />

      <div ref={ref} className="reveal" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 1000, padding: '0 24px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '10px 20px', background: 'rgba(255,42,42,0.08)',
          border: '1px solid rgba(255,42,42,0.2)', borderRadius: 3,
          fontSize: 12, color: 'var(--accent)', marginBottom: 36,
          fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em',
          fontFamily: "'Montserrat', sans-serif"
        }}>
          <span style={{ width: 8, height: 8, background: 'var(--accent)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
          Опт от 1 коробки — по всей России
        </div>

        <h1 style={{ fontSize: 'clamp(40px, 7vw, 84px)', lineHeight: 1.05, marginBottom: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>
          ТАБАЧОК<span style={{ color: 'var(--accent)' }}>-</span>ОПТОВИЧОК
        </h1>
        <h2 style={{ fontSize: 'clamp(18px, 3vw, 28px)', color: 'var(--text-secondary)', marginBottom: 40, fontWeight: 400, fontFamily: 'Inter, sans-serif', textTransform: 'none', letterSpacing: '0.02em' }}>
          Оптовые поставки табака, сигарет и кальянной продукции.<br className="hide-mobile"/>
          Работаем с 2018 года. Доставка в любой регион РФ.
        </h2>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          <a href="#products" className="btn btn-red" style={{ padding: '18px 40px', fontSize: 16 }}>СМОТРЕТЬ КАТАЛОГ</a>
          <a href="#contact" className="btn btn-outline" style={{ padding: '18px 40px', fontSize: 16 }}>ОСТАВИТЬ ЗАЯВКУ</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, maxWidth: 800, margin: '0 auto' }} className="hero-stats">
          {[
            { num: '500+', label: 'Товаров' },
            { num: '50+', label: 'Брендов' },
            { num: '2000+', label: 'Клиентов' },
            { num: '6 лет', label: 'На рынке' }
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '20px 10px', border: '1px solid var(--border)', borderRadius: 4, background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: 'var(--accent)', marginBottom: 6 }}>{s.num}</div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .hero-stats { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  )
}
