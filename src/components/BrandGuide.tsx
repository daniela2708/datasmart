import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const BrandGuide = () => {
  const { t } = useLanguage();

  const colorPalette = [
    { name: 'Azul Primario', hex: '#2563eb', class: 'bg-blue-600' },
    { name: 'Azul Primario Oscuro', hex: '#1d4ed8', class: 'bg-blue-700' },
    { name: 'Azul Primario Claro', hex: '#60a5fa', class: 'bg-blue-400' },
    { name: 'Verde Secundario', hex: '#10b981', class: 'bg-emerald-500' },
    { name: 'Verde Secundario Oscuro', hex: '#059669', class: 'bg-emerald-600' },
    { name: 'Verde Secundario Claro', hex: '#34d399', class: 'bg-emerald-400' },
    { name: 'Gris Oscuro', hex: '#111827', class: 'bg-gray-900' },
    { name: 'Gris Claro', hex: '#f9fafb', class: 'bg-gray-50' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="logo-large mb-6">Data<span>Smart</span></div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Guía de Marca</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Especificación oficial del logo DataSmart con todas las variantes, colores y elementos de identidad visual.
          </p>
        </div>

        {/* Logo Principal */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-green-500">
            🎨 Logo Principal
          </h2>
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="logo-large mb-6">Data<span>Smart</span></div>
            <p className="text-gray-600 text-lg">
              <strong>Filosofía:</strong> Combina tecnología (Data) con inteligencia (Smart)<br/>
              Los puntos pulsantes simbolizan el procesamiento continuo de información
            </p>
          </div>
        </section>

        {/* Variantes del Logo */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-blue-500">
            📏 Variantes de Tamaño
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Logo Grande */}
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="logo-large mb-4">Data<span>Smart</span></div>
              <h3 className="font-semibold text-gray-900 mb-2">Versión Grande</h3>
              <p className="text-sm text-gray-600 mb-3">3rem (48px)</p>
              <div className="text-xs text-gray-500">
                Headers principales, landing pages, elementos destacados
              </div>
            </div>

            {/* Logo Mediano */}
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="logo-medium mb-4">Data<span>Smart</span></div>
              <h3 className="font-semibold text-gray-900 mb-2">Versión Media</h3>
              <p className="text-sm text-gray-600 mb-3">2.2rem (35px)</p>
              <div className="text-xs text-gray-500">
                Navegación, títulos de sección, aplicaciones web
              </div>
            </div>

            {/* Logo Pequeño */}
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="logo-small mb-4">Data<span>Smart</span></div>
              <h3 className="font-semibold text-gray-900 mb-2">Versión Pequeña</h3>
              <p className="text-sm text-gray-600 mb-3">1.5rem (24px)</p>
              <div className="text-xs text-gray-500">
                Favicons, badges, espacios reducidos
              </div>
            </div>
          </div>
        </section>

        {/* Variantes de Fondo */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-purple-500">
            🎭 Variantes de Fondo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fondo Default */}
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="logo-medium mb-4">Data<span>Smart</span></div>
              <h3 className="font-semibold text-gray-900 mb-2">Fondo Default</h3>
              <p className="text-xs text-gray-500">Para fondos blancos y claros</p>
            </div>

            {/* Fondo Oscuro */}
            <div className="logo-container-dark text-center hover:shadow-md transition-shadow">
              <div className="logo-medium dark-bg">Data<span>Smart</span></div>
              <h3 className="font-semibold text-white mb-2">Fondo Oscuro</h3>
              <p className="text-xs text-gray-300">Para footers, headers oscuros y tema dark</p>
            </div>

            {/* Fondo Gradiente */}
            <div className="logo-container-gradient text-center hover:shadow-md transition-shadow">
              <div className="logo-medium gradient-bg">Data<span>Smart</span></div>
              <h3 className="font-semibold text-white mb-2">Fondo Gradiente</h3>
              <p className="text-xs text-white/80">Para CTA sections y elementos promocionales</p>
            </div>

            {/* Fondo de Marca */}
            <div className="logo-container-brand text-center hover:shadow-md transition-shadow">
              <div className="logo-medium brand-bg">Data<span>Smart</span></div>
              <h3 className="font-semibold text-gray-800 mb-2">Fondo de Marca</h3>
              <p className="text-xs text-gray-600">Para presentaciones y materiales corporativos</p>
            </div>
          </div>
        </section>

        {/* Paleta de Colores */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-yellow-500">
            🎨 Paleta de Colores
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorPalette.map((color, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-16 h-16 rounded-full mx-auto mb-3 ${color.class} shadow-lg`}
                ></div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {color.name}
                </h3>
                <p className="text-xs text-gray-600 font-mono">{color.hex}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Componentes del Logo */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-red-500">
            🔧 Componentes del Logo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Texto Data */}
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-4">Data</div>
              <h3 className="font-semibold text-gray-900 mb-2">Texto Principal</h3>
              <p className="text-xs text-gray-600">Color: Azul Primario<br/>#2563eb</p>
            </div>

            {/* Texto Smart */}
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-green-600 mb-4">Smart</div>
              <h3 className="font-semibold text-gray-900 mb-2">Texto Secundario</h3>
              <p className="text-xs text-gray-600">Color: Verde Secundario<br/>#10b981</p>
            </div>

            {/* Punto Principal */}
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="w-8 h-8 bg-green-300 rounded-full mx-auto mb-4 animate-pulse"></div>
              <h3 className="font-semibold text-gray-900 mb-2">Punto Principal</h3>
              <p className="text-xs text-gray-600">Animación: Pulse 3s<br/>#34d399</p>
            </div>

            {/* Punto Secundario */}
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="w-6 h-6 bg-blue-300 rounded-full mx-auto mb-4 animate-pulse" style={{animationDelay: '1s'}}></div>
              <h3 className="font-semibold text-gray-900 mb-2">Punto Secundario</h3>
              <p className="text-xs text-gray-600">Animación: Pulse 2s delay<br/>#60a5fa</p>
            </div>
          </div>
        </section>

        {/* Código de Implementación */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-indigo-500">
            💻 Código de Implementación
          </h2>
          
          {/* HTML */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">HTML Básico</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <code>{`<div class="logo-large">Data<span>Smart</span></div>`}</code>
            </div>
          </div>

          {/* CSS */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">CSS Base</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`.logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2563eb;
  position: relative;
  display: inline-flex;
  align-items: center;
  padding-left: 30px;
}

.logo span {
  color: #10b981;
}

.logo::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #34d399;
  border-radius: 50%;
  left: -10px;
  top: 0;
  animation: pulse 3s infinite;
}

.logo::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #60a5fa;
  border-radius: 50%;
  left: -14px;
  bottom: 0;
  animation: pulse 2s infinite 1s;
}`}</pre>
            </div>
          </div>

          {/* React Component */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Componente React</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`import Logo from '@/components/Logo';

// Uso básico
<Logo size="medium" variant="default" />

// Con variantes
<Logo size="large" variant="dark" />
<Logo size="small" variant="gradient" />`}</pre>
            </div>
          </div>
        </section>

        {/* Guías de Uso */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-4 border-pink-500">
            📋 Guías de Uso
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recomendado */}
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-4 flex items-center">
                <span className="mr-2">✅</span>
                Recomendado
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Usar el logo grande en headers principales
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Aplicar el logo mediano en navegación
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Utilizar el logo pequeño en favicons y badges
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Mantener el aspect ratio de los puntos
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Respetar las animaciones pulse
                </li>
              </ul>
            </div>

            {/* No Recomendado */}
            <div>
              <h3 className="text-xl font-semibold text-red-600 mb-4 flex items-center">
                <span className="mr-2">❌</span>
                No Recomendado
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Cambiar los colores oficiales
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Modificar las proporciones de los puntos
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Usar fondos que comprometan la legibilidad
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Eliminar las animaciones sin justificación
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Distorsionar el espaciado horizontal
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <div className="logo-medium mb-4">Data<span>Smart</span></div>
          <p className="text-gray-600">
            Versión 2.0 • Noviembre 2024 • Equipo DataSmart
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandGuide; 