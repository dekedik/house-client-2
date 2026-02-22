import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import CustomSelect from '../components/CustomSelect';
import Breadcrumbs from '../components/Breadcrumbs';
import PackagesComparison from '../components/PackagesComparison';
import ConsultationPopup from '../components/ConsultationPopup';

function ProjectDetail() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isCallFormOpen, setIsCallFormOpen] = useState(false);
  const [isMortgageCalculatorOpen, setIsMortgageCalculatorOpen] = useState(false);
  const [mortgageStep, setMortgageStep] = useState('calculator'); // 'calculator' или 'application'
  const [callFormData, setCallFormData] = useState({
    name: '',
    phone: '',
    reason: ''
  });
  const [mortgageApplicationData, setMortgageApplicationData] = useState({
    name: '',
    phone: ''
  });
  const [mortgageData, setMortgageData] = useState({
    propertyPrice: '',
    initialPayment: '',
    loanTerm: '20',
    interestRate: '10'
  });
  const [mortgageResults, setMortgageResults] = useState({
    loanAmount: 0,
    monthlyPayment: 0,
    totalPayment: 0,
    overpayment: 0
  });

  // Загрузка дома с API
  useEffect(() => {
    const loadHouse = async () => {
      try {
        setLoading(true);
        const houseData = await api.getHouseById(id);
        setHouse(houseData);
      } catch (error) {
        console.error('Ошибка при загрузке дома:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      loadHouse();
    }
  }, [id]);

  const [isFloorPlanModalOpen, setIsFloorPlanModalOpen] = useState(false);

  // Преобразуем house в формат project для совместимости
  const project = house ? {
    id: house.id,
    name: house.name,
    priceFrom: house.priceFrom,
    area: house.area,
    rooms: house.rooms,
    description: house.description,
    fullDescription: house.fullDescription,
    characteristics: house.characteristics || [],
    images: house.images || [],
    floorPlan: house.floor_plan || house.floorPlan || null
  } : null;

  // Удален статический массив projects - данные теперь загружаются с API
  // Старый код:
  /* const projects = [
    { 
      id: 1, 
      name: 'Коттедж "Премиум"', 
      priceFrom: '8 500 000 ₽',
      area: '180 м²',
      rooms: '4 комн.',
      description: 'Премиальный коттедж с современной планировкой и качественной отделкой.',
      fullDescription: 'Премиальный коттедж с современной планировкой и качественной отделкой. Просторные комнаты, большие окна, терраса с видом на сад. Этот премиальный коттедж представляет собой идеальное сочетание современного комфорта и классической элегантности. Проект разработан с учетом всех современных требований к жилью премиум-класса.',
      characteristics: [
        'Площадь: 180 м²',
        'Количество комнат: 4',
        'Этажность: 2',
        'Материал стен: Кирпич',
        'Тип кровли: Металлочерепица',
        'Отопление: Автономное',
        'Канализация: Центральная',
        'Водоснабжение: Центральное'
      ],
      images: ['/images/houses/cottage-premium.jpg', '/images/houses/cottage-premium.jpg', '/images/houses/cottage-premium.jpg']
    },
    { 
      id: 2, 
      name: 'Дачный дом "Комфорт"', 
      priceFrom: '3 200 000 ₽',
      area: '90 м²',
      rooms: '2 комн.',
      description: 'Уютный дачный дом для комфортного отдыха всей семьей.',
      fullDescription: 'Уютный дачный дом для комфортного отдыха всей семьей. Идеально подходит для летнего отдыха и выходных дней. Компактная планировка с удобной кухней и гостиной.',
      characteristics: [
        'Площадь: 90 м²',
        'Количество комнат: 2',
        'Этажность: 1',
        'Материал стен: Каркас',
        'Тип кровли: Металлочерепица',
        'Отопление: Печное',
        'Канализация: Септик',
        'Водоснабжение: Скважина'
      ],
      images: ['/images/houses/dacha-comfort.jpg']
    },
    { 
      id: 3, 
      name: 'Баня "Классика"', 
      priceFrom: '1 500 000 ₽',
      area: '45 м²',
      rooms: 'Без комнат',
      description: 'Классическая русская баня с предбанником и комнатой отдыха.',
      fullDescription: 'Классическая русская баня с предбанником и комнатой отдыха. Традиционная русская баня с печью-каменкой и парной.',
      characteristics: [
        'Площадь: 45 м²',
        'Парная: Есть',
        'Предбанник: Есть',
        'Комната отдыха: Есть',
        'Материал: Брус',
        'Печь: Каменка'
      ],
      images: ['/images/houses/bath-classic.jpg']
    },
    { 
      id: 4, 
      name: 'Одноэтажный дом "Уют"', 
      priceFrom: '4 200 000 ₽',
      area: '120 м²',
      rooms: '3 комн.',
      description: 'Уютный одноэтажный дом с просторной гостиной и уютными спальнями.',
      fullDescription: 'Уютный одноэтажный дом с просторной гостиной и уютными спальнями. Идеальный вариант для семьи с детьми.',
      characteristics: [
        'Площадь: 120 м²',
        'Количество комнат: 3',
        'Этажность: 1',
        'Материал стен: Газоблок',
        'Тип кровли: Металлочерепица'
      ],
      images: ['/images/houses/one-floor-cozy.jpg']
    },
    { 
      id: 5, 
      name: 'Двухэтажный дом "Семейный"', 
      priceFrom: '6 800 000 ₽',
      area: '200 м²',
      rooms: '5 комн.',
      description: 'Просторный двухэтажный дом для большой семьи с современной планировкой.',
      fullDescription: 'Просторный двухэтажный дом для большой семьи с современной планировкой. Большое количество комнат и просторные общие зоны.',
      characteristics: [
        'Площадь: 200 м²',
        'Количество комнат: 5',
        'Этажность: 2',
        'Материал стен: Кирпич',
        'Тип кровли: Металлочерепица'
      ],
      images: ['/images/houses/two-floor-family.jpg']
    },
    { 
      id: 6, 
      name: 'Дом-баня "Русская"', 
      priceFrom: '2 800 000 ₽',
      area: '75 м²',
      rooms: '2 комн.',
      description: 'Комбинированный дом-баня в традиционном русском стиле.',
      fullDescription: 'Комбинированный дом-баня в традиционном русском стиле. Уникальное сочетание жилого пространства и бани.',
      characteristics: [
        'Площадь: 75 м²',
        'Количество комнат: 2',
        'Баня: Встроенная',
        'Материал: Брус'
      ],
      images: ['/images/houses/house-bath-russian.jpg']
    },
    { 
      id: 7, 
      name: 'Коттедж "Элит"', 
      priceFrom: '12 000 000 ₽',
      area: '250 м²',
      rooms: '6 комн.',
      description: 'Элитный коттедж премиум-класса с панорамными окнами и террасой.',
      fullDescription: 'Элитный коттедж премиум-класса с панорамными окнами и террасой. Максимальный комфорт и роскошь.',
      characteristics: [
        'Площадь: 250 м²',
        'Количество комнат: 6',
        'Этажность: 2',
        'Материал стен: Кирпич',
        'Тип кровли: Металлочерепица',
        'Терраса: Есть',
        'Гараж: Есть'
      ],
      images: ['/images/houses/cottage-elite.jpg']
    },
    { 
      id: 8, 
      name: 'Дачный дом "Мини"', 
      priceFrom: '1 800 000 ₽',
      area: '60 м²',
      rooms: '1 комн.',
      description: 'Компактный дачный дом для небольшой семьи или отдыха.',
      fullDescription: 'Компактный дачный дом для небольшой семьи или отдыха. Экономичный вариант для дачного участка.',
      characteristics: [
        'Площадь: 60 м²',
        'Количество комнат: 1',
        'Этажность: 1',
        'Материал стен: Каркас',
        'Тип кровли: Металлочерепица'
      ],
      images: ['/images/houses/dacha-mini.jpg']
    },
  ]; */

  useEffect(() => {
    if (house) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, house]);

  // Обработка изображений
  const getImages = () => {
    if (house?.images && Array.isArray(house.images) && house.images.length > 0) {
      return house.images;
    }
    if (house?.image) {
      return [house.image];
    }
    return ['/images/houses/placeholder.svg'];
  };

  const images = house ? getImages() : [];

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Обработка свайпов
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  const handleCallFormSubmit = (e) => {
    e.preventDefault();
    console.log('Форма заказа звонка отправлена:', callFormData);
    alert('Спасибо за заявку! Мы перезвоним вам в ближайшее время.');
    setCallFormData({ name: '', phone: '', reason: '' });
    setIsCallFormOpen(false);
  };

  const handleCallFormChange = (e) => {
    setCallFormData({
      ...callFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleMortgageApplicationChange = (e) => {
    setMortgageApplicationData({
      ...mortgageApplicationData,
      [e.target.name]: e.target.value
    });
  };

  const handleMortgageApplicationSubmit = (e) => {
    e.preventDefault();
    console.log('Заявка на ипотеку отправлена:', {
      ...mortgageApplicationData,
      mortgageResults
    });
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    setMortgageApplicationData({ name: '', phone: '' });
    setMortgageStep('calculator');
    setIsMortgageCalculatorOpen(false);
  };

  const handleMortgageChange = (e) => {
    const { name, value } = e.target;
    setMortgageData({
      ...mortgageData,
      [name]: value
    });
  };

  const formatNumber = (num) => {
    if (!num) return '';
    const numStr = num.toString().replace(/\s/g, '');
    return new Intl.NumberFormat('ru-RU').format(numStr);
  };

  const calculateMortgage = useCallback(() => {
    const price = parseFloat(mortgageData.propertyPrice.replace(/\s/g, '')) || 0;
    const initial = parseFloat(mortgageData.initialPayment.replace(/\s/g, '')) || 0;
    const term = parseFloat(mortgageData.loanTerm) || 20;
    const rate = parseFloat(mortgageData.interestRate) || 10;
    const MAX_LIMIT = 500000000; // Лимит 500 миллионов

    if (price > 0 && initial >= 0 && price > initial) {
      let loanAmount = price - initial;
      
      // Ограничиваем сумму кредита лимитом
      if (loanAmount > MAX_LIMIT) {
        loanAmount = MAX_LIMIT;
      }
      
      const monthlyRate = (rate / 100) / 12;
      const numberOfPayments = term * 12;

      let monthlyPayment = 0;
      if (monthlyRate > 0) {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                       (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      } else {
        monthlyPayment = loanAmount / numberOfPayments;
      }

      const totalPayment = monthlyPayment * numberOfPayments;
      const overpayment = totalPayment - loanAmount;

      setMortgageResults({
        loanAmount: Math.round(loanAmount),
        monthlyPayment: Math.round(monthlyPayment),
        totalPayment: Math.round(totalPayment),
        overpayment: Math.round(overpayment)
      });
    } else {
      setMortgageResults({
        loanAmount: 0,
        monthlyPayment: 0,
        totalPayment: 0,
        overpayment: 0
      });
    }
  }, [mortgageData]);

  useEffect(() => {
    if (isMortgageCalculatorOpen && project?.priceFrom) {
      // Автоматически подставляем цену из карточки
      const priceValue = project.priceFrom.replace(/\s/g, '').replace('₽', '').replace(/\D/g, '');
      if (priceValue) {
        // Используем setTimeout для избежания синхронного setState в эффекте
        setTimeout(() => {
          setMortgageData(prev => ({
            ...prev,
            propertyPrice: formatNumber(priceValue)
          }));
        }, 0);
      }
    }
  }, [isMortgageCalculatorOpen, project]);

  useEffect(() => {
    if (isMortgageCalculatorOpen && mortgageData.propertyPrice) {
      // Используем setTimeout для избежания синхронного setState в эффекте
      const timer = setTimeout(() => {
        calculateMortgage();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [mortgageData, isMortgageCalculatorOpen, calculateMortgage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Загрузка проекта...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Проект не найден</h1>
          <Link to="/" className="text-[#2C1F14] hover:opacity-80">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 md:pb-12 w-full overflow-x-hidden">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">

        {/* Основной контент: фото слева, информация справа */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Слайдер фото слева (75%) */}
          <div className="w-full lg:w-3/4 relative">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[30rem] xl:h-[37.5rem] overflow-hidden bg-gray-100 rounded-lg">
              {images.length > 0 && (
                <>
                  <img
                    src={images[currentImageIndex]}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/houses/placeholder.svg';
                    }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  />

                  {/* Навигационные стрелки */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevious}
                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-75 transition-opacity"
                        aria-label="Предыдущее изображение"
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-75 transition-opacity"
                        aria-label="Следующее изображение"
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Индикаторы (точки) */}
                  {images.length > 1 && (
                    <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-6 sm:w-8'
                              : 'bg-white bg-opacity-50'
                          }`}
                          aria-label={`Изображение ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Миниатюры */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`overflow-hidden rounded-lg h-16 sm:h-20 md:h-24 ${
                      index === currentImageIndex 
                        ? 'ring-2 sm:ring-4 ring-[#2C1F14]' 
                        : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${project.name} - миниатюра ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/houses/placeholder.svg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Информация справа (25%) */}
          <div className="w-full lg:w-1/4">
            {/* Кнопка назад */}

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">{project.name}</h1>

            {/* Комнаты, Площадь */}
            <div className="mb-6 sm:mb-8 space-y-4">
              {project.rooms && (
                <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Комнаты</div>
                      <div className="text-2xl font-bold text-[#2C1F14]">{project.rooms}</div>
                    </div>
                  </div>
                </div>
              )}

              {project.area && (
                <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8"></div>
                  <div className="relative flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-1">Площадь</div>
                      <div className="text-2xl font-bold text-[#2C1F14]">{project.area}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Кнопки */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <button
                onClick={() => setIsCallFormOpen(true)}
                className="w-full bg-gradient-to-r from-[#2C1F14] to-[#D4A574] text-white px-6 py-4 text-lg font-bold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Заказать звонок</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <button
                onClick={() => setIsMortgageCalculatorOpen(true)}
                className="w-full border-2 border-[#2C1F14] text-[#2C1F14] px-6 py-4 text-lg font-bold rounded-xl hover:bg-gradient-to-r hover:from-[#2C1F14] hover:to-[#D4A574] hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Рассчитать ипотеку</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Описание, характеристики и планировка */}
        <div className="space-y-12 mt-12">
          {/* Описание */}
          <div className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#2C1F14] to-[#D4A574]"></div>
            <div className="pl-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1F14] mb-6 flex items-center gap-3">
                <svg className="w-8 h-8 text-[#2C1F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Описание проекта
              </h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  {project.description}
                </p>
                {project.fullDescription && (
                  <p className="text-lg leading-relaxed">
                    {project.fullDescription}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Планировка */}
          {project.floorPlan && (
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1F14] mb-6 flex items-center gap-3">
                <svg className="w-8 h-8 text-[#2C1F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                </svg>
                Планировка
              </h2>
              <div 
                className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 max-w-4xl mx-auto"
                onClick={() => setIsFloorPlanModalOpen(true)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1F14]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-[#2C1F14] font-bold flex items-center gap-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      Посмотреть планировку
                    </span>
                  </div>
                </div>
                <img
                  src={project.floorPlan.startsWith('http') ? project.floorPlan : `https://admin-doman-horizont.ru${project.floorPlan}`}
                  alt="Планировка дома"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/images/houses/placeholder.svg';
                  }}
                />
              </div>
            </div>
          )}

          {/* Характеристики */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1F14] mb-6 flex items-center gap-3">
              <svg className="w-8 h-8 text-[#2C1F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Характеристики
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {project.characteristics?.map((char, index) => {
                const parts = char.split(':');
                const label = parts[0]?.trim() || '';
                const value = parts[1]?.trim() || char;
                
                return (
                  <div 
                    key={index} 
                    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-300"></div>
                    {label && value !== char ? (
                      <>
                        <div className="relative text-xs sm:text-sm text-gray-500 mb-2 font-semibold uppercase tracking-wider">
                          {label}
                        </div>
                        <div className="relative text-lg sm:text-xl font-bold text-[#2C1F14] group-hover:text-[#D4A574] transition-colors duration-300">
                          {value}
                        </div>
                      </>
                    ) : (
                      <div className="relative text-base font-semibold text-gray-800">
                        {char}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Сравнение комплектаций */}
        <div className="mt-12">
          <PackagesComparison />
        </div>

        {/* Модальное окно формы "Заказать звонок" */}
        {isCallFormOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setIsCallFormOpen(false)}
          >
            <div 
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scaleIn relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Декоративный элемент */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12"></div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[#2C1F14]">
                    Заказать звонок
                  </h2>
                </div>
                <button
                  onClick={() => setIsCallFormOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Закрыть"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                Оставьте свои контакты, и мы свяжемся с вами в ближайшее время
              </p>

              <form onSubmit={handleCallFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="call-name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="call-name"
                    name="name"
                    value={callFormData.name}
                    onChange={handleCallFormChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                    placeholder="Введите ваше имя"
                  />
                </div>
                <div>
                  <label htmlFor="call-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="call-phone"
                    name="phone"
                    value={callFormData.phone}
                    onChange={handleCallFormChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <CustomSelect
                  value={callFormData.reason}
                  onChange={(value) => setCallFormData({ ...callFormData, reason: value })}
                  options={[
                    { value: '', label: 'Выберите причину' },
                    { value: 'Покупка', label: 'Покупка' },
                    { value: 'Ипотека', label: 'Ипотека' },
                    { value: 'Рассрочка', label: 'Рассрочка' }
                  ]}
                  label="Причина"
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
            </div>
          </div>
        )}

        {/* Модальное окно калькулятора ипотеки */}
        {isMortgageCalculatorOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-2 sm:p-4 animate-fadeIn overflow-y-auto"
            onClick={() => setIsMortgageCalculatorOpen(false)}
          >
            <div 
              className="bg-white rounded-2xl p-3 sm:p-6 md:p-8 max-w-2xl w-full shadow-2xl animate-scaleIn relative overflow-hidden max-h-[95vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Декоративный элемент */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12"></div>
              
              <div className="flex items-center justify-between mb-2 sm:mb-4 md:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-base sm:text-xl md:text-2xl font-bold text-[#2C1F14] pr-2">
                    {mortgageStep === 'calculator' ? 'Калькулятор ипотеки' : 'Оставить заявку на ипотеку'}
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setIsMortgageCalculatorOpen(false);
                    setMortgageStep('calculator');
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                  aria-label="Закрыть"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {mortgageStep === 'calculator' ? (
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-6 md:gap-8">
                <div className="w-full lg:w-1/2">
                  <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Параметр кредита</h3>
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1 sm:mb-2">
                        Стоимость недвижимости, ₽
                      </label>
                      <input
                        type="text"
                        name="propertyPrice"
                        value={mortgageData.propertyPrice}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setMortgageData({ ...mortgageData, propertyPrice: formatNumber(value) });
                        }}
                        placeholder="Введите стоимость"
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C1F14] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1 sm:mb-2">
                        Первоначальный взнос, ₽
                      </label>
                      <input
                        type="text"
                        name="initialPayment"
                        value={mortgageData.initialPayment}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setMortgageData({ ...mortgageData, initialPayment: formatNumber(value) });
                        }}
                        placeholder="Введите сумму взноса"
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C1F14] focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1 sm:mb-2">
                        Срок кредита (лет)
                      </label>
                      <input
                        type="text"
                        name="loanTerm"
                        value={mortgageData.loanTerm}
                        onChange={handleMortgageChange}
                        placeholder="Введите срок"
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C1F14] focus:border-transparent outline-none transition-all mb-1 sm:mb-2"
                      />
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {[5, 10, 15, 20, 25, 30].map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => setMortgageData({ ...mortgageData, loanTerm: term.toString() })}
                            className={`px-2 sm:px-3 py-1 text-xs rounded-lg border transition-colors ${
                              mortgageData.loanTerm === term.toString()
                                ? 'bg-[#2C1F14] text-white border-[#2C1F14]'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#2C1F14]'
                            }`}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1 sm:mb-2">
                        Процентная ставка (% годовых)
                      </label>
                      <input
                        type="text"
                        name="interestRate"
                        value={mortgageData.interestRate}
                        onChange={handleMortgageChange}
                        placeholder="Введите ставку"
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C1F14] focus:border-transparent outline-none transition-all mb-1 sm:mb-2"
                      />
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {[7.5, 8, 8.5, 9, 9.5].map((rate) => (
                          <button
                            key={rate}
                            type="button"
                            onClick={() => setMortgageData({ ...mortgageData, interestRate: rate.toString() })}
                            className={`px-2 sm:px-3 py-1 text-xs rounded-lg border transition-colors ${
                              mortgageData.interestRate === rate.toString()
                                ? 'bg-[#2C1F14] text-white border-[#2C1F14]'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#2C1F14]'
                            }`}
                          >
                            {rate}%
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Результаты расчета</h3>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-2 sm:gap-3 md:gap-4">
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-2 sm:p-3 md:p-4 shadow-sm">
                      <p className="text-xs text-gray-600 mb-1 sm:mb-1.5">Сумма кредита</p>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
                        {mortgageResults.loanAmount > 0 ? formatNumber(mortgageResults.loanAmount) + ' ₽' : '0 ₽'}
                      </p>
                    </div>
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-2 sm:p-3 md:p-4 shadow-sm md:order-3">
                      <p className="text-xs text-gray-600 mb-1 sm:mb-1.5">Общая сумма выплат</p>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
                        {mortgageResults.totalPayment > 0 ? formatNumber(mortgageResults.totalPayment) + ' ₽' : '0 ₽'}
                      </p>
                    </div>
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-2 sm:p-3 md:p-4 shadow-sm md:order-2">
                      <p className="text-xs text-gray-600 mb-1 sm:mb-1.5">Ежемесячный платеж</p>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
                        {mortgageResults.monthlyPayment > 0 ? formatNumber(mortgageResults.monthlyPayment) + ' ₽' : '0 ₽'}
                      </p>
                    </div>
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-2 sm:p-3 md:p-4 shadow-sm md:order-4">
                      <p className="text-xs text-gray-600 mb-1 sm:mb-1.5">Переплата</p>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
                        {mortgageResults.overpayment > 0 ? formatNumber(mortgageResults.overpayment) + ' ₽' : '0 ₽'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      calculateMortgage();
                      setMortgageStep('application');
                    }}
                    className="w-full mt-2 sm:mt-4 md:mt-6 bg-gradient-to-r from-[#2C1F14] to-[#D4A574] text-white py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-xl font-bold text-xs sm:text-sm md:text-base hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Далее</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
              ) : (
              <form onSubmit={handleMortgageApplicationSubmit} className="space-y-2 sm:space-y-4 md:space-y-6">
                <div className="bg-gray-50 p-2 sm:p-4 md:p-6 rounded-lg border border-gray-200">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Результаты расчета</h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                    <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg border border-gray-300">
                      <p className="text-xs text-gray-600 mb-0.5 sm:mb-1">Ежемесячный платеж</p>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
                        {mortgageResults.monthlyPayment > 0 ? formatNumber(mortgageResults.monthlyPayment) + ' ₽' : '0 ₽'}
                      </p>
                    </div>
                    <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg border border-gray-300">
                      <p className="text-xs text-gray-600 mb-0.5 sm:mb-1">Сумма кредита</p>
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
                        {mortgageResults.loanAmount > 0 ? formatNumber(mortgageResults.loanAmount) + ' ₽' : '0 ₽'}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">Ваши контактные данные</h3>
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <div>
                      <label htmlFor="mortgage-name" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-2">
                        Ваше имя *
                      </label>
                      <input
                        type="text"
                        id="mortgage-name"
                        name="name"
                        value={mortgageApplicationData.name}
                        onChange={handleMortgageApplicationChange}
                        required
                        className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C1F14] focus:border-transparent outline-none transition-all"
                        placeholder="Введите ваше имя"
                      />
                    </div>
                    <div>
                      <label htmlFor="mortgage-phone" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-2">
                        Номер телефона *
                      </label>
                      <input
                        type="tel"
                        id="mortgage-phone"
                        name="phone"
                        value={mortgageApplicationData.phone}
                        onChange={handleMortgageApplicationChange}
                        required
                        className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C1F14] focus:border-transparent outline-none transition-all"
                        placeholder="Введите ваш телефон"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3 md:gap-4">
                  <button
                    type="button"
                    onClick={() => setMortgageStep('calculator')}
                    className="flex-1 border-2 border-gray-300 text-gray-700 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors font-semibold text-xs sm:text-sm md:text-base"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#2C1F14] to-[#D4A574] text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-xl font-bold text-xs sm:text-sm md:text-base hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Отправить заявку</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
              )}
            </div>
          </div>
        )}

        {/* Модальное окно планировки */}
        {isFloorPlanModalOpen && project.floorPlan && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-fadeIn overflow-y-auto"
            onClick={() => setIsFloorPlanModalOpen(false)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div 
              className="bg-white rounded-2xl p-4 sm:p-6 max-w-5xl w-full relative shadow-2xl animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsFloorPlanModalOpen(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                aria-label="Закрыть"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={project.floorPlan.startsWith('http') ? project.floorPlan : `https://admin-doman-horizont.ru${project.floorPlan}`}
                alt="Планировка дома"
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
                onError={(e) => {
                  e.target.src = '/images/houses/placeholder.svg';
                }}
              />
              <div className="mt-4 flex justify-center">
                <a
                  href={project.floorPlan.startsWith('http') ? project.floorPlan : `https://admin-doman-horizont.ru${project.floorPlan}`}
                  download
                  className="bg-gradient-to-r from-[#2C1F14] to-[#D4A574] text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Скачать планировку</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Всплывающий блок консультации */}
      <ConsultationPopup />
    </div>
  );
}

export default ProjectDetail;

