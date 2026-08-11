# Табачок-Оптовичок — React + Supabase

## Стек
- React 18 + Vite + React Router
- Supabase (PostgreSQL + Auth)

## Запуск

```bash
npm install
npm run dev
```

## Настройка Supabase

1. Создайте проект на [supabase.com](https://supabase.com)
2. Скопируйте URL и anon key в `src/supabase.js`
3. Выполните `supabase.sql` в SQL Editor
4. Создайте пользователя в Authentication → Users

## Секции сайта
- 🔞 Модалка 18+
- 🏠 Hero — главный экран
- ⚡ Features — 6 преимуществ
- 🏷️ Brands — бренды-партнёры
- 📦 Products — каталог с фильтрами
- 📋 HowToOrder — 4 шага заказа
- 💬 Reviews — отзывы клиентов
- 📞 ContactForm — ФОРМА ОБРАТНОЙ СВЯЗИ + контакты
- 🔐 Admin — админ-панель

## Демо-режим
Если Supabase не подключен — сайт работает с демо-данными.
В админке есть кнопка "Демо-режим".
