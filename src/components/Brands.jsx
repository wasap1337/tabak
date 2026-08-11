import { useEffect, useRef } from 'react'

export default function Brands() {
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const brands = ['Must Have', 'Dark Side', 'Satyr', 'Milano', 'Al Fakher', 'Adalya', 'Nakhla', 'Fumari', 'Starbuzz', 'Tangiers', 'Social Smoke', 'Azure']

  return (
    <section id="brands" style={{ padding: '100px 24px', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div ref={ref} className="reveal" style={{ maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
        <div className="section-tag" style={{ justifyContent: 'center' }}>Бренды</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 48 }}>РАБОТАЕМ С ЛУЧШИМИ</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          {brands.map(b => (
            <div key={b} style={{
              padding: '18px 32px', background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 4, fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)',
              transition: 'all 0.3s', cursor: 'default'
            }} onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--text)'
              e.currentTarget.style.boxShadow = '0 0 20px var(--accent-glow)'
            }} onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
