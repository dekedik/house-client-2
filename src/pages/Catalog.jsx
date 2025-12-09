import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function Catalog() {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [areaRange, setAreaRange] = useState([0, 500]);

  // Mock data для домов
  const houses = [
    { id: 1, title: 'Коттедж "Премиум"', type: 'cottages', price: 8500000, area: 180, bedrooms: 4, image: '/images/houses/cottage-premium.jpg' },
    { id: 2, title: 'Дачный дом "Комфорт"', type: 'dachas', price: 3200000, area: 90, bedrooms: 2, image: '/images/houses/dacha-comfort.jpg' },
    { id: 3, title: 'Баня "Классика"', type: 'baths', price: 1500000, area: 45, bedrooms: 0, image: '/images/houses/bath-classic.jpg' },
    { id: 4, title: 'Одноэтажный дом "Уют"', type: 'one-floor', price: 4200000, area: 120, bedrooms: 3, image: '/images/houses/one-floor-cozy.jpg' },
    { id: 5, title: 'Двухэтажный дом "Семейный"', type: 'two-floor', price: 6800000, area: 200, bedrooms: 5, image: '/images/houses/two-floor-family.jpg' },
    { id: 6, title: 'Дом-баня "Русская"', type: 'house-bath', price: 2800000, area: 75, bedrooms: 2, image: '/images/houses/house-bath-russian.jpg' },
    { id: 7, title: 'Коттедж "Элит"', type: 'cottages', price: 12000000, area: 250, bedrooms: 6, image: '/images/houses/cottage-elite.jpg' },
    { id: 8, title: 'Дачный дом "Мини"', type: 'dachas', price: 1800000, area: 60, bedrooms: 1, image: '/images/houses/dacha-mini.jpg' },
  ];

  const types = [
    { value: 'all', label: 'Все' },
    { value: 'cottages', label: 'Коттеджи' },
    { value: 'dachas', label: 'Дачные дома' },
    { value: 'baths', label: 'Бани' },
    { value: 'one-floor', label: 'Одноэтажные' },
    { value: 'two-floor', label: 'Двухэтажные' },
    { value: 'house-bath', label: 'Дома-бани' },
  ];

  const filteredHouses = houses.filter(house => {
    const typeMatch = selectedType === 'all' || house.type === selectedType;
    const priceMatch = house.price >= priceRange[0] && house.price <= priceRange[1];
    const areaMatch = house.area >= areaRange[0] && house.area <= areaRange[1];
    return typeMatch && priceMatch && areaMatch;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Каталог домов</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 bg-gray-50 p-6 border border-gray-200 h-fit lg:sticky lg:top-24">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Фильтры</h2>

            {/* Type Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-900">Тип дома</h3>
              <div className="space-y-2">
                {types.map(type => (
                  <label key={type.value} className="flex items-center cursor-pointer py-1">
                    <input
                      type="radio"
                      name="type"
                      value={type.value}
                      checked={selectedType === type.value}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="mr-3 w-4 h-4 text-accent-600 focus:ring-accent-500"
                    />
                    <span className="text-gray-700">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-900">Цена, ₽</h3>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="От"
                  value={priceRange[0] || ''}
                  onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
                <input
                  type="number"
                  placeholder="До"
                  value={priceRange[1] || ''}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 10000000])}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
            </div>

            {/* Area Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-900">Площадь, м²</h3>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="От"
                  value={areaRange[0] || ''}
                  onChange={(e) => setAreaRange([Number(e.target.value) || 0, areaRange[1]])}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
                <input
                  type="number"
                  placeholder="До"
                  value={areaRange[1] || ''}
                  onChange={(e) => setAreaRange([areaRange[0], Number(e.target.value) || 500])}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedType('all');
                setPriceRange([0, 10000000]);
                setAreaRange([0, 500]);
              }}
              className="w-full bg-gray-200 text-gray-700 px-4 py-2.5 hover:bg-gray-300 transition-colors font-medium"
            >
              Сбросить фильтры
            </button>
          </aside>

          {/* Houses Grid */}
          <div className="flex-1">
            <div className="mb-6 text-gray-600">
              Найдено домов: <span className="font-semibold text-gray-900">{filteredHouses.length}</span>
            </div>

            {filteredHouses.length === 0 ? (
              <div className="bg-gray-50 p-12 border border-gray-200 text-center">
                <p className="text-xl text-gray-600">По вашему запросу ничего не найдено</p>
                <p className="text-gray-500 mt-2">Попробуйте изменить параметры фильтра</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHouses.map(house => (
                  <div key={house.id} className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img 
                        src={house.image} 
                        alt={house.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = '/images/houses/placeholder.svg';
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-900">{house.title}</h3>
                      <div className="space-y-3 mb-6 text-gray-700">
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span>Площадь:</span>
                          <span className="font-semibold text-gray-900">{house.area} м²</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 pb-2">
                          <span>Спальни:</span>
                          <span className="font-semibold text-gray-900">{house.bedrooms}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                          <span>Цена:</span>
                          <span>{formatPrice(house.price)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 bg-accent-600 text-white px-4 py-2.5 hover:bg-accent-700 transition-colors font-medium">
                          Подробнее
                        </button>
                        <button className="flex-1 border-2 border-gray-300 text-gray-700 px-4 py-2.5 hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium">
                          В избранное
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;

