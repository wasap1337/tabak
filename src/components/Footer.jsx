export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '60px 24px 30px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, background: 'var(--accent)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#000', fontSize: 22, fontFamily: "'Montserrat', sans-serif" }}>ТО</div>
              <div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '0.04em', lineHeight: 1.1 }}>ТАБАЧОК<span style={{ color: 'var(--accent)' }}>-</span>ОПТОВИЧОК</div>
                <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.2em', fontWeight: 600, textTransform: 'uppercase' }}>Оптовые поставки табака</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>Оптовые поставки табака, сигар и кальянной продукции по всей России. Работаем с 2004 года. Опт от 1 коробки.</p>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: "'Montserrat', sans-serif" }}>Разделы</h4>
            <ul style={{ listStyle: 'none' }}>
              {[{ label: 'Импортеры', id: 'importers' }, { label: 'Бренды', id: 'brands' }, { label: 'Каталог', id: 'products' }, { label: 'Как заказать', id: 'order' }, { label: 'Контакты', id: 'contact' }].map(l => (
                <li key={l.id} style={{ marginBottom: 12 }}><a href={`#${l.id}`} style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--accent)'} onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}>{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: "'Montserrat', sans-serif" }}>Категории</h4>
            <ul style={{ listStyle: 'none' }}>
              {['Табак', 'Кальяны', 'Сигары', 'Аксессуары'].map(l => (<li key={l} style={{ marginBottom: 12 }}><a href="#products" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}>{l}</a></li>))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 20, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: "'Montserrat', sans-serif" }}>Контакты</h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: 12 }}><a href="tel:+73831234567" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14 }}>+7 (383) 123-45-67</a></li>
              <li style={{ marginBottom: 12 }}><a href="https://t.me/tabachok_optovichok" target="_blank" rel="noreferrer" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: 14 }}>Telegram</a></li>
              <li><span style={{ color: 'var(--text-dim)', fontSize: 14 }}>Новосибирск, ул. Ленина, 54</span></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ color: 'var(--text-dim)', fontSize: 12 }}>© 2004–2026 Табачок-Оптовичок. Все права защищены.</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'rgba(139,94,60,0.08)', border: '1px solid rgba(139,94,60,0.15)', borderRadius: 3, fontSize: 11, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>🔞 18+</div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </footer>
  )
}