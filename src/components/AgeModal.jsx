import { useEffect, useState } from 'react'

export default function AgeModal() {
  const [visible, setVisible] = useState(false)
  const [warning, setWarning] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('ageVerified_tabachok')) {
      setVisible(true)
      document.body.style.overflow = 'hidden'
    }
  }, [])

  const confirm = (isAdult) => {
    if (isAdult) {
      localStorage.setItem('ageVerified_tabachok', 'true')
      setVisible(false)
      document.body.style.overflow = 'auto'
    } else {
      setWarning(true)
      setTimeout(() => window.location.href = 'https://www.google.com', 2000)
    }
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(30px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: 'var(--bg-elevated)', border: '2px solid var(--border)',
        borderRadius: 8, padding: '56px 48px', maxWidth: 500, width: '92%',
        textAlign: 'center', boxShadow: '0 0 80px rgba(255,42,42,0.15)',
        animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, var(--accent), var(--warning), var(--accent))',
          backgroundSize: '200% 100%',
          animation: 'gradientShift 3s ease infinite'
        }} />
        <div style={{
          width: 90, height: 90, border: '3px solid var(--accent)',
          borderRadius: '50%', display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 28px',
          fontSize: 36, fontWeight: 800, color: 'var(--accent)',
          fontFamily: "'Montserrat', sans-serif", boxShadow: '0 0 30px var(--accent-glow)'
        }}>18+</div>
        <h2 style={{ fontSize: 32, marginBottom: 14, fontWeight: 700, letterSpacing: '0.04em' }}>ВХОД РАЗРЕШЁН?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 36, fontSize: 15, lineHeight: 1.7 }}>
          Сайт содержит информацию о табачной продукции.<br/>
          Доступ строго для лиц старше 18 лет.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
          <button className="btn btn-red" onClick={() => confirm(true)} style={{ minWidth: 160 }}>ДА, МНЕ 18+</button>
          <button className="btn btn-outline" onClick={() => confirm(false)} style={{ minWidth: 160 }}>НЕТ, МЕНЬШЕ 18</button>
        </div>
        {warning && (
          <div style={{
            marginTop: 24, padding: 16, background: 'rgba(255,42,42,0.08)',
            border: '1px solid rgba(255,42,42,0.3)', borderRadius: 4,
            color: 'var(--accent)', fontSize: 14, fontWeight: 600
          }}>
            ⛔ ДОСТУП ЗАПРЕЩЁН. ПЕРЕНАПРАВЛЕНИЕ...
          </div>
        )}
      </div>
    </div>
  )
}
