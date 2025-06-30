# Logo DataSmart - Especificación Oficial

## 🎨 Descripción General

El logo DataSmart representa la transformación de datos (azul) en inteligencia empresarial (verde), con elementos animados que simbolizan el procesamiento continuo y dinámico de la información.

## 🏗️ Estructura del Logo

### Elementos Principales
1. **Texto "Data"**: Color azul primario (#2563eb)
2. **Texto "Smart"**: Color verde secundario (#10b981)
3. **Punto Principal**: Verde claro (#34d399) con animación pulse 3s
4. **Punto Secundario**: Azul claro (#60a5fa) con animación pulse 2s (delay 1s)

### Paleta de Colores
- **Azul Primario**: `#2563eb`
- **Azul Primario Oscuro**: `#1d4ed8`
- **Azul Primario Claro**: `#60a5fa`
- **Verde Secundario**: `#10b981`
- **Verde Secundario Oscuro**: `#059669`
- **Verde Secundario Claro**: `#34d399`

## 📏 Variantes de Tamaño

### Logo Grande (3rem)
```html
<div class="logo-large">Data<span>Smart</span></div>
```
- **Uso**: Headers principales, landing pages, elementos destacados
- **Padding izquierdo**: 40px
- **Punto principal**: 25px × 25px
- **Punto secundario**: 15px × 15px

### Logo Mediano (2.2rem)
```html
<div class="logo-medium">Data<span>Smart</span></div>
```
- **Uso**: Navegación, títulos de sección, aplicaciones web
- **Padding izquierdo**: 35px
- **Punto principal**: 22px × 22px
- **Punto secundario**: 14px × 14px

### Logo Pequeño (1.5rem)
```html
<div class="logo-small">Data<span>Smart</span></div>
```
- **Uso**: Favicons, badges, espacios reducidos
- **Padding izquierdo**: 25px
- **Punto principal**: 15px × 15px
- **Punto secundario**: 10px × 10px

## 🎭 Variantes de Fondo

### Fondo Default
- **Texto "Data"**: Azul primario (#2563eb)
- **Texto "Smart"**: Verde secundario (#10b981)

### Fondo Oscuro (.dark-bg)
- **Texto "Data"**: Blanco (#ffffff)
- **Texto "Smart"**: Verde claro (#34d399)

### Fondo Gradiente (.gradient-bg)
- **Texto "Data"**: Blanco (#ffffff)
- **Texto "Smart"**: Verde claro (#34d399)

### Fondo de Marca (.brand-bg)
- **Texto "Data"**: Gris oscuro (#111827)
- **Texto "Smart"**: Azul oscuro (#1d4ed8)

## 💻 Implementación CSS

### CSS Base
```css
.logo {
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
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}
```

## 📱 Responsive Design

### Mobile (max-width: 768px)
- **Logo Grande**: 2.5rem
- **Logo Mediano**: 1.8rem
- **Logo Pequeño**: 1.2rem
- **Puntos ajustados proporcionalmente**

## 🎯 Componente React

```tsx
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'dark' | 'gradient' | 'brand';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  variant = 'default', 
  className = '' 
}) => {
  return (
    <div className={`logo-${size} ${variant !== 'default' ? `${variant}-bg` : ''} ${className}`}>
      Data<span>Smart</span>
    </div>
  );
};
```

## 🎨 Contenedores Especiales

### Fondo Oscuro
```html
<div class="logo-container-dark">
  <div class="logo-medium">Data<span>Smart</span></div>
</div>
```

### Fondo Gradiente
```html
<div class="logo-container-gradient">
  <div class="logo-medium">Data<span>Smart</span></div>
</div>
```

### Fondo de Marca
```html
<div class="logo-container-brand">
  <div class="logo-medium">Data<span>Smart</span></div>
</div>
```

## 📋 Guías de Uso

### ✅ Recomendado
- Usar el logo grande en headers principales
- Aplicar el logo mediano en navegación
- Utilizar el logo pequeño en favicons y badges
- Mantener el aspect ratio de los puntos
- Respetar las animaciones pulse

### ❌ No Recomendado
- Cambiar los colores oficiales
- Modificar las proporciones de los puntos
- Usar fondos que comprometan la legibilidad
- Eliminar las animaciones sin justificación
- Distorsionar el espaciado horizontal

## 🌟 Filosofía del Diseño

El logo DataSmart combina:
- **Tecnología** (Data): Representada en azul, simbolizando confianza y profesionalismo
- **Inteligencia** (Smart): Representada en verde, simbolizando crecimiento y innovación
- **Movimiento continuo**: Los puntos pulsantes representan el procesamiento dinámico de datos
- **Conexión**: La proximidad de los elementos sugiere integración y sinergia

## 📁 Archivos Relacionados

- `src/components/Logo.tsx` - Componente React del logo
- `src/styles/datasmart-modern.css` - Estilos CSS del logo
- `public/datasmart-favicon.svg` - Favicon vectorial
- `src/components/DataSmartPresentation.tsx` - Implementación en la presentación

---

**Versión**: 2.0  
**Última actualización**: Noviembre 2024  
**Mantenedor**: Equipo DataSmart 