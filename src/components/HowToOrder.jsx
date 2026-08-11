import { useEffect, useRef } from 'react'

export default function HowToOrder() {
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const steps = [
    { num: '01', title: 'ОСТАВЬТЕ ЗАЯВКУ', desc: 'Напишите нам в Telegram или заполните форму на сайте. Укажите нужные позиции и объём.' },
    { num: '02', title: 'ПОЛУЧИТЕ СЧЁТ', desc: 'Менеджер свяжется с вами в течение 15 минут и вышит коммерческое предложение с ценами.' },
    { num: '03', title: 'ОПЛАТИТЕ ЗАКАЗ', desc: 'Оплата по безналичному расчёту или переводом. Работаем с ИП и ООО.' },
    { num: '04', title: 'ПОЛУЧИТЕ ГРУЗ', desc: 'Отправляем транспортной компанией или почтой. Срок доставки — от 2 до 7 дней.' },
  ]

  return (
    <section id="order" style={{ padding: '120px 24px', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)' }}>
      <div ref={ref} className="reveal" style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Процесс</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>КАК ЗАКАЗАТЬ</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: 16 }}>
            4 простых шага от заявки до получения товара.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="steps-grid">
          {steps.map((s, i) => (
            <div key={s.num} style={{
              position: 'relative', padding: '40px 28px',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 4, textAlign: 'center'
            }}>
              <div style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: 52, fontWeight: 900,
                color: 'var(--accent)', opacity: 0.15, lineHeight: 1,
                position: 'absolute', top: 16, right: 20
              }}>{s.num}</div>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'var(--accent-dim)', border: '2px solid var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', fontFamily: "'Montserrat', sans-serif",
                fontSize: 20, fontWeight: 800, color: 'var(--accent)',
                boxShadow: '0 0 20px var(--accent-glow)'
              }}>{s.num}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, letterSpacing: '0.04em' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
