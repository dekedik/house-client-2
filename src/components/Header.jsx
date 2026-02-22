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
  const linkColor = isScrolledPastImage ? 'text-[#2C1F14]' : 'text-white';
  const linkStyle = isScrolledPastImage 
    ? {} 
    : { textShadow: '0.125rem 0.125rem 0.25rem rgba(0,0,0,0.5)' };
  const menuButtonColor = isScrolledPastImage ? 'text-[#2C1F14]' : 'text-white';
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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Main navigation */}
        <nav className="flex items-center justify-between py-4 w-full">
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
                className={`font-medium text-base lg:text-lg px-4 py-2 border-2 rounded-full transition-all duration-300 flex items-center gap-2 group ${
                  isScrolledPastImage 
                    ? 'bg-gradient-to-r from-[#2C1F14] to-[#D4A574] text-white border-transparent hover:shadow-lg' 
                    : 'text-white border-white hover:bg-white/10'
                }`}
                style={isScrolledPastImage ? {} : linkStyle}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Заказать звонок</span>
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
                  className="text-[#2C1F14] text-3xl sm:text-4xl md:text-5xl font-bold transition-colors hover:opacity-80"
                  aria-label="Закрыть меню"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col space-y-4 sm:space-y-6">
                <Link 
                  to="/about" 
                  className="block py-3 sm:py-4 text-gray-900 hover:text-[#2C1F14] font-medium text-xl sm:text-2xl md:text-3xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  О компании
                </Link>
                <Link 
                  to="/contacts" 
                  className="block py-3 sm:py-4 text-gray-900 hover:text-[#2C1F14] font-medium text-xl sm:text-2xl md:text-3xl transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Контакты
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsMortgageCalculatorOpen(true);
                  }}
                  className="block w-full text-left py-3 sm:py-4 text-gray-900 hover:text-[#2C1F14] font-medium text-xl sm:text-2xl md:text-3xl transition-colors"
                >
                  Рассчитать ипотеку
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsProjectFormOpen(true);
                  }}
                  className="block w-full text-left py-3 sm:py-4 text-gray-900 hover:text-[#2C1F14] font-medium text-xl sm:text-2xl md:text-3xl transition-colors"
                >
                  Рассчитать проект
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsCallFormOpen(true);
                  }}
                  className="mt-6 sm:mt-8 bg-[#2C1F14] text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg font-semibold text-lg sm:text-xl md:text-2xl hover:bg-[#3D2817] transition-colors duration-200 shadow-md w-fit"
                >
                  Заказать звонок
                </button>
              </div>
            </div>
          )}

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
              onClick={() => {
                setIsMortgageCalculatorOpen(false);
                setMortgageStep('calculator');
              }}
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
                          className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 text-xs sm:text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C1F14] focus:border-transparent outline-none transition-all"
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

          {/* Модальное окно формы "Рассчитать проект" */}
          {isProjectFormOpen && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-fadeIn"
              onClick={() => {
                setIsProjectFormOpen(false);
                setIsProjectFormSubmitted(false);
              }}
            >
              <div 
                className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl animate-scaleIn relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Декоративный элемент */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12"></div>
                
                {isProjectFormSubmitted ? (
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
                          setIsProjectFormOpen(false);
                          setIsProjectFormSubmitted(false);
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

                    <form onSubmit={handleProjectFormSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="project-name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Ваше имя
                        </label>
                        <input
                          type="text"
                          id="project-name"
                          name="name"
                          value={projectFormData.name}
                          onChange={handleProjectFormChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                          placeholder="Введите ваше имя"
                        />
                      </div>
                      <div>
                        <label htmlFor="project-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Телефон
                        </label>
                        <input
                          type="tel"
                          id="project-phone"
                          name="phone"
                          value={projectFormData.phone}
                          onChange={handleProjectFormChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                          placeholder="+7 (___) ___-__-__"
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
        </nav>
      </div>
    </header>
  );
}

export default Header;

