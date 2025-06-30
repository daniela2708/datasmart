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
import { BarChart3, Zap, Users, TrendingUp, Database, Cog, Award, ArrowRight, Target, Shield, Lightbulb, Monitor, ChevronLeft, ChevronRight, PieChart, FileText, GraduationCap, Brain, Search, Eye } from 'lucide-react';
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

  const totalSlides = 15;
  const slidesPerPage = 6; // Número de indicadores visibles por página

  const allServices = [
    {
      icon: <Cog className="service-icon-modern" />,
      title: t('services.automation.title'),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: <PieChart className="service-icon-modern" />,
      title: t('services.visualization.title'),
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      icon: <FileText className="service-icon-modern" />,
      title: t('services.extraction.title'),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: <Users className="service-icon-modern" />,
      title: t('services.consulting.title'),
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      icon: <GraduationCap className="service-icon-modern" />,
      title: t('services.training.title'),
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      icon: <Search className="service-icon-modern" />,
      title: t('services.unstructured.title'),
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200'
    },
    {
      icon: <Brain className="service-icon-modern" />,
      title: t('services.ai.title'),
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200'
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
                  <div className="hero-content-container">
                    {/* Text Section */}
                    <div className="hero-text-section">
                      <div className="hero-category-tag">
                        {t('hero.category')}
                    </div>
                      
                      <h1 className="hero-main-title">
                        {t('hero.title').split(' ').map((word, index) => {
                          if (word === 'decisiones' || word === 'decisions') {
                            return <span key={index} className="hero-highlight-blue">{word} </span>;
                          } else if (word === 'inteligentes' || word === 'smart') {
                            return <span key={index} className="hero-highlight-green">{word} </span>;
                          } else {
                            return word + ' ';
                          }
                        })}
                      </h1>
                      
                      <p className="hero-description">
                      {t('hero.subtitle')}
                    </p>
                    </div>

                    {/* Visual Section */}
                    <div className="hero-visual-section">
                      <div className="orbit-container">
                        {/* Efecto de resplandor sutil */}
                        <div className="subtle-glow"></div>
                        
                        {/* Líneas de conexión sutiles */}
                        <div className="connection-lines">
                          <div className="connection-line line-1"></div>
                          <div className="connection-line line-2"></div>
                          <div className="connection-line line-3"></div>
                          <div className="connection-line line-4"></div>
                  </div>
                  
                        {/* Partículas de datos discretas */}
                        <div className="data-particles">
                          <div className="particle p-1"></div>
                          <div className="particle p-2"></div>
                          <div className="particle p-3"></div>
                          <div className="particle p-4"></div>
                        </div>
                        
                        {/* Órbita 1 - Interna */}
                        <div className="orbit orbit-1">
                          <div className="satellite sat-1">
                            <svg className="satellite-icon" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                            </svg>
                          </div>
                          <div className="satellite sat-3">
                            <svg className="satellite-icon" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            </svg>
                          </div>
                          <div className="satellite sat-5">
                            <svg className="satellite-icon" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          </div>
                        </div>

                        {/* Órbita 2 */}
                        <div className="orbit orbit-2">
                          <div className="satellite sat-2">
                            <svg className="satellite-icon" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                          </div>
                          <div className="satellite sat-4">
                            <svg className="satellite-icon" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                            </svg>
                          </div>
                          <div className="satellite sat-8">
                            <svg className="satellite-icon" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                            </svg>
                          </div>
                          <div className="satellite sat-9">
                            <svg className="satellite-icon" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          </div>
                        </div>

                        {/* Órbita 3 - Externa */}
                        <div className="orbit orbit-3">
                          <div className="satellite sat-12">
                            <svg className="satellite-icon" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                          </div>
                          <div className="satellite sat-15">
                            <svg className="satellite-icon" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                            </svg>
                          </div>
                          <div className="satellite sat-6">
                            <svg className="satellite-icon" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2z"/>
                            </svg>
                          </div>
                        </div>

                        {/* Hub Central */}
                        <div className="central-hub">
                          <svg className="central-icon" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 1.95c-5.52 0-10 4.48-10 10s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8c0 1.66-.51 3.19-1.38 4.46L21 18.73c1.37-2.07 2.18-4.56 2.18-7.27 0-5.52-4.48-10-10-10z"/>
                            <path d="M12 6c-3.31 0-6 2.69-6 6 0 1.66.67 3.16 1.76 4.24l1.42-1.42C8.45 14.09 8 13.1 8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.1-.45 2.09-1.18 2.82l1.42 1.42C17.33 15.16 18 13.66 18 12c0-3.31-2.69-6-6-6z"/>
                            <circle cx="12" cy="12" r="2"/>
                  </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 2: Services Overview - Elegant Display */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-6xl mx-auto px-6 py-8 relative z-10">
                    <div className="mb-6 text-left max-w-5xl mx-auto">
                      <div className="hero-category-tag" style={{ marginLeft: 0, marginRight: 'auto' }}>
                        {t('services.what_we_offer')}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        {t('services.title')}
                      </h2>
                      <p className="text-gray-600 text-base leading-relaxed">
                        {t('services.subtitle')}
                      </p>
                    </div>
                    
                    <div className="services-grid-container max-w-5xl mx-auto">
                      {/* Primera fila - 4 servicios */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {allServices.slice(0, 4).map((service, index) => (
                          <div key={index} className={`service-card-modern group ${service.bgColor} ${service.borderColor} border-2 rounded-xl p-4 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 cursor-pointer`}>
                            <div className={`service-icon-container mb-3 w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                              {React.cloneElement(service.icon, { 
                                className: "w-6 h-6 text-white drop-shadow-sm" 
                              })}
                            </div>
                            <h3 className="text-gray-900 font-semibold text-sm group-hover:text-gray-700 transition-colors duration-300 leading-tight">
                              {service.title}
                            </h3>
                          </div>
                        ))}
                      </div>
                      
                      {/* Segunda fila - 3 servicios centrados */}
                      <div className="flex justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                          {allServices.slice(4, 7).map((service, index) => (
                            <div key={index + 4} className={`service-card-modern group ${service.bgColor} ${service.borderColor} border-2 rounded-xl p-4 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 cursor-pointer`}>
                              <div className={`service-icon-container mb-3 w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                {React.cloneElement(service.icon, { 
                                  className: "w-6 h-6 text-white drop-shadow-sm" 
                                })}
                              </div>
                              <h3 className="text-gray-900 font-semibold text-sm group-hover:text-gray-700 transition-colors duration-300 leading-tight">
                                {service.title}
                              </h3>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3: Automatización de Procesos */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-4xl mx-auto px-6 py-8 relative z-10">
                    <div className="mb-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl">
                        <Cog className="w-10 h-10 text-white drop-shadow-sm" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {t('services.automation.title')}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                        {t('services.automation.desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 4: Visualización de Datos */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-4xl mx-auto px-6 py-8 relative z-10">
                    <div className="mb-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl">
                        <PieChart className="w-10 h-10 text-white drop-shadow-sm" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {t('services.visualization.title')}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                        {t('services.visualization.desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 5: Extracción y Procesamiento */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-4xl mx-auto px-6 py-8 relative z-10">
                    <div className="mb-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-xl">
                        <FileText className="w-10 h-10 text-white drop-shadow-sm" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {t('services.extraction.title')}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                        {t('services.extraction.desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 6: Consultoría en Análisis */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-4xl mx-auto px-6 py-8 relative z-10">
                    <div className="mb-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl">
                        <Users className="w-10 h-10 text-white drop-shadow-sm" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {t('services.consulting.title')}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                        {t('services.consulting.desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 7: Formación y Capacitación */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-4xl mx-auto px-6 py-8 relative z-10">
                    <div className="mb-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-xl">
                        <GraduationCap className="w-10 h-10 text-white drop-shadow-sm" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {t('services.training.title')}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                        {t('services.training.desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 8: Análisis de Datos No Estructurados */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-4xl mx-auto px-6 py-8 relative z-10">
                    <div className="mb-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-xl">
                        <Search className="w-10 h-10 text-white drop-shadow-sm" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {t('services.unstructured.title')}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                        {t('services.unstructured.desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 9: Integración con IA */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-4xl mx-auto px-6 py-8 relative z-10">
                    <div className="mb-8">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-xl">
                        <Brain className="w-10 h-10 text-white drop-shadow-sm" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {t('services.ai.title')}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                        {t('services.ai.desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 10: Proceso de Trabajo */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-6xl mx-auto px-6 py-8 relative z-10">
                    <div className="mb-8 text-left max-w-5xl mx-auto">
                      <div className="hero-category-tag process" style={{ marginLeft: 0, marginRight: 'auto' }}>
                        {t('process.category')}
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {t('process.title')}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                        {t('process.subtitle')}
                      </p>
                    </div>
                    
                    <div className="process-pipeline max-w-5xl mx-auto">
                      <div className="process-steps">
                        <div className="process-step step-1">
                          <div className="step-number">1</div>
                          <h3 className="step-title">{t('process.step1.title')}</h3>
                          <p className="step-description">{t('process.step1.desc')}</p>
                        </div>
                        
                        <div className="process-step step-2">
                          <div className="step-number">2</div>
                          <h3 className="step-title">{t('process.step2.title')}</h3>
                          <p className="step-description">{t('process.step2.desc')}</p>
                        </div>
                        
                        <div className="process-step step-3">
                          <div className="step-number">3</div>
                          <h3 className="step-title">{t('process.step3.title')}</h3>
                          <p className="step-description">{t('process.step3.desc')}</p>
                        </div>
                        
                        <div className="process-step step-4">
                          <div className="step-number">4</div>
                          <h3 className="step-title">{t('process.step4.title')}</h3>
                          <p className="step-description">{t('process.step4.desc')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 11: Diagrama de Proceso */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-6xl mx-auto px-6 py-8 relative z-10">
                    <div className="mb-8 text-left max-w-5xl mx-auto">
                      <div className="hero-category-tag process" style={{ marginLeft: 0, marginRight: 'auto' }}>
                        {t('process.category')}
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {t('process.diagram.title')}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                        {t('process.diagram.subtitle')}
                      </p>
                    </div>
                    
                    <svg className="process-diagram" viewBox="0 0 800 200">
                      {/* Línea de flujo principal */}
                      <path 
                        d="M100,100 C200,50 600,150 700,100" 
                        className="diagram-path"
                        style={{
                          strokeDasharray: "1000",
                          strokeDashoffset: "1000",
                          animation: "flowPath 10s linear infinite"
                        }}
                      />
                      
                      {/* Nodos del proceso */}
                      <circle className="diagram-node" cx="100" cy="100" r="25">
                        <animate attributeName="r" values="25;28;25" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <text className="diagram-text" x="100" y="100">1</text>
                      
                      <circle className="diagram-node" cx="300" cy="80" r="25">
                        <animate attributeName="r" values="25;28;25" dur="3s" repeatCount="indefinite" begin="0.5s" />
                      </circle>
                      <text className="diagram-text" x="300" y="80">2</text>
                      
                      <circle className="diagram-node" cx="500" cy="120" r="25">
                        <animate attributeName="r" values="25;28;25" dur="3s" repeatCount="indefinite" begin="1s" />
                      </circle>
                      <text className="diagram-text" x="500" y="120">3</text>
                      
                      <circle className="diagram-node end" cx="700" cy="100" r="25">
                        <animate attributeName="r" values="25;28;25" dur="3s" repeatCount="indefinite" begin="1.5s" />
                      </circle>
                      <text className="diagram-text" x="700" y="100">4</text>
                      
                      {/* Líneas de conexión */}
                      <path 
                        d="M125,100 L275,80" 
                        className="diagram-connector"
                        style={{
                          strokeDasharray: "150",
                          strokeDashoffset: "150",
                          animation: "flowPath 2s ease-out forwards 0.5s"
                        }}
                      />
                      
                      <path 
                        d="M325,80 L475,120" 
                        className="diagram-connector"
                        style={{
                          strokeDasharray: "150",
                          strokeDashoffset: "150",
                          animation: "flowPath 2s ease-out forwards 2.5s"
                        }}
                      />
                      
                      <path 
                        d="M525,120 L675,100" 
                        className="diagram-connector"
                        style={{
                          strokeDasharray: "150",
                          strokeDashoffset: "150",
                          animation: "flowPath 2s ease-out forwards 4.5s"
                        }}
                      />
                      
                      {/* Etiquetas */}
                      <text className="diagram-label" x="100" y="150">{t('process.step1.title')}</text>
                      <text className="diagram-label" x="300" y="50">{t('process.step2.title')}</text>
                      <text className="diagram-label" x="500" y="160">{t('process.step3.title')}</text>
                      <text className="diagram-label" x="700" y="150">{t('process.step4.title')}</text>
                    </svg>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 10: Analytics Service Detail */}
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
