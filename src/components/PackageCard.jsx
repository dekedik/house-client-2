import { Link } from 'react-router-dom';

function PackageCard({ package: pkg }) {
  const handleClick = (e) => {
    // Сохраняем позицию скролла и ID карточки
    const cardElement = e.currentTarget.closest('[data-card-id]');
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      const cardTop = rect.top + currentScroll;
      sessionStorage.setItem('homeScrollPosition', cardTop.toString());
    } else {
      sessionStorage.setItem('homeScrollPosition', currentScroll.toString());
    }
    sessionStorage.setItem('selectedPackageId', pkg.id);
    sessionStorage.setItem('fromPackageDetail', 'true');
  };

  return (
    <div 
      data-card-id={pkg.id}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex flex-col h-full">
        {/* Изображение */}
        <div className="w-full h-40 sm:h-48 md:h-56 overflow-hidden bg-gray-100">
          <img 
            src={pkg.thumbnail} 
            alt={pkg.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/images/houses/placeholder.svg';
            }}
          />
        </div>
        {/* Контент */}
        <div className="p-3 sm:p-4 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900">
            {pkg.title}
          </h3>
          <Link
            to={`/package/${pkg.id}`}
            onClick={handleClick}
            className="mt-auto w-fit bg-[#2C1F14] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm hover:bg-[#3D2817] transition-colors duration-200 inline-block"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;

