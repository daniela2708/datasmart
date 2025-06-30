import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const currentLangDisplay = language === 'es' ? 'ES' : 'EN';
  const currentLangName = language === 'es' ? 'Español' : 'English';

  return (
    <button 
      className="language-btn-premium" 
      onClick={toggleLanguage}
      aria-label={`Cambiar idioma - Actual: ${currentLangName}`}
      title={`Cambiar a ${language === 'es' ? 'English' : 'Español'}`}
    >
      <div className="language-icon-premium">🌐</div>
      <span>{currentLangDisplay}</span>
    </button>
  );
};

export default LanguageToggle;
