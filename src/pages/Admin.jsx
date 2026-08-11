import { useState, useEffect } from 'react'
import { supabase } from '../supabase.js'

export default function Admin() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('products')
  const [products, setProducts] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState(null)
  const [isDemo, setIsDemo] = useState(false)

  const [form, setForm] = useState({
    name: '', category: 'tobacco', price: '', old_price: '',
    image: '', badge: '', description: '', is_active: true
  })

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) setUser(session.user)
    }
    check()
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => { if (user || isDemo) loadProducts() }, [user, isDemo])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  const login = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email: e.target.email.value,
      password: e.target.password.value
    })
    if (error) showToast(error.message, 'error')
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsDemo(false)
  }

  const enableDemo = () => {
    setIsDemo(true)
    showToast('Демо-режим активирован', 'success')
  }

  const loadProducts = async () => {
    setLoading(true)
    if (isDemo) {
      const demo = JSON.parse(localStorage.getItem('to_demo_products') || '[]')
      setProducts(demo.length ? demo : getDemoProducts())
    } else {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      if (!error) setProducts(data || [])
      else showToast('Ошибка загрузки товаров', 'error')
    }
    setLoading(false)
  }

  const loadMessages = async () => {
    if (isDemo) {
      const demo = JSON.parse(localStorage.getItem('to_demo_messages') || '[]')
      setMessages(demo)
    } else {
      const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
      if (!error) setMessages(data || [])
      else showToast('Ошибка загрузки сообщений', 'error')
    }
  }

  const getDemoProducts = () => [
    { id: 1, name: 'Must Have — Blueberry', category: 'tobacco', price: 890, old_price: 1100, image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&q=80', badge: 'ХИТ', description: 'Табак премиум-класса', is_active: true, created_at: new Date().toISOString() },
    { id: 2, name: 'Dark Side — Core Line', category: 'tobacco', price: 750, old_price: null, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', badge: null, description: 'Крепкий табак', is_active: true, created_at: new Date().toISOString() },
    { id: 3, name: 'Alpha Hookah Model X', category: 'hookah', price: 18500, old_price: 22000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', badge: 'ТОП', description: 'Элитный кальян', is_active: true, created_at: new Date().toISOString() },
  ]

  const saveDemo = (items) => localStorage.setItem('to_demo_products', JSON.stringify(items))

  const openModal = (product = null) => {
    if (product) {
      setEditing(product.id)
      setForm({
        name: product.name, category: product.category, price: product.price,
        old_price: product.old_price || '', image: product.image || '',
        badge: product.badge || '', description: product.description || '',
        is_active: product.is_active
      })
    } else {
      setEditing(null)
      setForm({ name: '', category: 'tobacco', price: '', old_price: '', image: '', badge: '', description: '', is_active: true })
    }
    setModalOpen(true)
  }

  const save = async (e) => {
    e.preventDefault()
    const data = {
      name: form.name, category: form.category,
      price: parseInt(form.price), old_price: form.old_price ? parseInt(form.old_price) : null,
      image: form.image, badge: form.badge || null,
      description: form.description, is_active: form.is_active
    }
    if (isDemo) {
      let list = [...products]
      if (editing) {
        const idx = list.findIndex(p => p.id === editing)
        if (idx >= 0) list[idx] = { ...list[idx], ...data }
      } else {
        list.unshift({ ...data, id: Date.now(), created_at: new Date().toISOString() })
      }
      setProducts(list)
      saveDemo(list)
      showToast(editing ? 'Товар обновлён' : 'Товар добавлен')
      setModalOpen(false)
      return
    }
    if (editing) {
      const { error } = await supabase.from('products').update(data).eq('id', editing)
      if (error) { showToast(error.message, 'error'); return }
      showToast('Товар обновлён')
    } else {
      const { error } = await supabase.from('products').insert([data])
      if (error) { showToast(error.message, 'error'); return }
      showToast('Товар добавлен')
    }
    setModalOpen(false)
    loadProducts()
  }

  const del = async (id) => {
    if (!confirm('Удалить этот товар?')) return
    if (isDemo) {
      const list = products.filter(p => p.id !== id)
      setProducts(list)
      saveDemo(list)
      showToast('Товар удалён')
      return
    }
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) showToast(error.message, 'error')
    else { showToast('Товар удалён'); loadProducts() }
  }

  const catName = (c) => ({ cigars: 'СИГАРЫ', tobacco: 'ТАБАК', hookah: 'КАЛЬЯНЫ', accessories: 'АКСЕССУАРЫ' }[c] || c)
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  const stats = { total: products.length, active: products.filter(p => p.is_active).length, sale: products.filter(p => p.old_price).length }

  if (!user && !isDemo) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 4, padding: 48, width: '100%', maxWidth: 420, boxShadow: '0 0 60px rgba(255,42,42,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, background: 'var(--accent)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#000', fontSize: 24, fontFamily: "'Montserrat', sans-serif" }}>ТО</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 22, fontWeight: 700 }}>ТАБАЧОК<span style={{ color: 'var(--accent)' }}>-</span>ОПТОВИЧОК</div>
            </div>
            <h1 style={{ fontSize: 26, marginBottom: 8, fontWeight: 800 }}>АДМИН-ПАНЕЛЬ</h1>
            <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>Войдите через Supabase Auth</p>
          </div>
          <form onSubmit={login}>
            <div style={{ marginBottom: 16 }}>
              <label>Email</label>
              <input name="email" type="email" required placeholder="admin@tabachok.ru" />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label>Пароль</label>
              <input name="password" type="password" required placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-red" style={{ width: '100%' }}>ВОЙТИ</button>
          </form>
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 12 }}>Создайте аккаунт в Supabase Dashboard → Authentication → Users</p>
            <button className="btn btn-sm btn-outline" onClick={enableDemo} style={{ width: '100%' }}>🚀 ДЕМО-РЕЖИМ</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-layout">
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>{toast.msg}</div>
        </div>
      )}

      <aside className="admin-sidebar">
        <div style={{ padding: 24, borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, background: 'var(--accent)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#000', fontSize: 20, fontFamily: "'Montserrat', sans-serif" }}>ТО</div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 700 }}>ТАБАЧОК<span style={{ color: 'var(--accent)' }}>-</span>ОПТОВИЧОК</div>
          </div>
        </div>
        <ul style={{ flex: 1, padding: '16px 12px', listStyle: 'none' }}>
          {[
            { key: 'products', label: 'Товары', icon: '📦' },
            { key: 'messages', label: 'Заявки', icon: '📋' },
          ].map(item => (
            <li key={item.key} style={{ marginBottom: 4 }}>
              <a onClick={() => { setPage(item.key); if (item.key === 'messages') loadMessages() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                  borderRadius: 4, color: page === item.key ? 'var(--accent)' : 'var(--text-secondary)',
                  background: page === item.key ? 'rgba(255,42,42,0.1)' : 'transparent',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'Montserrat', sans-serif"
                }}>
                <span>{item.icon}</span> {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ padding: 16, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#000', fontSize: 14, fontFamily: "'Montserrat', sans-serif" }}>
              {(user?.email || 'D')[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase' }}>{isDemo ? 'Демо' : (user?.email?.split('@')[0] || 'Админ')}</div>
              <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{isDemo ? 'Локальный режим' : 'Администратор'}</div>
            </div>
          </div>
          <button className="btn btn-sm btn-outline" onClick={logout} style={{ width: '100%' }}>ВЫЙТИ</button>
        </div>
      </aside>

      <main className="admin-main">
        {page === 'products' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 28, fontWeight: 800, textTransform: 'uppercase' }}>Управление товарами</h2>
              <button className="btn btn-sm btn-red" onClick={() => openModal()}>+ Добавить товар</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
              {[
                { title: 'Всего товаров', value: stats.total },
                { title: 'Активных', value: stats.active },
                { title: 'Со скидкой', value: stats.sale },
              ].map(s => (
                <div key={s.title} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 4, padding: 24 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 12 }}>{s.title}</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: 12 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', letterSpacing: '0.08em' }}>Список товаров</h3>
                <input type="text" placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ padding: '10px 16px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text)', fontSize: 14, width: 240 }} />
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Товар', 'Категория', 'Цена', 'Статус', 'Действия'].map(h => (
                        <th key={h} style={{ padding: '14px 24px', textAlign: 'left', fontSize: 11, color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'var(--bg-card)', fontFamily: "'Montserrat', sans-serif" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: 'var(--text-dim)' }}><div className="spinner" style={{ margin: '0 auto' }} /></td></tr>
                    ) : filtered.length === 0 ? (
                      <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, color: 'var(--text-dim)' }}>Товары не найдены</td></tr>
                    ) : filtered.map(p => (
                      <tr key={p.id} style={{ transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.querySelectorAll('td').forEach(td => td.style.color = 'var(--text)') }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.querySelectorAll('td').forEach(td => td.style.color = 'var(--text-secondary)') }}>
                        <td style={{ padding: '14px 24px', borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <img src={p.image} alt="" style={{ width: 48, height: 48, borderRadius: 4, objectFit: 'cover', background: 'var(--bg-card)' }} />
                            <span style={{ fontWeight: 700, color: 'var(--text)', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', fontSize: 14 }}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '14px 24px', borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}><span className={`badge badge-${p.category}`}>{catName(p.category)}</span></td>
                        <td style={{ padding: '14px 24px', borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                          <strong style={{ color: 'var(--accent)', fontFamily: "'Montserrat', sans-serif", fontSize: 18 }}>{p.price.toLocaleString()} ₽</strong>
                          {p.old_price && <span style={{ textDecoration: 'line-through', color: 'var(--text-dim)', marginLeft: 8, fontSize: 12 }}>{p.old_price.toLocaleString()} ₽</span>}
                        </td>
                        <td style={{ padding: '14px 24px', borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}><span className={`badge ${p.is_active ? 'badge-active' : 'badge-inactive'}`}>{p.is_active ? 'Активен' : 'Скрыт'}</span></td>
                        <td style={{ padding: '14px 24px', borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => openModal(p)} style={{ width: 32, height: 32, borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)' }} onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-dim)' }}>✏️</button>
                            <button onClick={() => del(p.id)} style={{ width: 32, height: 32, borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }} onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)' }} onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-dim)' }}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {page === 'messages' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 28, fontWeight: 800, textTransform: 'uppercase' }}>Заявки от клиентов</h2>
            </div>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, color: 'var(--text-dim)' }}>Заявок пока нет</div>
            ) : messages.map(m => (
              <div key={m.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 4, padding: 24, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                  <span style={{ fontWeight: 700, color: 'var(--text)', fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase', fontSize: 15 }}>{m.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{new Date(m.created_at).toLocaleString('ru-RU')}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12, fontSize: 13 }}>
                  <div><span style={{ color: 'var(--text-dim)' }}>Тел:</span> <span style={{ color: 'var(--accent)' }}>{m.phone || m.contact}</span></div>
                  <div><span style={{ color: 'var(--text-dim)' }}>Email:</span> <span style={{ color: 'var(--text)' }}>{m.email || '-'}</span></div>
                  <div><span style={{ color: 'var(--text-dim)' }}>Город:</span> <span style={{ color: 'var(--text)' }}>{m.city || '-'}</span></div>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, padding: 12, background: 'var(--bg-elevated)', borderRadius: 4 }}>
                  <span style={{ color: 'var(--text-dim)', fontSize: 11, textTransform: 'uppercase', fontWeight: 600 }}>Товар: {m.product || '-'} | Объём: {m.volume || '-'}</span>
                  <div style={{ marginTop: 6 }}>{m.message}</div>
                </div>
              </div>
            ))}
          </>
        )}
      </main>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 20, fontWeight: 800, textTransform: 'uppercase' }}>{editing ? 'Редактировать' : 'Новый товар'}</h3>
              <button onClick={() => setModalOpen(false)} style={{ width: 32, height: 32, borderRadius: 4, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
            <form onSubmit={save}>
              <div style={{ padding: 28 }}>
                <div style={{ marginBottom: 16 }}>
                  <label>Название</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Must Have — Blueberry" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label>Категория</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                      <option value="tobacco">Табак</option>
                      <option value="hookah">Кальяны</option>
                      <option value="cigars">Сигары</option>
                      <option value="accessories">Аксессуары</option>
                    </select>
                  </div>
                  <div>
                    <label>Бейдж</label>
                    <input value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} placeholder="ХИТ, СКИДКА..." />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label>Цена (₽)</label>
                    <input type="number" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="890" />
                  </div>
                  <div>
                    <label>Старая цена</label>
                    <input type="number" value={form.old_price} onChange={e => setForm({ ...form, old_price: e.target.value })} placeholder="1100" />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label>Ссылка на изображение</label>
                  <input type="url" required value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label>Описание</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Описание товара..." />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" id="isActive" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} style={{ width: 18, height: 18, accentColor: 'var(--accent)' }} />
                  <label htmlFor="isActive" style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)' }}>Товар активен</label>
                </div>
              </div>
              <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" className="btn btn-sm btn-outline" onClick={() => setModalOpen(false)}>Отмена</button>
                <button type="submit" className="btn btn-sm btn-red">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
