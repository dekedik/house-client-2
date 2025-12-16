import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <Link 
          to="/"
          className="inline-block text-[#6a040f] hover:opacity-80 transition-opacity mb-6 text-base sm:text-lg font-medium"
        >
          Назад
        </Link>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#6a040f] mb-6 sm:mb-8">
          О компании
        </h1>
        
        {/* Основное описание */}
        <div className="mb-8 sm:mb-12">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
            Агентство объектов «ДоманСтрой» — надёжный партнёр в сфере новостроек, работающий на рынке более 10 лет. За это время мы помогли тысячам клиентов обрести идеальное жильё и заслужили репутацию профессиональной, прозрачной и клиентоориентированной компании.
          </p>
        </div>

        {/* Миссия */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#6a040f] mb-4 sm:mb-6">
            Наша миссия
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            Мы делаем покупку новостройки простой, безопасной и выгодной, так как работаем без комиссий. Наша цель — сопровождать клиента на каждом этапе сделки, предоставляя экспертную поддержку и персонализированные решения.
          </p>
        </div>

        {/* Почему выбирают нас */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#6a040f] mb-6 sm:mb-8">
            Почему выбирают нас
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Безопасная сделка */}
            <div className="bg-white border-2 border-[#6a040f] rounded-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#6a040f] mb-3 sm:mb-4">
                Безопасная сделка
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Все документы проверены, сделки проходят через эскроу-счета
              </p>
            </div>

            {/* Лучшие цены */}
            <div className="bg-white border-2 border-[#6a040f] rounded-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#6a040f] mb-3 sm:mb-4">
                Лучшие цены
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Прямые договоры с застройщиками, без переплат и комиссий
              </p>
            </div>

            {/* Быстрое оформление */}
            <div className="bg-white border-2 border-[#6a040f] rounded-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#6a040f] mb-3 sm:mb-4">
                Быстрое оформление
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Помощь в оформлении ипотеки и всех документов за 1 день
              </p>
            </div>

            {/* Опытная команда */}
            <div className="bg-white border-2 border-[#6a040f] rounded-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#6a040f] mb-3 sm:mb-4">
                Опытная команда
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Более 10 лет на рынке недвижимости, тысячи довольных клиентов
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;


