import { useParams, Link, useNavigationType } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { packages } from '../data/packages';

function PackageDetail() {
  const { id } = useParams();
  const navigationType = useNavigationType();
  const pkg = packages.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Прокрутка в начало страницы только при новом переходе (не при возврате назад)
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, navigationType]);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Комплектация не найдена</h1>
          <Link to="/" className="text-accent-600 hover:text-accent-700">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const gallery = pkg.gallery || [pkg.image];

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        {/* Кнопка "Назад" для мобильной версии */}
        <Link 
          to="/"
          className="md:hidden inline-block text-[#6a040f] hover:opacity-80 transition-opacity mb-6 text-base sm:text-lg font-medium"
        >
          Назад
        </Link>
        {/* Заголовок с кнопкой "Назад" для десктопной версии */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center md:text-left flex-1">
            Комплектация "{pkg.title}"
          </h1>
          {/* Кнопка "Назад" для десктопной версии */}
          <Link 
            to="/"
            className="hidden md:inline-flex items-center text-[#6a040f] hover:opacity-80 transition-opacity text-base font-medium ml-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </Link>
        </div>

        {/* Галерея проектов */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
            Галерея проектов
          </h2>
          
          {/* Основное изображение */}
          <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] mb-3 sm:mb-4 overflow-hidden rounded-lg bg-gray-100">
            <img 
              src={gallery[selectedImage]} 
              alt={`${pkg.title} - проект ${selectedImage + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/images/houses/placeholder.svg';
              }}
            />
          </div>

          {/* Миниатюры */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`overflow-hidden rounded-lg bg-gray-100 h-24 sm:h-28 md:h-32 lg:h-36 transition-all ${
                  selectedImage === idx 
                    ? 'ring-2 sm:ring-4 ring-[#6a040f] scale-105' 
                    : 'hover:opacity-80'
                }`}
              >
                <img 
                  src={img} 
                  alt={`${pkg.title} - миниатюра ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/houses/placeholder.svg';
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Кнопка "Назад" для мобильной версии над характеристиками */}
        <div className="md:hidden mb-4">
          <Link 
            to="/"
            className="inline-flex items-center text-[#6a040f] hover:opacity-80 transition-opacity text-base font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад
          </Link>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
            Характеристики комплектации
          </h2>
          <ul className="space-y-3 sm:space-y-4">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed border-b border-gray-100 pb-2 sm:pb-3 last:border-0">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PackageDetail;


