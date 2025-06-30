
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
    'services.what_we_offer': 'Qué ofrecemos',
    'services.subtitle': 'Desarrollamos soluciones a medida que permiten aprovechar al máximo el valor de tus datos, desde la automatización de procesos hasta la visualización avanzada.',
    'services.automation.title': 'Automatización de Procesos',
    'services.visualization.title': 'Visualización de Datos',
    'services.extraction.title': 'Extracción y Procesamiento',
    'services.consulting.title': 'Consultoría en Análisis',
    'services.training.title': 'Formación y Capacitación',
    'services.unstructured.title': 'Análisis de Datos No Estructurados',
    'services.ai.title': 'Integración con IA',
    'services.analytics.title': 'Análisis de Datos',
    'services.analytics.desc': 'Transformamos datos complejos en insights accionables que impulsan la toma de decisiones estratégicas.',
    'services.automation.desc': 'Optimizamos tareas repetitivas y manuales para liberar tiempo valioso de tu equipo, reducir errores y mejorar la eficiencia operativa.',
    'services.visualization.desc': 'Transformamos datos complejos en visualizaciones interactivas y dashboards que facilitan la comprensión y toma de decisiones efectivas.',
    'services.extraction.desc': 'Extraemos, transformamos y limpiamos datos de múltiples fuentes para convertirlos en información valiosa y accionable para tu negocio.',
    'services.consulting.desc': 'Asesoramos y desarrollamos estrategias para implementar una cultura data-driven en tu organización, identificando KPIs clave y oportunidades de mejora.',
    'services.training.desc': 'Programas de formación personalizados para que tu equipo desarrolle habilidades analíticas y aproveche al máximo las herramientas disponibles.',
    'services.unstructured.desc': 'Extraemos insights valiosos de textos, imágenes y comunicaciones mediante técnicas avanzadas de procesamiento y análisis inteligente.',
    'services.ai.desc': 'Implementamos soluciones de inteligencia artificial personalizadas que automatizan procesos complejos y mejoran la capacidad predictiva de tu empresa.',
    'process.category': 'NUESTRA METODOLOGÍA',
    'process.title': 'Proceso de Trabajo',
    'process.subtitle': 'Seguimos un enfoque estructurado pero flexible que garantiza resultados óptimos en cada proyecto.',
    'process.step1.title': 'Diagnóstico',
    'process.step1.desc': 'Analizamos tu situación actual, identificamos oportunidades y definimos objetivos claros.',
    'process.step2.title': 'Diseño',
    'process.step2.desc': 'Desarrollamos una estrategia personalizada y planificamos la solución óptima para tus necesidades.',
    'process.step3.title': 'Implementación',
    'process.step3.desc': 'Ejecutamos la solución con un enfoque ágil, permitiendo ajustes durante el proceso.',
    'process.step4.title': 'Optimización',
    'process.step4.desc': 'Monitorizamos resultados, refinamos la solución y garantizamos la transferencia de conocimiento.',
    'process.diagram.title': 'Flujo de Trabajo',
    'process.diagram.subtitle': 'Un proceso iterativo y adaptativo para maximizar el valor de tus datos.',
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
    'services.what_we_offer': 'What we offer',
    'services.subtitle': 'We develop customized solutions that allow you to maximize the value of your data, from process automation to advanced visualization.',
    'services.automation.title': 'Process Automation',
    'services.visualization.title': 'Data Visualization',
    'services.extraction.title': 'Extraction and Processing',
    'services.consulting.title': 'Analytics Consulting',
    'services.training.title': 'Training and Capacity Building',
    'services.unstructured.title': 'Unstructured Data Analysis',
    'services.ai.title': 'AI Integration',
    'services.analytics.title': 'Data Analytics',
    'services.analytics.desc': 'We transform complex data into actionable insights that drive strategic decision-making.',
    'services.automation.desc': 'We optimize repetitive and manual tasks to free up valuable time for your team, reduce errors and improve operational efficiency.',
    'services.visualization.desc': 'We transform complex data into interactive visualizations and dashboards that facilitate understanding and effective decision making.',
    'services.extraction.desc': 'We extract, transform and clean data from multiple sources to convert it into valuable and actionable information for your business.',
    'services.consulting.desc': 'We advise and develop strategies to implement a data-driven culture in your organization, identifying key KPIs and improvement opportunities.',
    'services.training.desc': 'Personalized training programs for your team to develop analytical skills and make the most of available tools.',
    'services.unstructured.desc': 'We extract valuable insights from texts, images and communications through advanced processing and intelligent analysis techniques.',
    'services.ai.desc': 'We implement personalized artificial intelligence solutions that automate complex processes and improve your company\'s predictive capacity.',
    'process.category': 'OUR METHODOLOGY',
    'process.title': 'Work Process',
    'process.subtitle': 'We follow a structured but flexible approach that guarantees optimal results in each project.',
    'process.step1.title': 'Diagnosis',
    'process.step1.desc': 'We analyze your current situation, identify opportunities and define clear objectives.',
    'process.step2.title': 'Design',
    'process.step2.desc': 'We develop a personalized strategy and plan the optimal solution for your needs.',
    'process.step3.title': 'Implementation',
    'process.step3.desc': 'We execute the solution with an agile approach, allowing adjustments during the process.',
    'process.step4.title': 'Optimization',
    'process.step4.desc': 'We monitor results, refine the solution and guarantee knowledge transfer.',
    'process.diagram.title': 'Workflow',
    'process.diagram.subtitle': 'An iterative and adaptive process to maximize the value of your data.',
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