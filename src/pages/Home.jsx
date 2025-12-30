import { Link, useNavigationType, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { packages } from '../data/packages';
import { projects } from '../data/projects';
import CustomSelect from '../components/CustomSelect';
import PackageCard from '../components/PackageCard';
import HouseCard from '../components/HouseCard';

function Home() {
  const navigationType = useNavigationType();
  const location = useLocation();
  const hasRestoredScroll = useRef(false);
  const isRestoringScroll = useRef(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    object: ''
  });

  const objectTypes = [
    { value: '', label: 'Выберите объект' },
    { value: 'one-floor', label: 'Одноэтажный дом' },
    { value: 'two-floor', label: 'Двухэтажный дом' },
    { value: 'dacha', label: 'Дачный дом' },
    { value: 'house-bath', label: 'Дом-Баня' },
    { value: 'cottage', label: 'Коттедж' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Форма отправлена:', formData);
    setIsFormSubmitted(true);
    setFormData({ name: '', phone: '', object: '' });
    
    // Закрываем модальное окно через 3 секунды
    setTimeout(() => {
      setIsFormOpen(false);
      setIsFormSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleObjectChange = (value) => {
    setFormData({
      ...formData,
      object: value
    });
  };

  // Сохраняем позицию скролла при уходе со страницы
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Предотвращаем автоматический скролл вверх при возврате
  useLayoutEffect(() => {
    if (location.pathname === '/') {
      const fromPackageDetail = sessionStorage.getItem('fromPackageDetail');
      if (fromPackageDetail === 'true' && !isRestoringScroll.current) {
        isRestoringScroll.current = true;
        // Блокируем автоматический скролл вверх
        window.scrollTo(0, window.scrollY);
      }
    }
  }, [location.pathname]);

  // Восстанавливаем позицию скролла при возврате на главную
  useEffect(() => {
    if (location.pathname === '/') {
      const fromPackageDetail = sessionStorage.getItem('fromPackageDetail');
      
      if (fromPackageDetail === 'true' && !hasRestoredScroll.current) {
        hasRestoredScroll.current = true;
        const savedPosition = sessionStorage.getItem('homeScrollPosition');
        const selectedPackageId = sessionStorage.getItem('selectedPackageId');
        
        // Сразу пытаемся восстановить позицию без задержек
        const restoreScroll = () => {
          if (selectedPackageId) {
            const cardElement = document.querySelector(`[data-card-id="${selectedPackageId}"]`);
            if (cardElement) {
              // Карточка найдена, прокручиваем к ней сразу
              const rect = cardElement.getBoundingClientRect();
              const scrollTop = window.scrollY || document.documentElement.scrollTop;
              const cardTop = rect.top + scrollTop - 120;
              window.scrollTo({ top: Math.max(0, cardTop), behavior: 'auto' });
              sessionStorage.removeItem('fromPackageDetail');
              isRestoringScroll.current = false;
              return true;
            }
          }
          if (savedPosition) {
            window.scrollTo({ top: parseInt(savedPosition, 10), behavior: 'auto' });
            sessionStorage.removeItem('fromPackageDetail');
            isRestoringScroll.current = false;
            return true;
          }
          return false;
        };

        // Пытаемся восстановить сразу
        if (!restoreScroll()) {
          // Если не получилось, пробуем еще раз после небольшой задержки
          const interval = setInterval(() => {
            if (restoreScroll()) {
              clearInterval(interval);
            }
          }, 50);
          
          // Останавливаем попытки через 1 секунду
          setTimeout(() => {
            clearInterval(interval);
            isRestoringScroll.current = false;
          }, 1000);
        }
      } else if (navigationType !== 'POP') {
        // При новом переходе очищаем сохраненную позицию
        sessionStorage.removeItem('homeScrollPosition');
        sessionStorage.removeItem('selectedPackageId');
        sessionStorage.removeItem('fromPackageDetail');
        hasRestoredScroll.current = false;
        isRestoringScroll.current = false;
      }
    } else {
      hasRestoredScroll.current = false;
      isRestoringScroll.current = false;
    }
  }, [location.pathname, navigationType]);

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <div className="w-full relative max-w-full overflow-hidden h-screen">
        <img 
          src="/fon2-photoaidcom-darken.png" 
          alt="Фон" 
          className="w-full h-full object-cover mx-auto block max-w-full"
          style={{ display: 'block' }}
        />
        <div className="absolute top-[18%] left-0 right-0 text-center w-full px-4">
          <p className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-semibold mb-4 sm:mb-6 md:mb-8" style={{ opacity: 0.7 }}>
            Индивидуальный подход <br /> к каждому клиенту!
          </p>
        </div>
        {/* Кнопки слева внизу - скрыты на мобильных */}
        <div className="flex absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex-col sm:flex-row gap-3 sm:gap-4 z-10" style={{ maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center sm:flex-row gap-3 sm:gap-4">
            <a
              href="#catalog"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('catalog');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="w-full sm:w-auto bg-white px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-full font-semibold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-200 shadow-lg text-center backdrop-blur-sm text-[#2C1F14] whitespace-nowrap cursor-pointer"
              style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
            >
              Каталог
            </a>
            <button
              onClick={() => setIsFormOpen(true)}
              className="w-full sm:w-auto bg-white px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-full font-semibold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-200 shadow-lg backdrop-blur-sm text-[#2C1F14] whitespace-nowrap"
              style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
            >
              Рассчитать проект
            </button>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('openMortgageCalculator'));
              }}
              className="w-full sm:w-auto bg-white px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-full font-semibold text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-200 shadow-lg backdrop-blur-sm text-[#2C1F14] whitespace-nowrap"
              style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
            >
              Рассчитать ипотеку
            </button>
          </div>
        </div>
      </div>

      {/* Способы покупки */}
      <section className="py-10 sm:py-12 bg-white w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-[#2C1F14]">
            Способы покупки
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* Кредит на строительство */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer text-center">
              <div className="mb-2">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-[#2C1F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base font-semibold mb-1 text-gray-900">
                Кредит на строительство
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-tight">
                Гибкие условия кредитования
              </p>
            </div>

            {/* Ипотека */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer text-center">
              <div className="mb-2">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-[#2C1F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base font-semibold mb-1 text-gray-900">
                Ипотека
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-tight">
                Выгодные процентные ставки
              </p>
            </div>

            {/* Строительство без предоплаты */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer text-center">
              <div className="mb-2">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-[#2C1F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base font-semibold mb-1 text-gray-900">
                Без предоплаты
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-tight">
                Начните без первоначального взноса
              </p>
            </div>

            {/* Рассрочка */}
            <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer text-center">
              <div className="mb-2">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-[#2C1F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-sm sm:text-base font-semibold mb-1 text-gray-900">
                Рассрочка
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-tight">
                Без переплат и скрытых комиссий
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Каталог карточек */}
      <section className="py-10 sm:py-12 bg-white w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-[#2C1F14]">
            Пакетные решения
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Каталог проектов */}
      <section id="catalog" className="py-10 sm:py-12 bg-white w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-[#2C1F14]">
            Каталог проектов
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {projects.map((house) => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>
        </div>
      </section>

      



      {/* Модальное окно формы "Рассчитать проект" */}
      {isFormOpen && (
        <div 
          className="modal-overlay bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4 overflow-y-auto fixed top-0 left-0 right-0 bottom-0"
          onClick={() => setIsFormOpen(false)}
        >
          <div 
            className="modal-content bg-white rounded-lg p-8 max-w-2xl w-full animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {isFormSubmitted ? 'Спасибо!' : 'Рассчитать проект'}
              </h2>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setIsFormSubmitted(false);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl"
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>
            
            {isFormSubmitted ? (
              <div className="text-center py-8 sm:py-12">
                <div className="mb-4 sm:mb-6">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-[#2C1F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Спасибо за заявку!
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-600">
                  Мы с вами обязательно свяжемся!
                </p>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C1F14] focus:border-transparent outline-none transition-all"
                  placeholder="Введите ваше имя"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C1F14] focus:border-transparent outline-none transition-all"
                  placeholder="Введите ваш телефон"
                />
              </div>
              <CustomSelect
                value={formData.object}
                onChange={handleObjectChange}
                options={objectTypes}
                label="Объект"
              />
              <button
                type="submit"
                className="w-full bg-[#2C1F14] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-[#3D2817] transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Отправить
              </button>
            </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

