import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase.js'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', product: '', volume: '', message: '' })
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus(null)

    if (!supabase) {
      const msgs = JSON.parse(localStorage.getItem('to_demo_messages') || '[]')
      msgs.unshift({ ...form, id: Date.now(), created_at: new Date().toISOString() })
      localStorage.setItem('to_demo_messages', JSON.stringify(msgs))
      setStatus({ type: 'success', text: '✓ Заявка принята! (Демо-режим — данные сохранены локально)' })
      setForm({ name: '', phone: '', email: '', city: '', product: '', volume: '', message: '' })
      setSending(false)
      return
    }

    const { error } = await supabase.from('messages').insert([form])
    if (!error) {
      setStatus({ type: 'success', text: '✓ Заявка отправлена! Менеджер свяжется с вами в течение 15 минут.' })
      setForm({ name: '', phone: '', email: '', city: '', product: '', volume: '', message: '' })
    } else {
      setStatus({ type: 'error', text: '✗ Ошибка отправки. Напишите нам напрямую в Telegram.' })
    }
    setSending(false)
  }

  return (
    <section id="contact" style={{
      padding: '120px 24px',
      background: 'radial-gradient(ellipse at 20% 50%, rgba(255,42,42,0.06) 0%, transparent 50%), var(--bg-elevated)',
      borderTop: '2px solid var(--accent)'
    }}>
      <div ref={ref} className="reveal" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>Заявка</div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, marginBottom: 16 }}>ОСТАВИТЬ ЗАЯВКУ</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: 17, lineHeight: 1.7 }}>
            Заполните форму — мы перезвоним или напишем в течение 15 минут.<br/>
            Или пишите сразу в Telegram, отвечаем круглосуточно.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'start' }} className="contact-grid">
          {/* Левая колонка — контакты */}
          <div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 4, padding: 36, marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', letterSpacing: '0.04em' }}>Контакты</h3>

              {[
                { icon: '📱', label: 'Телефон / WhatsApp', value: '+7 (383) 123-45-67', href: 'tel:+73831234567' },
                { icon: '✈️', label: 'Telegram', value: '@tabachok_optovichok', href: 'https://t.me/tabachok_optovichok' },
                { icon: '📧', label: 'Email', value: 'zakaz@tabachok-optovichok.ru', href: 'mailto:zakaz@tabachok-optovichok.ru' },
                { icon: '📍', label: 'Склад', value: 'г. Новосибирск, ул. Ленина, 54', href: null },
                { icon: '🕐', label: 'Режим работы', value: 'Пн-Вс: 09:00 — 21:00', href: null },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
                  <div style={{ fontSize: 22, width: 30, textAlign: 'center', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ color: 'var(--text)', fontSize: 15, fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                        onMouseLeave={e => e.target.style.color = 'var(--text)'}
                      >{item.value}</a>
                    ) : (
                      <span style={{ color: 'var(--text-secondary)', fontSize: 15 }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a href="https://t.me/tabachok_optovichok" target="_blank" rel="noreferrer" className="btn btn-red" style={{ width: '100%', padding: '18px', fontSize: 16 }}>
              НАПИСАТЬ В TELEGRAM
            </a>
          </div>

          {/* Правая колонка — форма */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 4, padding: 40 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', letterSpacing: '0.04em' }}>Форма обратной связи</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 28 }}>Все поля обязательны для заполнения</p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label>Ваше имя</label>
                  <input required placeholder="Иван Иванов" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div>
                  <label>Телефон</label>
                  <input required placeholder="+7 (999) 000-00-00" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label>Email</label>
                  <input type="email" required placeholder="email@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div>
                  <label>Город</label>
                  <input required placeholder="Новосибирск" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label>Интересующий товар</label>
                  <input required placeholder="Must Have, Dark Side..." value={form.product} onChange={e => setForm({...form, product: e.target.value})} />
                </div>
                <div>
                  <label>Объём (коробки / кг)</label>
                  <input required placeholder="5 коробок" value={form.volume} onChange={e => setForm({...form, volume: e.target.value})} />
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label>Дополнительная информация</label>
                <textarea placeholder="Комментарии к заказу..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>

              <button type="submit" className="btn btn-red" disabled={sending} style={{ width: '100%', padding: '18px', fontSize: 16 }}>
                {sending ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
              </button>

              {status && (
                <div style={{
                  marginTop: 20, padding: 16, borderRadius: 4, fontSize: 14, fontWeight: 600,
                  background: status.type === 'success' ? 'rgba(0,208,132,0.08)' : 'rgba(255,42,42,0.08)',
                  color: status.type === 'success' ? 'var(--success)' : 'var(--accent)',
                  border: `1px solid ${status.type === 'success' ? 'rgba(0,208,132,0.2)' : 'rgba(255,42,42,0.2)'}`
                }}>
                  {status.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
