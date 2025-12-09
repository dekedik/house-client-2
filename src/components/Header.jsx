import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCitySelectOpen, setIsCitySelectOpen] = useState(false);

  const cities = [
    'Москва', 'Барнаул', 'Вологда', 'Горно-Алтайск', 
    'Ижевск', 'Калуга', 'Псков', 'Санкт-Петербург',
    'Сургут', 'Тула', 'Тюмень', 'Энгельс', 'Ярославль'
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsCitySelectOpen(!isCitySelectOpen)}
              className="text-gray-600 hover:text-gray-900 font-medium relative"
            >
              Москва
              <span className="ml-1 inline-block">▼</span>
              {isCitySelectOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg rounded min-w-[200px] py-2">
                  {cities.map(city => (
                    <button
                      key={city}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                      onClick={() => setIsCitySelectOpen(false)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </button>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+74954610110" className="text-gray-700 hover:text-gray-900 font-semibold">
              +7 (495) 461-01-10
            </a>
            <Link to="/login" className="text-gray-600 hover:text-gray-900">
              Личный кабинет
            </Link>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="flex items-center justify-between py-4 border-t border-gray-200">
          <Link to="/" className="text-3xl font-bold text-gray-900 tracking-tight">
            Теремъ
          </Link>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 text-2xl"
            aria-label="Меню"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>

          <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:gap-8 absolute lg:static top-full left-0 right-0 bg-white lg:bg-transparent border-t lg:border-0 border-gray-200 lg:shadow-none shadow-lg lg:p-0 p-4`}>
            <Link to="/catalog" className="block py-3 lg:py-0 text-gray-700 hover:text-gray-900 font-medium border-b lg:border-0 border-gray-100 lg:border-0">
              Каталог
            </Link>
            <Link to="/services" className="block py-3 lg:py-0 text-gray-700 hover:text-gray-900 font-medium border-b lg:border-0 border-gray-100 lg:border-0">
              Услуги
            </Link>
            <Link to="/about" className="block py-3 lg:py-0 text-gray-700 hover:text-gray-900 font-medium border-b lg:border-0 border-gray-100 lg:border-0">
              О компании
            </Link>
            <Link to="/news" className="block py-3 lg:py-0 text-gray-700 hover:text-gray-900 font-medium border-b lg:border-0 border-gray-100 lg:border-0">
              Новости
            </Link>
            <Link to="/contacts" className="block py-3 lg:py-0 text-gray-700 hover:text-gray-900 font-medium border-b lg:border-0 border-gray-100 lg:border-0">
              Контакты
            </Link>
            <button className="bg-accent-600 text-white px-6 py-2.5 hover:bg-accent-700 transition-colors font-medium mt-2 lg:mt-0">
              Заказать звонок
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;

