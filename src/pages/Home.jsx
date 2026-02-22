import { Link, useNavigationType, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { api } from '../services/api';
import CustomSelect from '../components/CustomSelect';
import PackageCard from '../components/PackageCard';
import HouseCard from '../components/HouseCard';
import BankCarousel from '../components/BankCarousel';
import ConsultationPopup from '../components/ConsultationPopup';

function Home() {
  const navigationType = useNavigationType();
  const location = useLocation();
  const hasRestoredScroll = useRef(false);
  const isRestoringScroll = useRef(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [packages, setPackages] = useState([]);
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
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

  // Загрузка данных с API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [packagesData, housesResult] = await Promise.all([
          api.getPackages(),
          api.getHouses({ page: 1, limit: 12 })
        ])
        setPackages(packagesData)
        
        // Обрабатываем результат (может быть массив или объект)
        if (Array.isArray(housesResult)) {
          setHouses(housesResult)
          setHasMore(false) // Если пришел массив, пагинации нет
        } else {
          setHouses(housesResult.data)
          setHasMore(housesResult.pagination.hasNextPage)
          setPage(1)
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Функция загрузки следующей страницы
  const loadMoreHouses = async () => {
    if (loadingMore || !hasMore) return

    try {
      setLoadingMore(true)
      const nextPage = page + 1
      const result = await api.getHouses({ page: nextPage, limit: 12 })
      
      if (Array.isArray(result)) {
        setHasMore(false)
      } else {
        setHouses(prev => [...prev, ...result.data])
        setPage(nextPage)
        setHasMore(result.pagination.hasNextPage)
      }
    } catch (error) {
      console.error('Ошибка при загрузке дополнительных домов:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          loadMoreHouses()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    const sentinel = document.getElementById('houses-sentinel')
    if (sentinel) {
      observer.observe(sentinel)
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel)
      }
    }
  }, [hasMore, loading, loadingMore, page])

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
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-[#2C1F14]">
            Способы покупки
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Кредит на строительство */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#2C1F14] transition-colors">
                  Кредит на строительство
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Гибкие условия кредитования
                </p>
              </div>
            </div>

            {/* Ипотека */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#2C1F14] transition-colors">
                  Ипотека
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Выгодные процентные ставки
                </p>
              </div>
            </div>

            {/* Строительство без предоплаты */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#2C1F14] transition-colors">
                  Без предоплаты
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Начните без первоначального взноса
                </p>
              </div>
            </div>

            {/* Рассрочка */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-[#2C1F14] transition-colors">
                  Рассрочка
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Без переплат и скрытых комиссий
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Перечень услуг */}
      <section className="py-16 sm:py-20 bg-white w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-[#2C1F14]">
            Перечень услуг
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Услуга 1 */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] text-white rounded-2xl flex items-center justify-center font-bold text-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  1
                </div>
                <p className="text-base md:text-lg font-semibold text-gray-800 leading-relaxed">
                  Реализуем проект за наличный расчет или в ипотеку
                </p>
              </div>
            </div>

            {/* Услуга 2 */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] text-white rounded-2xl flex items-center justify-center font-bold text-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  2
                </div>
                <p className="text-base md:text-lg font-semibold text-gray-800 leading-relaxed">
                  Возводим дома с соблюдением всех строительных требований
                </p>
              </div>
            </div>

            {/* Услуга 3 */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] text-white rounded-2xl flex items-center justify-center font-bold text-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  3
                </div>
                <p className="text-base md:text-lg font-semibold text-gray-800 leading-relaxed">
                  Стоимость остаётся неизменной, цена зафиксирована в договоре
                </p>
              </div>
            </div>

            {/* Услуга 4 */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] text-white rounded-2xl flex items-center justify-center font-bold text-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  4
                </div>
                <p className="text-base md:text-lg font-semibold text-gray-800 leading-relaxed">
                  Юридическое сопровождение от начала и до конца сделки
                </p>
              </div>
            </div>

            {/* Услуга 5 */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] text-white rounded-2xl flex items-center justify-center font-bold text-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  5
                </div>
                <p className="text-base md:text-lg font-semibold text-gray-800 leading-relaxed">
                  Соблюдаем все сроки, указанные в договоре
                </p>
              </div>
            </div>

            {/* Услуга 6 */}
            <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-300"></div>
              <div className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] text-white rounded-2xl flex items-center justify-center font-bold text-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  6
                </div>
                <p className="text-base md:text-lg font-semibold text-gray-800 leading-relaxed">
                  Работаем с эскроу-счетами
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Карусель банков */}
      <BankCarousel />

      {/* Каталог карточек */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1F14] mb-4">
              Базовые комплектации
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Выберите оптимальную комплектацию для вашего будущего дома
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2C1F14] border-t-transparent"></div>
              <p className="text-gray-600 mt-4">Загрузка комплектаций...</p>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Комплектации не найдены</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Каталог проектов */}
      <section id="catalog" className="py-16 sm:py-20 bg-white w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C1F14] mb-4">
              Наши проекты
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Более 200 реализованных проектов домов для комфортной жизни
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#2C1F14] border-t-transparent"></div>
              <p className="text-gray-600 mt-4">Загрузка проектов...</p>
            </div>
          ) : houses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Проекты не найдены</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {houses.map((house) => (
                  <HouseCard key={house.id} house={house} />
                ))}
              </div>

              {/* Sentinel элемент для infinite scroll */}
              {hasMore && <div id="houses-sentinel" className="h-20"></div>}

              {/* Индикатор загрузки дополнительных домов */}
              {loadingMore && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#2C1F14] border-t-transparent"></div>
                  <p className="text-gray-600 mt-4">Загрузка...</p>
                </div>
              )}

              {/* Сообщение о конце списка */}
              {!hasMore && houses.length > 0 && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-2 text-gray-500">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300"></div>
                    <span className="text-sm font-medium">Все проекты загружены</span>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300"></div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Модальное окно формы "Рассчитать проект" */}
      {isFormOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsFormOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl animate-scaleIn relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Декоративный элемент */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12"></div>
            
            {isFormSubmitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2C1F14] mb-3">
                  Спасибо за заявку!
                </h3>
                <p className="text-gray-600">
                  Мы свяжемся с вами в ближайшее время
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#2C1F14]">
                      Рассчитать проект
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setIsFormOpen(false);
                      setIsFormSubmitted(false);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Закрыть"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-gray-600 mb-6">
                  Оставьте свои контакты, и мы рассчитаем стоимость вашего проекта
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                      placeholder="+7 (___) ___-__-__"
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
                    className="w-full bg-gradient-to-r from-[#2C1F14] to-[#D4A574] text-white py-4 px-6 rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Отправить</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Всплывающий блок консультации */}
      <ConsultationPopup />
    </div>
  );
}

export default Home;

