import { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 w-full overflow-x-hidden py-8 sm:py-12 pt-20 sm:pt-24 md:pt-28">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2C1F14] mb-12 text-center">
          О компании «ДоманСтрой»
        </h1>
        
        {/* Основное описание */}
        <div className="mb-16 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#2C1F14] to-[#D4A574]"></div>
          <div className="pl-8 space-y-6">
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Добро пожаловать в «ДоманСтрой» — надёжного партнёра в сфере строительства частных домов!
            </p>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Мы работаем на рынке более 10 лет и за это время реализовали сотни проектов — от компактных проектов до просторных семейных коттеджей в Ростов-на-Дону, Ростовской области и Краснодарском крае. Наша миссия — создавать комфортные, безопасные и энергоэффективные дома, в которых будет приятно жить поколениям вашей семьи.
            </p>
          </div>
        </div>

        {/* Наши принципы */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2C1F14] mb-8 flex items-center gap-3">
            <svg className="w-10 h-10 text-[#2C1F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Наши принципы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'честность и прозрачность на всех этапах сотрудничества',
              'применение энергоэффективных технологий',
              'соблюдение строительных норм и правил',
              'открытый диалог с заказчиком'
            ].map((principle, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-100 hover:border-[#D4A574] hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-300"></div>
                <div className="relative flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                    {index + 1}
                  </div>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed flex-1">
                    {principle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Мы гордимся результатами */}
        <div className="mb-16 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-3xl p-8 sm:p-12 text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 flex items-center gap-3">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Мы гордимся результатами
          </h2>
          <p className="text-lg sm:text-xl mb-6 opacity-90">
            За период нашей работы мы:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              'освоили все популярные технологии строительства',
              'сформировали команду опытных мастеров',
              'заработали репутацию надёжного подрядчика, которому доверяют сложные и масштабные проекты'
            ].map((achievement, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all">
                <div className="text-4xl font-bold mb-2 text-white/80">✓</div>
                <p className="text-base leading-relaxed">
                  {achievement}
                </p>
              </div>
            ))}
          </div>
          <p className="text-lg sm:text-xl font-semibold text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
            Хотите дом, в котором будет уютно всей семье? Обратитесь в «ДоманСтрой» — и мы воплотим ваши идеи в реальность!
          </p>
        </div>

        {/* Почему выбирают нас */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2C1F14] mb-12 text-center">
            Почему выбирают нас?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Опыт и профессионализм',
                text: 'За плечами нашей команды — сотни успешно завершённых объектов. Мы знаем все тонкости строительства и учитываем их на каждом этапе работы.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                )
              },
              {
                title: 'Индивидуальный подход',
                text: 'Мы предлагаем как проверенные готовые решения, так и индивидуальные проекты под Ваши критерии и потребности.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                )
              },
              {
                title: 'Качество материалов',
                text: 'Мы работаем только с проверенными поставщиками и используем строительные и отделочные материалы, соответствующие современным стандартам безопасности и долговечности.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                )
              },
              {
                title: 'Соблюдение сроков',
                text: 'Чёткое планирование и отлаженные процессы позволяют нам выполнять обязательства перед заказчиками и сдавать объекты в оговорённые сроки.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                )
              },
              {
                title: 'Комплексный сервис',
                text: 'От разработки проекта и получения разрешений до финишной отделки и сдачи дома «под ключ» — мы берём на себя все этапы строительства.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                )
              },
              {
                title: 'Гарантия на работы',
                text: 'Мы несём ответственность за результат и предоставляем официальную гарантию на все выполненные строительные работы.',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                )
              }
            ].map((item, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-300"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2C1F14] mb-4 group-hover:text-[#D4A574] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;


