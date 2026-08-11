import { useEffect, useRef } from 'react'

export default function About() {
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const features = [
    { icon: '✓', title: 'Оригинальная продукция', desc: 'Только сертифицированные товары' },
    { icon: '✓', title: 'Быстрая доставка', desc: 'По Новосибирску за 2 часа' },
    { icon: '✓', title: 'Экспертная консультация', desc: 'Поможем с выбором' },
    { icon: '✓', title: 'Удобная оплата', desc: 'Наличные, карта, онлайн' },
  ]

  return (
    <section id="about" style={{ padding: '100px 24px', maxWidth: 1280, margin: '0 auto' }}>
      <div ref={ref} className="reveal about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', background: 'var(--bg-secondary)' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(201,169,110,0.1) 0%, transparent 60%)', zIndex: 1 }} />
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80" alt="Табачный магазин" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
        </div>

        <div>
          <h3 style={{ fontSize: 32, marginBottom: 20, fontWeight: 600 }}>О магазине NSK Tabak54</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.8 }}>
            Мы — команда энтузиастов, которая с 2018 года занимается продажей
            премиальной табачной продукции в Новосибирске. Наша цель — предоставить
            клиентам доступ к лучшим мировым брендам по честным ценам.
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.8 }}>
            В нашем каталоге вы найдёте сигары из Доминиканы и Никарагуа,
            премиальный табак для кальянов, элитные зажигалки и аксессуары
            для настоящих ценителей.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 32 }}>
            {features.map(f => (
              <div key={f.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, background: 'rgba(201,169,110,0.1)', borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: 'var(--accent)', fontSize: 18, fontWeight: 700
                }}>{f.icon}</div>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>{f.title}</h4>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
