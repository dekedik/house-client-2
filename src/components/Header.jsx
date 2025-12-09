import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main navigation */}
        <nav className="flex items-center justify-between py-2">
          <Link to="/" className="flex items-center -ml-4">
            <img 
              src="/Logo-Photoroom (1).png" 
              alt="Теремъ" 
              className="h-28 w-auto object-contain bg-white rounded-none"
              style={{ 
                mixBlendMode: 'normal',
                boxShadow: 'none',
                border: 'none',
                outline: 'none'
              }}
            />
          </Link>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 text-2xl"
              aria-label="Меню"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
            <button 
              className="text-white px-6 py-2.5 transition-colors font-medium rounded-full"
              style={{ 
                backgroundColor: '#0e0403'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0a0302'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#0e0403'}
            >
              Заказать звонок
            </button>
          </div>

          <div className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50`}>
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
              className="block py-3 text-gray-700 hover:text-gray-900 font-medium text-lg border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Новости
            </Link>
            <Link 
              to="/contacts" 
              className="block py-3 text-gray-700 hover:text-gray-900 font-medium text-lg border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Контакты
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;

