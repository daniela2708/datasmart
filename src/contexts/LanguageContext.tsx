
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  es: {
    'company.name': 'DataSmart',
    'company.tagline': 'Transformando datos en decisiones inteligentes',
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'hero.category': 'ANÁLISIS DE DATOS Y AUTOMATIZACIÓN',
    'hero.title': 'Transformamos tus datos en decisiones inteligentes',
    'hero.subtitle': 'Ofrecemos soluciones personalizadas de análisis de datos y automatización adaptadas a tu negocio, ayudándote a optimizar procesos, reducir costos y mejorar la toma de decisiones.',
    'hero.cta': 'Conoce nuestros servicios',
    'services.title': 'Nuestros Servicios',
    'services.analytics.title': 'Análisis de Datos',
    'services.analytics.desc': 'Transformamos datos complejos en insights accionables que impulsan la toma de decisiones estratégicas.',
    'services.automation.title': 'Automatización de Procesos',
    'services.automation.desc': 'Optimizamos operaciones mediante la automatización inteligente de procesos empresariales.',
    'services.consulting.title': 'Consultoría Estratégica',
    'services.consulting.desc': 'Asesoramos en la implementación de soluciones de datos adaptadas a las necesidades específicas de cada empresa.',
    'about.title': 'Por qué elegir DataSmart',
    'about.experience': 'Experiencia Comprobada',
    'about.experience.desc': 'Años de experiencia ayudando a empresas de todos los tamaños a aprovechar el poder de sus datos.',
    'about.innovation': 'Innovación Constante',
    'about.innovation.desc': 'Utilizamos las últimas tecnologías y metodologías para entregar soluciones de vanguardia.',
    'about.results': 'Resultados Medibles',
    'about.results.desc': 'Nos enfocamos en generar impacto real y medible en los indicadores clave de nuestros clientes.',
    'contact.title': 'Comienza tu transformación digital',
    'contact.subtitle': 'Contáctanos para una consulta gratuita y descubre cómo podemos ayudar a tu empresa.',
    'contact.cta': 'Contactar ahora',
    'stats.projects': 'Proyectos Completados',
    'stats.clients': 'Clientes Satisfechos',
    'stats.efficiency': 'Mejora en Eficiencia',
    'stats.roi': 'ROI Promedio'
  },
  en: {
    'company.name': 'DataSmart',
    'company.tagline': 'Transforming data into smart decisions',
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.category': 'DATA ANALYSIS AND AUTOMATION',
    'hero.title': 'We transform your data into smart decisions',
    'hero.subtitle': 'We offer personalized data analysis and automation solutions tailored to your business, helping you optimize processes, reduce costs and improve decision making.',
    'hero.cta': 'Learn about our services',
    'services.title': 'Our Services',
    'services.analytics.title': 'Data Analytics',
    'services.analytics.desc': 'We transform complex data into actionable insights that drive strategic decision-making.',
    'services.automation.title': 'Process Automation',
    'services.automation.desc': 'We optimize operations through intelligent automation of business processes.',
    'services.consulting.title': 'Strategic Consulting',
    'services.consulting.desc': 'We advise on implementing data solutions tailored to each company\'s specific needs.',
    'about.title': 'Why choose DataSmart',
    'about.experience': 'Proven Experience',
    'about.experience.desc': 'Years of experience helping companies of all sizes harness the power of their data.',
    'about.innovation': 'Constant Innovation',
    'about.innovation.desc': 'We use the latest technologies and methodologies to deliver cutting-edge solutions.',
    'about.results': 'Measurable Results',
    'about.results.desc': 'We focus on generating real and measurable impact on our clients\' key indicators.',
    'contact.title': 'Start your digital transformation',
    'contact.subtitle': 'Contact us for a free consultation and discover how we can help your company.',
    'contact.cta': 'Contact now',
    'stats.projects': 'Completed Projects',
    'stats.clients': 'Satisfied Clients',
    'stats.efficiency': 'Efficiency Improvement',
    'stats.roi': 'Average ROI'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};