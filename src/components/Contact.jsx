import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', contact: '', message: '' })
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
    const { error } = await supabase.from('messages').insert([form])
    if (!error) {
      setStatus({ type: 'success', text: '✓ Сообщение отправлено! Мы свяжемся с вами в ближайшее время.' })
      setForm({ name: '', contact: '', message: '' })
    } else {
      setStatus({ type: 'error', text: '✗ Ошибка отправки. Попробуйте написать нам в Telegram.' })
    }
    setSending(false)
  }

  const contactItems = [
    { icon: '📱', title: 'Телефон / WhatsApp', value: '+7 (383) 123-45-67', href: 'tel:+73831234567' },
    { icon: '✈️', title: 'Telegram', value: '@nsk_tabak54', href: 'https://t.me/nsk_tabak54' },
    { icon: '📍', title: 'Адрес', value: 'г. Новосибирск, ул. Ленина, 54', href: null },
    { icon: '🕐', title: 'Режим работы', value: 'Ежедневно: 10:00 — 22:00', href: null },
  ]

  return (
    <section id="contact" style={{ padding: '100px 24px', maxWidth: 1280, margin: '0 auto' }}>
      <div ref={ref} className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 16, fontWeight: 600 }}>Связь с администратором</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto', fontSize: 16 }}>
          Есть вопросы? Напишите нам — ответим в течение 15 минут.
        </p>
        <div style={{ width: 60, height: 2, background: 'var(--accent)', margin: '20px auto 0' }} />
      </div>

      <div className="reveal contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <div>
          <h3 style={{ fontSize: 28, marginBottom: 20 }}>Контактная информация</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.8 }}>
            Мы всегда на связи и готовы помочь с выбором, оформлением заказа
            или ответить на любые вопросы о нашей продукции.
          </p>

          {contactItems.map(item => (
            <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 48, height: 48, background: 'rgba(201,169,110,0.1)', borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, flexShrink: 0
              }}>{item.icon}</div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>{item.title}</h4>
                {item.href ? (
                  <a href={item.href} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, transition: 'color 0.3s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >{item.value}</a>
                ) : (
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, margin: 0 }}>{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 20, padding: 40 }}>
          <h3 style={{ fontSize: 20, marginBottom: 8, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Форма обратной связи</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>Заполните поля ниже — мы перезвоним или напишем</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label>Ваше имя</label>
              <input type="text" required placeholder="Иван Иванов"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label>Телефон или Telegram</label>
              <input type="text" required placeholder="+7 (999) 000-00-00"
                value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label>Сообщение</label>
              <textarea required placeholder="Что вас интересует?"
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary" disabled={sending} style={{ width: '100%' }}>
              {sending ? 'Отправка...' : 'Отправить сообщение'}
            </button>
            {status && (
              <div style={{
                marginTop: 16, padding: 12, borderRadius: 10, fontSize: 14,
                background: status.type === 'success' ? 'rgba(74,222,128,0.1)' : 'rgba(239,68,68,0.1)',
                color: status.type === 'success' ? 'var(--success)' : 'var(--danger)',
                border: `1px solid ${status.type === 'success' ? 'rgba(74,222,128,0.2)' : 'rgba(239,68,68,0.2)'}`
              }}>
                {status.text}
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
