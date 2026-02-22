import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SocialLinks from '../components/SocialLinks';
import Breadcrumbs from '../components/Breadcrumbs';

function Contacts() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 w-full overflow-x-hidden py-12 pt-20 sm:pt-24 md:pt-28">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2C1F14] mb-12 text-center">
          Контакты
        </h1>
        
        {/* Контактная информация */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Свяжитесь с нами */}
          <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-300"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2C1F14]">
                  Свяжитесь с нами
                </h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-3 uppercase tracking-wider text-sm">
                    Телефон
                  </h3>
                  <div className="space-y-3">
                    <a 
                      href="tel:+79185429777" 
                      className="flex items-center gap-3 text-xl font-bold text-[#2C1F14] hover:text-[#D4A574] transition-colors group/link"
                    >
                      <svg className="w-5 h-5 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +7 (918) 542-97-77
                    </a>
                    <a 
                      href="tel:+79508503306" 
                      className="flex items-center gap-3 text-xl font-bold text-[#2C1F14] hover:text-[#D4A574] transition-colors group/link"
                    >
                      <svg className="w-5 h-5 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +7 (950) 850-33-06
                    </a>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-3 uppercase tracking-wider text-sm">
                    Мы в соцсетях
                  </h4>
                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>

          {/* Адрес */}
          <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-300"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#2C1F14]">
                  Адрес
                </h3>
              </div>
              <div className="space-y-3">
                <p className="text-xl font-bold text-gray-800">
                  г. Ростов-на-Дону
                </p>
                <p className="text-lg text-gray-700">
                  ул. Михаила Нагибина, д.38
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Режим работы */}
        <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C1F14]">
                Режим работы
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { days: 'Понедельник - Пятница', time: '9:00 - 19:00' },
                { days: 'Суббота', time: '10:00 - 17:00' },
                { days: 'Воскресенье', time: 'Выходной' }
              ].map((schedule, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-[#D4A574] transition-colors">
                  <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                    {schedule.days}
                  </p>
                  <p className="text-lg font-bold text-[#2C1F14]">
                    {schedule.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Карта */}
        <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-300"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C1F14]">
                Как нас найти
              </h2>
            </div>
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden border-2 border-gray-200 group-hover:border-[#D4A574] transition-colors">
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
            <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-base text-gray-700 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#2C1F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                проспект Михаила Нагибина, 38, Ростов-на-Дону, 344068
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;

