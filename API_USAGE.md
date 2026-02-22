# Документация API клиента

## Обзор

Клиентская библиотека для работы с API ДоманСтрой. Поддерживает пагинацию, фильтрацию и работу с изображениями в формате WebP.

---

## Использование API

### Импорт

```javascript
import { api } from './services/api'
```

---

## Методы

### 1. Получение домов (Houses)

#### `api.getHouses(params?)`

Получить список домов с поддержкой пагинации и фильтрации.

**Параметры:**

```typescript
params?: {
  page?: number,        // Номер страницы (по умолчанию: 1)
  limit?: number,       // Количество записей на странице (по умолчанию: 50, max: 100)
  offset?: number,      // Смещение (альтернатива page)
  rooms?: string,       // Фильтр по количеству комнат
  areaMin?: number,     // Минимальная площадь
  areaMax?: number,     // Максимальная площадь
  priceMin?: number,    // Минимальная цена
  priceMax?: number     // Максимальная цена
}
```

**Возвращает:**

- Если параметры пагинации НЕ указаны: `Array<House>` (обратная совместимость)
- Если указаны параметры пагинации: `{ data: Array<House>, pagination: PaginationInfo }`

**Примеры использования:**

```javascript
// Простой запрос (без пагинации) - возвращает массив
const houses = await api.getHouses()
houses.forEach(house => console.log(house.name))

// С пагинацией - возвращает объект
const result = await api.getHouses({ page: 1, limit: 20 })
result.data.forEach(house => console.log(house.name))
console.log(`Страница ${result.pagination.page} из ${result.pagination.totalPages}`)
console.log(`Всего домов: ${result.pagination.total}`)

// С фильтрами
const filtered = await api.getHouses({
  rooms: '3',
  areaMin: 80,
  areaMax: 120,
  priceMin: 3000000,
  priceMax: 5000000,
  page: 1,
  limit: 10
})

// Использование offset вместо page
const offsetResult = await api.getHouses({
  offset: 20,
  limit: 10
})
```

**Формат данных House:**

```typescript
{
  id: number,
  name: string,
  number: number,
  area: string,
  rooms: string,
  priceFrom: number,
  image: string,
  images: string[],
  description: string,
  fullDescription: string,
  characteristics: string[],
  status: string
}
```

**Формат PaginationInfo:**

```typescript
{
  page: number,           // Текущая страница
  limit: number,          // Записей на странице
  offset: number,         // Смещение
  total: number,          // Всего записей
  totalPages: number,     // Всего страниц
  hasNextPage: boolean,   // Есть ли следующая страница
  hasPrevPage: boolean    // Есть ли предыдущая страница
}
```

---

#### `api.getHouseById(id)`

Получить дом по ID.

**Параметры:**
- `id` (number) - ID дома

**Возвращает:** `House | null`

**Пример:**

```javascript
const house = await api.getHouseById(42)
if (house) {
  console.log(house.name)
  console.log(house.floorPlan) // Планировка в формате WebP
}
```

---

### 2. Получение пакетов (Packages)

#### `api.getPackages()`

Получить все пакеты комплектаций.

**Возвращает:** `Array<Package>`

**Пример:**

```javascript
const packages = await api.getPackages()
packages.forEach(pkg => {
  console.log(pkg.title)
  console.log(pkg.features)
})
```

**Формат Package:**

```typescript
{
  id: string,             // package_id (например "premium", "start")
  title: string,          // Название пакета
  thumbnail: string,      // WebP изображение для превью
  image: string,          // WebP изображение
  gallery: string[],      // Массив WebP изображений
  features: string[]      // Список характеристик
}
```

**Примечание:** API теперь возвращает формат с пагинацией `{ data: [...], pagination: {...} }`, но метод автоматически извлекает массив пакетов для обратной совместимости.

---

#### `api.getPackageById(id)`

Получить пакет по ID.

**Параметры:**
- `id` (number | string) - ID пакета

**Возвращает:** `Package | null`

**Пример:**

```javascript
const pkg = await api.getPackageById('premium')
if (pkg) {
  console.log(pkg.title)
  console.log(pkg.gallery) // Все изображения в WebP
}
```

---

### 3. Получение проектов (Projects)

#### `api.getProjects(params?)`

Получить список проектов с поддержкой пагинации.

**Параметры:**

