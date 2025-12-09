import { Link } from 'react-router-dom';

function Home() {
  const categories = [
    { id: 1, title: 'Дачные решения', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', link: '/catalog?type=dachas' },
    { id: 2, title: 'Коттеджи в комплектации «Заходи и Живи»', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', link: '/catalog?type=cottages' },
    { id: 3, title: 'Дома из газоблока', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', link: '/catalog?type=gas-block' },
    { id: 4, title: 'Большие коттеджи', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800', link: '/catalog?type=large-cottages' },
    { id: 5, title: 'Коттеджи', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', link: '/catalog?type=cottages' },
    { id: 6, title: 'Небольшие коттеджи', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', link: '/catalog?type=small-cottages' },
    { id: 7, title: 'Дачные дома', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', link: '/catalog?type=dachas' },
    { id: 8, title: 'Бани', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800', link: '/catalog?type=baths' },
    { id: 9, title: 'Садовые дома', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800', link: '/catalog?type=garden' },
    { id: 10, title: 'Одноэтажные дома', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', link: '/catalog?type=one-floor' },
    { id: 11, title: 'Проекты с мансардой', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800', link: '/catalog?type=mansard' },
    { id: 12, title: 'Модульные дома', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', link: '/catalog?type=modular' },
    { id: 13, title: 'Двухэтажные дома', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800', link: '/catalog?type=two-floor' },
    { id: 14, title: 'Дома-бани', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800', link: '/catalog?type=house-bath' },
    { id: 15, title: 'Брусовые', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', link: '/catalog?type=timber' },
    { id: 16, title: 'Дома до 5 млн рублей', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800', link: '/catalog?type=budget' },
  ];

  const features = [
    { title: 'Современные технологии', desc: 'Используем только проверенные материалы и технологии строительства' },
    { title: 'Быстрое строительство', desc: 'Сроки строительства от 30 дней до готового дома' },
    { title: 'Доступные цены', desc: 'Гибкая система оплаты и кредитование от партнеров' },
    { title: 'Гарантия качества', desc: 'Официальная гарантия на все виды работ и материалы' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Строительство домов вашей мечты
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-300 leading-relaxed">
              Более 15 лет опыта в строительстве качественных домов. 
              От проекта до ключей за один сезон.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/catalog"
                className="bg-accent-600 text-white px-8 py-4 hover:bg-accent-700 transition-colors font-semibold text-center"
              >
                Посмотреть каталог
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 hover:bg-white hover:text-gray-900 transition-colors font-semibold">
                Заказать звонок
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900 text-center">
            Каталог домов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={category.link}
                className="group relative overflow-hidden bg-gray-100 aspect-[4/3] hover:shadow-xl transition-all"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                  <h3 className="text-white text-lg font-semibold p-4 leading-tight">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы начать строительство?
          </h2>
          <p className="text-lg mb-10 text-gray-300">
            Оставьте заявку и получите бесплатную консультацию от наших специалистов
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Ваше имя"
              className="flex-1 px-6 py-3 text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <input 
              type="tel" 
              placeholder="Телефон"
              className="flex-1 px-6 py-3 text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <button 
              type="submit"
              className="bg-accent-600 text-white px-8 py-3 hover:bg-accent-700 transition-colors font-semibold"
            >
              Отправить
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;

