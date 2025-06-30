import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '@/components/ui/carousel';
import { BarChart3, Zap, Users, TrendingUp, Database, Cog, Award, ArrowRight, Target, Shield, Lightbulb, Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

interface DataSmartPresentationProps {
  onFullscreenToggle?: () => void;
}

const DataSmartPresentation: React.FC<DataSmartPresentationProps> = ({ 
  onFullscreenToggle
}) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);
  const [indicatorPage, setIndicatorPage] = useState(0);

  const totalSlides = 6;
  const slidesPerPage = 6; // Número de indicadores visibles por página

  const services = [
    {
      icon: <BarChart3 className="h-8 w-8 text-white transition-all duration-300" />,
      title: t('services.analytics.title'),
      description: t('services.analytics.desc')
    },
    {
      icon: <Cog className="h-8 w-8 text-white transition-all duration-300" />,
      title: t('services.automation.title'),
      description: t('services.automation.desc')
    },
    {
      icon: <Users className="h-8 w-8 text-white transition-all duration-300" />,
      title: t('services.consulting.title'),
      description: t('services.consulting.desc')
    }
  ];

  const stats = [
    { number: '150+', label: t('stats.projects'), icon: <Target className="h-6 w-6" /> },
    { number: '95%', label: t('stats.clients'), icon: <Shield className="h-6 w-6" /> },
    { number: '40%', label: t('stats.efficiency'), icon: <TrendingUp className="h-6 w-6" /> },
    { number: '300%', label: t('stats.roi'), icon: <Lightbulb className="h-6 w-6" /> }
  ];

  const features = [
    {
      icon: <Database className="h-8 w-8 text-blue-400 transition-all duration-300" />,
      title: t('about.experience'),
      description: t('about.experience.desc')
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-400 transition-all duration-300" />,
      title: t('about.innovation'),
      description: t('about.innovation.desc')
    },
    {
      icon: <Award className="h-8 w-8 text-green-400 transition-all duration-300" />,
      title: t('about.results'),
      description: t('about.results.desc')
    }
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-focus al montar para capturar eventos de teclado
  useEffect(() => {
    const container = document.getElementById('datasmart-container');
    if (container) {
      container.focus();
    }
  }, []);

  // Detectar cambios en pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreenActive(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Navegación por teclado y funciones manuales
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevenir navegación si hay un input enfocado
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          navigatePrev();
          break;
        case 'ArrowRight':
          event.preventDefault();
          navigateNext();
          break;
        case 'Escape':
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
      }
    };

    // Agregar listener al document para máxima cobertura
    document.addEventListener('keydown', handleKeyDown, true);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [api]);

  // Funciones de navegación manual
  const navigateNext = () => {
    if (api) {
      api.scrollNext();
    }
  };

  const navigatePrev = () => {
    if (api) {
      api.scrollPrev();
    }
  };

  const goToSlide = (index: number) => {
    // Efecto visual de transición
    const slideElements = document.querySelectorAll('.datasmart-slide');
    const currentSlideElement = slideElements[currentSlide] as HTMLElement;
    if (currentSlideElement) {
      currentSlideElement.style.transform = 'scale(0.98)';
      setTimeout(() => {
        if (currentSlideElement) {
          currentSlideElement.style.transform = 'scale(1)';
        }
      }, 100);
    }
    
    if (api) {
      api.scrollTo(index);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log('Error al entrar en pantalla completa:', err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Efecto para auto-navegar la página de indicadores cuando cambie el slide
  useEffect(() => {
    const targetPage = Math.floor(currentSlide / slidesPerPage);
    if (targetPage !== indicatorPage) {
      setIndicatorPage(targetPage);
    }
  }, [currentSlide, indicatorPage, slidesPerPage]);

  return (
    <div 
      id="datasmart-container"
      className={`h-screen bg-blue-200/80 relative overflow-hidden ${isFullscreenActive ? 'fixed inset-0 z-50' : ''}`}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232563eb' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm10 0c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header Premium - Fijo y ancho completo */}
      <header className="header-premium fixed top-0 left-0 right-0 z-50 m-0 rounded-none">
        <div className="logo-container-premium">
          <div className="logo-premium">
            Data<span>Smart</span>
          </div>
          <div className="tagline-premium">Transformando datos en decisiones inteligentes</div>
        </div>
        
        <div className="controls-premium">
          {/* Botón de Pantalla Completa */}
          <button 
            className="control-btn-premium" 
            data-tooltip={isFullscreenActive ? "Salir de pantalla completa" : "Pantalla completa"}
            onClick={toggleFullscreen}
          >
            <Monitor className="w-4 h-4" />
          </button>
          
          {/* Selector de Idioma usando componente existente */}
          <LanguageToggle />
        </div>
      </header>

      {/* Slides Carousel - Ajustado con padding top para el header fijo */}
      <div className={`pt-10 relative z-40 ${isFullscreenActive ? 'pt-16' : ''}`} style={{ padding: '40px 60px 40px 60px' }}>
        <div className="relative w-full max-w-none mx-auto">
          <Carousel 
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {/* Slide 1: Hero */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-3xl mx-auto px-4 py-6 relative z-10">
                    {/* Logo Oficial DataSmart */}
                    <div className="mb-3">
                      <div className="logo-small">Data<span>Smart</span></div>
                    </div>
                    <p className="subtitle-enhanced text-center text-blue-600 text-xs">{t('company.tagline')}</p>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                      {t('hero.title')}
                    </h2>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed max-w-2xl mx-auto">
                      {t('hero.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <button className="btn-modern text-xs px-3 py-1.5">
                        {t('hero.cta')}
                      </button>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 animate-pulse hidden sm:block" />
                    </div>
                  </div>
                  
                  {/* Neural Network Graphic */}
                  <div className="neural-network-container absolute right-8 top-1/2 transform -translate-y-1/2 w-80 h-80 z-0 hidden lg:block">
                    <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                      {/* Gradient Definitions */}
                      <defs>
                        <radialGradient id="neuronGrad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9"/>
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.6"/>
                        </radialGradient>
                        <radialGradient id="neuronGradGreen" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#34d399" stopOpacity="0.9"/>
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.6"/>
                        </radialGradient>
                        <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4"/>
                          <stop offset="100%" stopColor="#34d399" stopOpacity="0.4"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Background Neural Field */}
                      <circle cx="200" cy="200" r="180" fill="rgba(37, 99, 235, 0.02)" />
                      <circle cx="200" cy="200" r="140" fill="rgba(37, 99, 235, 0.03)" />
                      <circle cx="200" cy="200" r="100" fill="rgba(37, 99, 235, 0.04)" />
                      
                      {/* Neural Connections - Animated */}
                      <g className="neural-connections">
                        <path d="M120,100 Q200,150 280,100" stroke="url(#connectionGrad)" strokeWidth="2" fill="none" opacity="0.6">
                          <animate attributeName="stroke-dasharray" values="0,300;150,150;300,0;0,300" dur="4s" repeatCount="indefinite"/>
                          <animate attributeName="stroke-dashoffset" values="0;-300" dur="4s" repeatCount="indefinite"/>
                        </path>
                        <path d="M120,150 Q200,200 280,150" stroke="url(#connectionGrad)" strokeWidth="2" fill="none" opacity="0.6">
                          <animate attributeName="stroke-dasharray" values="0,300;150,150;300,0;0,300" dur="4.5s" repeatCount="indefinite"/>
                          <animate attributeName="stroke-dashoffset" values="0;-300" dur="4.5s" repeatCount="indefinite"/>
                        </path>
                        <path d="M120,250 Q200,200 280,250" stroke="url(#connectionGrad)" strokeWidth="2" fill="none" opacity="0.6">
                          <animate attributeName="stroke-dasharray" values="0,300;150,150;300,0;0,300" dur="3.8s" repeatCount="indefinite"/>
                          <animate attributeName="stroke-dashoffset" values="0;-300" dur="3.8s" repeatCount="indefinite"/>
                        </path>
                        <path d="M120,300 Q200,250 280,300" stroke="url(#connectionGrad)" strokeWidth="2" fill="none" opacity="0.6">
                          <animate attributeName="stroke-dasharray" values="0,300;150,150;300,0;0,300" dur="4.2s" repeatCount="indefinite"/>
                          <animate attributeName="stroke-dashoffset" values="0;-300" dur="4.2s" repeatCount="indefinite"/>
                        </path>
                        
                        {/* Cross connections */}
                        <line x1="120" y1="100" x2="280" y2="300" stroke="url(#connectionGrad)" strokeWidth="1.5" opacity="0.3">
                          <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3s" repeatCount="indefinite"/>
                        </line>
                        <line x1="120" y1="300" x2="280" y2="100" stroke="url(#connectionGrad)" strokeWidth="1.5" opacity="0.3">
                          <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3.5s" repeatCount="indefinite"/>
                        </line>
                        <line x1="120" y1="150" x2="280" y2="250" stroke="url(#connectionGrad)" strokeWidth="1.5" opacity="0.3">
                          <animate attributeName="opacity" values="0.1;0.5;0.1" dur="4s" repeatCount="indefinite"/>
                        </line>
                      </g>
                      
                      {/* Input Layer Neurons */}
                      <g className="input-layer">
                        <circle cx="120" cy="100" r="18" fill="url(#neuronGrad)" stroke="#2563eb" strokeWidth="2">
                          <animate attributeName="r" values="16;22;16" dur="3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="120" cy="150" r="16" fill="url(#neuronGrad)" stroke="#2563eb" strokeWidth="2">
                          <animate attributeName="r" values="14;20;14" dur="3.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="120" cy="200" r="15" fill="url(#neuronGrad)" stroke="#2563eb" strokeWidth="2">
                          <animate attributeName="r" values="13;19;13" dur="4s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="120" cy="250" r="16" fill="url(#neuronGrad)" stroke="#2563eb" strokeWidth="2">
                          <animate attributeName="r" values="14;20;14" dur="2.8s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="120" cy="300" r="18" fill="url(#neuronGrad)" stroke="#2563eb" strokeWidth="2">
                          <animate attributeName="r" values="16;22;16" dur="3.2s" repeatCount="indefinite"/>
                        </circle>
                      </g>
                      
                      {/* Hidden Layer Neurons */}
                      <g className="hidden-layer">
                        <circle cx="200" cy="120" r="14" fill="url(#neuronGradGreen)" stroke="#10b981" strokeWidth="2">
                          <animate attributeName="r" values="12;18;12" dur="3.3s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="200" cy="170" r="16" fill="url(#neuronGradGreen)" stroke="#10b981" strokeWidth="2">
                          <animate attributeName="r" values="14;20;14" dur="3.8s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="200" cy="200" r="24" fill="url(#neuronGradGreen)" stroke="#10b981" strokeWidth="3">
                          <animate attributeName="r" values="22;28;22" dur="2.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="200" cy="230" r="16" fill="url(#neuronGradGreen)" stroke="#10b981" strokeWidth="2">
                          <animate attributeName="r" values="14;20;14" dur="3.6s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="200" cy="280" r="14" fill="url(#neuronGradGreen)" stroke="#10b981" strokeWidth="2">
                          <animate attributeName="r" values="12;18;12" dur="4.1s" repeatCount="indefinite"/>
                        </circle>
                      </g>
                      
                      {/* Output Layer Neurons */}
                      <g className="output-layer">
                        <circle cx="280" cy="100" r="18" fill="url(#neuronGrad)" stroke="#2563eb" strokeWidth="2">
                          <animate attributeName="r" values="16;22;16" dur="3.4s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="280" cy="150" r="16" fill="url(#neuronGrad)" stroke="#2563eb" strokeWidth="2">
                          <animate attributeName="r" values="14;20;14" dur="3.9s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="280" cy="200" r="20" fill="url(#neuronGradGreen)" stroke="#10b981" strokeWidth="2">
                          <animate attributeName="r" values="18;24;18" dur="2.7s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="280" cy="250" r="16" fill="url(#neuronGrad)" stroke="#2563eb" strokeWidth="2">
                          <animate attributeName="r" values="14;20;14" dur="3.1s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="280" cy="300" r="18" fill="url(#neuronGrad)" stroke="#2563eb" strokeWidth="2">
                          <animate attributeName="r" values="16;22;16" dur="3.7s" repeatCount="indefinite"/>
                        </circle>
                      </g>
                      
                      {/* Data Flow Particles */}
                      <g className="data-particles">
                        <circle r="3" fill="#60a5fa" opacity="0.8">
                          <animateMotion dur="3s" repeatCount="indefinite">
                            <path d="M120,100 Q200,150 280,100"/>
                          </animateMotion>
                        </circle>
                        <circle r="3" fill="#34d399" opacity="0.8">
                          <animateMotion dur="3.5s" repeatCount="indefinite">
                            <path d="M120,150 Q200,200 280,150"/>
                          </animateMotion>
                        </circle>
                        <circle r="3" fill="#60a5fa" opacity="0.8">
                          <animateMotion dur="4s" repeatCount="indefinite">
                            <path d="M120,250 Q200,200 280,250"/>
                          </animateMotion>
                        </circle>
                        <circle r="3" fill="#34d399" opacity="0.8">
                          <animateMotion dur="3.2s" repeatCount="indefinite">
                            <path d="M120,300 Q200,250 280,300"/>
                          </animateMotion>
                        </circle>
                      </g>
                      
                      {/* Central AI Brain Icon */}
                      <g className="ai-brain">
                        <circle cx="200" cy="200" r="35" fill="rgba(37, 99, 235, 0.1)" stroke="#2563eb" strokeWidth="2" strokeDasharray="5,5">
                          <animateTransform attributeName="transform" type="rotate" values="0 200 200;360 200 200" dur="20s" repeatCount="indefinite"/>
                        </circle>
                        <path d="M185,190 Q200,185 215,190 Q215,200 200,205 Q185,200 185,190 Z" fill="#1d4ed8" opacity="0.8">
                          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                        </path>
                        <circle cx="195" cy="195" r="2" fill="#60a5fa">
                          <animate attributeName="r" values="1;3;1" dur="1.5s" repeatCount="indefinite"/>
                        </circle>
                        <circle cx="205" cy="195" r="2" fill="#60a5fa">
                          <animate attributeName="r" values="1;3;1" dur="1.8s" repeatCount="indefinite"/>
                        </circle>
                      </g>
                    </svg>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 2: Services Overview */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-4xl mx-auto px-4 py-6 relative z-10">
                    <p className="subtitle-enhanced text-center text-blue-600 text-xs">{t('services.subtitle') || 'Qué ofrecemos'}</p>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 text-center mb-3 sm:mb-4">
                      {t('services.title')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {services.map((service, index) => (
                        <div key={index} className="feature-card text-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <div className="service-icon mb-2">
                            <div className="w-5 h-5 mx-auto text-white bg-blue-600 rounded-full flex items-center justify-center">
                              {React.cloneElement(service.icon, { className: "w-3 h-3" })}
                            </div>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2">{service.title}</h4>
                          <p className="text-gray-600 leading-relaxed text-xs">{service.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3: Analytics Service Detail */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-3xl mx-auto px-4 py-6 relative z-10">
                    <div className="flex justify-center mb-3">
                      <div className="service-icon float-animation">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <p className="subtitle-enhanced text-center text-blue-600 text-xs">Nuestro Impacto en Números</p>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3">
                      {t('services.analytics.title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed max-w-2xl mx-auto">
                      {t('services.analytics.desc')}
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                      {stats.map((stat, index) => (
                        <div key={index} className="stat-item bg-gray-50 p-2 rounded-lg">
                          <div className="flex justify-center mb-1 text-blue-600">
                            <div className="w-3 h-3">{stat.icon}</div>
                          </div>
                          <div className="stat-number text-gray-900 text-base font-bold">{stat.number}</div>
                          <div className="stat-text text-gray-600 text-xs">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 4: Automation Service Detail */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="absolute inset-0 pattern-hexagon opacity-5 rounded-lg"></div>
                  
                  <div className="text-center max-w-3xl mx-auto px-4 py-6 relative z-10">
                    <div className="flex justify-center mb-3">
                      <div className="service-icon float-animation">
                        <Cog className="h-6 w-6 text-green-600 animate-spin" style={{animationDuration: '8s'}} />
                      </div>
                    </div>
                    <p className="subtitle-enhanced text-center text-green-600 text-xs">Optimización de procesos</p>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3">
                      {t('services.automation.title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed max-w-2xl mx-auto">
                      {t('services.automation.desc')}
                    </p>
                    
                    {/* Benefits List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
                      <div className="flex items-start space-x-2 bg-gray-50 p-2 rounded-lg">
                        <TrendingUp className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-xs">Mejora en Eficiencia</h4>
                          <p className="text-gray-600 text-xs">Optimización operativa del 40%</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 bg-gray-50 p-2 rounded-lg">
                        <Zap className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-xs">Automatización Inteligente</h4>
                          <p className="text-gray-600 text-xs">Procesos empresariales optimizados</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 bg-gray-50 p-2 rounded-lg">
                        <Shield className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-xs">Reducción de Errores</h4>
                          <p className="text-gray-600 text-xs">Mayor precisión en operaciones</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 bg-gray-50 p-2 rounded-lg">
                        <Target className="h-3 w-3 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-xs">Enfoque Estratégico</h4>
                          <p className="text-gray-600 text-xs">Más tiempo para decisiones clave</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 5: About DataSmart */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-3xl mx-auto px-4 py-6 relative z-10">
                    <div className="flex justify-center mb-3">
                      <div className="service-icon float-animation">
                        <Award className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <p className="subtitle-enhanced text-center text-purple-600 text-xs">Nuestra propuesta de valor</p>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {t('about.title')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                      {features.map((feature, index) => (
                        <div key={index} className="feature-card text-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <div className="service-icon mb-2">
                            <div className="w-5 h-5 mx-auto text-blue-400">
                              {feature.icon}
                            </div>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2">{feature.title}</h4>
                          <p className="text-gray-600 leading-relaxed text-xs">{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 6: Contact */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-xl mx-auto px-4 py-6 relative z-10">
                    <div className="flex justify-center mb-3">
                      <div className="service-icon float-animation">
                        <ArrowRight className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <p className="subtitle-enhanced text-center text-blue-600 text-xs">Comienza hoy</p>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3">
                      {t('contact.title')}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed max-w-md mx-auto">
                      {t('contact.subtitle')}
                    </p>
                    
                    {/* Contact Form */}
                    <div className="max-w-sm mx-auto">
                      <div className="form-modern bg-gray-50 p-3 rounded-lg">
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            placeholder="Nombre completo" 
                            className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                          />
                          <input 
                            type="email" 
                            placeholder="Correo electrónico" 
                            className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                          />
                          <input 
                            type="text" 
                            placeholder="Empresa" 
                            className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                          />
                          <textarea 
                            placeholder="Cuéntanos sobre tu proyecto" 
                            rows={2}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs"
                          ></textarea>
                          <button className="btn-modern w-full text-xs px-2 py-1.5">
                            {t('contact.cta')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          {/* Botones de Navegación Manuales - Fuera del slide */}
          <>
            <button
              onClick={navigatePrev}
              className={`absolute ${isFullscreenActive ? '-left-8' : '-left-12'} top-1/2 transform -translate-y-1/2 z-50 w-8 h-8 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center group`}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
            </button>

            <button
              onClick={navigateNext}
              className={`absolute ${isFullscreenActive ? '-right-8' : '-right-12'} top-1/2 transform -translate-y-1/2 z-50 w-8 h-8 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center group`}
            >
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
            </button>
          </>

          {/* Indicadores de Slides - Números Elegantes con Paginación */}
          <div className="numbers-indicators flex justify-center items-center mt-12 mb-6 gap-3 z-50 relative">
            {/* Botón anterior - sutil */}
            {totalSlides > slidesPerPage && indicatorPage > 0 && (
              <button
                onClick={() => setIndicatorPage(indicatorPage - 1)}
                className="indicator-nav-btn opacity-40 hover:opacity-80 transition-opacity"
                aria-label="Indicadores anteriores"
              >
                <ChevronLeft className="w-3 h-3 text-gray-600" />
              </button>
            )}
            
            {/* Indicadores visibles */}
            {Array.from({ length: Math.min(slidesPerPage, totalSlides - indicatorPage * slidesPerPage) }).map((_, index) => {
              const slideIndex = indicatorPage * slidesPerPage + index;
              if (slideIndex >= totalSlides) return null;
              
              return (
                <button
                  key={slideIndex}
                  className={`number-dot-small ${slideIndex === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(slideIndex)}
                  aria-label={`Ir al slide ${slideIndex + 1}`}
                >
                  {slideIndex + 1}
                </button>
              );
            })}
            
            {/* Botón siguiente - sutil */}
            {totalSlides > slidesPerPage && (indicatorPage + 1) * slidesPerPage < totalSlides && (
              <button
                onClick={() => setIndicatorPage(indicatorPage + 1)}
                className="indicator-nav-btn opacity-40 hover:opacity-80 transition-opacity"
                aria-label="Indicadores siguientes"
              >
                <ChevronRight className="w-3 h-3 text-gray-600" />
              </button>
            )}
          </div>

          {/* Indicador de navegación por teclado */}
          <div className={`fixed ${isFullscreenActive ? 'bottom-3' : 'bottom-1'} left-3 z-50 bg-black/80 text-white px-2 py-1 rounded-lg text-xs backdrop-blur-sm`}>
            <span className="opacity-75">← → • ESC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSmartPresentation;
