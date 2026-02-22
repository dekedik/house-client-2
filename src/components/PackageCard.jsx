import { Link } from 'react-router-dom';

function PackageCard({ package: pkg }) {
  return (
    <a
      href={`/package/${pkg.id}`}
      target="_blank"
      data-card-id={pkg.id}
      className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#D4A574]"
    >
      <div className="flex flex-col h-full">
        {/* Изображение */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
          <img 
            src={pkg.thumbnail} 
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = '/images/houses/placeholder.svg';
            }}
          />
          {/* Декоративный элемент */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#2C1F14]/10 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8"></div>
        </div>
        
        {/* Контент */}
        <div className="relative p-6 flex flex-col flex-grow">
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-900 group-hover:text-[#2C1F14] transition-colors">
            Комплектация "{pkg.title}"
          </h3>
          
          <button
            className="mt-auto w-full relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105 overflow-hidden"
            style={{
              background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, #2C1F14, #D4A574) border-box',
              border: '2px solid transparent'
            }}
          >
            <span className="bg-gradient-to-r from-[#2C1F14] to-[#D4A574] bg-clip-text text-transparent font-bold">
              Подробнее
            </span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="url(#gradient)" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2C1F14" />
                  <stop offset="100%" stopColor="#D4A574" />
                </linearGradient>
              </defs>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </a>
  );
}

export default PackageCard;

