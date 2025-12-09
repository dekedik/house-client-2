import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-gray-400" style={{ backgroundColor: '#0e0403' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Каталог */}
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Каталог</h3>
            <ul className="space-y-3">
              <li><Link to="/catalog?type=cottages" className="hover:text-white transition-colors">Коттеджи</Link></li>
              <li><Link to="/catalog?type=dachas" className="hover:text-white transition-colors">Дачные дома</Link></li>
              <li><Link to="/catalog?type=baths" className="hover:text-white transition-colors">Бани</Link></li>
              <li><Link to="/catalog?type=one-floor" className="hover:text-white transition-colors">Одноэтажные дома</Link></li>
              <li><Link to="/catalog?type=two-floor" className="hover:text-white transition-colors">Двухэтажные дома</Link></li>
              <li><Link to="/catalog?type=house-bath" className="hover:text-white transition-colors">Дома-бани</Link></li>
            </ul>
          </div>

          {/* Услуги */}
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Услуги</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="hover:text-white transition-colors">Индивидуальные проекты</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Достройка и реконструкция</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Инженерные коммуникации</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Кредитование</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Ипотека</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Страхование</Link></li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Информация</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-white transition-colors">О компании</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Производство</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Сроки строительства</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Гарантия</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Отзывы</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Часто задаваемые вопросы</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Контакты</h3>
            <ul className="space-y-3">
              <li className="text-white font-medium">Москва</li>
              <li><a href="tel:+74954610110" className="hover:text-white transition-colors text-lg">+7 (495) 461-01-10</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

