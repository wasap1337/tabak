import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase.js'

const DEMO_PRODUCTS = [
  { id: 1, name: 'Must Have — Blueberry', category: 'tobacco', price: 890, old_price: 1100, image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&q=80', badge: 'ХИТ', description: 'Табак премиум-класса с насыщенным вкусом черники. 125 грамм.', is_active: true },
  { id: 2, name: 'Dark Side — Core Line', category: 'tobacco', price: 750, old_price: null, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', badge: null, description: 'Крепкий табак для ценителей насыщенного дыма. 100 грамм.', is_active: true },
  { id: 3, name: 'Al Fakher — Double Apple', category: 'tobacco', price: 650, old_price: 800, image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=400&q=80', badge: 'СКИДКА', description: 'Классический вкус двойного яблока. 250 грамм.', is_active: true },
  { id: 4, name: 'Alpha Hookah Model X', category: 'hookah', price: 18500, old_price: 22000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', badge: 'ТОП', description: 'Элитный кальян из нержавеющей стали. Уникальный дизайн.', is_active: true },
  { id: 5, name: 'Maklaud Dzen', category: 'hookah', price: 12000, old_price: null, image: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=400&q=80', badge: null, description: 'Компактный кальян для домашнего использования.', is_active: true },
  { id: 6, name: 'Cohiba Behike 52', category: 'cigars', price: 4500, old_price: 5200, image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80', badge: 'VIP', description: 'Премиальная сигара из Кубы. Насыщенный вкус.', is_active: true },
  { id: 7, name: 'XiKAR Xi1 Cutter', category: 'accessories', price: 4200, old_price: 5500, image: 'https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?w=400&q=80', badge: 'СКИДКА', description: 'Гильотина для сигар с двойными лезвиями.', is_active: true },
  { id: 8, name: 'S.T. Dupont Ligne 2', category: 'accessories', price: 95000, old_price: null, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80', badge: 'VIP', description: 'Зажигалка премиум-класса с характерным звонком.', is_active: true },
]

export default function Products() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [modalProduct, setModalProduct] = useState(null)
  const ref = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) e.target.classList.add('visible') }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => { loadProducts() }, [filter])

  const loadProducts = async () => {
    setLoading(true)
    if (!supabase) {
      await new Promise(r => setTimeout(r, 300))
      let data = DEMO_PRODUCTS
      if (filter !== 'all') data = data.filter(p => p.category === filter)
      setItems(data)
      setLoading(false)
      return
    }
    let q = supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false })
    if (filter !== 'all') q = q.eq('category', filter)
    const { data, error } = await q
    if (!error) setItems(data || [])
    setLoading(false)
  }

  const categories = [
    { key: 'all', label: 'ВСЕ' },
    { key: 'tobacco', label: 'ТАБАК' },
    { key: 'hookah', label: 'КАЛЬЯНЫ' },
    { key: 'cigars', label: 'СИГАРЫ' },
    { key: 'accessories', label: 'АКСЕССУАРЫ' },
  ]

  const catName = (c) => ({ cigars: 'СИГАРЫ', tobacco: 'ТАБАК', hookah: 'КАЛЬЯНЫ', accessories: 'АКСЕССУАРЫ' }[c] || c)

  return (
    <section id="products" style={{ padding: '120px 24px', maxWidth: 1400, margin: '0 auto' }}>
      <div ref={ref} className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
        <div className="section-tag" style={{ justifyContent: 'center' }}>Каталог</div>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>НАША ПРОДУКЦИЯ</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: 16 }}>
          Весь товар в наличии на складе в Новосибирске. Отгрузка в день заказа.
        </p>
      </div>

      <div className="reveal" style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button key={c.key} onClick={() => setFilter(c.key)}
            style={{
              padding: '12px 28px', borderRadius: 3, border: '2px solid var(--border)',
              background: filter === c.key ? 'var(--accent)' : 'transparent',
              color: filter === c.key ? '#fff' : 'var(--text-secondary)',
              fontSize: 13, cursor: 'pointer', transition: 'all 0.25s',
              fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
              fontFamily: "'Montserrat', sans-serif"
            }}
            onMouseEnter={e => { if (filter !== c.key) { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)' }}}
            onMouseLeave={e => { if (filter !== c.key) { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-secondary)' }}}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><div className="spinner" /></div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 80, color: 'var(--text-dim)', fontSize: 18 }}>Товары в этой категории скоро появятся</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="products-grid">
          {items.map(p => (
            <div key={p.id} onClick={() => setModalProduct(p)} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 4,
              overflow: 'hidden', transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)', cursor: 'pointer',
              position: 'relative'
            }} onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.boxShadow = '0 24px 48px rgba(255,42,42,0.12)'
            }} onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              <div style={{ aspectRatio: '1', background: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden' }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                {p.badge && (
                  <span style={{
                    position: 'absolute', top: 12, left: 12, padding: '6px 14px',
                    background: 'var(--accent)', color: '#fff', fontSize: 11,
                    fontWeight: 800, borderRadius: 2, textTransform: 'uppercase',
                    letterSpacing: '0.08em', fontFamily: "'Montserrat', sans-serif"
                  }}>{p.badge}</span>
                )}
              </div>
              <div style={{ padding: 22 }}>
                <div style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 10, fontFamily: "'Montserrat', sans-serif" }}>{catName(p.category)}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, lineHeight: 1.3, fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', letterSpacing: '0.02em' }}>{p.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 18, lineHeight: 1.5 }}>{p.description}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--accent)' }}>
                    {p.price.toLocaleString()} ₽
                    {p.old_price && <span style={{ fontSize: 13, color: 'var(--text-dim)', textDecoration: 'line-through', marginLeft: 10, fontFamily: 'Inter, sans-serif' }}>{p.old_price.toLocaleString()} ₽</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalProduct && (
        <div className="modal-overlay" onClick={() => setModalProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ position: 'relative', aspectRatio: '16/10' }}>
              <img src={modalProduct.image} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
              <button onClick={() => setModalProduct(null)} style={{
                position: 'absolute', top: 14, right: 14, width: 38, height: 38,
                background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border)', borderRadius: 4,
                color: '#fff', cursor: 'pointer', fontSize: 22, display: 'flex',
                alignItems: 'center', justifyContent: 'center'
              }}>×</button>
            </div>
            <div style={{ padding: 32 }}>
              <div style={{ fontSize: 12, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 10, fontFamily: "'Montserrat', sans-serif" }}>{catName(modalProduct.category)}</div>
              <h3 style={{ fontSize: 26, marginBottom: 14, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, textTransform: 'uppercase' }}>{modalProduct.name}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.7 }}>{modalProduct.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>{modalProduct.price.toLocaleString()} ₽</span>
                {modalProduct.old_price && <span style={{ fontSize: 18, color: 'var(--text-dim)', textDecoration: 'line-through', fontFamily: 'Inter, sans-serif' }}>{modalProduct.old_price.toLocaleString()} ₽</span>}
              </div>
              <a href={`https://t.me/tabachok_optovichok?text=${encodeURIComponent(`Здравствуйте! Интересует: ${modalProduct.name}`)}`} target="_blank" rel="noreferrer"
                className="btn btn-red" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', width: '100%' }}>
                НАПИСАТЬ В TELEGRAM
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1200px) {
          .products-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
