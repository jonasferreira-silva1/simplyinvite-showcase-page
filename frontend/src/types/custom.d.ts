// This file ensures TypeScript can find the type declarations for imported modules

// JSX Runtime
/// <reference types="react/jsx-runtime" />

// React
declare module 'react' {
  export * from 'react';
}

// React Router DOM
declare module 'react-router-dom' {
  export * from 'react-router-dom';
}

// Zod
declare module 'zod' {
  export * from 'zod';
}

// React Hook Form
declare module 'react-hook-form' {
  export * from 'react-hook-form';
}

// Lucide React
declare module 'lucide-react' {
  export * from 'lucide-react';
}

// Hookform Resolvers
declare module '@hookform/resolvers/zod' {
  export * from '@hookform/resolvers/zod';
}

// Sonner
declare module 'sonner' {
  export * from 'sonner';
} 