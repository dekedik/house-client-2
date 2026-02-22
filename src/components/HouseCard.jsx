function HouseCard({ house }) {
  const getImage = () => {
    if (house.images && Array.isArray(house.images) && house.images.length > 0) {
      return house.images[0];
    }
    if (house.image) {
      return house.image;
    }
    return '/images/houses/placeholder.svg';
  };

  return (
    <a 
      href={`/project/${house.id}`} 
      target="_blank"
      className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574] flex flex-col h-full"
    >
      {/* Изображение */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <img 
          src={getImage()}
          alt={house.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = '/images/houses/placeholder.svg';
          }}
        />
        {/* Декоративный элемент */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2C1F14]/10 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8"></div>
        
        {/* Круглая кнопка */}
        <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-90 transition-all duration-300 z-20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      {/* Контент */}
      <div className="relative p-5 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-bold mb-3 text-gray-900 group-hover:text-[#2C1F14] transition-colors">
          {house.name}
        </h3>
        
        <div className="mt-auto">
          {/* Площадь */}
          {house.area && (
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 group-hover:border-[#D4A574] transition-colors">
              <span className="text-xs text-gray-600 font-medium uppercase tracking-wider">Площадь</span>
              <div className="text-base sm:text-lg font-bold text-[#2C1F14] mt-1">
                {house.area}
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

export default HouseCard;

