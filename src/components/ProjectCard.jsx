import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectCard({ project }) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Обработка изображений
  const getImages = () => {
    if (project.images && Array.isArray(project.images) && project.images.length > 0) {
      return project.images;
    }
    if (typeof project.images === 'string') {
      try {
        const parsed = JSON.parse(project.images);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        // Если не JSON, игнорируем
      }
    }
    if (project.image) {
      return [project.image];
    }
    return ['/images/houses/placeholder.svg'];
  };

  const images = getImages();

  // Автоматическое переключение изображений
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Навигация по клавиатуре
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentImageIndex, images.length]);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Обработка свайпов
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  const formatPrice = (price) => {
    if (!price) return '';
    // Если цена уже отформатирована, возвращаем как есть
    if (typeof price === 'string' && price.includes('₽')) {
      return price;
    }
    // Иначе форматируем число
    const numPrice = typeof price === 'string' ? parseInt(price.replace(/\s/g, '')) : price;
    return new Intl.NumberFormat('ru-RU').format(numPrice) + ' ₽';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Строятся':
        return 'bg-yellow-100 text-yellow-800';
      case 'Сданные':
        return 'bg-green-100 text-green-800';
      case 'Старт продаж':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row">
      {/* Информация слева (60% на десктопе) */}
      <div className="w-full md:w-3/5 p-4 sm:p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">{project.name || project.title}</h3>
              {project.district && (
                <p className="text-xs sm:text-sm md:text-base text-gray-600">{project.district}</p>
              )}
            </div>
            {project.discount && (
              <span className="ml-2 px-2 py-1 bg-[#2C1F14]/10 text-[#2C1F14] text-xs font-semibold rounded">
                {project.discount}
              </span>
            )}
          </div>

          {project.description && (
            <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-2">
              {project.description}
            </p>
          )}
        </div>

         <div className="mt-auto">
           {/* Цена от, Комнаты, Площадь в одну строку */}
           <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 mb-3 sm:mb-4">
             {project.priceFrom && (
               <div className="flex flex-col">
                 <span className="text-xs sm:text-sm md:text-base text-gray-600">Цена от:</span>
                 <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                   {formatPrice(project.priceFrom)}
                 </span>
               </div>
             )}

             {project.rooms && (
               <div className="flex flex-col">
                 <span className="text-xs sm:text-sm md:text-base text-gray-600">Комнаты:</span>
                 <span className="text-sm sm:text-base md:text-lg font-medium text-gray-900">{project.rooms}</span>
               </div>
             )}

             {project.area && (
               <div className="flex flex-col">
                 <span className="text-xs sm:text-sm md:text-base text-gray-600">Площадь:</span>
                 <span className="text-sm sm:text-base md:text-lg font-medium text-gray-900">{project.area}</span>
               </div>
             )}
           </div>

          <button
            onClick={() => {
              // Сохраняем позицию скролла перед переходом
              sessionStorage.setItem('catalogScrollPosition', window.scrollY.toString());
              navigate(`/project/${project.id}`);
            }}
            className="w-fit bg-[#2C1F14] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg hover:bg-[#3D2817] transition-colors font-medium rounded-lg"
          >
            Подробнее
          </button>
        </div>
      </div>

      {/* Изображение справа (40% на десктопе) */}
      <div className="w-full md:w-2/5 h-48 sm:h-64 md:h-80 lg:h-96 relative overflow-hidden bg-gray-100 p-3 sm:p-4 md:p-6">
        {images.length > 0 && (
          <>
            <img
              src={images[currentImageIndex]}
              alt={project.name || project.title}
              className="w-full h-full object-cover rounded"
              onError={(e) => {
                e.target.src = '/images/houses/placeholder.svg';
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            />

            {/* Навигационные стрелки */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                  aria-label="Предыдущее изображение"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 sm:p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                  aria-label="Следующее изображение"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Индикаторы (точки) */}
            {images.length > 1 && (
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-white w-4 sm:w-6'
                        : 'bg-white bg-opacity-50'
                    }`}
                    aria-label={`Изображение ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;

