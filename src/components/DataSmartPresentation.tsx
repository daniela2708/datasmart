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
import { BarChart3, Zap, Users, TrendingUp, Database, Cog, Award, ArrowRight, Target, Shield, Lightbulb, Monitor, ChevronLeft, ChevronRight, PieChart, FileText, GraduationCap, Brain, Search, Eye, ListChecks } from 'lucide-react';
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

  const totalSlides = 14;
  const slidesPerPage = 6; // Número de indicadores visibles por página

  const allServices = [
    {
      icon: <Cog className="service-icon-modern service-icon-automation" />,
      title: t('services.automation.title'),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: <PieChart className="service-icon-modern service-icon-visualization" />,
      title: t('services.visualization.title'),
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      icon: <FileText className="service-icon-modern service-icon-extraction" />,
      title: t('services.extraction.title'),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: <Search className="service-icon-modern service-icon-unstructured" />,
      title: t('services.unstructured.title'),
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200'
    },
    {
      icon: <Brain className="service-icon-modern service-icon-ai" />,
      title: t('services.ai.title'),
      color: 'from-violet-500 to-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200'
    },
    {
      icon: <Users className="service-icon-modern service-icon-consulting" />,
      title: t('services.consulting.title'),
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      icon: <GraduationCap className="service-icon-modern service-icon-training" />,
      title: t('services.training.title'),
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
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
        console.log(t('fullscreen.error'), err);
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
          <div className="tagline-premium">{t('company.tagline')}</div>
        </div>
        
        <div className="controls-premium">
          {/* Botón de Pantalla Completa */}
          <button 
            className="control-btn-premium" 
            data-tooltip={isFullscreenActive ? t('fullscreen.exit') : t('fullscreen.enter')}
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
        <div className={`relative w-full max-w-none mx-auto ${isFullscreenActive ? 'pb-12' : 'pb-16'}`}>
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
                        <div className="w-16 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-[50%_50%_45%_45%] relative shadow-xl border-2 border-blue-400 ring-1 ring-blue-300">
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
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-11 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl border-2 border-blue-400 shadow-xl ring-1 ring-blue-300">
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
                        <div className="absolute top-13 -left-4 w-3 h-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border-2 border-blue-400 shadow-lg animate-arm-wave origin-top ring-1 ring-blue-300"></div>
                        <div className="absolute top-13 -right-4 w-3 h-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border-2 border-blue-400 shadow-lg animate-arm-wave-delay origin-top ring-1 ring-blue-300"></div>
                        
                        {/* Hands */}
                        <div className="absolute top-18 -left-3 w-2 h-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full border-2 border-blue-400 shadow-lg ring-1 ring-blue-300"></div>
                        <div className="absolute top-18 -right-3 w-2 h-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full border-2 border-blue-400 shadow-lg ring-1 ring-blue-300"></div>
                        
                        {/* Legs */}
                        <div className="absolute top-22 left-1.5 w-2.5 h-5 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md border-2 border-blue-400 shadow-lg ring-1 ring-blue-300"></div>
                        <div className="absolute top-22 right-1.5 w-2.5 h-5 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md border-2 border-blue-400 shadow-lg ring-1 ring-blue-300"></div>
                        
                        {/* Feet */}
                        <div className="absolute top-26 left-0.5 w-3 h-1.5 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md border-2 border-blue-400 shadow-lg ring-1 ring-blue-300"></div>
                        <div className="absolute top-26 right-0.5 w-3 h-1.5 bg-gradient-to-br from-blue-100 to-blue-200 rounded-md border-2 border-blue-400 shadow-lg ring-1 ring-blue-300"></div>
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
                    
                    {/* Reemplaza el grid de servicios por una sola cuadrícula */}
                    <div className="services-grid-container max-w-5xl mx-auto">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {allServices.map((service, index) => (
                          <div key={index} className={`service-card-modern group ${service.bgColor} ${service.borderColor} border-2 rounded-xl p-4 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 cursor-pointer`}>
                            <div className={`service-icon-container mb-3 w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                              {React.cloneElement(service.icon, { 
                                className: `w-6 h-6 text-white drop-shadow-sm ${service.icon.props.className}` 
                              })}
                            </div>
                            <h3 className="text-gray-900 font-semibold text-sm group-hover:text-gray-700 transition-colors duration-300 leading-tight text-center">
                              {service.title}
                            </h3>
                          </div>
                        ))}
                      </div>
                              </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Casos de Uso - Slide 1: Integración Contable con API */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <div className="w-full max-w-6xl mx-auto">
                    <div className="mb-4 sm:mb-6">
                      <div className="hero-category-tag text-xs inline-block text-blue-600 font-medium uppercase tracking-wider mb-2 sm:mb-3 px-2 py-1" style={{ background: 'rgba(59, 130, 246, 0.08)', borderLeft: '3px solid #3B82F6' }}>
                        CASO DE USO
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 mb-1 sm:mb-2 leading-tight">
                        Integración Contable con API - Reportes Automáticos
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        Procesamiento automático de datos contables para dashboards en tiempo real
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      <div className="bg-red-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-red-200 order-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">!</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-700 leading-tight">
                            El Desafío
                          </h3>
                        </div>
                        <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
                          Información financiera dispersa en diferentes sistemas contables, reportes manuales que consumen tiempo y son propensos a errores.
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-blue-200 order-2">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Database className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-blue-700 leading-tight">
                            Nuestra Solución
                          </h3>
                        </div>
                        <p className="text-blue-800 text-xs sm:text-sm leading-relaxed">
                          Integración directa con API del software contable, procesamiento automático y generación de dashboards con KPIs en tiempo real.
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-green-200 order-3 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-green-700 leading-tight">
                            Beneficios Obtenidos
                          </h3>
                        </div>
                        <p className="text-green-800 text-xs sm:text-sm leading-relaxed">
                          Visibilidad completa de utilidades, cartera, flujo de caja, comisiones y KPIs financieros actualizados automáticamente.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Casos de Uso - Slide 2: Sistema de Cotizaciones Automáticas */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <div className="w-full max-w-6xl mx-auto">
                    <div className="mb-4 sm:mb-6">
                      <div className="hero-category-tag text-xs inline-block text-emerald-600 font-medium uppercase tracking-wider mb-2 sm:mb-3 px-2 py-1" style={{ background: 'rgba(16, 185, 129, 0.08)', borderLeft: '3px solid #10B981' }}>
                        CASO DE USO
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-emerald-600 mb-1 sm:mb-2 leading-tight">
                        Sistema de Cotizaciones Automáticas
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        Generación inteligente de propuestas comerciales personalizadas
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      <div className="bg-red-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-red-200 order-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">!</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-700 leading-tight">
                            El Desafío
                          </h3>
                        </div>
                        <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
                          Proceso manual lento para generar cotizaciones, inconsistencias en precios y tiempo excesivo de respuesta a clientes.
                        </p>
                      </div>

                      <div className="bg-emerald-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-emerald-200 order-2">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-emerald-700 leading-tight">
                            Nuestra Solución
                          </h3>
                        </div>
                        <p className="text-emerald-800 text-xs sm:text-sm leading-relaxed">
                          Sistema inteligente que genera cotizaciones personalizadas automáticamente basado en parámetros del cliente y histórico de ventas.
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-green-200 order-3 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-green-700 leading-tight">
                            Beneficios Obtenidos
                          </h3>
                        </div>
                        <p className="text-green-800 text-xs sm:text-sm leading-relaxed">
                          Reducción del 90% en tiempo de cotización, consistencia en precios y mejora en tasa de conversión de clientes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Casos de Uso - Slide 3: Sistema de Seguimiento para Vendedores */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <div className="w-full max-w-6xl mx-auto">
                    <div className="mb-4 sm:mb-6">
                      <div className="hero-category-tag text-xs inline-block text-purple-600 font-medium uppercase tracking-wider mb-2 sm:mb-3 px-2 py-1" style={{ background: 'rgba(147, 51, 234, 0.08)', borderLeft: '3px solid #9333EA' }}>
                        CASO DE USO
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600 mb-1 sm:mb-2 leading-tight">
                        Sistema de Seguimiento para Vendedores
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        Monitoreo inteligente del desempeño comercial y pipeline de ventas
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      <div className="bg-red-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-red-200 order-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">!</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-700 leading-tight">
                            El Desafío
                          </h3>
                        </div>
                        <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
                          Falta de visibilidad en el pipeline de ventas, seguimiento manual de prospectos y dificultad para identificar oportunidades.
                        </p>
                      </div>

                      <div className="bg-purple-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-purple-200 order-2">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-purple-700 leading-tight">
                            Nuestra Solución
                          </h3>
                        </div>
                        <p className="text-purple-800 text-xs sm:text-sm leading-relaxed">
                          Dashboard de seguimiento automático con alertas, métricas de desempeño y predicciones de cierre de ventas.
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-green-200 order-3 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-green-700 leading-tight">
                            Beneficios Obtenidos
                          </h3>
                        </div>
                        <p className="text-green-800 text-xs sm:text-sm leading-relaxed">
                          Aumento del 35% en conversión de leads, mejor gestión del tiempo comercial y identificación temprana de oportunidades.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Casos de Uso - Slide 4: Clasificación de Comunicaciones */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <div className="w-full max-w-6xl mx-auto">
                    <div className="mb-4 sm:mb-6">
                      <div className="hero-category-tag text-xs inline-block text-indigo-600 font-medium uppercase tracking-wider mb-2 sm:mb-3 px-2 py-1" style={{ background: 'rgba(99, 102, 241, 0.08)', borderLeft: '3px solid #6366F1' }}>
                        CASO DE USO
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-indigo-600 mb-1 sm:mb-2 leading-tight">
                        Clasificación Inteligente de Comunicaciones
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        Análisis automático de correos y comentarios de redes sociales
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      <div className="bg-red-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-red-200 order-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">!</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-700 leading-tight">
                            El Desafío
                          </h3>
                        </div>
                        <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
                          Volumen alto de correos y comentarios, clasificación manual lenta y pérdida de mensajes importantes o urgentes.
                        </p>
                      </div>

                      <div className="bg-indigo-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-indigo-200 order-2">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-indigo-700 leading-tight">
                            Nuestra Solución
                          </h3>
                        </div>
                        <p className="text-indigo-800 text-xs sm:text-sm leading-relaxed">
                          IA que clasifica automáticamente correos y comentarios por urgencia, sentimiento y categoría, con alertas inteligentes.
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-green-200 order-3 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-green-700 leading-tight">
                            Beneficios Obtenidos
                          </h3>
                        </div>
                        <p className="text-green-800 text-xs sm:text-sm leading-relaxed">
                          Reducción del 80% en tiempo de gestión de comunicaciones y mejora en tiempo de respuesta a clientes críticos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Casos de Uso - Slide 5: Chatbots Internos para Propuestas */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <div className="w-full max-w-6xl mx-auto">
                    <div className="mb-4 sm:mb-6">
                      <div className="hero-category-tag text-xs inline-block text-orange-600 font-medium uppercase tracking-wider mb-2 sm:mb-3 px-2 py-1" style={{ background: 'rgba(249, 115, 22, 0.08)', borderLeft: '3px solid #F97316' }}>
                        CASO DE USO
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 mb-1 sm:mb-2 leading-tight">
                        Chatbots Internos para Generación de Propuestas
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        Asistente IA para mejora del performance del equipo comercial
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      <div className="bg-red-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-red-200 order-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">!</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-700 leading-tight">
                            El Desafío
                          </h3>
                        </div>
                        <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
                          Equipo comercial sin acceso rápido a información técnica y dificultad para generar propuestas personalizadas y precisas.
                        </p>
                      </div>

                      <div className="bg-orange-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-orange-200 order-2">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Monitor className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-orange-700 leading-tight">
                            Nuestra Solución
                          </h3>
                        </div>
                        <p className="text-orange-800 text-xs sm:text-sm leading-relaxed">
                          Chatbot interno entrenado con knowledge base de la empresa que genera propuestas inteligentes y responde consultas técnicas.
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-green-200 order-3 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-green-700 leading-tight">
                            Beneficios Obtenidos
                          </h3>
                        </div>
                        <p className="text-green-800 text-xs sm:text-sm leading-relaxed">
                          Mejora del 50% en calidad de propuestas, reducción significativa en tiempo de elaboración y mayor confianza del equipo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Casos de Uso - Slide 6: Sistema de Gestión de Inventarios */}
              <CarouselItem>
                <div className="datasmart-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-start justify-start rounded-lg p-4 sm:p-6 lg:p-8 overflow-y-auto">
                  <div className="w-full max-w-6xl mx-auto">
                    <div className="mb-4 sm:mb-6">
                      <div className="hero-category-tag text-xs inline-block text-slate-600 font-medium uppercase tracking-wider mb-2 sm:mb-3 px-2 py-1" style={{ background: 'rgba(71, 85, 105, 0.08)', borderLeft: '3px solid #475569' }}>
                        CASO DE USO
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-600 mb-1 sm:mb-2 leading-tight">
                        Sistema de Gestión de Inventarios con Alertas
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium">
                        Control inteligente de stock con predicción de demanda
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                      <div className="bg-red-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-red-200 order-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">!</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-red-700 leading-tight">
                            El Desafío
                          </h3>
                        </div>
                        <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
                          Stock outs frecuentes, exceso de inventario, falta de visibilidad en rotación y reposición manual reactiva.
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-slate-200 order-2">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-slate-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <ListChecks className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-700 leading-tight">
                            Nuestra Solución
                          </h3>
                        </div>
                        <p className="text-slate-800 text-xs sm:text-sm leading-relaxed">
                          Sistema predictivo con alertas automáticas, análisis de patrones de demanda y recomendaciones de reposición inteligente.
                        </p>
                      </div>

                      <div className="bg-green-50 rounded-xl p-3 sm:p-4 lg:p-5 border border-green-200 order-3 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                          </div>
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-green-700 leading-tight">
                            Beneficios Obtenidos
                          </h3>
                        </div>
                        <p className="text-green-800 text-xs sm:text-sm leading-relaxed">
                          Reducción del 60% en stock outs, optimización del capital de trabajo y mejora en disponibilidad de productos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3: Automatización de Procesos */}
              <CarouselItem>
                <style>
                  {`
                    .automation-container {
                      position: relative;
                      width: 100%;
                      height: 100%;
                    }
                    
                    .automation-slide::before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      height: 8px;
                      background: #4A90E2;
                      border-radius: 8px 8px 0 0;
                      z-index: 10;
                    }
                    
                    @keyframes gradientMove {
                      0%, 100% { background-position: 0% 50%; }
                      50% { background-position: 100% 50%; }
                    }
                    
                    .automation-grid {
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                      gap: 40px;
                      align-items: start;
                    }
                    
                    .left-section {
                      position: relative;
                    }
                    
                    .floating-elements {
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      top: 0;
                      left: 0;
                      pointer-events: none;
                      z-index: 1;
                    }
                    
                    .floating-element {
                      position: absolute;
                      width: 30px;
                      height: 30px;
                      background: rgba(74, 144, 226, 0.08);
                      border-radius: 50%;
                      animation: floatAnim 6s ease-in-out infinite;
                    }
                    
                    .floating-element:nth-child(1) {
                      top: 15%;
                      left: 10%;
                      animation-delay: 0s;
                    }
                    
                    .floating-element:nth-child(2) {
                      top: 60%;
                      right: 15%;
                      animation-delay: 2s;
                    }
                    
                    .floating-element:nth-child(3) {
                      bottom: 20%;
                      left: 20%;
                      animation-delay: 4s;
                    }
                    
                    @keyframes floatAnim {
                      0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
                      50% { transform: translateY(-20px) rotate(180deg); opacity: 0.7; }
                    }
                    
                    .automation-icon-container {
                      margin-bottom: 20px;
                      position: relative;
                      z-index: 2;
                      text-align: center;
                    }
                    
                    .automation-main-icon {
                      width: 60px;
                      height: 60px;
                      background: linear-gradient(45deg, #4A90E2, #5BA2F5);
                      border-radius: 16px;
                      display: inline-flex;
                      align-items: center;
                      justify-content: center;
                      box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
                      animation: iconPulse 3s ease-in-out infinite;
                    }
                    
                    @keyframes iconPulse {
                      0%, 100% { transform: scale(1); }
                      50% { transform: scale(1.03); }
                    }
                    
                    .automation-gear-icon {
                      width: 30px;
                      height: 30px;
                      color: white;
                      animation: rotate 8s linear infinite;
                    }
                    
                    @keyframes rotate {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                    
                    .automation-title {
                      font-size: 2.2rem;
                      font-weight: 700;
                      background: linear-gradient(45deg, #4A90E2, #2E5A8A);
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: transparent;
                      background-clip: text;
                      margin-bottom: 18px;
                      letter-spacing: -0.5px;
                      line-height: 1.2;
                      position: relative;
                      z-index: 2;
                      text-align: center;
                    }
                    
                    .automation-subtitle {
                      font-size: 0.95rem;
                      color: #4A5568;
                      line-height: 1.5;
                      margin-bottom: 25px;
                      font-weight: 400;
                      position: relative;
                      z-index: 2;
                    }
                    
                    .automation-benefits-container {
                      display: flex;
                      gap: 15px;
                      margin-top: 20px;
                      position: relative;
                      z-index: 2;
                    }
                    
                    .automation-benefit-item {
                      background: rgba(255, 255, 255, 0.9);
                      backdrop-filter: blur(10px);
                      padding: 15px 12px;
                      border-radius: 12px;
                      box-shadow: 0 4px 16px rgba(74, 144, 226, 0.12);
                      border: 1px solid rgba(74, 144, 226, 0.15);
                      transition: all 0.3s ease;
                      flex: 1;
                      text-align: center;
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
                      transform: translateY(-3px);
                      box-shadow: 0 8px 24px rgba(74, 144, 226, 0.2);
                      border: 1px solid rgba(74, 144, 226, 0.25);
                    }
                    
                    .automation-benefit-icon {
                      width: 40px;
                      height: 40px;
                      margin: 0 auto 8px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border-radius: 10px;
                      font-size: 18px;
                      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
                      font-size: 0.8rem;
                      color: #4A5568;
                      font-weight: 600;
                      position: relative;
                      z-index: 2;
                    }
                    
                    .right-section {
                      position: relative;
                    }
                    
                    .problems-header {
                      display: flex;
                      align-items: center;
                      margin-bottom: 20px;
                      gap: 12px;
                    }
                    
                    .problems-icon {
                      width: 40px;
                      height: 40px;
                      background: linear-gradient(135deg, #EF4444, #F87171);
                      border-radius: 10px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 20px;
                      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
                    }
                    
                    .problems-title {
                      font-size: 1.6rem;
                      font-weight: 700;
                      color: #2D3748;
                      margin: 0;
                    }
                    
                    .problems-list {
                      list-style: none;
                      padding: 0;
                    }
                    
                    .problem-item {
                      background: rgba(255, 255, 255, 0.7);
                      backdrop-filter: blur(8px);
                      margin-bottom: 12px;
                      padding: 15px 20px;
                      border-radius: 12px;
                      border-left: 3px solid #4A90E2;
                      box-shadow: 0 3px 12px rgba(74, 144, 226, 0.08);
                      transition: all 0.3s ease;
                      position: relative;
                      overflow: hidden;
                    }
                    
                    .problem-item::before {
                      content: '';
                      position: absolute;
                      left: 0;
                      top: 0;
                      bottom: 0;
                      width: 3px;
                      background: linear-gradient(180deg, #4A90E2, #5BA2F5);
                      transition: width 0.3s ease;
                    }
                    
                    .problem-item:hover::before {
                      width: 6px;
                    }
                    
                    .problem-item:hover {
                      transform: translateX(6px);
                      box-shadow: 0 6px 18px rgba(74, 144, 226, 0.15);
                      background: rgba(255, 255, 255, 0.9);
                    }
                    
                    .problem-content {
                      display: flex;
                      align-items: center;
                      gap: 12px;
                    }
                    
                    .problem-emoji {
                      font-size: 20px;
                      opacity: 0.8;
                    }
                    
                    .problem-text {
                      font-size: 0.9rem;
                      color: #4A5568;
                      font-weight: 500;
                      line-height: 1.4;
                    }
                    
                    @media (max-width: 1024px) {
                      .automation-grid {
                        grid-template-columns: 1fr;
                        gap: 30px;
                      }
                      
                      .automation-title {
                        font-size: 1.8rem;
                      }
                      
                      .problems-title {
                        font-size: 1.4rem;
                      }
                      
                      .automation-benefits-container {
                        flex-direction: column;
                        gap: 12px;
                      }
                    }
                    
                    @media (max-width: 768px) {
                      .automation-title {
                        font-size: 1.5rem;
                      }
                      
                      .problems-title {
                        font-size: 1.2rem;
                      }
                      
                      .problem-item {
                        padding: 12px 16px;
                      }
                      
                      .problem-content {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                      }
                    }
                  `}
                </style>
                <div className="datasmart-slide automation-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="automation-container">
                    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
                      <div className="automation-grid">
                        <div className="left-section">
                          <div className="floating-elements">
                            <div className="floating-element"></div>
                            <div className="floating-element"></div>
                            <div className="floating-element"></div>
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
                        
                        <div className="right-section">
                          <div className="problems-header">
                            <div className="problems-icon">⚠️</div>
                            <h2 className="problems-title">{t('services.automation.problems.title')}</h2>
                          </div>
                          
                          <ul className="problems-list">
                            <li className="problem-item">
                              <div className="problem-content">
                                <span className="problem-emoji">📝</span>
                                <span className="problem-text">{t('services.automation.problems.data_transfer')}</span>
                              </div>
                            </li>
                            <li className="problem-item">
                              <div className="problem-content">
                                <span className="problem-emoji">📊</span>
                                <span className="problem-text">{t('services.automation.problems.reports')}</span>
                              </div>
                            </li>
                            <li className="problem-item">
                              <div className="problem-content">
                                <span className="problem-emoji">📄</span>
                                <span className="problem-text">{t('services.automation.problems.documents')}</span>
                              </div>
                            </li>
                            <li className="problem-item">
                              <div className="problem-content">
                                <span className="problem-emoji">📈</span>
                                <span className="problem-text">{t('services.automation.problems.monitoring')}</span>
                              </div>
                            </li>
                            <li className="problem-item">
                              <div className="problem-content">
                                <span className="problem-emoji">🔄</span>
                                <span className="problem-text">{t('services.automation.problems.outdated_info')}</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 4: Visualización de Datos */}
              <CarouselItem>
                <style>
                  {`
                    .visualization-container {
                      position: relative;
                      width: 100%;
                      height: 100%;
                    }
                    
                    .visualization-slide::before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      height: 8px;
                      background: #10B981;
                      border-radius: 8px 8px 0 0;
                      z-index: 10;
                    }
                    
                    .visualization-grid {
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                      gap: 40px;
                      align-items: start;
                    }
                    
                    .visualization-left-section {
                      position: relative;
                    }
                    
                    .visualization-floating-elements {
                      position: absolute;
                      width: 100%;
                      height: 100%;
                      top: 0;
                      left: 0;
                      pointer-events: none;
                      z-index: 1;
                    }
                    
                    .visualization-floating-element {
                      position: absolute;
                      width: 30px;
                      height: 30px;
                      background: rgba(16, 185, 129, 0.08);
                      border-radius: 50%;
                      animation: floatVisualization 6s ease-in-out infinite;
                    }
                    
                    .visualization-floating-element:nth-child(1) {
                      top: 15%;
                      left: 10%;
                      animation-delay: 0s;
                    }
                    
                    .visualization-floating-element:nth-child(2) {
                      top: 60%;
                      right: 15%;
                      animation-delay: 2s;
                    }
                    
                    .visualization-floating-element:nth-child(3) {
                      bottom: 20%;
                      left: 20%;
                      animation-delay: 4s;
                    }
                    
                    @keyframes floatVisualization {
                      0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
                      50% { transform: translateY(-20px) rotate(180deg); opacity: 0.7; }
                    }
                    
                    .visualization-icon-container {
                      margin-bottom: 20px;
                      position: relative;
                      z-index: 2;
                      text-align: center;
                    }
                    
                    .visualization-main-icon {
                      width: 60px;
                      height: 60px;
                      background: linear-gradient(45deg, #10B981, #34D399);
                      border-radius: 16px;
                      display: inline-flex;
                      align-items: center;
                      justify-content: center;
                      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
                      animation: iconPulseVisualization 3s ease-in-out infinite;
                    }
                    
                    @keyframes iconPulseVisualization {
                      0%, 100% { transform: scale(1); }
                      50% { transform: scale(1.03); }
                    }
                    
                    .visualization-chart-icon {
                      width: 30px;
                      height: 30px;
                      color: white;
                      animation: chartGlow 4s ease-in-out infinite;
                    }
                    
                    @keyframes chartGlow {
                      0%, 100% { filter: drop-shadow(0 0 5px rgba(255,255,255,0.3)); }
                      50% { filter: drop-shadow(0 0 10px rgba(255,255,255,0.6)); }
                    }
                    
                    .visualization-title {
                      font-size: 2.2rem;
                      font-weight: 700;
                      background: linear-gradient(45deg, #10B981, #047857);
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: transparent;
                      background-clip: text;
                      margin-bottom: 18px;
                      letter-spacing: -0.5px;
                      line-height: 1.2;
                      position: relative;
                      z-index: 2;
                      text-align: center;
                    }
                    
                    .visualization-subtitle {
                      font-size: 0.95rem;
                      color: #4A5568;
                      line-height: 1.5;
                      margin-bottom: 25px;
                      font-weight: 400;
                      position: relative;
                      z-index: 2;
                    }
                    
                    .visualization-benefits-container {
                      display: flex;
                      gap: 15px;
                      margin-top: 20px;
                      position: relative;
                      z-index: 2;
                    }
                    
                    .visualization-benefit-item {
                      background: rgba(255, 255, 255, 0.9);
                      backdrop-filter: blur(10px);
                      padding: 15px 12px;
                      border-radius: 12px;
                      box-shadow: 0 4px 16px rgba(16, 185, 129, 0.12);
                      border: 1px solid rgba(16, 185, 129, 0.15);
                      transition: all 0.3s ease;
                      flex: 1;
                      text-align: center;
                      position: relative;
                      overflow: hidden;
                    }
                    
                    .visualization-benefit-item::before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: -100%;
                      width: 100%;
                      height: 100%;
                      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                      transition: left 0.6s ease;
                    }
                    
                    .visualization-benefit-item:hover::before {
                      left: 100%;
                    }
                    
                    .visualization-benefit-item:hover {
                      transform: translateY(-3px);
                      box-shadow: 0 8px 24px rgba(16, 185, 129, 0.2);
                      border: 1px solid rgba(16, 185, 129, 0.25);
                    }
                    
                    .visualization-benefit-icon {
                      width: 40px;
                      height: 40px;
                      margin: 0 auto 8px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border-radius: 10px;
                      font-size: 18px;
                      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                    }
                    
                    .visualization-benefit-icon.clarity {
                      background: linear-gradient(135deg, #8B5CF6, #A78BFA);
                    }
                    
                    .visualization-benefit-icon.insights {
                      background: linear-gradient(135deg, #F59E0B, #FBBF24);
                    }
                    
                    .visualization-benefit-icon.decisions {
                      background: linear-gradient(135deg, #10B981, #34D399);
                    }
                    
                    .visualization-benefit-text {
                      font-size: 0.8rem;
                      color: #4A5568;
                      font-weight: 600;
                      position: relative;
                      z-index: 2;
                    }
                    
                    .visualization-right-section {
                      position: relative;
                    }
                    
                    .opportunities-header {
                      display: flex;
                      align-items: center;
                      margin-bottom: 20px;
                      gap: 12px;
                    }
                    
                    .opportunities-icon {
                      width: 40px;
                      height: 40px;
                      background: linear-gradient(135deg, #10B981, #34D399);
                      border-radius: 10px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 20px;
                      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                    }
                    
                    .opportunities-title {
                      font-size: 1.6rem;
                      font-weight: 700;
                      color: #2D3748;
                      margin: 0;
                    }
                    
                    .opportunities-list {
                      list-style: none;
                      padding: 0;
                    }
                    
                    .opportunity-item {
                      background: rgba(255, 255, 255, 0.7);
                      backdrop-filter: blur(8px);
                      margin-bottom: 12px;
                      padding: 15px 20px;
                      border-radius: 12px;
                      border-left: 3px solid #10B981;
                      box-shadow: 0 3px 12px rgba(16, 185, 129, 0.08);
                      transition: all 0.3s ease;
                      position: relative;
                      overflow: hidden;
                    }
                    
                    .opportunity-item::before {
                      content: '';
                      position: absolute;
                      left: 0;
                      top: 0;
                      bottom: 0;
                      width: 3px;
                      background: linear-gradient(180deg, #10B981, #34D399);
                      transition: width 0.3s ease;
                    }
                    
                    .opportunity-item:hover::before {
                      width: 6px;
                    }
                    
                    .opportunity-item:hover {
                      transform: translateX(6px);
                      box-shadow: 0 6px 18px rgba(16, 185, 129, 0.15);
                      background: rgba(255, 255, 255, 0.9);
                    }
                    
                    .opportunity-content {
                      display: flex;
                      align-items: center;
                      gap: 12px;
                    }
                    
                    .opportunity-emoji {
                      font-size: 20px;
                      opacity: 0.8;
                    }
                    
                    .opportunity-text {
                      font-size: 0.9rem;
                      color: #4A5568;
                      font-weight: 500;
                      line-height: 1.4;
                    }
                    
                    @media (max-width: 1024px) {
                      .visualization-grid {
                        grid-template-columns: 1fr;
                        gap: 30px;
                      }
                      
                      .visualization-title {
                        font-size: 1.8rem;
                      }
                      
                      .opportunities-title {
                        font-size: 1.4rem;
                      }
                      
                      .visualization-benefits-container {
                        flex-direction: column;
                        gap: 12px;
                      }
                    }
                    
                    @media (max-width: 768px) {
                      .visualization-title {
                        font-size: 1.5rem;
                      }
                      
                      .opportunities-title {
                        font-size: 1.2rem;
                      }
                      
                      .opportunity-item {
                        padding: 12px 16px;
                      }
                      
                      .opportunity-content {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                      }
                    }
                  `}
                </style>
                <div className="datasmart-slide visualization-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="visualization-container">
                    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
                      <div className="visualization-grid">
                        <div className="visualization-left-section">
                          <div className="visualization-floating-elements">
                            <div className="visualization-floating-element"></div>
                            <div className="visualization-floating-element"></div>
                            <div className="visualization-floating-element"></div>
                      </div>
                          
                          <div className="visualization-icon-container">
                            <div className="visualization-main-icon">
                              <PieChart className="visualization-chart-icon" />
                            </div>
                          </div>
                          
                          <h1 className="visualization-title">{t('services.visualization.title')}</h1>
                          
                          <p className="visualization-subtitle">
                            {t('services.visualization.subtitle')}
                          </p>
                          
                          <div className="visualization-benefits-container">
                            <div className="visualization-benefit-item">
                              <div className="visualization-benefit-icon clarity">👁️</div>
                              <div className="visualization-benefit-text">{t('services.visualization.benefits.clarity')}</div>
                    </div>
                            <div className="visualization-benefit-item">
                              <div className="visualization-benefit-icon insights">💡</div>
                              <div className="visualization-benefit-text">{t('services.visualization.benefits.insights')}</div>
                            </div>
                            <div className="visualization-benefit-item">
                              <div className="visualization-benefit-icon decisions">🎯</div>
                              <div className="visualization-benefit-text">{t('services.visualization.benefits.decisions')}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="visualization-right-section">
                          <div className="opportunities-header">
                            <div className="opportunities-icon"><Database className="w-6 h-6 text-white" /></div>
                            <h2 className="opportunities-title">{t('services.visualization.opportunities.title')}</h2>
                          </div>
                          
                          <ul className="opportunities-list">
                            <li className="opportunity-item">
                              <div className="opportunity-content">
                                <span className="opportunity-emoji">📊</span>
                                <span className="opportunity-text">{t('services.visualization.opportunities.dashboards')}</span>
                              </div>
                            </li>
                            <li className="opportunity-item">
                              <div className="opportunity-content">
                                <span className="opportunity-emoji">📈</span>
                                <span className="opportunity-text">{t('services.visualization.opportunities.kpis')}</span>
                              </div>
                            </li>
                            <li className="opportunity-item">
                              <div className="opportunity-content">
                                <span className="opportunity-emoji">🔍</span>
                                <span className="opportunity-text">{t('services.visualization.opportunities.trends')}</span>
                              </div>
                            </li>
                            <li className="opportunity-item">
                              <div className="opportunity-content">
                                <span className="opportunity-emoji">🚨</span>
                                <span className="opportunity-text">{t('services.visualization.opportunities.alerts')}</span>
                              </div>
                            </li>
                            <li className="opportunity-item">
                              <div className="opportunity-content">
                                <span className="opportunity-emoji">📖</span>
                                <span className="opportunity-text">{t('services.visualization.opportunities.storytelling')}</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 5: Extracción y Procesamiento */}
              <CarouselItem>
                <style>{`
                  .extraction-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                  }
                  .extraction-slide::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 8px;
                    background: #8B5CF6;
                    border-radius: 8px 8px 0 0;
                    z-index: 10;
                  }
                  .extraction-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 40px;
                    align-items: start;
                  }
                  .extraction-left-section { position: relative; }
                  .extraction-floating-elements {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                    z-index: 1;
                  }
                  .extraction-floating-element {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background: rgba(139, 92, 246, 0.08);
                    border-radius: 50%;
                    animation: floatExtraction 6s ease-in-out infinite;
                  }
                  .extraction-floating-element:nth-child(1) { top: 15%; left: 10%; animation-delay: 0s; }
                  .extraction-floating-element:nth-child(2) { top: 60%; right: 15%; animation-delay: 2s; }
                  .extraction-floating-element:nth-child(3) { bottom: 20%; left: 20%; animation-delay: 4s; }
                  @keyframes floatExtraction {
                    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
                    50% { transform: translateY(-20px) rotate(180deg); opacity: 0.7; }
                  }
                  .extraction-icon-container {
                    margin-bottom: 20px;
                    position: relative;
                    z-index: 2;
                    text-align: center;
                  }
                  .extraction-main-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(45deg, #8B5CF6, #A78BFA);
                    border-radius: 16px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
                    animation: iconPulseExtraction 3s ease-in-out infinite;
                  }
                  @keyframes iconPulseExtraction {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.03); }
                  }
                  .extraction-db-icon {
                    width: 30px;
                    height: 30px;
                    color: white;
                    animation: dbGlow 4s ease-in-out infinite;
                  }
                  @keyframes dbGlow {
                    0%, 100% { filter: drop-shadow(0 0 5px rgba(255,255,255,0.3)); }
                    50% { filter: drop-shadow(0 0 10px rgba(255,255,255,0.6)); }
                  }
                  .extraction-title {
                    font-size: 2.2rem;
                    font-weight: 700;
                    background: linear-gradient(45deg, #8B5CF6, #6D28D9);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 18px;
                    letter-spacing: -0.5px;
                    line-height: 1.2;
                    position: relative;
                    z-index: 2;
                    text-align: center;
                  }
                  .extraction-subtitle {
                    font-size: 0.95rem;
                    color: #4A5568;
                    line-height: 1.5;
                    margin-bottom: 25px;
                    font-weight: 400;
                    position: relative;
                    z-index: 2;
                  }
                  .extraction-benefits-container {
                    display: flex;
                    gap: 15px;
                    margin-top: 20px;
                    position: relative;
                    z-index: 2;
                  }
                  .extraction-benefit-item {
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(10px);
                    padding: 15px 12px;
                    border-radius: 12px;
                    box-shadow: 0 4px 16px rgba(139, 92, 246, 0.12);
                    border: 1px solid rgba(139, 92, 246, 0.15);
                    transition: all 0.3s ease;
                    flex: 1;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                  }
                  .extraction-benefit-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
                    transition: left 0.6s ease;
                  }
                  .extraction-benefit-item:hover::before { left: 100%; }
                  .extraction-benefit-item:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.2);
                    border: 1px solid rgba(139, 92, 246, 0.25);
                  }
                  .extraction-benefit-icon {
                    width: 40px;
                    height: 40px;
                    margin: 0 auto 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    font-size: 18px;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                  }
                  .extraction-benefit-icon.web {
                    background: linear-gradient(135deg, #06B6D4, #818CF8);
                  }
                  .extraction-benefit-icon.db {
                    background: linear-gradient(135deg, #A78BFA, #8B5CF6);
                  }
                  .extraction-benefit-icon.integration {
                    background: linear-gradient(135deg, #F59E42, #FBBF24);
                  }
                  .extraction-benefit-text {
                    font-size: 0.8rem;
                    color: #4A5568;
                    font-weight: 600;
                    position: relative;
                    z-index: 2;
                  }
                  .extraction-right-section { position: relative; }
                  .extraction-opportunities-header {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    gap: 12px;
                  }
                  .extraction-opportunities-icon {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #8B5CF6, #A78BFA);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
                  }
                  .extraction-opportunities-title {
                    font-size: 1.6rem;
                    font-weight: 700;
                    color: #2D3748;
                    margin: 0;
                  }
                  .extraction-opportunities-list {
                    list-style: none;
                    padding: 0;
                  }
                  .extraction-opportunity-item {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(8px);
                    margin-bottom: 12px;
                    padding: 15px 20px;
                    border-radius: 12px;
                    border-left: 3px solid #8B5CF6;
                    box-shadow: 0 3px 12px rgba(139, 92, 246, 0.08);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                  }
                  .extraction-opportunity-item::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    width: 3px;
                    background: linear-gradient(180deg, #8B5CF6, #A78BFA);
                    transition: width 0.3s ease;
                  }
                  .extraction-opportunity-item:hover::before { width: 6px; }
                  .extraction-opportunity-item:hover {
                    transform: translateX(6px);
                    box-shadow: 0 6px 18px rgba(139, 92, 246, 0.15);
                    background: rgba(255, 255, 255, 0.9);
                  }
                  .extraction-opportunity-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                  }
                  .extraction-opportunity-emoji {
                    font-size: 20px;
                    opacity: 0.8;
                  }
                  .extraction-opportunity-text {
                    font-size: 0.9rem;
                    color: #4A5568;
                    font-weight: 500;
                    line-height: 1.4;
                  }
                  @media (max-width: 1024px) {
                    .extraction-grid { grid-template-columns: 1fr; gap: 30px; }
                    .extraction-title { font-size: 1.8rem; }
                    .extraction-opportunities-title { font-size: 1.4rem; }
                    .extraction-benefits-container { flex-direction: column; gap: 12px; }
                  }
                  @media (max-width: 768px) {
                    .extraction-title { font-size: 1.5rem; }
                    .extraction-opportunities-title { font-size: 1.2rem; }
                    .extraction-opportunity-item { padding: 12px 16px; }
                    .extraction-opportunity-content { flex-direction: column; align-items: flex-start; gap: 8px; }
                  }
                `}</style>
                <div className="datasmart-slide extraction-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <div className="extraction-container">
                    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
                      <div className="extraction-grid">
                        <div className="extraction-left-section">
                          <div className="extraction-floating-elements">
                            <div className="extraction-floating-element"></div>
                            <div className="extraction-floating-element"></div>
                            <div className="extraction-floating-element"></div>
                      </div>
                          <div className="extraction-icon-container">
                            <div className="extraction-main-icon">
                              <Database className="extraction-db-icon" />
                            </div>
                          </div>
                          <h1 className="extraction-title">{t('services.extraction.title')}</h1>
                          <p className="extraction-subtitle">{t('services.extraction.subtitle')}</p>
                          <div className="extraction-benefits-container">
                            <div className="extraction-benefit-item">
                              <div className="extraction-benefit-icon web">🌐</div>
                              <div className="extraction-benefit-text">{t('services.extraction.benefits.web')}</div>
                            </div>
                            <div className="extraction-benefit-item">
                              <div className="extraction-benefit-icon db">🗄️</div>
                              <div className="extraction-benefit-text">{t('services.extraction.benefits.db')}</div>
                            </div>
                            <div className="extraction-benefit-item">
                              <div className="extraction-benefit-icon integration">🔗</div>
                              <div className="extraction-benefit-text">{t('services.extraction.benefits.integration')}</div>
                            </div>
                          </div>
                        </div>
                        <div className="extraction-right-section">
                          <div className="extraction-opportunities-header">
                            <div className="extraction-opportunities-icon"><FileText className="w-6 h-6 text-white" /></div>
                            <h2 className="extraction-opportunities-title">{t('services.extraction.opportunities.title')}</h2>
                          </div>
                          <ul className="extraction-opportunities-list">
                            <li className="extraction-opportunity-item">
                              <div className="extraction-opportunity-content">
                                <span className="extraction-opportunity-emoji">🌐</span>
                                <span className="extraction-opportunity-text">{t('services.extraction.opportunities.web')}</span>
                              </div>
                            </li>
                            <li className="extraction-opportunity-item">
                              <div className="extraction-opportunity-content">
                                <span className="extraction-opportunity-emoji">🗄️</span>
                                <span className="extraction-opportunity-text">{t('services.extraction.opportunities.db')}</span>
                              </div>
                            </li>
                            <li className="extraction-opportunity-item">
                              <div className="extraction-opportunity-content">
                                <span className="extraction-opportunity-emoji">🔗</span>
                                <span className="extraction-opportunity-text">{t('services.extraction.opportunities.integration')}</span>
                              </div>
                            </li>
                            <li className="extraction-opportunity-item">
                              <div className="extraction-opportunity-content">
                                <span className="extraction-opportunity-emoji">⚙️</span>
                                <span className="extraction-opportunity-text">{t('services.extraction.opportunities.pipeline')}</span>
                              </div>
                            </li>
                            <li className="extraction-opportunity-item">
                              <div className="extraction-opportunity-content">
                                <span className="extraction-opportunity-emoji">🧹</span>
                                <span className="extraction-opportunity-text">{t('services.extraction.opportunities.cleaning')}</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 6: Análisis de Datos No Estructurados */}
              <CarouselItem>
                <div className="datasmart-slide unstructured-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <style>{`
                    .unstructured-slide::before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      height: 6px;
                      background: #F43F5E;
                      border-radius: 6px 6px 0 0;
                    }
                  `}</style>
                  <div className="max-w-6xl mx-auto px-6 py-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      <div className="text-center">
                        <div className="mb-8">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-xl">
                            <Search className="w-7 h-7 text-white drop-shadow-sm animate-[pulse_1s_ease-in-out_infinite]" />
                          </div>
                          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent mb-4">
                            {t('unstructured_data_analysis')}
                          </h2>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {t('services.unstructured.desc')}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                          <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="text-2xl mb-2">📄</div>
                            <h3 className="font-semibold text-rose-700 mb-1">{t('services.unstructured.benefits.text')}</h3>
                          </div>
                          <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="text-2xl mb-2">🖼️</div>
                            <h3 className="font-semibold text-rose-700 mb-1">{t('services.unstructured.benefits.image')}</h3>
                          </div>
                          <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="text-2xl mb-2">💬</div>
                            <h3 className="font-semibold text-rose-700 mb-1">{t('services.unstructured.benefits.communication')}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="bg-rose-100 rounded-2xl p-6 shadow-lg border border-rose-100">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="bg-gradient-to-br from-rose-500 to-rose-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                            <ListChecks className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800">
                            {t('opportunities_we_provide')}
                          </h3>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-xl border border-rose-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <span className="text-base">🗣️</span>
                              <span className="text-gray-700 text-sm">{t('services.unstructured.opportunities.nlp')}</span>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-rose-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <span className="text-base">📄</span>
                              <span className="text-gray-700 text-sm">{t('services.unstructured.opportunities.documents')}</span>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-rose-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <span className="text-base">🖼️</span>
                              <span className="text-gray-700 text-sm">{t('services.unstructured.opportunities.images_video')}</span>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-rose-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <span className="text-base">🗺️</span>
                              <span className="text-gray-700 text-sm">{t('services.unstructured.opportunities.geo')}</span>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-rose-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <span className="text-base">🌐</span>
                              <span className="text-gray-700 text-sm">{t('services.unstructured.opportunities.social')}</span>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-rose-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <span className="text-base">🔊</span>
                              <span className="text-gray-700 text-sm">{t('services.unstructured.opportunities.audio')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 7: Integración con IA */}
              <CarouselItem>
                <div className="datasmart-slide ai-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg">
                  <style>{`
                    .ai-slide::before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      height: 6px;
                      background: #8B5CF6;
                      border-radius: 6px 6px 0 0;
                    }
                  `}</style>
                  <div className="max-w-6xl mx-auto px-6 py-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      <div className="text-center">
                        <div className="mb-8">
                          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <Brain className="w-10 h-10 text-white drop-shadow-sm animate-[pulse_2s_ease-in-out_infinite]" />
                          </div>
                          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent mb-4">
                            {t('services.ai.title')}
                          </h2>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            Implementamos soluciones de inteligencia artificial personalizadas que automatizan procesos complejos y mejoran la capacidad predictiva de tu empresa.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="text-2xl mb-2">🤖</div>
                            <h3 className="font-semibold text-purple-700 mb-1">{t('services.ai.benefits.automation')}</h3>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="text-2xl mb-2">📈</div>
                            <h3 className="font-semibold text-purple-700 mb-1">{t('services.ai.benefits.prediction')}</h3>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="text-2xl mb-2">🔗</div>
                            <h3 className="font-semibold text-purple-700 mb-1">{t('services.ai.benefits.integration')}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="bg-purple-100 rounded-2xl p-6 shadow-lg border border-purple-100">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                            <ListChecks className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800">
                            {t('opportunities_we_provide')}
                          </h3>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <div className="text-xl group-hover:scale-110 transition-transform">💬</div>
                              <p className="text-gray-700">{t('services.ai.opportunities.chatbots')}</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <div className="text-xl group-hover:scale-110 transition-transform">📊</div>
                              <p className="text-gray-700">{t('services.ai.opportunities.prediction')}</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <div className="text-xl group-hover:scale-110 transition-transform">🔒</div>
                              <p className="text-gray-700">{t('services.ai.opportunities.security')}</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <div className="text-xl group-hover:scale-110 transition-transform">🔄</div>
                              <p className="text-gray-700">{t('services.ai.opportunities.optimization')}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 8: Consultoría en Análisis */}
              <CarouselItem>
                <div className="datasmart-slide consulting-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg relative overflow-hidden">
                  <style>{`
                    .consulting-slide::before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      height: 6px;
                      background: linear-gradient(90deg, #fb923c, #f97316);
                      border-radius: 6px 6px 0 0;
                      z-index: 10;
                    }
                  `}</style>
                  <div className="max-w-6xl mx-auto px-6 py-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      <div className="text-center">
                        <div className="mb-8">
                          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <Users className="w-10 h-10 text-white drop-shadow-sm animate-[pulse_2s_ease-in-out_infinite]" />
                          </div>
                          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-4">
                            {t('services.consulting.title')}
                          </h2>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            Asesoramos y desarrollamos estrategias para implementar una cultura data-driven en tu organización, identificando KPIs clave y oportunidades de mejora.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="text-2xl mb-2">📊</div>
                            <h3 className="font-semibold text-orange-700 mb-1">Definición de KPIs</h3>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="text-2xl mb-2">🧭</div>
                            <h3 className="font-semibold text-orange-700 mb-1">Estrategia data-driven</h3>
                          </div>
                          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="text-2xl mb-2">💡</div>
                            <h3 className="font-semibold text-orange-700 mb-1">Identificación de oportunidades</h3>
                          </div>
                        </div>
                      </div>

                      <div className="bg-orange-100 rounded-2xl p-6 shadow-lg border border-orange-100">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                            <ListChecks className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800">
                            Oportunidades que Brindamos
                          </h3>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <div className="text-xl group-hover:scale-110 transition-transform">🔍</div>
                              <p className="text-gray-700">Auditoría y diagnóstico de procesos analíticos</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <div className="text-xl group-hover:scale-110 transition-transform">🗺️</div>
                              <p className="text-gray-700">Definición de roadmap de analítica para la organización</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <div className="text-xl group-hover:scale-110 transition-transform">🧑‍💼</div>
                              <p className="text-gray-700">Capacitación en analítica y toma de decisiones basada en datos</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <div className="text-xl group-hover:scale-110 transition-transform">🤝</div>
                              <p className="text-gray-700">Acompañamiento en la adopción de cultura data-driven</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 9: Formación y Capacitación */}
              <CarouselItem>
                <div className="datasmart-slide training-slide bg-white min-h-[68vh] sm:min-h-[72vh] flex items-center justify-center rounded-lg relative overflow-hidden">
                  <style>{`
                    .training-slide::before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      height: 6px;
                      background: linear-gradient(90deg, #a78bfa, #8b5cf6);
                      border-radius: 6px 6px 0 0;
                      z-index: 10;
                    }
                  `}</style>
                  <div className="max-w-6xl mx-auto px-6 py-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                      <div className="text-center">
                        <div className="mb-8">
                          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                            <GraduationCap className="w-10 h-10 text-white drop-shadow-sm animate-[pulse_2s_ease-in-out_infinite]" />
                          </div>
                          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent mb-4">
                            {t('services.training.title')}
                          </h2>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            Programas personalizados para que tu equipo desarrolle habilidades analíticas y aproveche al máximo herramientas como Excel, Power BI, Tableau y soluciones de IA para potenciar el análisis de datos.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="text-2xl mb-2">📊</div>
                            <h3 className="font-semibold text-indigo-700 mb-1">Excel, Power BI y Tableau</h3>
                          </div>
                          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="text-2xl mb-2">🤖</div>
                            <h3 className="font-semibold text-indigo-700 mb-1">IA aplicada al análisis</h3>
                          </div>
                          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="text-2xl mb-2">🚀</div>
                            <h3 className="font-semibold text-indigo-700 mb-1">Mejora de performance analítico</h3>
                          </div>
                        </div>
                      </div>

                      <div className="bg-indigo-100 rounded-2xl p-6 shadow-lg border border-indigo-100">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                            <ListChecks className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800">
                            Oportunidades que Brindamos
                          </h3>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-xl border border-indigo-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <div className="text-xl group-hover:scale-110 transition-transform">📈</div>
                              <p className="text-gray-700">Capacitación en Excel, Power BI y Tableau desde nivel básico a avanzado</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <div className="text-xl group-hover:scale-110 transition-transform">🤖</div>
                              <p className="text-gray-700">Uso de herramientas de IA para acelerar el análisis y la toma de decisiones</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <div className="text-xl group-hover:scale-110 transition-transform">🧑‍💻</div>
                              <p className="text-gray-700">Workshops prácticos y resolución de casos reales</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <div className="text-xl group-hover:scale-110 transition-transform">🛠️</div>
                              <p className="text-gray-700">Implementación de mejores prácticas en procesos y análisis de datos</p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-violet-100 hover:shadow-md transition-all duration-300 hover:translate-x-2 group">
                            <div className="flex items-center gap-3">
                              <div className="text-xl group-hover:scale-110 transition-transform">🚀</div>
                              <p className="text-gray-700">Aumento del performance y productividad del equipo</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 10: Por Qué Elegirnos */}
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
          <div className={`numbers-indicators flex justify-center items-center gap-3 z-50 absolute left-1/2 transform -translate-x-1/2 ${isFullscreenActive ? 'bottom-[-30px]' : 'bottom-[-50px]'}`}>
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
