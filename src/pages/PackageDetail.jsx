import { useParams, Link, useNavigationType } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';
import PackagesComparison from '../components/PackagesComparison';
import ConsultationPopup from '../components/ConsultationPopup';

function PackageDetail() {
  const { id } = useParams();
  const navigationType = useNavigationType();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadPackage = async () => {
      try {
        setLoading(true);
        const packageData = await api.getPackageById(id);
        setPkg(packageData);
      } catch (error) {
        console.error('Ошибка при загрузке пакета:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPackage();
  }, [id]);

  useEffect(() => {
    // Прокрутка в начало страницы только при новом переходе (не при возврате назад)
    if (navigationType !== 'POP' && pkg) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, navigationType, pkg]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-[#2C1F14] border-t-transparent mb-4"></div>
          <p className="text-gray-600 text-lg">Загрузка комплектации...</p>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-[#2C1F14]">Комплектация не найдена</h1>
          <Link to="/" className="inline-flex items-center gap-2 text-[#2C1F14] hover:text-[#D4A574] transition-colors font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const gallery = pkg.gallery || [pkg.image];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 w-full overflow-x-hidden">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full">
        {/* Заголовок */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2C1F14] mb-4">
            Комплектация "{pkg.title}"
          </h1>
          <p className="text-lg text-gray-600">
            Детальная информация о выбранной комплектации
          </p>
        </div>

        {/* Галерея */}
        <div className="mb-16">
          {/* Основное изображение */}
          <div className="relative group mb-6">
            <div className="w-full h-72 sm:h-96 md:h-[32rem] lg:h-[40rem] overflow-hidden rounded-3xl bg-gray-100 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              <img 
                src={gallery[selectedImage]} 
                alt={`${pkg.title} - проект ${selectedImage + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = '/images/houses/placeholder.svg';
                }}
              />
              {/* Индикатор текущего изображения */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full z-20">
                <span className="text-sm font-semibold text-[#2C1F14]">
                  {selectedImage + 1} / {gallery.length}
                </span>
              </div>
            </div>
          </div>

          {/* Миниатюры */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`group relative overflow-hidden rounded-2xl h-28 sm:h-32 md:h-36 transition-all duration-300 ${
                    selectedImage === idx 
                      ? 'ring-4 ring-[#D4A574] scale-105 shadow-xl' 
                      : 'hover:scale-105 hover:shadow-lg'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity ${
                    selectedImage === idx ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                  }`}></div>
                  <img 
                    src={img} 
                    alt={`${pkg.title} - миниатюра ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/houses/placeholder.svg';
                    }}
                  />
                  {selectedImage === idx && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#2C1F14]/20">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#2C1F14]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Сравнение всех комплектаций */}
        <div>
          <PackagesComparison highlightPackage={pkg.title} />
        </div>
      </div>

      {/* Всплывающий блок консультации */}
      <ConsultationPopup />
    </div>
  );
}

export default PackageDetail;


