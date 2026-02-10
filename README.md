# Frontend Zara Challenge 📱

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.0.18-green)](https://vitest.dev/)

Aplicación de e-commerce de smartphones desarrollada con Next.js 16, React 19 y TypeScript. Incluye catálogo de productos, carrito de compras y arquitectura modular basada en features.

## 🚀 Características

- Catálogo de productos con búsqueda en tiempo real
- Carrito de compras con persistencia en LocalStorage
- Testing con Vitest (>90% cobertura)
- Arquitectura modular basada en features
- Server Side Rendering (SSR)
- Diseño responsive con SCSS

## 📋 Requisitos

- **Node.js** v20 o superior
- **pnpm** v8 o superior

```bash
npm install -g pnpm
```

## 🛠️ Instalación y Configuración

1. **Clonar e instalar dependencias**
```bash
git clone <url-del-repositorio>
cd frontend-zara-challenge
pnpm install
```

2. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables (**requeridas** para desarrollo local y producción):

```env
NEXT_PUBLIC_API_URL=<api_url>
NEXT_PUBLIC_API_HOST=<api_host>
NEXT_PUBLIC_API_KEY=<api_key>
```

3. **Ejecutar en desarrollo**
```bash
pnpm dev
```
Servidor disponible en [http://localhost:3000](http://localhost:3000)

## 📦 Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Inicia servidor de desarrollo con Turbopack |
| `pnpm build` | Construye la aplicación para producción |
| `pnpm start` | Ejecuta la aplicación en modo producción |
| `pnpm test` | Ejecuta todos los tests |
| `pnpm test:watch` | Ejecuta tests en modo watch |
| `pnpm coverage` | Genera reporte de cobertura |
| `pnpm lint` | Verifica código con ESLint |
| `pnpm lint:fix` | Corrige problemas de linting automáticamente |

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── cart/              # Página del carrito
│   └── phones/            # Páginas de productos
├── features/              # Arquitectura basada en features
│   ├── cart/              # Feature: Carrito
│   │   ├── components/    # Componentes UI
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # Lógica de negocio
│   │   └── types/         # Tipos TypeScript
│   └── phones/            # Feature: Catálogo
│       ├── components/
│       ├── context/
│       ├── services/
│       └── types/
├── services/              # Servicios compartidos
│   └── http/              # Clientes HTTP
├── shared/                # Recursos compartidos
│   └── components/
└── styles/                # Estilos globales

test/                      # Tests organizados por features
├── features/
├── mocks/
└── services/
```

## 🏗️ Arquitectura

El proyecto sigue una **arquitectura modular basada en features**:

- **Features autónomos**: Cada funcionalidad (cart, phones) contiene sus propios componentes, hooks, servicios y tipos
- **Separación de responsabilidades**: Componentes (UI), Hooks (lógica), Services (API/datos)
- **Server/Client Components**: Aprovecha Next.js 16 App Router
- **Path Aliases**: Imports limpios con `@src` y `@test`

## 🧩 Stack Tecnológico

- **Framework**: Next.js 16.1.6 con App Router
- **UI**: React 19.2.3
- **Lenguaje**: TypeScript 5
- **Estilos**: SCSS/Sass
- **HTTP**: Axios
- **Testing**: Vitest + Testing Library + jsdom
- **Code Quality**: ESLint, Prettier, Husky

## 🧪 Testing

Cobertura del 90% en statements, functions y lines (85% en branches).

```bash
pnpm test          # Ejecutar tests
pnpm coverage      # Ver reporte de cobertura
```

Los tests cubren componentes, hooks, servicios y clientes HTTP.

## 🌐 API

**Base URL**: `https://prueba-tecnica-api-tienda-moviles.onrender.com`

Endpoints:
- `GET /phones` - Listado de teléfonos
- `GET /phones/:id` - Detalle de teléfono

## 📄 Licencia

Proyecto privado - Desafío técnico

---
