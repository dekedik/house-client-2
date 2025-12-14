import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolledPastImage, setIsScrolledPastImage] = useState(false);
  const [isCallFormOpen, setIsCallFormOpen] = useState(false);
  const [callFormData, setCallFormData] = useState({
    name: '',
    phone: '',
    reason: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      try {
        const imageElement = document.querySelector('img[src="/fon2-photoaidcom-darken.png"]');
        if (imageElement) {
          const imageBottom = imageElement.getBoundingClientRect().bottom;
          setIsScrolledPastImage(imageBottom < 0);
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
  }, []);

  const logoSrc = isScrolledPastImage ? '/Lo(3).png' : '/Lo(1).png';
  // Если меню открыто, кнопка всегда белая
  const menuButtonColor = isMenuOpen ? 'text-white' : (isScrolledPastImage ? '' : 'text-white');
  const menuButtonStyle = isMenuOpen
    ? { color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }
    : isScrolledPastImage 
      ? { color: '#6a040f', textShadow: 'none' }
      : { textShadow: '2px 2px 4px rgba(0,0,0,0.5)' };

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

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Main navigation */}
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center">
            <img 
              src={logoSrc}
              alt="Теремъ" 
              className="h-12 w-auto object-contain"
              style={{ 
                mixBlendMode: 'normal',
                boxShadow: 'none',
                border: 'none',
                outline: 'none'
              }}
            />
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Кнопка "Заказать звонок" - видна только на десктопе */}
            <button 
              onClick={() => setIsCallFormOpen(true)}
              className="hidden md:block px-6 py-2.5 transition-colors font-medium rounded-full relative z-[60]"
              style={isScrolledPastImage 
                ? { 
                    backgroundColor: '#6a040f',
                    color: '#ffffff'
                  }
                : { 
                    backgroundColor: '#ffffff',
                    color: 'rgba(0, 0, 0, 0.6)'
                  }
              }
              onMouseEnter={(e) => {
                if (isScrolledPastImage) {
                  e.target.style.backgroundColor = '#5a030c';
                  e.target.style.color = '#ffffff';
                } else {
                  e.target.style.backgroundColor = '#f5f5f5';
                  e.target.style.color = 'rgba(0, 0, 0, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                if (isScrolledPastImage) {
                  e.target.style.backgroundColor = '#6a040f';
                  e.target.style.color = '#ffffff';
                } else {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.color = 'rgba(0, 0, 0, 0.6)';
                }
              }}
            >
              Заказать звонок
            </button>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${menuButtonColor} text-3xl font-bold transition-colors relative z-[60]`}
              style={menuButtonStyle}
              aria-label="Меню"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          <div 
            className={`${isMenuOpen ? 'block' : 'hidden'} fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 z-[55]`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex flex-col items-center justify-center h-full" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <Link 
              to="/catalog" 
              className="block py-3 text-gray-700 hover:text-gray-900 font-medium text-lg border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Каталог
            </Link>
            <Link 
              to="/services" 
              className="block py-3 text-gray-700 hover:text-gray-900 font-medium text-lg border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Услуги
            </Link>
            <Link 
              to="/about" 
              className="block py-3 text-gray-700 hover:text-gray-900 font-medium text-lg border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              О компании
            </Link>
            <Link 
              to="/news" 
              className="block py-3 text-gray-700 hover:text-gray-900 font-medium text-lg border-b border-gray-100 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              Новости
            </Link>
            <Link 
              to="/contacts" 
              className="block py-3 text-gray-700 hover:text-gray-900 font-medium text-lg border-b border-gray-100 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              Контакты
            </Link>
            {/* Кнопка "Заказать звонок" в мобильном меню */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsCallFormOpen(true);
              }}
              className="block md:hidden py-3 text-gray-700 hover:text-gray-900 font-medium text-lg border-b border-gray-100 text-left w-full"
            >
              Заказать звонок
            </button>
              </div>
            </div>
          </div>

          {/* Модальное окно формы "Заказать звонок" */}
          {isCallFormOpen && (
            <div 
              className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 z-[60] flex items-center justify-center p-4"
              onClick={() => setIsCallFormOpen(false)}
            >
              <div 
                className="bg-white rounded-lg p-8 max-w-md w-full animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Заказать звонок
                  </h2>
                  <button
                    onClick={() => setIsCallFormOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-3xl"
                    aria-label="Закрыть"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-600 mb-6">
                  Укажите свое имя и номер телефона. Мы перезвоним и ответим на все вопросы.
                </p>
                <form onSubmit={handleCallFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="call-name" className="block text-sm font-medium text-gray-700 mb-2">
                      Имя
                    </label>
                    <input
                      type="text"
                      id="call-name"
                      name="name"
                      value={callFormData.name}
                      onChange={handleCallFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all"
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  <div>
                    <label htmlFor="call-phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="call-phone"
                      name="phone"
                      value={callFormData.phone}
                      onChange={handleCallFormChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all"
                      placeholder="Введите ваш телефон"
                    />
                  </div>
                  <div>
                    <label htmlFor="call-reason" className="block text-sm font-medium text-gray-700 mb-2">
                      Причина
                    </label>
                    <textarea
                      id="call-reason"
                      name="reason"
                      value={callFormData.reason}
                      onChange={handleCallFormChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Укажите причину обращения (необязательно)"
                    />
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="call-agreement"
                      name="agreement"
                      required
                      className="mt-1 mr-2 h-4 w-4 text-[#6a040f] focus:ring-[#6a040f] border-gray-300 rounded"
                    />
                    <label htmlFor="call-agreement" className="text-sm text-gray-600">
                      Я соглашаюсь с Политикой в отношении обработки персональных данных, а также на обработку персональных данных
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#6a040f] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#5a030c] transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Отправить
                  </button>
                </form>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

