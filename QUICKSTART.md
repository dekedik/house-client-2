# 🚀 Быстрый старт - API v1.1.0

## Что нового?

✅ Пагинация  
✅ Фильтры (площадь, цена, комнаты)  
✅ Изображения WebP  
✅ Обратная совместимость  

---

## ⚠️ ВАЖНО: Формат возвращаемого значения

**Метод `getHouses()` возвращает разные типы в зависимости от параметров:**

- 🔹 **БЕЗ** `page`/`limit`/`offset` → `Array<House>` (как раньше)
- 🔸 **С** `page`/`limit`/`offset` → `{ data: Array<House>, pagination: PaginationInfo }`

Это обеспечивает обратную совместимость!

---

## Примеры использования

### 1. Простой список (как раньше)

```javascript
const houses = await api.getHouses()
// Вернет массив
```

### 2. С пагинацией

```javascript
const result = await api.getHouses({ page: 1, limit: 20 })

console.log(result.data)              // Массив домов
console.log(result.pagination.total)  // Всего домов
console.log(result.pagination.hasNextPage) // Есть еще?
```

### 3. С фильтрами

```javascript
const result = await api.getHouses({
  rooms: '3',        // 3 комнаты
  areaMin: 80,       // от 80 м²
  areaMax: 120,      // до 120 м²
  priceMin: 3000000, // от 3 млн
  priceMax: 5000000, // до 5 млн
  page: 1,
  limit: 10
})
```

---

## Компонент с пагинацией

```javascript
function HousesList() {
  const [houses, setHouses] = useState([])
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const load = async () => {
      const result = await api.getHouses({ page, limit: 20 })
      setHouses(result.data)
      setPagination(result.pagination)
    }
    load()
  }, [page])

  return (
    <div>
      {houses.map(h => <div key={h.id}>{h.name}</div>)}
      
      {pagination && (
        <div>
          <button 
            onClick={() => setPage(p => p - 1)}
            disabled={!pagination.hasPrevPage}
          >
            ← Назад
          </button>
          
          <span>{pagination.page} / {pagination.totalPages}</span>
          
          <button 
            onClick={() => setPage(p => p + 1)}
            disabled={!pagination.hasNextPage}
          >
            Вперед →
          </button>
        </div>
      )}
    </div>
  )
}
```

---

## Параметры пагинации

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `page` | number | 1 | Номер страницы |
| `limit` | number | 50 | Записей на странице (max: 100) |
| `offset` | number | - | Смещение (альтернатива page) |

## Параметры фильтров

| Параметр | Тип | Описание |
|----------|-----|----------|
| `rooms` | string | Количество комнат |
| `areaMin` | number | Минимальная площадь |
| `areaMax` | number | Максимальная площадь |
| `priceMin` | number | Минимальная цена |
| `priceMax` | number | Максимальная цена |

---

## Формат ответа с пагинацией

```typescript
{
  data: Array<House>,
  pagination: {
    page: number,         // Текущая страница
    limit: number,        // Записей на странице
    offset: number,       // Смещение
    total: number,        // Всего записей
    totalPages: number,   // Всего страниц
    hasNextPage: boolean, // Есть следующая?
    hasPrevPage: boolean  // Есть предыдущая?
  }
}
```

---

## Изображения WebP

Все изображения теперь в WebP:

```javascript
// Код не требует изменений
<img 
  src={house.image} 
  alt={house.name}
  loading="lazy"
  onError={(e) => {
    e.target.src = '/images/houses/placeholder.svg'
  }}
/>
```

Преимущества:
- 📦 Меньше на 60-80%
- ⚡ Быстрее загружается
- ✨ Лучше качество

---

## Обратная совместимость

### ✅ Работает без изменений

```javascript
// Старый код
const houses = await api.getHouses()
setHouses(houses) // Вернет массив как раньше
```

### 🆕 Новый функционал

```javascript
// Новый код
const result = await api.getHouses({ page: 1 })
setHouses(result.data)
setPagination(result.pagination)
```

---

## Полная документация

- 📘 [README.md](./README.md) - Общая информация
- 📗 [API_USAGE.md](./API_USAGE.md) - Подробные примеры
- 📙 [API_UPDATE.md](./API_UPDATE.md) - Гид по миграции
- 📕 [CHANGELOG_SERVER.md](./CHANGELOG_SERVER.md) - Изменения сервера

---

**Версия:** v1.1.0  
**Дата:** 23 февраля 2026
