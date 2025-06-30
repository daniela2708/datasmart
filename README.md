# DataSmart

Proyecto React con Vite, TypeScript y Tailwind CSS. Incluye una librería completa de componentes UI reutilizables.

## ✨ Características

- ⚡ **Vite** - Build tool rápido y moderno
- 🔷 **TypeScript** - Tipado estático para mejor desarrollo
- 🎨 **Tailwind CSS** - Framework CSS utility-first
- 📱 **Responsive** - Diseño adaptativo para todos los dispositivos
- 🧩 **Componentes Modulares** - Librería completa de componentes UI
- 🌍 **Multiidioma** - Soporte para español e inglés

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes principales
│   ├── ui/              # Componentes de interfaz reutilizables
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   └── context-menu.tsx
│   ├── DataSmartPresentation.tsx
│   └── LanguageToggle.tsx
├── contexts/            # React Contexts
├── hooks/               # Custom hooks
├── lib/                 # Utilidades y librerías
├── pages/               # Páginas de la aplicación
├── App.css             # Estilos del componente principal
├── App.tsx             # Componente principal
├── index.css           # Estilos globales con Tailwind
└── main.tsx            # Punto de entrada

public/
├── placeholder.svg      # Icono placeholder
└── robots.txt          # Archivo para web crawlers

Archivos de configuración:
├── components.json      # Configuración de componentes
├── eslint.config.js     # Configuración ESLint
├── postcss.config.js    # Configuración PostCSS
├── tailwind.config.ts   # Configuración Tailwind CSS
├── tsconfig.json        # Configuración TypeScript
├── tsconfig.node.json   # Configuración TypeScript para Node
└── vite.config.ts       # Configuración Vite
```

## 🚀 Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de la construcción

# Calidad de código
npm run lint         # Ejecutar linter
```

## 🎯 Primeros Pasos

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   Visita [http://localhost:5173](http://localhost:5173)

## 🧩 Componentes Disponibles

### Componentes de Interfaz (UI)
- **Accordion** - Contenido plegable
- **Alert/Alert Dialog** - Alertas y diálogos de confirmación
- **Avatar** - Imágenes de perfil y placeholders
- **Badge** - Etiquetas y insignias
- **Breadcrumb** - Navegación de ruta
- **Button** - Botones con múltiples variantes
- **Calendar** - Selector de fechas
- **Card** - Contenedores de contenido
- **Carousel** - Carrusel de imágenes/contenido
- **Chart** - Gráficos y visualizaciones
- **Checkbox** - Casillas de verificación
- **Collapsible** - Contenido colapsable
- **Command** - Paleta de comandos
- **Context Menu** - Menús contextuales

### Componentes Principales
- **DataSmartPresentation** - Componente principal de presentación
- **LanguageToggle** - Alternador de idioma ES/EN

## 🎨 Personalización

El proyecto utiliza variables CSS para temas, definidas en `src/index.css`. Puedes personalizarlas modificando las variables `--primary`, `--secondary`, etc.

## 🔧 Tecnologías

- **React 18** - Librería de UI
- **TypeScript 5** - Lenguaje tipado
- **Vite 4** - Build tool
- **Tailwind CSS 3** - Framework CSS
- **ESLint 8** - Linter de código
- **PostCSS** - Procesador CSS

## 📝 Próximos Pasos

Este proyecto está listo para el desarrollo. Puedes comenzar agregando:

1. **Páginas** en `src/pages/`
2. **Hooks personalizados** en `src/hooks/`
3. **Contextos** en `src/contexts/`
4. **Utilidades** en `src/lib/`

¡Disfruta construyendo con DataSmart! 🚀 