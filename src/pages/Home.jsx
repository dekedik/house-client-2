import { Link } from 'react-router-dom';
import { packages } from '../data/packages';

function Home() {

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

      {/* Каталог карточек */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Каталог комплектаций
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <Link 
                key={pkg.id}
                to={`/package/${pkg.id}`}
                className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer block"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
                    {pkg.title}
                  </h3>
                  <div className="w-full h-48 overflow-hidden rounded-lg bg-gray-100">
                    <img 
                      src={pkg.thumbnail} 
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/houses/placeholder.svg';
                      }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
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

