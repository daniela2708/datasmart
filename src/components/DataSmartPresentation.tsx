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

  const totalSlides = 17;
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
              {/* Slide 1: Hero - Introducción con diseño moderno */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg relative overflow-hidden">
                  {/* Background Neural Network */}
                  <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
                    <div className="absolute w-2 h-2 bg-emerald-500 rounded-full top-[15%] left-[10%] animate-float"></div>
                    <div className="absolute w-2 h-2 bg-purple-500 rounded-full top-[25%] right-[20%] animate-float-delay-1"></div>
                    <div className="absolute w-2 h-2 bg-emerald-500 rounded-full bottom-[30%] left-[15%] animate-float-delay-2"></div>
                    <div className="absolute w-2 h-2 bg-purple-500 rounded-full top-[60%] right-[10%] animate-float-delay-3"></div>
                    <div className="absolute w-2 h-2 bg-emerald-500 rounded-full bottom-[15%] right-[25%] animate-float-delay-4"></div>
                    
                    <div className="absolute top-[20%] left-[12%] w-20 h-px bg-gradient-to-r from-emerald-500 to-purple-500 opacity-30 transform rotate-[25deg] animate-connection-flow"></div>
                    <div className="absolute bottom-[35%] right-[15%] w-15 h-px bg-gradient-to-r from-emerald-500 to-purple-500 opacity-30 transform rotate-[-45deg] animate-connection-flow-delay"></div>
                  </div>

                                    {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl w-full mx-auto px-6 items-center relative z-10">
                    {/* Text Content - Left Side */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wide shadow-lg animate-slide-in-left border-l-4 border-purple-500">
                        <span className="text-sm">🧠</span>
                        {t('hero.category')}
                    </div>
                      
                      <h1 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold leading-tight text-slate-900 animate-slide-in-left-delay">
                        <span className="block">{t('hero.title').split(' ').slice(0, 3).join(' ')}</span>
                        <span className="block">
                          <span className="text-slate-900">{t('hero.title').split(' ').slice(3, 4).join(' ')}</span>{' '}
                          <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent font-black">
                            {t('hero.title').split(' ').slice(4, 5).join(' ')}
                          </span>{' '}
                          <span className="bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent font-black">
                            {t('hero.title').split(' ').slice(5).join(' ')}
                          </span>
                        </span>
                      </h1>
                      
                      <p className="text-base text-slate-600 leading-relaxed max-w-xl animate-slide-in-left-delay-2">
                      {t('hero.subtitle')}
                    </p>
                    </div>

                    {/* Visual Content - Right Side */}
                    <div className="lg:col-span-5 flex justify-center items-center animate-slide-in-right">
                      <div className="relative w-full max-w-sm">
                        {/* AI Dashboard */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 overflow-hidden backdrop-blur-lg">
                          {/* Dashboard Header */}
                          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-3 border-b border-gray-200 relative">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 via-purple-500 to-violet-500"></div>
                            <div className="flex items-center justify-between">
                              <h3 className="text-base font-bold bg-gradient-to-r from-emerald-500 to-purple-500 bg-clip-text text-transparent">
                                {t('hero.dashboard.title')}
                              </h3>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                                  <span className="animate-pulse">⚡</span>
                                  {t('hero.dashboard.live_data')}
                                </div>
                                <div className="flex gap-1">
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse-delay"></div>
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse-delay-2"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Dashboard Content */}
                          <div className="p-4 grid grid-cols-2 gap-3">
                                                        {/* Data Processing Card */}
                            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-3 relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-t-xl"></div>
                              <div className="text-xs text-slate-600 uppercase tracking-wide font-semibold mb-1">
                                {t('hero.dashboard.data_processing')}
                              </div>
                              <div className="text-lg font-bold text-slate-900 mb-2">
                                {t('hero.dashboard.processing_active')}
                              </div>
                              <div className="flex justify-between items-center">
                                <div className="flex gap-1">
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-neural-pulse"></div>
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-neural-pulse-delay"></div>
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-neural-pulse-delay-2"></div>
                                </div>
                                <div className="flex gap-1">
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-neural-pulse-delay-3"></div>
                                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-neural-pulse-delay-4"></div>
                                </div>
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-neural-pulse-delay-5"></div>
                              </div>
                  </div>
                  
                                                        {/* Real-time Analytics Card */}
                            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-3 relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500 rounded-t-xl"></div>
                              <div className="text-xs text-slate-600 uppercase tracking-wide font-semibold mb-1">
                                {t('hero.dashboard.realtime_analytics')}
                              </div>
                              <div className="text-lg font-bold text-slate-900 mb-2">
                                {t('hero.dashboard.analytics_running')}
                              </div>
                              <div className="flex items-end justify-center gap-1 h-8">
                                <div className="w-1 bg-gradient-to-t from-emerald-500 to-purple-500 rounded-full animate-ai-bar-1" style={{height: '16px'}}></div>
                                <div className="w-1 bg-gradient-to-t from-emerald-500 to-purple-500 rounded-full animate-ai-bar-2" style={{height: '24px'}}></div>
                                <div className="w-1 bg-gradient-to-t from-emerald-500 to-purple-500 rounded-full animate-ai-bar-3" style={{height: '20px'}}></div>
                                <div className="w-1 bg-gradient-to-t from-emerald-500 to-purple-500 rounded-full animate-ai-bar-4" style={{height: '28px'}}></div>
                                <div className="w-1 bg-gradient-to-t from-emerald-500 to-purple-500 rounded-full animate-ai-bar-5" style={{height: '22px'}}></div>
                                <div className="w-1 bg-gradient-to-t from-emerald-500 to-purple-500 rounded-full animate-ai-bar-6" style={{height: '26px'}}></div>
                              </div>
                        </div>
                        
                            {/* Data Accuracy Card */}
                            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-3 relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-t-xl"></div>
                              <div className="text-xs text-slate-600 uppercase tracking-wide font-semibold mb-1">
                                {t('hero.dashboard.data_accuracy')}
                          </div>
                              <div className="text-lg font-bold text-slate-900 mb-2">98.7%</div>
                              <div className="flex justify-center">
                                <div className="relative w-10 h-10">
                                  <div className="w-10 h-10 border-2 border-gray-200 border-t-emerald-500 border-r-purple-500 rounded-full animate-spin-slow"></div>
                                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-900">
                                    DA
                          </div>
                                </div>
                          </div>
                        </div>

                            {/* Key Metrics Card */}
                            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-3 relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-t-xl"></div>
                              <div className="text-xs text-slate-600 uppercase tracking-wide font-semibold mb-1">
                                {t('hero.dashboard.key_metrics')}
                          </div>
                              <div className="grid grid-cols-3 gap-1 text-center">
                                <div>
                                  <div className="text-xs font-bold bg-gradient-to-r from-emerald-500 to-purple-500 bg-clip-text text-transparent animate-count-up">12ms</div>
                                  <div className="text-xs text-slate-600">{t('hero.dashboard.response')}</div>
                          </div>
                                <div>
                                  <div className="text-xs font-bold bg-gradient-to-r from-emerald-500 to-purple-500 bg-clip-text text-transparent animate-count-up-delay">3.2M</div>
                                  <div className="text-xs text-slate-600">{t('hero.dashboard.records')}</div>
                          </div>
                                <div>
                                  <div className="text-xs font-bold bg-gradient-to-r from-emerald-500 to-purple-500 bg-clip-text text-transparent animate-count-up-delay-2">99.9%</div>
                                  <div className="text-xs text-slate-600">{t('hero.dashboard.uptime')}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                          </div>
                        </div>

                  {/* Cute AI Robot */}
                  <div className="absolute bottom-16 left-1/3 z-50 animate-robot-intro">
                    <div className="relative cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-2 scale-75">
                      {/* Robot */}
                      <div className="relative animate-robot-float">
                        {/* Helmet */}
                        <div className="w-16 h-12 bg-gradient-to-br from-gray-50 to-white rounded-[50%_50%_45%_45%] relative shadow-xl border-2 border-gray-200 ring-1 ring-blue-100">
                          {/* Face */}
                          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gradient-to-br from-blue-900 to-blue-700 rounded-[50%_50%_40%_40%] shadow-inner">
                            {/* Eyes */}
                            <div className="flex justify-between px-3 pt-2">
                              <div className="w-2 h-2 bg-cyan-300 rounded-full animate-eye-blink shadow-lg shadow-cyan-400/60 ring-1 ring-cyan-500"></div>
                              <div className="w-2 h-2 bg-cyan-300 rounded-full animate-eye-blink shadow-lg shadow-cyan-400/60 ring-1 ring-cyan-500"></div>
                          </div>
                            {/* Mouth */}
                            <div className="w-3 h-1.5 border-2 border-cyan-300 border-t-0 rounded-b-full mx-auto mt-1 animate-smile shadow-sm"></div>
                          </div>
                          </div>
                        
                        {/* Body */}
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-11 h-14 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 shadow-xl ring-1 ring-blue-100">
                          {/* Power Button */}
                          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center animate-power-glow shadow-lg shadow-cyan-400/60 ring-2 ring-cyan-300">
                            <div className="w-1.5 h-1.5 border border-white border-b-0 rounded-t-md"></div>
                            <div className="absolute w-0.5 h-1 bg-white top-0.5"></div>
                        </div>

                          {/* Chest Lines */}
                          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 space-y-1">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300 rounded shadow-sm"></div>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300 rounded shadow-sm"></div>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300 rounded shadow-sm"></div>
                        </div>
                      </div>
                        
                        {/* Arms */}
                        <div className="absolute top-13 -left-4 w-3 h-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border-2 border-gray-200 shadow-lg animate-arm-wave origin-top ring-1 ring-blue-100"></div>
                        <div className="absolute top-13 -right-4 w-3 h-6 bg-gradient-to-br from-gray-50 to-white rounded-lg border-2 border-gray-200 shadow-lg animate-arm-wave-delay origin-top ring-1 ring-blue-100"></div>
                        
                        {/* Hands */}
                        <div className="absolute top-18 -left-3 w-2 h-2 bg-gradient-to-br from-gray-50 to-white rounded-full border-2 border-gray-200 shadow-lg ring-1 ring-blue-100"></div>
                        <div className="absolute top-18 -right-3 w-2 h-2 bg-gradient-to-br from-gray-50 to-white rounded-full border-2 border-gray-200 shadow-lg ring-1 ring-blue-100"></div>
                        
                        {/* Legs */}
                        <div className="absolute top-22 left-1.5 w-2.5 h-5 bg-gradient-to-br from-gray-50 to-white rounded-md border-2 border-gray-200 shadow-lg ring-1 ring-blue-100"></div>
                        <div className="absolute top-22 right-1.5 w-2.5 h-5 bg-gradient-to-br from-gray-50 to-white rounded-md border-2 border-gray-200 shadow-lg ring-1 ring-blue-100"></div>
                        
                        {/* Feet */}
                        <div className="absolute top-26 left-0.5 w-3 h-1.5 bg-gradient-to-br from-gray-50 to-white rounded-md border-2 border-gray-200 shadow-lg ring-1 ring-blue-100"></div>
                        <div className="absolute top-26 right-0.5 w-3 h-1.5 bg-gradient-to-br from-gray-50 to-white rounded-md border-2 border-gray-200 shadow-lg ring-1 ring-blue-100"></div>
                    </div>
                      
                      {/* Chat Bubble */}
                      <div className="absolute top-4 left-20 bg-gradient-to-br from-white to-gray-50 backdrop-blur-lg text-blue-900 px-3 py-2 rounded-2xl rounded-tl-sm text-xs font-semibold shadow-xl border-2 border-blue-200 ring-1 ring-blue-100 whitespace-nowrap animate-bubble-float opacity-0">
                        {t('hero.robot.greeting')}
                        <div className="absolute top-3 -left-2 w-0 h-0 border-r-2 border-r-white border-t-2 border-t-transparent border-b-2 border-b-transparent drop-shadow-sm"></div>
                      </div>
                      
                      {/* Gear Particles */}
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 pointer-events-none">
                        <div className="absolute -left-5 text-sm text-cyan-400 animate-gear-float opacity-0">⚙️</div>
                        <div className="absolute left-1 text-sm text-cyan-400 animate-gear-float-delay opacity-0">⚙️</div>
                        <div className="absolute left-7 text-sm text-cyan-400 animate-gear-float-delay-2 opacity-0">⚙️</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 2: Services Overview - Elegant Display */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="text-center max-w-6xl mx-auto px-6 py-8 relative z-10">
                    <div className="mb-8 text-left max-w-5xl mx-auto">
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
                <style>
                  {`
                    .automation-slide-container {
                      min-height: 68vh;
                      background: white;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      overflow: hidden;
                      border-radius: 12px;
                    }
                    
                    .automation-content {
                      width: 85%;
                      max-width: 800px;
                      background: rgba(255, 255, 255, 0.95);
                      backdrop-filter: blur(20px);
                      border-radius: 20px;
                      padding: 40px 35px;
                      text-align: center;
                      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                      position: relative;
                      overflow: hidden;
                    }
                    
                    .automation-content::before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      height: 4px;
                      background: linear-gradient(90deg, #4A90E2, #5BA2F5, #6BB5FF, #4A90E2);
                      background-size: 400% 100%;
                      animation: gradientMove 3s ease-in-out infinite;
                    }
                    
                    @keyframes gradientMove {
                      0%, 100% { background-position: 0% 50%; }
                      50% { background-position: 100% 50%; }
                    }
                    
                    .automation-icon-container {
                      margin-bottom: 25px;
                      position: relative;
                    }
                    
                    .automation-main-icon {
                      width: 80px;
                      height: 80px;
                      background: linear-gradient(45deg, #4A90E2, #5BA2F5);
                      border-radius: 20px;
                      display: inline-flex;
                      align-items: center;
                      justify-content: center;
                      box-shadow: 0 10px 25px rgba(74, 144, 226, 0.3);
                      position: relative;
                      z-index: 2;
                      animation: iconPulse 2s ease-in-out infinite;
                    }
                    
                    @keyframes iconPulse {
                      0%, 100% { transform: scale(1); }
                      50% { transform: scale(1.05); }
                    }
                    
                    .automation-gear-icon {
                      width: 40px;
                      height: 40px;
                      color: white;
                      animation: rotate 6s linear infinite;
                    }
                    
                    @keyframes rotate {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                    
                    .automation-floating-elements {
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      top: 0;
                      left: 0;
                      pointer-events: none;
                      z-index: 1;
                    }
                    
                    .automation-floating-element {
                      position: absolute;
                      width: 40px;
                      height: 40px;
                      background: rgba(74, 144, 226, 0.06);
                      border-radius: 50%;
                      animation: floatAnim 4s ease-in-out infinite;
                    }
                    
                    .automation-floating-element:nth-child(1) {
                      top: 15%;
                      left: 10%;
                      animation-delay: 0s;
                    }
                    
                    .automation-floating-element:nth-child(2) {
                      top: 25%;
                      right: 15%;
                      animation-delay: 1s;
                    }
                    
                    .automation-floating-element:nth-child(3) {
                      bottom: 20%;
                      left: 8%;
                      animation-delay: 2s;
                    }
                    
                    .automation-floating-element:nth-child(4) {
                      bottom: 30%;
                      right: 12%;
                      animation-delay: 3s;
                    }
                    
                    @keyframes floatAnim {
                      0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                      50% { transform: translateY(-15px) rotate(180deg); opacity: 0.6; }
                    }
                    
                    .automation-title {
                      font-size: 2.2rem;
                      font-weight: 700;
                      background: linear-gradient(45deg, #4A90E2, #2E5A8A);
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: transparent;
                      background-clip: text;
                      margin-bottom: 20px;
                      letter-spacing: -1px;
                      line-height: 1.2;
                    }
                    
                    .automation-subtitle {
                      font-size: 1rem;
                      color: #4A5568;
                      line-height: 1.5;
                      max-width: 600px;
                      margin: 0 auto 30px;
                      font-weight: 400;
                    }
                    
                    .automation-benefits-container {
                      display: flex;
                      justify-content: center;
                      gap: 25px;
                      margin-top: 30px;
                      flex-wrap: wrap;
                    }
                    
                    .automation-benefit-item {
                      background: rgba(255, 255, 255, 0.95);
                      backdrop-filter: blur(10px);
                      padding: 18px 22px;
                      border-radius: 16px;
                      box-shadow: 0 6px 24px rgba(74, 144, 226, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08);
                      border: 1px solid rgba(74, 144, 226, 0.15);
                      transition: all 0.3s ease;
                      min-width: 160px;
                      position: relative;
                      overflow: hidden;
                    }
                    
                    .automation-benefit-item::before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: -100%;
                      width: 100%;
                      height: 100%;
                      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                      transition: left 0.6s ease;
                    }
                    
                    .automation-benefit-item:hover::before {
                      left: 100%;
                    }
                    
                    .automation-benefit-item:hover {
                      transform: translateY(-6px);
                      box-shadow: 0 10px 36px rgba(74, 144, 226, 0.2), 0 4px 12px rgba(0, 0, 0, 0.12);
                      border: 1px solid rgba(74, 144, 226, 0.25);
                    }
                    
                    .automation-benefit-icon {
                      width: 45px;
                      height: 45px;
                      margin: 0 auto 12px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border-radius: 12px;
                      font-size: 20px;
                      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
                    }
                    
                    .automation-benefit-icon.efficiency {
                      background: linear-gradient(135deg, #4F46E5, #7C3AED);
                    }
                    
                    .automation-benefit-icon.accuracy {
                      background: linear-gradient(135deg, #DC2626, #EF4444);
                    }
                    
                    .automation-benefit-icon.time {
                      background: linear-gradient(135deg, #059669, #10B981);
                    }
                    
                    .automation-benefit-text {
                      font-size: 0.9rem;
                      color: #4A5568;
                      font-weight: 500;
                      position: relative;
                      z-index: 2;
                    }
                    
                    @media (max-width: 768px) {
                      .automation-content {
                        padding: 30px 25px;
                        margin: 15px;
                        max-width: 90%;
                      }
                      
                      .automation-title {
                        font-size: 1.8rem;
                      }
                      
                      .automation-subtitle {
                        font-size: 0.9rem;
                      }
                      
                      .automation-benefits-container {
                        flex-direction: column;
                        align-items: center;
                        gap: 15px;
                      }
                      
                      .automation-benefit-item {
                        width: 100%;
                        max-width: 250px;
                      }
                      
                      .automation-main-icon {
                        width: 70px;
                        height: 70px;
                      }
                      
                      .automation-gear-icon {
                        width: 35px;
                        height: 35px;
                      }
                    }
                  `}
                </style>
                <div className="automation-slide-container datasmart-slide">
                  <div className="automation-content">
                    <div className="automation-floating-elements">
                      <div className="automation-floating-element"></div>
                      <div className="automation-floating-element"></div>
                      <div className="automation-floating-element"></div>
                      <div className="automation-floating-element"></div>
                    </div>
                    
                    <div className="automation-icon-container">
                      <div className="automation-main-icon">
                        <Cog className="automation-gear-icon" />
                      </div>
                    </div>
                    
                    <h1 className="automation-title">{t('services.automation.title')}</h1>
                    
                    <p className="automation-subtitle">
                      {t('services.automation.subtitle')}
                    </p>
                    
                    <div className="automation-benefits-container">
                      <div className="automation-benefit-item">
                        <div className="automation-benefit-icon efficiency">⚡</div>
                        <div className="automation-benefit-text">{t('services.automation.benefits.efficiency')}</div>
                      </div>
                      <div className="automation-benefit-item">
                        <div className="automation-benefit-icon accuracy">🎯</div>
                        <div className="automation-benefit-text">{t('services.automation.benefits.accuracy')}</div>
                      </div>
                      <div className="automation-benefit-item">
                        <div className="automation-benefit-icon time">🕐</div>
                        <div className="automation-benefit-text">{t('services.automation.benefits.time')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3.1: Introducción a Casos de Automatización */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-4 sm:p-8">
                  <div className="w-full max-w-6xl mx-auto">
                    {/* Encabezado */}
                    <div className="mb-6 sm:mb-8">
                      <div className="hero-category-tag text-xs inline-block text-blue-600 font-medium uppercase tracking-wider mb-3 sm:mb-4 px-2 py-1 sm:px-3 sm:py-2" style={{ background: 'rgba(59, 130, 246, 0.08)', borderLeft: '3px solid #3B82F6' }}>
                        {t('automation.case.category')}
                      </div>
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-4 sm:mb-6 leading-tight">
                        {t('automation.case.problem.title')}
                      </h2>
                      <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-4xl mb-3 sm:mb-4">
                        {t('automation.case.problem.desc')}
                      </p>
                      <div className="bg-red-50 border-l-4 border-red-400 p-3 sm:p-4 mb-4 sm:mb-6 rounded-r-lg">
                        <p className="text-red-800 font-medium text-sm sm:text-base">
                          {t('automation.case.problem.tasks')}
                        </p>
                      </div>
                    </div>
                    
                    {/* Solución */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-200">
                      <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2 sm:mb-3">
                        {t('automation.case.solution.title')}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {t('automation.case.solution.desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3.2: Caso PYME Básico */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <div className="w-full max-w-6xl mx-auto">
                    {/* Encabezado */}
                    <div className="mb-4 sm:mb-6">
                      <div className="hero-category-tag text-xs inline-block text-blue-600 font-medium uppercase tracking-wider mb-2 sm:mb-3 px-2 py-1" style={{ background: 'rgba(59, 130, 246, 0.08)', borderLeft: '3px solid #3B82F6' }}>
                        Caso de Uso
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 mb-1 sm:mb-2 leading-tight">
                        {t('automation.pyme.basic.title')}
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        {t('automation.pyme.basic.subtitle')}
                      </p>
                    </div>
                    
                    {/* Grid de contenido */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      {/* Desafío */}
                      <div className="bg-red-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-red-200 order-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">!</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-700 leading-tight">
                            {t('automation.pyme.basic.challenge')}
                          </h3>
                        </div>
                        <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
                          {t('automation.pyme.basic.challenge.desc')}
                        </p>
                      </div>

                      {/* Solución */}
                      <div className="bg-blue-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-blue-200 order-2">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Cog className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-blue-700 leading-tight">
                            {t('automation.pyme.basic.solution')}
                          </h3>
                        </div>
                        <p className="text-blue-800 text-xs sm:text-sm leading-relaxed">
                          {t('automation.pyme.basic.solution.desc')}
                        </p>
                      </div>

                      {/* Beneficios */}
                      <div className="bg-green-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-green-200 order-3 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-green-700 leading-tight">
                            {t('automation.pyme.basic.benefits')}
                          </h3>
                        </div>
                        <p className="text-green-800 text-xs sm:text-sm leading-relaxed">
                          {t('automation.pyme.basic.benefits.desc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3.3: Caso PYME Intermedio */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <div className="w-full max-w-6xl mx-auto">
                    {/* Encabezado */}
                    <div className="mb-4 sm:mb-6">
                      <div className="hero-category-tag text-xs inline-block text-emerald-600 font-medium uppercase tracking-wider mb-2 sm:mb-3 px-2 py-1" style={{ background: 'rgba(16, 185, 129, 0.08)', borderLeft: '3px solid #10B981' }}>
                        Caso de Uso
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-600 mb-1 sm:mb-2 leading-tight">
                        {t('automation.pyme.intermediate.title')}
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        {t('automation.pyme.intermediate.subtitle')}
                      </p>
                    </div>
                    
                    {/* Grid de contenido */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      {/* Desafío */}
                      <div className="bg-red-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-red-200 order-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">!</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-700 leading-tight">
                            {t('automation.pyme.intermediate.challenge')}
                          </h3>
                        </div>
                        <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
                          {t('automation.pyme.intermediate.challenge.desc')}
                        </p>
                      </div>

                      {/* Solución */}
                      <div className="bg-emerald-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-emerald-200 order-2">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <PieChart className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-emerald-700 leading-tight">
                            {t('automation.pyme.intermediate.solution')}
                          </h3>
                        </div>
                        <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
                          {t('automation.pyme.intermediate.solution.desc')}
                        </p>
                      </div>

                      {/* Beneficios */}
                      <div className="bg-green-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-green-200 order-3 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-green-700 leading-tight">
                            {t('automation.pyme.intermediate.benefits')}
                          </h3>
                        </div>
                        <p className="text-green-800 text-xs sm:text-sm leading-relaxed">
                          {t('automation.pyme.intermediate.benefits.desc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3.4: Caso Startup Intermedio */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <div className="w-full max-w-6xl mx-auto">
                    {/* Encabezado */}
                    <div className="mb-4 sm:mb-6">
                      <div className="hero-category-tag text-xs inline-block text-purple-600 font-medium uppercase tracking-wider mb-2 sm:mb-3 px-2 py-1" style={{ background: 'rgba(147, 51, 234, 0.08)', borderLeft: '3px solid #9333EA' }}>
                        Caso de Uso
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 mb-1 sm:mb-2 leading-tight">
                        {t('automation.startup.intermediate.title')}
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        {t('automation.startup.intermediate.subtitle')}
                      </p>
                    </div>
                    
                    {/* Grid de contenido */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      {/* Desafío */}
                      <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">!</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-700 leading-tight">
                            {t('automation.startup.intermediate.challenge')}
                          </h3>
                        </div>
                        <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
                          {t('automation.startup.intermediate.challenge.desc')}
                        </p>
                      </div>

                      {/* Solución */}
                      <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-purple-700 leading-tight">
                            {t('automation.startup.intermediate.solution')}
                          </h3>
                        </div>
                        <p className="text-purple-800 text-xs sm:text-sm leading-relaxed">
                          {t('automation.startup.intermediate.solution.desc')}
                        </p>
                      </div>

                      {/* Beneficios */}
                      <div className="bg-green-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-green-200 order-3 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-green-700 leading-tight">
                            {t('automation.startup.intermediate.benefits')}
                          </h3>
                        </div>
                        <p className="text-green-800 text-xs sm:text-sm leading-relaxed">
                          {t('automation.startup.intermediate.benefits.desc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3.5: Caso Startup Avanzado */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <div className="w-full max-w-6xl mx-auto">
                    {/* Encabezado */}
                    <div className="mb-4 sm:mb-6">
                      <div className="hero-category-tag text-xs inline-block text-indigo-600 font-medium uppercase tracking-wider mb-2 sm:mb-3 px-2 py-1" style={{ background: 'rgba(99, 102, 241, 0.08)', borderLeft: '3px solid #6366F1' }}>
                        Caso de Uso
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-indigo-600 mb-1 sm:mb-2 leading-tight">
                        {t('automation.startup.advanced.title')}
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        {t('automation.startup.advanced.subtitle')}
                      </p>
                    </div>
                    
                    {/* Grid de contenido */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      {/* Desafío */}
                      <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">!</span>
                          </div>
                          <h3 className="text-lg font-bold text-red-700">
                            {t('automation.startup.advanced.challenge')}
                          </h3>
                        </div>
                        <p className="text-red-800 text-sm leading-relaxed">
                          {t('automation.startup.advanced.challenge.desc')}
                        </p>
                      </div>

                      {/* Solución */}
                      <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-200">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-indigo-700">
                            {t('automation.startup.advanced.solution')}
                          </h3>
                        </div>
                        <p className="text-indigo-800 text-sm leading-relaxed">
                          {t('automation.startup.advanced.solution.desc')}
                        </p>
                      </div>

                      {/* Beneficios */}
                      <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                          <h3 className="text-lg font-bold text-green-700">
                            {t('automation.startup.advanced.benefits')}
                          </h3>
                        </div>
                        <p className="text-green-800 text-sm leading-relaxed">
                          {t('automation.startup.advanced.benefits.desc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3.6: Caso Empresa en Crecimiento */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <div className="w-full max-w-6xl mx-auto">
                    {/* Encabezado */}
                    <div className="mb-4 sm:mb-6">
                      <div className="hero-category-tag text-xs inline-block text-orange-600 font-medium uppercase tracking-wider mb-2 sm:mb-3 px-2 py-1" style={{ background: 'rgba(249, 115, 22, 0.08)', borderLeft: '3px solid #F97316' }}>
                        Caso de Uso
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 mb-1 sm:mb-2 leading-tight">
                        {t('automation.growing.advanced.title')}
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        {t('automation.growing.advanced.subtitle')}
                      </p>
                    </div>
                    
                    {/* Grid de contenido */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      {/* Desafío */}
                      <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">!</span>
                          </div>
                          <h3 className="text-lg font-bold text-red-700">
                            {t('automation.growing.advanced.challenge')}
                          </h3>
                        </div>
                        <p className="text-red-800 text-sm leading-relaxed">
                          {t('automation.growing.advanced.challenge.desc')}
                        </p>
                      </div>

                      {/* Solución */}
                      <div className="bg-orange-50 rounded-xl p-5 border border-orange-200">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-orange-700">
                            {t('automation.growing.advanced.solution')}
                          </h3>
                        </div>
                        <p className="text-orange-800 text-sm leading-relaxed">
                          {t('automation.growing.advanced.solution.desc')}
                        </p>
                      </div>

                      {/* Beneficios */}
                      <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                          <h3 className="text-lg font-bold text-green-700">
                            {t('automation.growing.advanced.benefits')}
                          </h3>
                        </div>
                        <p className="text-green-800 text-sm leading-relaxed">
                          {t('automation.growing.advanced.benefits.desc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3.7: Caso Departamento Corporativo */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <div className="w-full max-w-6xl mx-auto">
                    {/* Encabezado */}
                    <div className="mb-4 sm:mb-6">
                      <div className="hero-category-tag text-xs inline-block text-slate-600 font-medium uppercase tracking-wider mb-2 sm:mb-3 px-2 py-1" style={{ background: 'rgba(71, 85, 105, 0.08)', borderLeft: '3px solid #475569' }}>
                        Caso de Uso
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-600 mb-1 sm:mb-2 leading-tight">
                        {t('automation.corporate.premium.title')}
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        {t('automation.corporate.premium.subtitle')}
                      </p>
                    </div>
                    
                    {/* Grid de contenido */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      {/* Desafío */}
                      <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">!</span>
                          </div>
                          <h3 className="text-lg font-bold text-red-700">
                            {t('automation.corporate.premium.challenge')}
                          </h3>
                        </div>
                        <p className="text-red-800 text-sm leading-relaxed">
                          {t('automation.corporate.premium.challenge.desc')}
                        </p>
                      </div>

                      {/* Solución */}
                      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-slate-500 rounded-lg flex items-center justify-center">
                            <Search className="w-4 h-4 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-700">
                            {t('automation.corporate.premium.solution')}
                          </h3>
                        </div>
                        <p className="text-slate-800 text-sm leading-relaxed">
                          {t('automation.corporate.premium.solution.desc')}
                        </p>
                      </div>

                      {/* Beneficios */}
                      <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">✓</span>
                          </div>
                          <h3 className="text-lg font-bold text-green-700">
                            {t('automation.corporate.premium.benefits')}
                          </h3>
                        </div>
                        <p className="text-green-800 text-sm leading-relaxed">
                          {t('automation.corporate.premium.benefits.desc')}
                        </p>
                      </div>
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

              {/* Slide 10: Integración con IA */}
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

              {/* Slide 11: Proceso de Trabajo */}
              <CarouselItem>
                <style>
                  {`
                    @keyframes dashedLine {
                      from {
                        stroke-dashoffset: 0;
                      }
                      to {
                        stroke-dashoffset: -24;
                      }
                    }
                    .animated-line {
                      animation: dashedLine 1.5s linear infinite;
                    }
                    .pipeline-circle {
                      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
                    }
                    .pipeline-circle::after {
                      content: '';
                      position: absolute;
                      inset: -1px;
                      border-radius: 50%;
                      background: linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0));
                      z-index: 2;
                    }
                  `}
                </style>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-8">
                  <div className="w-full max-w-6xl mx-auto">
                    {/* Encabezado */}
                    <div className="mb-12">
                      <div className="hero-category-tag process text-xs inline-block font-medium uppercase tracking-wider mb-4" style={{ color: '#40E6D2', background: 'rgba(64, 230, 210, 0.08)', borderLeft: '3px solid #40E6D2' }}>
                        Nuestra Metodología
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-4">
                        {t('process.title')}
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                        {t('process.subtitle')}
                      </p>
                    </div>
                    
                    <div className="process-pipeline relative px-8 mt-20">
                      {/* Pasos del proceso */}
                      <div className="grid grid-cols-4 gap-4 relative">
                        {/* Línea base */}
                        <div className="absolute top-[2.5rem] left-[40px] right-[40px] h-[3px] bg-gradient-to-r from-[#6366F1] via-[#10B981] via-[#EC4899] to-[#06B6D4] z-0 rounded-full"></div>
                        {/* Línea animada */}
                        <div className="absolute top-[2.5rem] left-[40px] right-[40px] flex z-[1]">
                          <svg className="w-full h-[2px]" preserveAspectRatio="none">
                            <line 
                              x1="0" 
                              y1="1" 
                              x2="100%" 
                              y2="1" 
                              stroke="white" 
                              strokeWidth="2" 
                              strokeDasharray="6,6"
                              className="animated-line"
                              strokeOpacity="0.7"
                            />
                          </svg>
                        </div>
                        
                        {/* Paso 1 */}
                        <div className="flex flex-col items-center relative z-10">
                          <div className="relative pipeline-circle">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] text-white flex items-center justify-center text-xl font-bold relative overflow-hidden transform hover:scale-105 transition-all duration-300">
                              1
                        </div>
                          </div>
                          <h3 className="text-lg font-bold text-[#40A0FF] mt-6 mb-3 text-center">
                            {t('process.step1.title')}
                          </h3>
                          <p className="text-gray-600 text-sm text-center leading-relaxed max-w-[180px]">
                            {t('process.step1.desc')}
                          </p>
                        </div>
                        
                        {/* Paso 2 */}
                        <div className="flex flex-col items-center relative z-10">
                          <div className="relative pipeline-circle">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#10B981] to-[#06D6A0] text-white flex items-center justify-center text-xl font-bold relative overflow-hidden transform hover:scale-105 transition-all duration-300">
                              2
                        </div>
                      </div>
                          <h3 className="text-lg font-bold text-[#40A0FF] mt-6 mb-3 text-center">
                            {t('process.step2.title')}
                          </h3>
                          <p className="text-gray-600 text-sm text-center leading-relaxed max-w-[180px]">
                            {t('process.step2.desc')}
                          </p>
                        </div>
                        
                        {/* Paso 3 */}
                        <div className="flex flex-col items-center relative z-10">
                          <div className="relative pipeline-circle">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EC4899] to-[#EF4444] text-white flex items-center justify-center text-xl font-bold relative overflow-hidden transform hover:scale-105 transition-all duration-300">
                              3
                        </div>
                      </div>
                          <h3 className="text-lg font-bold text-[#40A0FF] mt-6 mb-3 text-center">
                            {t('process.step3.title')}
                          </h3>
                          <p className="text-gray-600 text-sm text-center leading-relaxed max-w-[180px]">
                            {t('process.step3.desc')}
                      </p>
                    </div>
                    
                        {/* Paso 4 */}
                        <div className="flex flex-col items-center relative z-10">
                          <div className="relative pipeline-circle">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] text-white flex items-center justify-center text-xl font-bold relative overflow-hidden transform hover:scale-105 transition-all duration-300">
                              4
                  </div>
                </div>
                          <h3 className="text-lg font-bold text-[#40A0FF] mt-6 mb-3 text-center">
                            {t('process.step4.title')}
                    </h3>
                          <p className="text-gray-600 text-sm text-center leading-relaxed max-w-[180px]">
                            {t('process.step4.desc')}
                    </p>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 9: Por Qué Elegirnos */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-8">
                  <div className="w-full max-w-6xl mx-auto">
                    {/* Encabezado */}
                    <div className="mb-8">
                      <div className="hero-category-tag text-xs inline-block text-emerald-500 font-medium uppercase tracking-wider mb-2">
                        {t('why_us.category')}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-blue-500 mb-3">
                        {t('why_us.title')}
                      </h2>
                      <p className="text-gray-600 text-base leading-relaxed max-w-3xl">
                        {t('why_us.subtitle')}
                      </p>
                    </div>
                    
                    {/* Grid de características */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Soluciones Escalables */}
                      <div className="feature-card p-4 rounded-lg bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 12V8H4V12M20 12V16H4V12M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                          <h3 className="text-lg font-semibold text-gray-900">{t('why_us.scalable.title')}</h3>
                      </div>
                        <p className="text-gray-600 text-sm">{t('why_us.scalable.desc')}</p>
                        </div>

                      {/* Enfoque Integral */}
                      <div className="feature-card p-4 rounded-lg bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                      </div>
                          <h3 className="text-lg font-semibold text-gray-900">{t('why_us.integral.title')}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{t('why_us.integral.desc')}</p>
                      </div>

                      {/* Procesamiento Inteligente */}
                      <div className="feature-card p-4 rounded-lg bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M19.4 15C19.1277 15.6171 19.0717 16.3081 19.2401 16.9584C19.4085 17.6087 19.7933 18.1807 20.3348 18.5858C20.8762 18.9909 21.5401 19.2063 22.2186 19.1993C22.8971 19.1923 23.5557 18.9633 24.0876 18.5473C24.0876 18.5473 21.8876 22.4473 19.3876 21.0473C16.8876 19.6473 19.4 15 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                          <h3 className="text-lg font-semibold text-gray-900">{t('why_us.processing.title')}</h3>
                      </div>
                        <p className="text-gray-600 text-sm">{t('why_us.processing.desc')}</p>
                    </div>

                      {/* Desarrollo a Medida */}
                      <div className="feature-card p-4 rounded-lg bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                          <h3 className="text-lg font-semibold text-gray-900">{t('why_us.development.title')}</h3>
                </div>
                        <p className="text-gray-600 text-sm">{t('why_us.development.desc')}</p>
                      </div>

                      {/* Acompañamiento Continuo */}
                      <div className="feature-card p-4 rounded-lg bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-pink-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 20H7C5.89543 20 5 19.1046 5 18V9C5 7.89543 5.89543 7 7 7H17C18.1046 7 19 7.89543 19 9V18C19 19.1046 18.1046 20 17 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 14V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                      </div>
                          <h3 className="text-lg font-semibold text-gray-900">{t('why_us.support.title')}</h3>
                    </div>
                        <p className="text-gray-600 text-sm">{t('why_us.support.desc')}</p>
                          </div>

                      {/* Resultados Medibles */}
                      <div className="feature-card p-4 rounded-lg bg-white border border-gray-100 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-indigo-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16 8V16M12 11V16M8 14V16M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                        </div>
                          <h3 className="text-lg font-semibold text-gray-900">{t('why_us.results.title')}</h3>
                        </div>
                        <p className="text-gray-600 text-sm">{t('why_us.results.desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

                            {/* Slide 10: Oportunidad de Mercado */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-8">
                  <div className="w-full max-w-6xl mx-auto">
                    {/* Encabezado */}
                    <div className="mb-6">
                      <div className="hero-category-tag text-xs inline-block text-emerald-500 font-medium uppercase tracking-wider mb-2">
                        {t('market.category')}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-blue-500 mb-2">
                        {t('market.title')}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed max-w-4xl mb-3">
                        {t('market.subtitle')}
                      </p>
                      <p className="text-gray-700 text-xs italic max-w-4xl">
                        {t('market.intro')}
                      </p>
                    </div>
                        
                    {/* Grid de segmentos de mercado */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* PYMEs */}
                      <div className="market-segment p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M19 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M8 7V5C8 4.46957 8.21071 3.96086 8.58579 3.58579C8.96086 3.21071 9.46957 3 10 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                          <h3 className="text-base font-bold text-blue-700">{t('market.pymes.title')}</h3>
                      </div>
                        <p className="text-gray-700 text-xs mb-2 leading-relaxed">
                          {t('market.pymes.desc')}
                        </p>
                        <div className="bg-white/70 rounded-lg p-2 border-l-4 border-blue-500">
                          <p className="text-blue-800 text-xs font-medium">
                            💡 <strong>Nuestra Solución:</strong> {t('market.pymes.solution')}
                          </p>
                        </div>
                      </div>

                      {/* Startups */}
                      <div className="market-segment p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                          <h3 className="text-base font-bold text-emerald-700">{t('market.startups.title')}</h3>
                      </div>
                        <p className="text-gray-700 text-xs mb-2 leading-relaxed">
                          {t('market.startups.desc')}
                        </p>
                        <div className="bg-white/70 rounded-lg p-2 border-l-4 border-emerald-500">
                          <p className="text-emerald-800 text-xs font-medium">
                            🚀 <strong>Nuestra Solución:</strong> {t('market.startups.solution')}
                          </p>
                        </div>
                      </div>

                      {/* Empresas en Crecimiento */}
                      <div className="market-segment p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                      </div>
                          <h3 className="text-base font-bold text-purple-700">{t('market.growing.title')}</h3>
                    </div>
                        <p className="text-gray-700 text-xs mb-2 leading-relaxed">
                          {t('market.growing.desc')}
                        </p>
                        <div className="bg-white/70 rounded-lg p-2 border-l-4 border-purple-500">
                          <p className="text-purple-800 text-xs font-medium">
                            📈 <strong>Nuestra Solución:</strong> {t('market.growing.solution')}
                          </p>
                            </div>
                          </div>

                      {/* Departamentos Corporativos */}
                      <div className="market-segment p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 21H21M5 21V7L13 2L21 7V21M9 9H11M9 13H11M9 17H11M15 9H17M15 13H17M15 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                          <h3 className="text-base font-bold text-orange-700">{t('market.departments.title')}</h3>
                    </div>
                        <p className="text-gray-700 text-xs mb-2 leading-relaxed">
                          {t('market.departments.desc')}
                        </p>
                        <div className="bg-white/70 rounded-lg p-2 border-l-4 border-orange-500">
                          <p className="text-orange-800 text-xs font-medium">
                            🏢 <strong>Nuestra Solución:</strong> {t('market.departments.solution')}
                          </p>
                  </div>
                </div>

                      {/* ONGs */}
                      <div className="market-segment p-4 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-shrink-0 w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20.84 4.61C19.32 3.04 17.16 3.04 15.64 4.61L12 8.25L8.36 4.61C6.84 3.04 4.68 3.04 3.16 4.61C1.54 6.22 1.54 8.78 3.16 10.39L12 19.61L20.84 10.39C22.46 8.78 22.46 6.22 20.84 4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                      </div>
                          <h3 className="text-base font-bold text-pink-700">{t('market.ngos.title')}</h3>
                    </div>
                        <p className="text-gray-700 text-xs mb-2 leading-relaxed">
                          {t('market.ngos.desc')}
                        </p>
                        <div className="bg-white/70 rounded-lg p-2 border-l-4 border-pink-500">
                          <p className="text-pink-800 text-xs font-medium">
                            ❤️ <strong>Nuestra Solución:</strong> {t('market.ngos.solution')}
                          </p>
                        </div>
                      </div>

                      {/* Espacio vacío para centrar el grid cuando hay 5 elementos */}
                      <div className="hidden lg:block"></div>
                    </div>

                    {/* Nota de acrónimos */}
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-500 italic">
                        {t('market.acronyms')}
                      </p>
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
