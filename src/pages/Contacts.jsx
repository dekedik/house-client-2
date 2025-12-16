import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Contacts() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden py-12">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 w-full">
        <Link 
          to="/"
          className="inline-block text-black hover:opacity-80 transition-opacity mb-6 text-lg font-medium"
        >
          Назад
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">
          Контакты
        </h1>
        
        {/* Рамочка с контактами */}
        <div className="rounded-lg p-6 md:p-8 bg-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Левая часть - Свяжитесь с нами и Телефон */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-black mb-4">
                Свяжитесь с нами
              </h2>
              
              <div>
                <h3 className="text-lg md:text-xl font-bold text-black mb-3">
                  Телефон
                </h3>
                <div className="space-y-2">
                  <a 
                    href="tel:+79185429777" 
                    className="block text-base md:text-lg text-black hover:opacity-80 transition-colors"
                  >
                    +7 (918) 542-97-77
                  </a>
                  <a 
                    href="tel:+79508503306" 
                    className="block text-base md:text-lg text-black hover:opacity-80 transition-colors"
                  >
                    +7 (950) 850-33-06
                  </a>
                </div>
              </div>
            </div>

            {/* Правая часть - Адрес */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-black mb-3">
                Адрес
              </h3>
              <p className="text-base md:text-lg text-black mb-2">
                г. Ростов-на-Дону
              </p>
              <p className="text-base md:text-lg text-black">
                ул. Михаила Нагибина, д.38
              </p>
            </div>
          </div>
        </div>

        {/* Рамочка с режимом работы */}
        <div className=" rounded-lg p-6 md:p-8 bg-white shadow-lg mt-6">
          <h2 className="text-xl md:text-2xl font-semibold text-black mb-4">
            Режим работы
          </h2>
          
          <div className="space-y-3">
            <div>
              <p className="text-base md:text-lg text-black">
                Понедельник - Пятница: 9:00 - 19:00
              </p>
            </div>
            
            <div>
              <p className="text-base md:text-lg text-black">
                Суббота: 10:00 - 17:00
              </p>
            </div>
            
            <div>
              <p className="text-base md:text-lg text-black">
                Воскресенье: Выходной
              </p>
            </div>
          </div>
        </div>

        {/* Яндекс карта */}
        <div className=" rounded-lg p-6 md:p-8 bg-white shadow-lg mt-6">
          <h2 className="text-xl md:text-2xl font-semibold text-black mb-4">
            Как нас найти
          </h2>
          <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=39.721714%2C47.264380&pt=39.721714%2C47.264380&z=16&l=map"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              style={{ position: 'relative' }}
              title="Карта расположения офиса"
            />
          </div>
          <p className="text-base md:text-lg text-black mt-4">
            проспект Михаила Нагибина, 38, Ростов-на-Дону, 344068
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contacts;

