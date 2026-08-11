import { useEffect, useRef } from 'react'

export default function Features() {
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const items = [
    { icon: '💰', title: 'ОПТОВЫЕ ЦЕНЫ', desc: 'Минимальные наценки. Чем больше объём — тем ниже цена за единицу.' },
    { icon: '🚚', title: 'ДОСТАВКА ПО РФ', desc: 'Отправляем транспортными компаниями и почтой в любой город России.' },
    { icon: '✅', title: 'ТОЛЬКО ОРИГИНАЛ', desc: 'Вся продукция сертифицирована. Работаем напрямую с производителями.' },
    { icon: '📞', title: 'ПЕРСОНАЛЬНЫЙ МЕНЕДЖЕР', desc: 'Каждому клиенту — свой менеджер. Ответим за 5 минут.' },
    { icon: '🔄', title: 'ПОСТОЯННОЕ ПОПОЛНЕНИЕ', desc: 'Склад пополняется еженедельно. Хиты всегда в наличии.' },
    { icon: '🛡️', title: 'ГАРАНТИЯ КАЧЕСТВА', desc: 'Проверяем каждую партию. При браке — моментальная замена.' },
  ]

  return (
    <section id="features" style={{ padding: '120px 24px', maxWidth: 1400, margin: '0 auto' }}>
      <div ref={ref} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
        <div className="section-tag" style={{ justifyContent: 'center' }}>Преимущества</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>ПОЧЕМУ ВЫБИРАЮТ НАС</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: 16 }}>
          Работаем честно, быстро и по делу. Без лишних слов — только факты.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="features-grid">
        {items.map((f, i) => (
          <div key={f.title} className="reveal" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 4,
            padding: 36, transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden'
          }} onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,42,42,0.1)'
          }} onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            <div style={{ fontSize: 36, marginBottom: 20 }}>{f.icon}</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, letterSpacing: '0.04em' }}>{f.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: 3, height: '100%',
              background: 'var(--accent)', opacity: 0, transition: 'opacity 0.3s'
            }} className="feature-line" />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