```typescript
params?: {
  page?: number,    // Номер страницы
  limit?: number,   // Количество записей
  offset?: number   // Смещение
}
```

**Возвращает:** `{ data: Array<Project>, pagination: PaginationInfo }`

**Пример:**

```javascript
const result = await api.getProjects({ page: 1, limit: 10 })
result.data.forEach(project => {
  console.log(project.name)
  console.log(project.district)
  console.log(project.images) // WebP изображения
})

if (result.pagination.hasNextPage) {
  console.log('Есть еще проекты!')
}
```

**Формат Project:**

```typescript
{
  id: number,
  name: string,
  district: string,
  type: string,
  description: string,
  fullDescription: string,
  price: number,
  priceFrom: number,
  completion: string,
  parking: boolean,
  status: string,
  discount: number,
  image: string,          // WebP
  images: string[],       // WebP
  developer: string,
  floors: number,
  apartments: number,
  area: string,
  features: string[],
  housingClass: string,
  roomsAvailable: string[],
  paymentTypes: string[],
  designTypes: string[]
}
```

---

#### `api.getProjectById(id)`

Получить проект по ID.

**Параметры:**
- `id` (number) - ID проекта

**Возвращает:** `Project | null`

**Пример:**

```javascript
const project = await api.getProjectById(51)
if (project) {
  console.log(project.name)
  console.log(project.roomsAvailable)
  console.log(project.images) // Все изображения в WebP
}
```

---

## Работа с изображениями

### Формат WebP

Все изображения на сервере автоматически конвертируются в формат WebP для оптимальной производительности:

- **Меньший размер файлов** (на 60-80% меньше, чем PNG/JPEG)
- **Лучшее качество** при том же размере
- **Поддержка всех современных браузеров**

### Настройки сжатия

| Тип изображения | Размер | Качество |
|----------------|--------|----------|
| Главное фото дома | 1200x800 | 85% |
| Галерея дома | 1200x800 | 80% |
| Планировка | 2000x2000 | 90% |
| Фото пакета | 800x600 | 85% |
| Фото проекта | 1200x800 | 85% |

### Обработка ошибок загрузки изображений

```javascript
<img
  src={house.image}
  alt={house.name}
  onError={(e) => {
    e.target.src = '/images/houses/placeholder.svg'
  }}
/>
```

---

## Примеры использования в компонентах React

### Список домов без пагинации

```javascript
import { useState, useEffect } from 'react'
import { api } from '../services/api'

function HousesList() {
  const [houses, setHouses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHouses = async () => {
      try {
        setLoading(true)
        const data = await api.getHouses()
        setHouses(data)
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      } finally {
        setLoading(false)
      }
    }
    loadHouses()
  }, [])

  if (loading) return <div>Загрузка...</div>

  return (
    <div>
      {houses.map(house => (
        <div key={house.id}>
          <h3>{house.name}</h3>
          <img src={house.image} alt={house.name} />
          <p>Площадь: {house.area}</p>
          <p>Комнат: {house.rooms}</p>
        </div>
      ))}
    </div>
  )
}
```

### Список домов с пагинацией

```javascript
import { useState, useEffect } from 'react'
import { api } from '../services/api'

function HousesListWithPagination() {
  const [houses, setHouses] = useState([])
  const [pagination, setPagination] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadHouses = async () => {
      try {
        setLoading(true)
        const result = await api.getHouses({
          page: currentPage,
          limit: 20
        })
        setHouses(result.data)
        setPagination(result.pagination)
      } catch (error) {
        console.error('Ошибка загрузки:', error)
      } finally {
        setLoading(false)
      }
    }
    loadHouses()
  }, [currentPage])

  if (loading) return <div>Загрузка...</div>

  return (
    <div>
      <div>
        {houses.map(house => (
          <div key={house.id}>
            <h3>{house.name}</h3>
            <img src={house.image} alt={house.name} />
          </div>
        ))}
      </div>

      {pagination && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={!pagination.hasPrevPage}
          >
            Предыдущая
          </button>

          <span>
            Страница {pagination.page} из {pagination.totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={!pagination.hasNextPage}
          >
            Следующая
          </button>

          <p>Всего домов: {pagination.total}</p>
        </div>
      )}
    </div>
  )
}
```

### Список домов с фильтрами

