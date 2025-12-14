import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-white" style={{ backgroundColor: '#6a040f' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Каталог */}
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Каталог</h3>
            <ul className="space-y-3">
              <li><Link to="/catalog?type=cottages" className="text-white hover:opacity-80 transition-opacity">Коттеджи</Link></li>
              <li><Link to="/catalog?type=dachas" className="text-white hover:opacity-80 transition-opacity">Дачные дома</Link></li>
              <li><Link to="/catalog?type=baths" className="text-white hover:opacity-80 transition-opacity">Бани</Link></li>
              <li><Link to="/catalog?type=one-floor" className="text-white hover:opacity-80 transition-opacity">Одноэтажные дома</Link></li>
              <li><Link to="/catalog?type=two-floor" className="text-white hover:opacity-80 transition-opacity">Двухэтажные дома</Link></li>
              <li><Link to="/catalog?type=house-bath" className="text-white hover:opacity-80 transition-opacity">Дома-бани</Link></li>
            </ul>
          </div>

          {/* Услуги */}
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Услуги</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-white hover:opacity-80 transition-opacity">Индивидуальные проекты</Link></li>
              <li><Link to="/services" className="text-white hover:opacity-80 transition-opacity">Достройка и реконструкция</Link></li>
              <li><Link to="/services" className="text-white hover:opacity-80 transition-opacity">Инженерные коммуникации</Link></li>
              <li><Link to="/services" className="text-white hover:opacity-80 transition-opacity">Кредитование</Link></li>
              <li><Link to="/services" className="text-white hover:opacity-80 transition-opacity">Ипотека</Link></li>
              <li><Link to="/services" className="text-white hover:opacity-80 transition-opacity">Страхование</Link></li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Информация</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-white hover:opacity-80 transition-opacity">О компании</Link></li>
              <li><Link to="/about" className="text-white hover:opacity-80 transition-opacity">Производство</Link></li>
              <li><Link to="/about" className="text-white hover:opacity-80 transition-opacity">Сроки строительства</Link></li>
              <li><Link to="/about" className="text-white hover:opacity-80 transition-opacity">Гарантия</Link></li>
              <li><Link to="/about" className="text-white hover:opacity-80 transition-opacity">Отзывы</Link></li>
              <li><Link to="/about" className="text-white hover:opacity-80 transition-opacity">Часто задаваемые вопросы</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Контакты</h3>
            <ul className="space-y-3">
              <li className="text-white font-medium">Москва</li>
              <li><a href="tel:+74954610110" className="text-white hover:opacity-80 transition-opacity text-lg">+7 (495) 461-01-10</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

