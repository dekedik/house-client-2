import { useEffect, useRef } from 'react';

function BankCarousel() {
  const banks = [
    { name: 'Сбербанк', logo: '/images/banks/logo-sber.png' },
    { name: 'Почта Банк', logo: '/images/banks/logo-pochta-bank.png' },
    { name: 'Тинькофф Банк', logo: '/images/banks/logo-tbank.png' },
    { name: 'Домклик', logo: '/images/banks/logo-domklik.png' },
    { name: 'Халва', logo: '/images/banks/logo-halva.png' },
  ];

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 1; // пикселей за кадр
    const scrollDelay = 20; // миллисекунд между кадрами

    const scroll = () => {
      scrollAmount += scrollSpeed;
      scrollContainer.scrollLeft = scrollAmount;

      // Когда дошли до конца, возвращаемся в начало
      if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0;
      }
    };

    const intervalId = setInterval(scroll, scrollDelay);

    return () => clearInterval(intervalId);
  }, []);

  // Дублируем массив для бесшовной прокрутки
  const duplicatedBanks = [...banks, ...banks];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-[#2C1F14]">
          Банки-партнеры
        </h2>
        
        <div className="relative overflow-hidden">
          {/* Карусель с автоматической прокруткой */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 sm:gap-8 md:gap-10 overflow-x-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedBanks.map((bank, index) => (
              <div
                key={`${bank.name}-${index}`}
                className="flex-shrink-0 bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-6 md:p-8 hover:shadow-lg hover:border-[#2C1F14] transition-all duration-300"
              >
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BankCarousel;