```javascript
import { useState, useEffect } from 'react'
import { api } from '../services/api'

function HousesWithFilters() {
  const [houses, setHouses] = useState([])
  const [filters, setFilters] = useState({
    rooms: '',
    areaMin: '',
    areaMax: '',
    priceMin: '',
    priceMax: ''
  })
  const [pagination, setPagination] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const loadHouses = async () => {
      const params = {
        page: currentPage,
        limit: 20,
        ...filters
      }

      // Удаляем пустые фильтры
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null) {
          delete params[key]
        }
      })

      const result = await api.getHouses(params)
      setHouses(result.data)
      setPagination(result.pagination)
    }

    loadHouses()
  }, [currentPage, filters])

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
    setCurrentPage(1) // Сбрасываем на первую страницу при изменении фильтров
  }

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          name="rooms"
          placeholder="Комнат"
          value={filters.rooms}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="areaMin"
          placeholder="Площадь от"
          value={filters.areaMin}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="areaMax"
          placeholder="Площадь до"
          value={filters.areaMax}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="priceMin"
          placeholder="Цена от"
          value={filters.priceMin}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="priceMax"
          placeholder="Цена до"
          value={filters.priceMax}
          onChange={handleFilterChange}
        />
      </div>

      <div>
        {houses.map(house => (
          <div key={house.id}>
            <h3>{house.name}</h3>
            <p>Площадь: {house.area}</p>
            <p>Комнат: {house.rooms}</p>
            <p>Цена: {house.priceFrom.toLocaleString()} ₽</p>
          </div>
        ))}
      </div>

      {pagination && (
        <div>
          <p>Найдено: {pagination.total} домов</p>
          <button
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={!pagination.hasPrevPage}
          >
            Предыдущая
          </button>
          <span>{pagination.page} / {pagination.totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={!pagination.hasNextPage}
          >
            Следующая
          </button>
        </div>
      )}
    </div>
  )
}
```

---

## Обработка ошибок

Все методы API обрабатывают ошибки и возвращают безопасные значения по умолчанию:

- `getHouses()` - возвращает `[]` или `{ data: [], pagination: {} }`
- `getHouseById()` - возвращает `null`
- `getPackages()` - возвращает `[]`
- `getPackageById()` - возвращает `null`
- `getProjects()` - возвращает `{ data: [], pagination: {} }`
- `getProjectById()` - возвращает `null`

**Рекомендуется** дополнительно обрабатывать ошибки:

```javascript
try {
  const houses = await api.getHouses()
  setHouses(houses)
} catch (error) {
  console.error('Ошибка загрузки домов:', error)
  // Показать уведомление пользователю
}
```

---

## Производительность

### Кэширование

Рекомендуется реализовать кэширование на клиенте для часто запрашиваемых данных:

```javascript
const cache = new Map()

async function getCachedHouses(params) {
  const key = JSON.stringify(params)
  
  if (cache.has(key)) {
    return cache.get(key)
  }
  
  const result = await api.getHouses(params)
  cache.set(key, result)
  
  // Очистка кэша через 5 минут
  setTimeout(() => cache.delete(key), 5 * 60 * 1000)
  
  return result
}
```

### Оптимизация загрузки изображений

Используйте lazy loading для изображений:

```javascript
<img
  src={house.image}
  alt={house.name}
  loading="lazy"
  onError={(e) => {
    e.target.src = '/images/houses/placeholder.svg'
  }}
/>
```

---

## Миграция с предыдущей версии

### Если вы использовали `getHouses()` без параметров

✅ **Код продолжит работать** - метод возвращает массив для обратной совместимости.

### Если вы хотите использовать пагинацию

Добавьте параметры и обработайте новый формат ответа:

```javascript
// Было
const houses = await api.getHouses()
setHouses(houses)

// Стало
const result = await api.getHouses({ page: 1, limit: 20 })
setHouses(result.data)
setPagination(result.pagination)
```

---

## Конфигурация

API URL настраивается в файле `src/config/index.js`:

```javascript
export const config = {
  apiUrl: 'https://admin-doman-horizont.ru/api/v1'
}
```

---

## Версия API

Текущая версия: **v1.1.0**

Дата последнего обновления: **23 февраля 2026**

Изменения:
- ✅ Добавлена пагинация для `getHouses()`
- ✅ Добавлены фильтры для домов
- ✅ Автоматическое сжатие изображений в WebP
- ✅ Обратная совместимость со старым форматом
