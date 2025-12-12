import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { packages } from '../data/packages';

function PackageDetail() {
  const { id } = useParams();
  const pkg = packages.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Прокрутка в начало страницы при открытии карточки
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

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
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <Link 
          to="/" 
          className="inline-block mb-6 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Назад к каталогу
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 text-center">
          Комплектация "{pkg.title}"
        </h1>

        {/* Галерея проектов */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Галерея проектов
          </h2>
          
          {/* Основное изображение */}
          <div className="w-full h-96 mb-4 overflow-hidden rounded-lg bg-gray-100">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`overflow-hidden rounded-lg bg-gray-100 h-32 transition-all ${
                  selectedImage === idx 
                    ? 'ring-4 ring-[#6a040f] scale-105' 
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

        <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Характеристики комплектации
          </h2>
          <ul className="space-y-4">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="text-gray-700 text-base leading-relaxed border-b border-gray-100 pb-3 last:border-0">
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


