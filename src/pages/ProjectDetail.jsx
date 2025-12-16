import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomSelect from '../components/CustomSelect';

function ProjectDetail() {
  const { id } = useParams();
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

  // Mock data - в реальном приложении это будет загрузка с API
  const projects = [
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
  ];

  const project = projects.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Обработка изображений
  const getImages = () => {
    if (project?.images && Array.isArray(project.images) && project.images.length > 0) {
      return project.images;
    }
    if (project?.image) {
      return [project.image];
    }
    return ['/images/houses/placeholder.svg'];
  };

  const images = project ? getImages() : [];

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

  const calculateMortgage = () => {
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
  };

  useEffect(() => {
    if (isMortgageCalculatorOpen && project?.priceFrom) {
      // Автоматически подставляем цену из карточки
      const priceValue = project.priceFrom.replace(/\s/g, '').replace('₽', '').replace(/\D/g, '');
      if (priceValue) {
        setMortgageData(prev => ({
          ...prev,
          propertyPrice: formatNumber(priceValue)
        }));
      }
    }
  }, [isMortgageCalculatorOpen, project]);

  useEffect(() => {
    if (isMortgageCalculatorOpen && mortgageData.propertyPrice) {
      calculateMortgage();
    }
  }, [mortgageData, isMortgageCalculatorOpen]);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Проект не найден</h1>
          <Link to="/catalog" className="text-[#540b0e] hover:opacity-80">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 md:pb-12 w-full overflow-x-hidden">
      <div className="px-4 sm:px-6 md:px-8 w-full max-w-full">

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
                        ? 'ring-2 sm:ring-4 ring-[#540b0e]' 
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
            <Link 
              to="/catalog"
              className="inline-flex items-center text-[#540b0e] hover:opacity-80 mb-4 sm:mb-6 font-medium text-sm sm:text-base"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад
            </Link>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">{project.name}</h1>

            {/* Цена от, Комнаты, Площадь */}
            <div className="mb-6 sm:mb-8">
              {project.priceFrom && (
                <div className="flex flex-col mb-4 sm:mb-6">
                  <span className="text-sm sm:text-base md:text-lg text-gray-600 mb-1">Цена от:</span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    {project.priceFrom}
                  </span>
                </div>
              )}

              {project.rooms && (
                <div className="flex flex-col mb-3 sm:mb-4">
                  <span className="text-sm sm:text-base md:text-lg text-gray-600 mb-1">Комнаты:</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900">{project.rooms}</span>
                </div>
              )}

              {project.area && (
                <div className="flex flex-col mb-3 sm:mb-4">
                  <span className="text-sm sm:text-base md:text-lg text-gray-600 mb-1">Площадь:</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900">{project.area}</span>
                </div>
              )}
            </div>

            {/* Кнопки */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <button
                onClick={() => setIsCallFormOpen(true)}
                className="w-full bg-[#540b0e] text-white px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg md:text-xl hover:bg-[#43090b] transition-colors font-medium rounded-lg"
              >
                Заказать звонок
              </button>
              <button
                onClick={() => setIsMortgageCalculatorOpen(true)}
                className="w-full border-2 border-[#540b0e] text-[#540b0e] px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg md:text-xl hover:bg-[#540b0e] hover:text-white transition-colors font-medium rounded-lg"
              >
                Рассчитать ипотеку
              </button>
            </div>
          </div>
        </div>

        {/* Описание и характеристики */}
        <div className="space-y-6 sm:space-y-8">
          {/* Описание */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Описание</h2>
            <p className="text-gray-700 leading-relaxed mb-3 sm:mb-4 text-base sm:text-lg md:text-xl">
              {project.description}
            </p>
            {project.fullDescription && (
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg md:text-xl">
                {project.fullDescription}
              </p>
            )}
          </div>

          {/* Характеристики */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Характеристики</h2>
            <ul className="space-y-2 sm:space-y-3">
              {project.characteristics?.map((char, index) => (
                <li key={index} className="flex items-center text-gray-700 pb-2 sm:pb-3 text-sm sm:text-base md:text-lg">
                  <span className="font-medium">{char}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Модальное окно формы "Заказать звонок" */}
        {isCallFormOpen && (
          <div 
            className="modal-overlay bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4 overflow-y-auto fixed top-0 left-0 right-0 bottom-0"
            onClick={() => setIsCallFormOpen(false)}
          >
            <div 
              className="modal-content bg-white rounded-lg p-8 max-w-md w-full animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  Заказать звонок
                </h2>
                <button
                  onClick={() => setIsCallFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl"
                  aria-label="Закрыть"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleCallFormSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="call-name" className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="call-name"
                    name="name"
                    value={callFormData.name}
                    onChange={handleCallFormChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#540b0e] focus:border-transparent outline-none transition-all"
                    placeholder="Введите ваше имя"
                  />
                </div>
                <div>
                  <label htmlFor="call-phone" className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="call-phone"
                    name="phone"
                    value={callFormData.phone}
                    onChange={handleCallFormChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#540b0e] focus:border-transparent outline-none transition-all"
                    placeholder="Введите ваш телефон"
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
                  className="w-full bg-[#540b0e] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-[#43090b] transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Модальное окно калькулятора ипотеки */}
        {isMortgageCalculatorOpen && (
          <div 
            className="modal-overlay bg-black bg-opacity-50 z-[60] flex items-center justify-center p-2 sm:p-4 overflow-y-auto fixed top-0 left-0 right-0 bottom-0"
            onClick={() => setIsMortgageCalculatorOpen(false)}
          >
            <div 
              className="modal-content bg-white rounded-lg p-3 sm:p-6 md:p-8 max-w-2xl w-full animate-fadeIn max-h-[95vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-2 sm:mb-4 md:mb-6">
                <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 pr-2">
                  {mortgageStep === 'calculator' ? 'Калькулятор ипотеки' : 'Оставить заявку на ипотеку'}
                </h2>
                <button
                  onClick={() => {
                    setIsMortgageCalculatorOpen(false);
                    setMortgageStep('calculator');
                  }}
                  className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl md:text-3xl flex-shrink-0"
                  aria-label="Закрыть"
                >
                  ✕
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
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#540b0e] focus:border-transparent outline-none transition-all"
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
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#540b0e] focus:border-transparent outline-none transition-all"
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
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#540b0e] focus:border-transparent outline-none transition-all mb-1 sm:mb-2"
                      />
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {[5, 10, 15, 20, 25, 30].map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => setMortgageData({ ...mortgageData, loanTerm: term.toString() })}
                            className={`px-2 sm:px-3 py-1 text-xs rounded-lg border transition-colors ${
                              mortgageData.loanTerm === term.toString()
                                ? 'bg-[#540b0e] text-white border-[#540b0e]'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#540b0e]'
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
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#540b0e] focus:border-transparent outline-none transition-all mb-1 sm:mb-2"
                      />
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {[7.5, 8, 8.5, 9, 9.5].map((rate) => (
                          <button
                            key={rate}
                            type="button"
                            onClick={() => setMortgageData({ ...mortgageData, interestRate: rate.toString() })}
                            className={`px-2 sm:px-3 py-1 text-xs rounded-lg border transition-colors ${
                              mortgageData.interestRate === rate.toString()
                                ? 'bg-[#540b0e] text-white border-[#540b0e]'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#540b0e]'
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
                    className="w-full mt-2 sm:mt-4 md:mt-6 bg-[#540b0e] text-white py-1.5 sm:py-2 md:py-3 px-3 sm:px-4 md:px-6 rounded-lg font-semibold text-xs sm:text-sm md:text-base lg:text-lg hover:bg-[#43090b] transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Далее
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
                        className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#540b0e] focus:border-transparent outline-none transition-all"
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
                        className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#540b0e] focus:border-transparent outline-none transition-all"
                        placeholder="Введите ваш телефон"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3 md:gap-4">
                  <button
                    type="button"
                    onClick={() => setMortgageStep('calculator')}
                    className="flex-1 border-2 border-gray-300 text-gray-700 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium text-xs sm:text-sm md:text-base"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#540b0e] text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg font-semibold text-xs sm:text-sm md:text-base hover:bg-[#43090b] transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Отправить заявку
                  </button>
                </div>
              </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;

