import { config } from '../config/index.js'

const apiUrl = config.apiUrl

export const api = {
  // Получить все пакеты
  async getPackages() {
    try {
      const response = await fetch(`${apiUrl}/packages`)
      if (!response.ok) {
        throw new Error('Ошибка при загрузке пакетов')
      }
      const result = await response.json()
      
      // Поддержка нового формата (с пагинацией) и старого (массив)
      let packages = []
      
      if (result.data && Array.isArray(result.data)) {
        // Новый формат API с пагинацией
        packages = result.data
      } else if (Array.isArray(result)) {
        // Старый формат API (массив)
        packages = result
      }
      
      return packages.map(pkg => ({
        id: pkg.package_id || pkg.id,
        title: pkg.title,
        thumbnail: pkg.thumbnail || pkg.image || '/images/houses/placeholder.svg',
        image: pkg.image || pkg.thumbnail || '/images/houses/placeholder.svg',
        gallery: Array.isArray(pkg.gallery) && pkg.gallery.length > 0 
          ? pkg.gallery 
          : [pkg.image || pkg.thumbnail || '/images/houses/placeholder.svg'],
        features: Array.isArray(pkg.features) ? pkg.features : []
      }))
    } catch (error) {
      console.error('Ошибка при загрузке пакетов:', error)
      return []
    }
  },

  // Получить пакет по ID
  async getPackageById(id) {
    try {
      const response = await fetch(`${apiUrl}/packages/${id}`)
      if (!response.ok) {
        throw new Error('Ошибка при загрузке пакета')
      }
      const pkg = await response.json()
      if (!pkg) return null
      
      return {
        id: pkg.package_id || pkg.id,
        title: pkg.title,
        thumbnail: pkg.thumbnail || pkg.image || '/images/houses/placeholder.svg',
        image: pkg.image || pkg.thumbnail || '/images/houses/placeholder.svg',
        gallery: Array.isArray(pkg.gallery) && pkg.gallery.length > 0 
          ? pkg.gallery 
          : [pkg.image || pkg.thumbnail || '/images/houses/placeholder.svg'],
        features: Array.isArray(pkg.features) ? pkg.features : []
      }
    } catch (error) {
      console.error('Ошибка при загрузке пакета:', error)
      return null
    }
  },

  // Получить все дома
  async getHouses(params = {}) {
    try {
      // Определяем, запрашивал ли пользователь пагинацию
      const wantsPagination = params.page !== undefined || params.limit !== undefined || params.offset !== undefined
      
      // Формируем query параметры
      const queryParams = new URLSearchParams()
      if (params.page) queryParams.append('page', params.page)
      if (params.limit) queryParams.append('limit', params.limit)
      if (params.offset) queryParams.append('offset', params.offset)
      if (params.rooms) queryParams.append('rooms', params.rooms)
      if (params.areaMin) queryParams.append('areaMin', params.areaMin)
      if (params.areaMax) queryParams.append('areaMax', params.areaMax)
      if (params.priceMin) queryParams.append('priceMin', params.priceMin)
      if (params.priceMax) queryParams.append('priceMax', params.priceMax)
      
      const url = queryParams.toString() 
        ? `${apiUrl}/houses?${queryParams}` 
        : `${apiUrl}/houses`
      
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Ошибка при загрузке домов')
      }
      const result = await response.json()
      
      // Поддержка нового формата (с пагинацией) и старого (массив)
      let houses = []
      let pagination = null
      
      if (result.data && Array.isArray(result.data)) {
        // Новый формат API с пагинацией
        houses = result.data
        pagination = result.pagination
      } else if (Array.isArray(result)) {
        // Старый формат API (массив)
        houses = result
      }
      
      const mappedHouses = houses.map(house => ({
        id: house.id,
        name: house.name || `Дом №${house.number}`,
        number: house.number,
        area: house.area || '',
        rooms: house.rooms || '',
        priceFrom: house.price_from || house.price || 0,
        image: house.image || '/images/houses/placeholder.svg',
        images: Array.isArray(house.images) && house.images.length > 0 
          ? house.images 
          : [house.image || '/images/houses/placeholder.svg'],
        description: house.description || '',
        fullDescription: house.full_description || '',
        characteristics: Array.isArray(house.characteristics) ? house.characteristics : [],
        status: house.status || 'available'
      }))
      
      // Если пользователь запрашивал пагинацию, возвращаем объект
      if (wantsPagination && pagination) {
        return {
          data: mappedHouses,
          pagination: pagination
        }
      }
      
      // Иначе возвращаем просто массив (обратная совместимость)
      return mappedHouses
    } catch (error) {
      console.error('Ошибка при загрузке домов:', error)
      // Если запрашивали пагинацию, возвращаем объект, иначе массив
      const wantsPagination = params.page !== undefined || params.limit !== undefined || params.offset !== undefined
      return wantsPagination ? { data: [], pagination: {} } : []
    }
  },

  // Получить дом по ID
  async getHouseById(id) {
    try {
      const response = await fetch(`${apiUrl}/houses/${id}`)
      if (!response.ok) {
        throw new Error('Ошибка при загрузке дома')
      }
      const house = await response.json()
      
      return {
        id: house.id,
        name: house.name || `Дом №${house.number}`,
        number: house.number,
        area: house.area || '',
        rooms: house.rooms || '',
        priceFrom: house.price_from || house.price || 0,
        image: house.image || '/images/houses/placeholder.svg',
        images: Array.isArray(house.images) && house.images.length > 0 
          ? house.images 
          : [house.image || '/images/houses/placeholder.svg'],
        description: house.description || '',
        fullDescription: house.full_description || '',
        floor_plan: house.floor_plan || house.floorPlan || null,
        characteristics: Array.isArray(house.characteristics) ? house.characteristics : [],
        status: house.status || 'available'
      }
    } catch (error) {
      console.error('Ошибка при загрузке дома:', error)
      return null
    }
  },

  // Получить все проекты
  async getProjects(params = {}) {
    try {
      const queryParams = new URLSearchParams()
      if (params.limit) queryParams.append('limit', params.limit)
      if (params.offset) queryParams.append('offset', params.offset)
      
      const response = await fetch(`${apiUrl}/projects?${queryParams}`)
      if (!response.ok) {
        throw new Error('Ошибка при загрузке проектов')
      }
      const result = await response.json()
      
      // API возвращает {data: [...], pagination: {...}}
      const projects = result.data || []
      
      return {
        data: projects.map(project => ({
          id: project.id,
          name: project.name,
          district: project.district,
          type: project.type,
          description: project.description,
          fullDescription: project.full_description,
          price: project.price,
          priceFrom: project.price_from,
          completion: project.completion,
          parking: project.parking,
          status: project.status,
          discount: project.discount,
          image: project.image || '/images/houses/placeholder.svg',
          images: Array.isArray(project.images) && project.images.length > 0 
            ? project.images 
            : [project.image || '/images/houses/placeholder.svg'],
          developer: project.developer,
          floors: project.floors,
          apartments: project.apartments,
          area: project.area,
          features: Array.isArray(project.features) ? project.features : [],
          housingClass: project.housing_class,
          roomsAvailable: Array.isArray(project.rooms_available) ? project.rooms_available : [],
          paymentTypes: Array.isArray(project.payment_types) ? project.payment_types : [],
          designTypes: Array.isArray(project.design_types) ? project.design_types : []
        })),
        pagination: result.pagination || {}
      }
    } catch (error) {
      console.error('Ошибка при загрузке проектов:', error)
      return { data: [], pagination: {} }
    }
  },

  // Получить проект по ID
  async getProjectById(id) {
    try {
      const response = await fetch(`${apiUrl}/projects/${id}`)
      if (!response.ok) {
        throw new Error('Ошибка при загрузке проекта')
      }
      const project = await response.json()
      
      return {
        id: project.id,
        name: project.name,
        district: project.district,
        type: project.type,
        description: project.description,
        fullDescription: project.full_description,
        price: project.price,
        priceFrom: project.price_from,
        completion: project.completion,
        parking: project.parking,
        status: project.status,
        discount: project.discount,
        image: project.image || '/images/houses/placeholder.svg',
        images: Array.isArray(project.images) && project.images.length > 0 
          ? project.images 
          : [project.image || '/images/houses/placeholder.svg'],
        developer: project.developer,
        floors: project.floors,
        apartments: project.apartments,
        area: project.area,
        features: Array.isArray(project.features) ? project.features : [],
        housingClass: project.housing_class,
        roomsAvailable: Array.isArray(project.rooms_available) ? project.rooms_available : [],
        paymentTypes: Array.isArray(project.payment_types) ? project.payment_types : [],
        designTypes: Array.isArray(project.design_types) ? project.design_types : []
      }
    } catch (error) {
      console.error('Ошибка при загрузке проекта:', error)
      return null
    }
  }
}

