import { Link } from 'react-router-dom';
import { useState } from 'react';
import { packages } from '../data/packages';

function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Форма отправлена:', formData);
    alert('Спасибо за заявку! Мы направим вам проект на указанную электронную почту.');
    setFormData({ name: '', email: '', phone: '' });
    setIsFormOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full relative">
        <img 
          src="/fon2-photoaidcom-darken.png" 
          alt="Фон" 
          className="w-full h-auto object-cover mx-auto"
          style={{ display: 'block' }}
        />
        <div className="absolute top-20 left-0 right-0 text-center">
          <p className="text-white text-3xl md:text-5xl lg:text-7xl font-semibold" style={{ opacity: 0.7 }}>
            Индивидуальный подход к каждому клиенту!
          </p>
        </div>
      </div>

      {/* Способы покупки */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Способы покупки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Кредит на строительство */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all cursor-pointer text-center">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-[#6a040f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Кредит на строительство
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Гибкие условия кредитования для строительства вашего дома
              </p>
            </div>

            {/* Ипотека */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all cursor-pointer text-center">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-[#6a040f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Ипотека
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ипотечное кредитование с выгодными процентными ставками
              </p>
            </div>

            {/* Строительство без предоплаты */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all cursor-pointer text-center">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-[#6a040f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Строительство без предоплаты
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Начните строительство без первоначального взноса
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Каталог карточек */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Каталог комплектаций
          </h2>
          <div className="space-y-6">
            {packages.map((pkg) => (
              <Link 
                key={pkg.id}
                to={`/package/${pkg.id}`}
                className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer block"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Изображение слева */}
                  <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden bg-gray-100">
                    <img 
                      src={pkg.thumbnail} 
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/houses/placeholder.svg';
                      }}
                    />
                  </div>
                  {/* Описание справа */}
                  <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                      {pkg.title}
                    </h3>
                    <ul className="space-y-2">
                      {pkg.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-gray-700 text-sm md:text-base">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[#6a040f] font-semibold">
                      Подробнее →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Рассчитать проект */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-900">
            Если вы точно знаете, как должен выглядеть ваш дом, мы знаем, как его построить!
          </p>
          
          <div className="text-center mb-8">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-[#6a040f] text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-[#5a030c] transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Рассчитать проект
            </button>
          </div>

          {isFormOpen && (
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 animate-fadeIn">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
                Рассчитать проект
              </h2>
              <p className="text-center text-gray-600 mb-8 text-lg">
                Заполните заявку и мы направим вам проект на указанную электронную почту. 
                Заявка носит информационный характер и ни к чему вас не обязывает.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all"
                    placeholder="Введите ваше имя"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all"
                    placeholder="Введите ваш e-mail"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6a040f] focus:border-transparent outline-none transition-all"
                    placeholder="Введите ваш телефон"
                  />
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreement"
                    name="agreement"
                    required
                    className="mt-1 mr-2 h-4 w-4 text-[#6a040f] focus:ring-[#6a040f] border-gray-300 rounded"
                  />
                  <label htmlFor="agreement" className="text-sm text-gray-600">
                    Я соглашаюсь с Политикой в отношении обработки персональных данных, а также на обработку персональных данных
                  </label>
                </div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="marketing"
                    name="marketing"
                    className="mt-1 mr-2 h-4 w-4 text-[#6a040f] focus:ring-[#6a040f] border-gray-300 rounded"
                  />
                  <label htmlFor="marketing" className="text-sm text-gray-600">
                    Я соглашаюсь на получение рекламно-информационных сообщений
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
          )}
        </div>
      </section>

      {/* Информация о материалах */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Фундамент */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 uppercase">
                ФУНДАМЕНТ
              </h3>
              <p className="text-gray-700 leading-relaxed">
                СВАЙНО-РОСТВЕРКОВЫЙ ФУНДАМЕНТ.<br />
                ГУБИНА СВАЙ 2м. ВЫСОТА ЛЕНТЫ<br />
                ОТ 400 ДО 500мМ, С ПРИМЕНЕНИЕМ<br />
                АРМАТУРЫ 12Го Ф. МОНОЛИТНАЯ<br />
                АРМИРОВАННАЯ ПЛИТА<br />
                ТОЛЩИНОЙ 150мм.
              </p>
            </div>

            {/* Кровля */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 uppercase">
                КРОВЛЯ
              </h3>
              <p className="text-gray-700 leading-relaxed">
                ДЕРЕВЯННАЯ СТРОПИЛЬНАЯ<br />
                СИСТЕМА С ОГНЕБИОЗАЩИТОЙ И ГИДРО-ПАРОИЗОЛЯЦИЕЙ.<br />
                УТЕПЛЕНИЕ КАМЕННОЙ<br />
                ВАТОЙ 150мм. ПОКРЫТИЕ -<br />
                МЕТАЛЛОЧЕРЕПИЦА ТОЛЩИНОЙ<br />
                0.45мм. ПОДШИВ СВЕСОВ КРОВЛИ-ПРОФЛИСТ. УСТАНОВЛЕНА ВОДОСТОЧНАЯ И СНЕГОДЕРЖАТЕЛЬНАЯ СИСТЕМА.
              </p>
            </div>

            {/* Стены */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 uppercase">
                СТЕНЫ
              </h3>
              <p className="text-gray-700 leading-relaxed">
                ФАСАДЫ ВЫПОЛНЕНЫ ИЗ<br />
                КЕРАМИЧЕСКОГО СТЕНОВОГО<br />
                КИРПИЧА И ГАЗОБЕТОННЫХ<br />
                БЛОКОВ ТОЛЩИНОЙ 250мм,<br />
                МАРКИ D500. ПЕРЕГОРОДКИ ВЫПОЛНЕННЫ ИЗ ЗАБУТОВОЧНОГО КИРПИЧА.
              </p>
            </div>

            {/* White Box */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 uppercase">
                WHITE BOX
              </h3>
              <p className="text-gray-700 leading-relaxed">
                В ДОМЕ ВЫПОЛНЕНЫ:<br />
                РАЗВОДКА ВСЕХ НЕОБХОДИМЫХ КОММУНИКАЦИЙ (ЭЛЕКТРИКА, САНТЕХНИКА, ВЫВОД КАНАЛИЗАЦИИ);<br />
                УСТАНОВЛЕН ГАЗОВЫЙ ТУРБИРОВАННЫЙ ДВУХКОНТУРНЫЙ КОТЕЛ, ТЕПЛЫЙ ВОДЯНОЙ ПОЛ, РАДИАТОРЫ В СПАЛЬНЯХ;<br />
                ШТУКАТУРКА ПОД МАЯК;<br />
                ПОЛУСУХАЯ СТЯЖКА ПОЛА;<br />
                МЕТАЛЛОПЛАСТИКОВЫЕ<br />
                ОКНА С ПОДОКОННИКАМИ;<br />
                ВХОДНАЯ ДВЕРЬ,<br />
                МЕТАЛЛИЧЕСКАЯ УТЕПЛЕННАЯ.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

