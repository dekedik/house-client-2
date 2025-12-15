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
          className="inline-block text-[#6a040f] hover:opacity-80 transition-opacity mb-6 text-lg font-medium"
        >
          Назад
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-[#6a040f] mb-6">
          Контакты
        </h1>
        
        {/* Рамочка с контактами */}
        <div className="border-2 border-[#6a040f] rounded-lg p-6 md:p-8 bg-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Левая часть - Свяжитесь с нами и Телефон */}
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-[#6a040f] mb-4">
                Свяжитесь с нами
              </h2>
              
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#6a040f] mb-3">
                  Телефон
                </h3>
                <div className="space-y-2">
                  <a 
                    href="tel:+79185429777" 
                    className="block text-base md:text-lg text-[#6a040f] hover:opacity-80 transition-colors"
                  >
                    +7 (918) 542-97-77
                  </a>
                  <a 
                    href="tel:+79508503306" 
                    className="block text-base md:text-lg text-[#6a040f] hover:opacity-80 transition-colors"
                  >
                    +7 (950) 850-33-06
                  </a>
                </div>
              </div>
            </div>

            {/* Правая часть - Адрес */}
            <div>
              <h3 className="text-lg md:text-xl font-bold text-[#6a040f] mb-3">
                Адрес
              </h3>
              <p className="text-base md:text-lg text-[#6a040f] mb-2">
                г. Ростов-на-Дону
              </p>
              <p className="text-base md:text-lg text-[#6a040f]">
                ул. Михаила Нагибина, д.38
              </p>
            </div>
          </div>
        </div>

        {/* Рамочка с режимом работы */}
        <div className="border-2 border-[#6a040f] rounded-lg p-6 md:p-8 bg-white shadow-lg mt-6">
          <h2 className="text-xl md:text-2xl font-semibold text-[#6a040f] mb-4">
            Режим работы
          </h2>
          
          <div className="space-y-3">
            <div>
              <p className="text-base md:text-lg text-[#6a040f]">
                Понедельник - Пятница: 9:00 - 19:00
              </p>
            </div>
            
            <div>
              <p className="text-base md:text-lg text-[#6a040f]">
                Суббота: 10:00 - 17:00
              </p>
            </div>
            
            <div>
              <p className="text-base md:text-lg text-[#6a040f]">
                Воскресенье: Выходной
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;

