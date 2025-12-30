import { useNavigate } from 'react-router-dom';

function HouseCard({ house }) {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (!price) return '';
    const numPrice = typeof price === 'string' ? parseInt(price.replace(/\s/g, '')) : price;
    return new Intl.NumberFormat('ru-RU').format(numPrice) + ' ₽';
  };

  const getImage = () => {
    if (house.images && Array.isArray(house.images) && house.images.length > 0) {
      return house.images[0];
    }
    if (house.image) {
      return house.image;
    }
    return '/images/houses/placeholder.svg';
  };

  const handleCardClick = () => {
    sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    navigate(`/project/${house.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col h-full relative"
    >
      {/* Изображение */}
      <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
        <img 
          src={getImage()}
          alt={house.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/images/houses/placeholder.svg';
          }}
        />
      </div>
      
      {/* Контент */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-900">
          {house.name}
        </h3>
        
        <div className="mt-auto space-y-2">
          {/* Цена от */}
          {house.priceFrom && (
            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Цена от:</span>
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                {formatPrice(house.priceFrom)}
              </span>
            </div>
          )}

          {/* Площадь */}
          {house.area && (
            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Площадь:</span>
              <span className="text-sm sm:text-base font-medium text-gray-900">
                {house.area}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Круглая кнопка справа снизу */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick();
        }}
        className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-[#2C1F14] text-white rounded-full flex items-center justify-center hover:bg-[#3D2817] transition-colors duration-200 shadow-lg hover:shadow-xl z-10"
        aria-label="Перейти к проекту"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default HouseCard;

