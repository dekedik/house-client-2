import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-white w-full overflow-x-hidden" style={{ backgroundColor: '#4a0309' }}>
      <div className="max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* ДоманСтрой */}
          <div>
            <h2 className="text-white font-bold mb-5 text-xl lg:text-2xl pl-2 sm:pl-3">ДоманСтрой</h2>
            <img 
              src="/Logobel.png" 
              alt="ДоманСтрой" 
              className="h-auto w-32 sm:w-40 md:w-48 object-contain"
            />
          </div>

          {/* Каталог комплектаций */}
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Каталог комплектаций</h3>
            <ul className="space-y-3">
              <li><Link to="/package/start" className="text-white hover:opacity-80 transition-opacity">Старт</Link></li>
              <li><Link to="/package/standard" className="text-white hover:opacity-80 transition-opacity">Стандарт</Link></li>
              <li><Link to="/package/comfort" className="text-white hover:opacity-80 transition-opacity">Комфорт</Link></li>
              <li><Link to="/package/premium" className="text-white hover:opacity-80 transition-opacity">Премиум</Link></li>
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Компания</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-white hover:opacity-80 transition-opacity">О нас</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-white font-bold mb-5 text-lg">Контакты</h3>
            <ul className="space-y-3">
              <li><a href="tel:+79185429777" className="text-white hover:opacity-80 transition-opacity">+7 (918) 542-97-77</a></li>
              <li><a href="tel:+79508503306" className="text-white hover:opacity-80 transition-opacity">+7 (950) 850-33-06</a></li>
              <li className="text-white">г. Ростов-на-Дону</li>
              <li className="text-white">ул. Михаила Нагибина, д.38</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

