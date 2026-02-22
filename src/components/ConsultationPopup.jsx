import { useState, useEffect } from 'react';

function ConsultationPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });

  useEffect(() => {
    // Проверяем cookie
    const checkCookie = () => {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'consultationPopupClosed' && value === 'true') {
          return true;
        }
      }
      return false;
    };

    // Показываем блок через 2 секунды, если cookie нет
    if (!checkCookie()) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        console.log('Consultation popup shown');
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      console.log('Consultation popup blocked by cookie');
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Устанавливаем cookie на 2 дня
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 2);
    document.cookie = `consultationPopupClosed=true; expires=${expiryDate.toUTCString()}; path=/`;
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Форма консультации отправлена:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', phone: '' });
    
    // Закрываем форму через 3 секунды
    setTimeout(() => {
      handleCloseForm();
      handleClose();
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Плавающий блок в правом нижнем углу */}
      <div className="fixed bottom-6 right-6 z-50 animate-slideInRight">
        <div className="group relative bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-2xl p-6 shadow-2xl max-w-sm hover:scale-105 transition-all duration-300">
          {/* Кнопка закрытия */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Декоративный элемент */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-white/5 rounded-full transform -translate-x-10 -translate-y-10"></div>
          
          <div className="relative">
            {/* Иконка подарка */}
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-white mb-3">
              Закажите консультацию и получите планировку в подарок
            </h3>

            <button
              onClick={handleOpenForm}
              className="w-full bg-white text-[#2C1F14] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn"
            >
              <span>Заказать</span>
              <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Модальное окно формы */}
      {isFormOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4 animate-fadeIn"
          onClick={handleCloseForm}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scaleIn relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Декоративный элемент */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#2C1F14]/5 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12"></div>

            {!isSubmitted ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#2C1F14]">
                      Консультация
                    </h2>
                  </div>
                  <button
                    onClick={handleCloseForm}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Закрыть"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p className="text-gray-600 mb-6">
                  Оставьте свои контакты, и мы свяжемся с вами для консультации. В подарок вы получите планировку дома!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="consultation-name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      id="consultation-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  <div>
                    <label htmlFor="consultation-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      id="consultation-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D4A574] focus:border-transparent outline-none transition-all"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#2C1F14] to-[#D4A574] text-white py-4 px-6 rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <span>Получить консультацию</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2C1F14] to-[#D4A574] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2C1F14] mb-3">
                  Спасибо за заявку!
                </h3>
                <p className="text-gray-600">
                  Мы свяжемся с вами в ближайшее время и отправим планировку
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ConsultationPopup;
