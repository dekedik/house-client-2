import { useState } from 'react';
import packagesData from '../data/packages-comparison.json';

function PackagesComparison({ highlightPackage = null }) {
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1F14] mb-4 text-center">
          Сравнение комплектаций
        </h2>
        <p className="text-base sm:text-lg text-gray-700 text-center mb-6">
          Выберите подходящую комплектацию для вашего дома
        </p>
      </div>

      {/* Мобильная версия - аккордеон по пакетам */}
      <div className="block lg:hidden space-y-4">
        {packagesData.packages.map((packageName) => (
          <div key={packageName} className="border-2 border-[#2C1F14] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(packageName)}
              className="w-full bg-[#2C1F14] text-white px-4 py-3 flex justify-between items-center"
            >
              <span className="text-lg font-bold">{packageName}</span>
              <svg
                className={`w-6 h-6 transition-transform ${expandedCategories[packageName] ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expandedCategories[packageName] && (
              <div className="bg-white">
                {packagesData.categories.map((category, catIdx) => (
                  <div key={catIdx} className="border-b border-gray-200 last:border-0">
                    <div className="bg-gray-50 px-4 py-2">
                      <h3 className="font-bold text-sm text-[#2C1F14]">{category.name}</h3>
                    </div>
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="px-4 py-3 border-b border-gray-100 last:border-0">
                        {item.name && (
                          <div className="font-semibold text-sm text-gray-800 mb-1">{item.name}</div>
                        )}
                        <div className="text-sm text-gray-700">
                          {item.values[packageName]}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Десктопная версия - таблица */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-[#2C1F14] text-white px-4 py-3 text-left font-bold border border-gray-300 sticky left-0 z-10">
                Характеристика
              </th>
              {packagesData.packages.map((packageName) => (
                <th
                  key={packageName}
                  className={`px-4 py-3 text-center font-bold border border-gray-300 min-w-[200px] ${
                    highlightPackage === packageName
                      ? 'bg-[#D4A574] text-white'
                      : 'bg-[#2C1F14] text-white'
                  }`}
                >
                  {packageName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {packagesData.categories.map((category, catIdx) => (
              <>
                {/* Заголовок категории */}
                <tr key={`cat-${catIdx}`}>
                  <td
                    colSpan={packagesData.packages.length + 1}
                    className="bg-gray-100 px-4 py-3 font-bold text-[#2C1F14] border border-gray-300"
                  >
                    {category.name}
                  </td>
                </tr>
                {/* Элементы категории */}
                {category.items.map((item, itemIdx) => (
                  <tr key={`item-${catIdx}-${itemIdx}`} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border border-gray-300 font-medium text-gray-800 sticky left-0 bg-white">
                      {item.name || '-'}
                    </td>
                    {packagesData.packages.map((packageName) => (
                      <td
                        key={packageName}
                        className={`px-4 py-3 border border-gray-300 text-sm text-gray-700 ${
                          highlightPackage === packageName
                            ? 'bg-yellow-50 font-semibold'
                            : ''
                        }`}
                      >
                        {item.values[packageName]}
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Примечание */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>Примечание:</strong> Все комплектации могут быть адаптированы под ваши индивидуальные требования. 
          Свяжитесь с нами для получения подробной консультации.
        </p>
      </div>
    </div>
  );
}

export default PackagesComparison;
