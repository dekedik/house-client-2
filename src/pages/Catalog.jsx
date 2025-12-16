import { useState, useEffect } from 'react';
import { Link, useNavigationType } from 'react-router-dom';
import CustomSelect from '../components/CustomSelect';
import ProjectCard from '../components/ProjectCard';

function Catalog() {
  const [selectedObject, setSelectedObject] = useState('');
  const [selectedPackageType, setSelectedPackageType] = useState('');
  const [selectedBedrooms, setSelectedBedrooms] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [areaFrom, setAreaFrom] = useState('');
  const [areaTo, setAreaTo] = useState('');
  // Временные значения для модального окна
  const [tempPriceFrom, setTempPriceFrom] = useState('');
  const [tempPriceTo, setTempPriceTo] = useState('');
  const [tempAreaFrom, setTempAreaFrom] = useState('');
  const [tempAreaTo, setTempAreaTo] = useState('');
  const navigationType = useNavigationType();

  // Сохраняем позицию скролла при уходе из каталога
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('catalogScrollPosition', window.scrollY.toString());
    };

    // Сохраняем позицию при переходе на другую страницу
    const handleVisibilityChange = () => {
      if (document.hidden) {
        sessionStorage.setItem('catalogScrollPosition', window.scrollY.toString());
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Восстанавливаем позицию скролла при возврате в каталог
  useEffect(() => {
    // Если это возврат назад (POP навигация), восстанавливаем позицию
    if (navigationType === 'POP') {
      const savedPosition = sessionStorage.getItem('catalogScrollPosition');
      if (savedPosition) {
        // Небольшая задержка для того, чтобы DOM успел отрендериться
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition, 10));
        }, 0);
      }
    } else {
      // Если это новый переход (PUSH), скроллим вверх
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [navigationType]);

  // Mock data для домов
  const houses = [
    { 
      id: 1, 
      name: 'Коттедж "Премиум"', 
      object: 'cottage', 
      packageType: 'premium', 
      bedrooms: 4, 
      status: 'Сданные', 
      price: 8500000, 
      priceFrom: '8 500 000 ₽',
      area: '180 м²',
      rooms: '4 комн.',
      completion: 'Q4 2024',
      description: 'Премиальный коттедж с современной планировкой и качественной отделкой.',
      district: 'Загородная зона',
      image: '/images/houses/cottage-premium.jpg',
      images: ['/images/houses/cottage-premium.jpg']
    },
    { 
      id: 2, 
      name: 'Дачный дом "Комфорт"', 
      object: 'dacha', 
      packageType: 'comfort', 
      bedrooms: 2, 
      status: 'Строятся', 
      price: 3200000, 
      priceFrom: '3 200 000 ₽',
      area: '90 м²',
      rooms: '2 комн.',
      completion: 'Q2 2025',
      description: 'Уютный дачный дом для комфортного отдыха всей семьей.',
      district: 'Дачный поселок',
      image: '/images/houses/dacha-comfort.jpg',
      images: ['/images/houses/dacha-comfort.jpg']
    },
    { 
      id: 3, 
      name: 'Баня "Классика"', 
      object: 'house-bath', 
      packageType: 'standard', 
      bedrooms: 0, 
      status: 'Сданные', 
      price: 1500000, 
      priceFrom: '1 500 000 ₽',
      area: '45 м²',
      rooms: 'Без комнат',
      completion: 'Q3 2024',
      description: 'Классическая русская баня с предбанником и комнатой отдыха.',
      district: 'Загородная зона',
      image: '/images/houses/bath-classic.jpg',
      images: ['/images/houses/bath-classic.jpg']
    },
    { 
      id: 4, 
      name: 'Одноэтажный дом "Уют"', 
      object: 'one-floor', 
      packageType: 'comfort', 
      bedrooms: 3, 
      status: 'Старт продаж', 
      price: 4200000, 
      priceFrom: '4 200 000 ₽',
      area: '120 м²',
      rooms: '3 комн.',
      completion: 'Q3 2025',
      description: 'Уютный одноэтажный дом с просторной гостиной и уютными спальнями.',
      district: 'Жилой район',
      image: '/images/houses/one-floor-cozy.jpg',
      images: ['/images/houses/one-floor-cozy.jpg']
    },
    { 
      id: 5, 
      name: 'Двухэтажный дом "Семейный"', 
      object: 'two-floor', 
      packageType: 'premium', 
      bedrooms: 5, 
      status: 'Сданные', 
      price: 6800000, 
      priceFrom: '6 800 000 ₽',
      area: '200 м²',
      rooms: '5 комн.',
      completion: 'Q1 2024',
      description: 'Просторный двухэтажный дом для большой семьи с современной планировкой.',
      district: 'Премиум район',
      image: '/images/houses/two-floor-family.jpg',
      images: ['/images/houses/two-floor-family.jpg']
    },
    { 
      id: 6, 
      name: 'Дом-баня "Русская"', 
      object: 'house-bath', 
      packageType: 'standard', 
      bedrooms: 2, 
      status: 'Строятся', 
      price: 2800000, 
      priceFrom: '2 800 000 ₽',
      area: '75 м²',
      rooms: '2 комн.',
      completion: 'Q2 2025',
      description: 'Комбинированный дом-баня в традиционном русском стиле.',
      district: 'Загородная зона',
      image: '/images/houses/house-bath-russian.jpg',
      images: ['/images/houses/house-bath-russian.jpg']
    },
    { 
      id: 7, 
      name: 'Коттедж "Элит"', 
      object: 'cottage', 
      packageType: 'premium', 
      bedrooms: 6, 
      status: 'Сданные', 
      price: 12000000, 
      priceFrom: '12 000 000 ₽',
      area: '250 м²',
      rooms: '6 комн.',
      completion: 'Q4 2023',
      description: 'Элитный коттедж премиум-класса с панорамными окнами и террасой.',
      district: 'Элитный поселок',
      image: '/images/houses/cottage-elite.jpg',
      images: ['/images/houses/cottage-elite.jpg']
    },
    { 
      id: 8, 
      name: 'Дачный дом "Мини"', 
      object: 'dacha', 
      packageType: 'standard', 
      bedrooms: 1, 
      status: 'Старт продаж', 
      price: 1800000, 
      priceFrom: '1 800 000 ₽',
      area: '60 м²',
      rooms: '1 комн.',
      completion: 'Q4 2025',
      description: 'Компактный дачный дом для небольшой семьи или отдыха.',
      district: 'Дачный поселок',
      image: '/images/houses/dacha-mini.jpg',
      images: ['/images/houses/dacha-mini.jpg']
    },
  ];

  const objectTypes = [
    { value: '', label: 'Все объекты' },
    { value: 'one-floor', label: 'Одноэтажный дом' },
    { value: 'two-floor', label: 'Двухэтажный дом' },
    { value: 'dacha', label: 'Дачный дом' },
    { value: 'house-bath', label: 'Дом-Баня' },
    { value: 'cottage', label: 'Коттедж' },
  ];

  const packageTypes = [
    { value: '', label: 'Все типы' },
    { value: 'standard', label: 'Стандарт' },
    { value: 'comfort', label: 'Комфорт' },
    { value: 'premium', label: 'Премиум' },
  ];

  const bedroomsOptions = [
    { value: '', label: 'Все' },
    { value: '1', label: '1 Спальня' },
    { value: '2', label: '2 Спальни' },
    { value: '3', label: '3 Спальни' },
    { value: '4', label: '4 Спальни' },
  ];

  const statusOptions = [
    { value: '', label: 'Все статусы' },
    { value: 'completed', label: 'Сданные' },
    { value: 'building', label: 'Строятся' },
    { value: 'pre-sale', label: 'Старт продаж' },
  ];

  const getStatusValue = (status) => {
    const statusMap = {
      'Сданные': 'completed',
      'Строятся': 'building',
      'Старт продаж': 'pre-sale'
    };
    return statusMap[status] || status;
  };

  const filteredHouses = houses.filter(house => {
    const objectMatch = !selectedObject || house.object === selectedObject;
    const packageTypeMatch = !selectedPackageType || house.packageType === selectedPackageType;
    const bedroomsMatch = !selectedBedrooms || house.bedrooms.toString() === selectedBedrooms;
    const statusMatch = !selectedStatus || getStatusValue(house.status) === selectedStatus;
    const priceMatch = (!priceFrom || house.price >= Number(priceFrom)) && (!priceTo || house.price <= Number(priceTo));
    const areaValue = parseInt(house.area.replace(/\s*м².*/, ''));
    const areaMatch = (!areaFrom || areaValue >= Number(areaFrom)) && (!areaTo || areaValue <= Number(areaTo));
    return objectMatch && packageTypeMatch && bedroomsMatch && statusMatch && priceMatch && areaMatch;
  });

  const handleResetFilters = () => {
    setSelectedObject('');
    setSelectedPackageType('');
    setSelectedBedrooms('');
    setSelectedStatus('');
    setPriceFrom('');
    setPriceTo('');
    setAreaFrom('');
    setAreaTo('');
    setTempPriceFrom('');
    setTempPriceTo('');
    setTempAreaFrom('');
    setTempAreaTo('');
  };

  const handleOpenMoreFilters = () => {
    // Копируем текущие значения в временные при открытии модального окна
    setTempPriceFrom(priceFrom);
    setTempPriceTo(priceTo);
    setTempAreaFrom(areaFrom);
    setTempAreaTo(areaTo);
    setShowMoreFilters(true);
  };

  const handleApplyFilters = () => {
    // Применяем временные значения к основным состояниям
    setPriceFrom(tempPriceFrom);
    setPriceTo(tempPriceTo);
    setAreaFrom(tempAreaFrom);
    setAreaTo(tempAreaTo);
    setShowMoreFilters(false);
  };

  const handleCancelFilters = () => {
    // Сбрасываем временные значения и закрываем модальное окно
    setTempPriceFrom(priceFrom);
    setTempPriceTo(priceTo);
    setTempAreaFrom(areaFrom);
    setTempAreaTo(areaTo);
    setShowMoreFilters(false);
  };

  return (
    <div className="min-h-screen bg-white py-6 sm:py-8 md:py-12 w-full overflow-x-hidden">
      <div className="w-full max-w-full">
        <div className="flex items-center justify-between mb-6 sm:mb-8 px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#540b0e]">Каталог</h1>
          <Link 
            to="/"
            className="text-[#540b0e] hover:opacity-80 transition-opacity text-base sm:text-lg md:text-xl font-medium inline-flex items-center"
            aria-label="Вернуться на главную"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </Link>
        </div>

        {/* Горизонтальные фильтры */}
        <div className="px-4 sm:px-6 md:px-8 mb-6 sm:mb-8">
          <div className="bg-gray-50 py-4 sm:py-6 w-full rounded-lg shadow-md">
            <div className="px-4 sm:px-6 md:px-8">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#540b0e]">Фильтры</h2>
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={handleOpenMoreFilters}
                className="text-[#540b0e] font-medium hover:underline transition-colors text-sm sm:text-base"
              >
                Больше фильтров
              </button>
              <span
                onClick={handleResetFilters}
                className="text-[#540b0e] font-medium hover:underline transition-colors cursor-pointer text-sm sm:text-base"
              >
                Сбросить
              </span>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Объект */}
            <CustomSelect
              value={selectedObject}
              onChange={(value) => setSelectedObject(value)}
              options={objectTypes}
              label="Объект"
            />

            {/* Тип комплектации */}
            <CustomSelect
              value={selectedPackageType}
              onChange={(value) => setSelectedPackageType(value)}
              options={packageTypes}
              label="Тип комплектации"
            />

            {/* Спальни */}
            <CustomSelect
              value={selectedBedrooms}
              onChange={(value) => setSelectedBedrooms(value)}
              options={bedroomsOptions}
              label="Спальни"
            />

            {/* Статус */}
            <CustomSelect
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value)}
              options={statusOptions}
              label="Статус"
            />
          </div>
            </div>
          </div>
        </div>

        {/* Модальное окно "Больше фильтров" */}
        {showMoreFilters && (
          <div 
            className="modal-overlay bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4"
            onClick={() => setShowMoreFilters(false)}
          >
            <div 
              className="modal-content bg-white rounded-lg p-8 max-w-2xl w-full animate-fadeIn relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowMoreFilters(false)}
                className="absolute top-4 right-4 text-[#540b0e] text-3xl font-bold hover:opacity-80 transition-opacity"
                aria-label="Закрыть"
              >
                ✕
              </button>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">Больше фильтров</h3>
              
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div>
                  <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
                    Площадь дома (м²)
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input
                        type="number"
                        value={tempAreaFrom}
                        onChange={(e) => setTempAreaFrom(e.target.value)}
                        placeholder="От"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#540b0e] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={tempAreaTo}
                        onChange={(e) => setTempAreaTo(e.target.value)}
                        placeholder="До"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#540b0e] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
                    Цена (₽)
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <input
                        type="number"
                        value={tempPriceFrom}
                        onChange={(e) => setTempPriceFrom(e.target.value)}
                        placeholder="От"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#540b0e] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={tempPriceTo}
                        onChange={(e) => setTempPriceTo(e.target.value)}
                        placeholder="До"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#540b0e] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    setTempPriceFrom('');
                    setTempPriceTo('');
                    setTempAreaFrom('');
                    setTempAreaTo('');
                  }}
                  className="flex-1 border-2 border-gray-300 text-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
                >
                  Сбросить
                </button>
                <button
                  onClick={handleCancelFilters}
                  className="flex-1 border-2 border-gray-300 text-gray-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
                >
                  Отмена
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 bg-[#540b0e] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-[#43090b] transition-colors font-medium text-sm sm:text-base"
                >
                  Применить
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Карточки домов */}
        <div className="px-4 sm:px-6 md:px-8">
          {filteredHouses.length === 0 ? (
            <div className="bg-gray-50 p-8 sm:p-12 border border-gray-200 rounded-lg text-center">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600">По вашему запросу ничего не найдено</p>
              <p className="text-sm sm:text-base md:text-lg text-gray-500 mt-2">Попробуйте изменить параметры фильтра</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredHouses.map((house) => (
                <ProjectCard key={house.id} project={house} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
