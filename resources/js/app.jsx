import React from 'react';
import './bootstrap'; // Memuat axios dan helper lain
import '../css/app.css'; // Memuat style Tailwind

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
  // Baris ini adalah "jembatan" yang mencari file di folder Pages/
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
  
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },
});