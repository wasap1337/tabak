import { useEffect, useRef } from 'react'

export default function Reviews() {
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const reviews = [
    { name: 'Александр', city: 'Москва', text: 'Работаем с Табачком-Оптовичком уже 2 года. Цены лучшие на рынке, доставка всегда в срок. Рекомендую всем, кто ищет надёжного поставщика.' },
    { name: 'Дмитрий', city: 'Екатеринбург', text: 'Заказываю табак для своего магазина. Всегда свежий, оригинальный. Менеджер Артём — красавчик, всегда на связи даже ночью.' },
    { name: 'Ирина', city: 'Новосибирск', text: 'Опт от 1 коробки — это реально круто. Не нужно замораживать деньги в огромных партиях. Качество на высоте, клиенты довольны.' },
    { name: 'Максим', city: 'Казань', text: 'Пробовал разных поставщиков, но здесь лучший баланс цены и качества. Доставка СДЭКом приходит за 3 дня. Буду продолжать сотрудничество.' },
  ]

  return (
    <section id="reviews" style={{ padding: '120px 24px', maxWidth: 1400, margin: '0 auto' }}>
      <div ref={ref} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
        <div className="section-tag" style={{ justifyContent: 'center' }}>Отзывы</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>ЧТО ГОВОРЯТ КЛИЕНТЫ</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="reviews-grid">
        {reviews.map((r, i) => (
          <div key={r.name} style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 4,
            padding: 36, position: 'relative', transition: 'all 0.3s'
          }} onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.transform = 'translateY(-4px)'
          }} onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}>
            <div style={{ fontSize: 48, color: 'var(--accent)', opacity: 0.2, lineHeight: 1, marginBottom: 16, fontFamily: 'Georgia, serif' }}>"</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>{r.text}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', background: 'var(--accent-dim)',
                border: '2px solid var(--accent)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                fontSize: 16, color: 'var(--accent)'
              }}>{r.name[0]}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', letterSpacing: '0.04em' }}>{r.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{r.city}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
