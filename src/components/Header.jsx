import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CustomSelect from './CustomSelect';

function Header() {
  const location = useLocation();
  const isProjectDetailPage = location.pathname.startsWith('/project/');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolledPastImage, setIsScrolledPastImage] = useState(isProjectDetailPage);
  const [isCallFormOpen, setIsCallFormOpen] = useState(false);
  const [isMortgageCalculatorOpen, setIsMortgageCalculatorOpen] = useState(false);
  const [mortgageStep, setMortgageStep] = useState('calculator');
  const [callFormData, setCallFormData] = useState({
    name: '',
    phone: '',
    reason: ''
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
  const [mortgageApplicationData, setMortgageApplicationData] = useState({
    name: '',
    phone: ''
  });
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [isProjectFormSubmitted, setIsProjectFormSubmitted] = useState(false);
  const [projectFormData, setProjectFormData] = useState({
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

  useEffect(() => {
    // Блокируем скролл при открытом меню
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    // На странице ProjectDetail хедер всегда белый
    if (isProjectDetailPage) {
      setIsScrolledPastImage(true);
      return;
    }

    const handleScroll = () => {
      try {
        const imageElement = document.querySelector('img[src="/fon2-photoaidcom-darken.png"]');
        if (imageElement) {
          const imageBottom = imageElement.getBoundingClientRect().bottom;
          setIsScrolledPastImage(imageBottom < 0);
        } else {
          // Если изображения нет, хедер белый
          setIsScrolledPastImage(true);
        }
      } catch (error) {
        // Игнорируем ошибки при проверке скролла
        console.warn('Scroll handler error:', error);
      }
    };

    // Используем requestAnimationFrame для оптимизации
    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });
    handleScroll(); // Проверяем начальное состояние

    return () => {
      window.removeEventListener('scroll', optimizedScroll);
    };
  }, [isProjectDetailPage, location.pathname]);

  useEffect(() => {
    const handleOpenMortgageCalculator = () => {
      setIsMortgageCalculatorOpen(true);
    };

    window.addEventListener('openMortgageCalculator', handleOpenMortgageCalculator);

    return () => {
      window.removeEventListener('openMortgageCalculator', handleOpenMortgageCalculator);
    };
  }, []);

  const logoSrc = isScrolledPastImage ? '/Lo(3).png' : '/Lo(1).png';
  const linkColor = isScrolledPastImage ? 'text-[#6a040f]' : 'text-white';
  const linkStyle = isScrolledPastImage 
    ? {} 
    : { textShadow: '0.125rem 0.125rem 0.25rem rgba(0,0,0,0.5)' };
  const menuButtonColor = isScrolledPastImage ? 'text-[#6a040f]' : 'text-white';
  const menuButtonStyle = isScrolledPastImage 
    ? {} 
    : { textShadow: '0.125rem 0.125rem 0.25rem rgba(0,0,0,0.5)' };

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

  const handleMortgageChange = (e) => {
    const { name, value } = e.target;
    setMortgageData({
      ...mortgageData,
      [name]: value
    });
  };

  const handleMortgageApplicationChange = (e) => {
    setMortgageApplicationData({
      ...mortgageApplicationData,
      [e.target.name]: e.target.value
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
    const MAX_LIMIT = 500000000;

    if (price > 0 && initial >= 0 && price > initial) {
      let loanAmount = price - initial;
      
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
    if (isMortgageCalculatorOpen && mortgageData.propertyPrice) {
      calculateMortgage();
    }
  }, [mortgageData, isMortgageCalculatorOpen]);

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

  const handleProjectFormSubmit = (e) => {
    e.preventDefault();
    console.log('Форма проекта отправлена:', projectFormData);
    setIsProjectFormSubmitted(true);
    setProjectFormData({ name: '', phone: '', object: '' });
    setTimeout(() => {
      setIsProjectFormOpen(false);
      setIsProjectFormSubmitted(false);
    }, 3000);
  };

  const handleProjectFormChange = (e) => {
    setProjectFormData({
      ...projectFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleProjectObjectChange = (value) => {
    setProjectFormData({
      ...projectFormData,
      object: value
    });
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 w-full"
      style={{ 
        backgroundColor: isScrolledPastImage ? 'white' : 'transparent', 
        maxWidth: '100vw', 
        overflow: 'hidden',
        boxShadow: isScrolledPastImage ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
      }}
    >
      <div className="w-full max-w-full">
        {/* Main navigation */}
        <nav className="flex items-center justify-between py-4 w-full max-w-full">
          <Link to="/" className="flex items-center pl-2 sm:pl-4">
            <img 
              src={logoSrc}
              alt="Теремъ" 
              className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              style={{ 
                mixBlendMode: 'normal',
                boxShadow: 'none',
                border: 'none',
                outline: 'none'
              }}
            />
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 pr-2 sm:pr-4">
            {/* Навигационные ссылки для десктопа */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <Link 
                to="/catalog" 
                className={`${linkColor} hover:opacity-80 transition-opacity font-medium text-base lg:text-lg`}
                style={linkStyle}
              >
                Каталог
              </Link>
              <Link 
                to="/about" 
                className={`${linkColor} hover:opacity-80 transition-opacity font-medium text-base lg:text-lg`}
                style={linkStyle}
              >
                О компании
              </Link>
              <Link 
                to="/contacts" 
                className={`${linkColor} hover:opacity-80 transition-opacity font-medium text-base lg:text-lg`}
                style={linkStyle}
              >
                Контакты
              </Link>
              <button
                onClick={() => setIsCallFormOpen(true)}
                className={`hover:opacity-80 transition-opacity font-medium text-base lg:text-lg px-4 py-2 border-2 rounded-full ${
                  isScrolledPastImage 
                    ? 'bg-[#6a040f] text-white border-[#6a040f]' 
                    : 'text-white border-white'
                }`}
                style={isScrolledPastImage ? {} : linkStyle}
              >
                Заказать звонок
              </button>
            </div>

            {/* Кнопка меню - только для мобильных устройств */}
            {!isMenuOpen && (
              <button 
                onClick={() => setIsMenuOpen(true)}
                className={`md:hidden ${menuButtonColor} text-2xl sm:text-3xl font-bold transition-colors relative z-[60]`}
                style={menuButtonStyle}
                aria-label="Меню"
              >
                ☰
              </button>
            )}
          </div>

          {/* Модальное окно меню */}
          {isMenuOpen && (
            <div 
              className="modal-overlay bg-white z-[55] flex flex-col p-6"
              style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                width: '100%', 
                height: '100%',
                maxWidth: '100vw',
                maxHeight: '100vh',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <div className="flex justify-end mb-6 sm:mb-8">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#6a040f] text-3xl sm:text-4xl md:text-5xl font-bold transition-colors hover:opacity-80"
                  aria-label="Закрыть меню"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col space-y-4 sm:space-y-6">
                <Link 
                  to="/catalog" 
                  className="block py-3 sm:py-4 text-gray-900 hover:text-[#6a040f] font-medium text-xl sm:text-2xl md:text-3xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Каталог
                </Link>
                <Link 
                  to="/about" 
                  className="block py-3 sm:py-4 text-gray-900 hover:text-[#6a040f] font-medium text-xl sm:text-2xl md:text-3xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  О компании
                </Link>
                <Link 
                  to="/contacts" 
                  className="block py-3 sm:py-4 text-gray-900 hover:text-[#6a040f] font-medium text-xl sm:text-2xl md:text-3xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Контакты
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsMortgageCalculatorOpen(true);
                  }}
                  className="block w-full text-left py-3 sm:py-4 text-gray-900 hover:text-[#6a040f] font-medium text-xl sm:text-2xl md:text-3xl transition-colors"
                >
                  Рассчитать ипотеку
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsProjectFormOpen(true);
                  }}
                  className="block w-full text-left py-3 sm:py-4 text-gray-900 hover:text-[#6a040f] font-medium text-xl sm:text-2xl md:text-3xl transition-colors"
                >
                  Рассчитать проект
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsCallFormOpen(true);
                  }}
                  className="mt-6 sm:mt-8 bg-[#6a040f] text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-lg sm:text-xl md:text-2xl hover:bg-[#5a030c] transition-colors duration-200 shadow-md w-fit"
                >
                  Заказать звонок
                </button>
              </div>
            </div>
          )}

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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all"
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all"
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
                    className="w-full bg-[#6a040f] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-[#5a030c] transition-colors duration-200 shadow-md hover:shadow-lg"
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
              onClick={() => {
                setIsMortgageCalculatorOpen(false);
                setMortgageStep('calculator');
              }}
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
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all"
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
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all"
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
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all mb-1 sm:mb-2"
                      />
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {[5, 10, 15, 20, 25, 30].map((term) => (
                          <button
                            key={term}
                            type="button"
                            onClick={() => setMortgageData({ ...mortgageData, loanTerm: term.toString() })}
                            className={`px-2 sm:px-3 py-1 text-xs rounded-lg border transition-colors ${
                              mortgageData.loanTerm === term.toString()
                                ? 'bg-[#6a040f] text-white border-[#6a040f]'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#6a040f]'
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
                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all mb-1 sm:mb-2"
                      />
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {[7.5, 8, 8.5, 9, 9.5].map((rate) => (
                          <button
                            key={rate}
                            type="button"
                            onClick={() => setMortgageData({ ...mortgageData, interestRate: rate.toString() })}
                            className={`px-2 sm:px-3 py-1 text-xs rounded-lg border transition-colors ${
                              mortgageData.interestRate === rate.toString()
                                ? 'bg-[#6a040f] text-white border-[#6a040f]'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-[#6a040f]'
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
                      {/* Мобильная версия: сетка 2x2, Десктоп: вертикально */}
                      {/* Первая строка мобильной версии: Сумма кредита слева, Общая сумма выплат справа */}
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
                      {/* Вторая строка мобильной версии: Ежемесячный платеж слева, Переплата справа */}
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
                      className="w-full mt-2 sm:mt-4 md:mt-6 bg-[#6a040f] text-white py-1.5 sm:py-2 md:py-3 px-3 sm:px-4 md:px-6 rounded-lg font-semibold text-xs sm:text-sm md:text-base lg:text-lg hover:bg-[#5a030c] transition-colors duration-200 shadow-md hover:shadow-lg"
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
                        <label htmlFor="mortgage-name-header" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-2">
                          Ваше имя *
                        </label>
                        <input
                          type="text"
                          id="mortgage-name-header"
                          name="name"
                          value={mortgageApplicationData.name}
                          onChange={handleMortgageApplicationChange}
                          required
                          className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all"
                          placeholder="Введите ваше имя"
                        />
                      </div>
                      <div>
                        <label htmlFor="mortgage-phone-header" className="block text-xs font-medium text-gray-700 mb-1 sm:mb-2">
                          Номер телефона *
                        </label>
                        <input
                          type="tel"
                          id="mortgage-phone-header"
                          name="phone"
                          value={mortgageApplicationData.phone}
                          onChange={handleMortgageApplicationChange}
                          required
                          className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all"
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
                      className="flex-1 bg-[#6a040f] text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg font-semibold text-xs sm:text-sm md:text-base hover:bg-[#5a030c] transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                      Отправить заявку
                    </button>
                  </div>
                </form>
                )}
              </div>
            </div>
          )}

          {/* Модальное окно формы "Рассчитать проект" */}
          {isProjectFormOpen && (
            <div 
              className="modal-overlay bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4 overflow-y-auto fixed top-0 left-0 right-0 bottom-0"
              onClick={() => {
                setIsProjectFormOpen(false);
                setIsProjectFormSubmitted(false);
              }}
            >
              <div 
                className="modal-content bg-white rounded-lg p-8 max-w-2xl w-full animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                    {isProjectFormSubmitted ? 'Спасибо!' : 'Рассчитать проект'}
                  </h2>
                  <button
                    onClick={() => {
                      setIsProjectFormOpen(false);
                      setIsProjectFormSubmitted(false);
                    }}
                    className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl"
                    aria-label="Закрыть"
                  >
                    ✕
                  </button>
                </div>
                
                {isProjectFormSubmitted ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="mb-4 sm:mb-6">
                      <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-[#6a040f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <form onSubmit={handleProjectFormSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="project-name" className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
                      Имя
                    </label>
                    <input
                      type="text"
                      id="project-name"
                      name="name"
                      value={projectFormData.name}
                      onChange={handleProjectFormChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all"
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  <div>
                    <label htmlFor="project-phone" className="block text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="project-phone"
                      name="phone"
                      value={projectFormData.phone}
                      onChange={handleProjectFormChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all"
                      placeholder="Введите ваш телефон"
                    />
                  </div>
                  <CustomSelect
                    value={projectFormData.object}
                    onChange={handleProjectObjectChange}
                    options={objectTypes}
                    label="Объект"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#6a040f] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:bg-[#5a030c] transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Отправить
                  </button>
                </form>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

