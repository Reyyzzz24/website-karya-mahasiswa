import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react'; // Import ikon

const Navbar = ({ menus, logo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // Logic untuk mengganti tema
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 transition-colors duration-300">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
            {logo && logo.icon ? (
              <img
                src={`/storage/${logo.icon}`}
                alt={logo.title}
                className="h-8 w-auto transition-transform group-hover:scale-110"
              />
            ) : (
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                S
              </div>
            )}
            <span className="text-sm/6 font-bold text-white tracking-tight">
              {logo?.title || "SIADLAB"}
            </span>
          </a>
        </div>

        {/* Menu Desktop */}
        <div className="hidden lg:flex lg:gap-x-10 items-center">
          {menus.map((menu) => (
            menu.children && menu.children.length > 0 ? (
              <div key={menu.id} className="relative group">
                <button className="flex items-center gap-1 text-sm/6 font-semibold text-white/80 hover:text-white transition-colors py-4">
                  {menu.title}
                  <svg className="size-4 opacity-50 group-hover:rotate-180 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute top-full -left-4 pt-2 hidden group-hover:block w-48 animate-in fade-in slide-in-from-top-2">
                  <div className="bg-white dark:bg-zinc-900 shadow-xl border border-gray-100 dark:border-white/5 py-2 rounded-xl">
                    {menu.children.map((child) => (
                      <a key={child.id} href={child.url} className="block px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        {child.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={menu.id} href={menu.url} className="text-sm/6 font-semibold text-white/80 hover:text-white transition-colors">
                {menu.title}
              </a>
            )
          ))}
        </div>

        {/* Right Section: Theme Toggle & Login */}
        <div className="flex lg:flex-1 justify-end items-center gap-6">
          {/* Tombol Ganti Tema */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a href="/login" className="hidden lg:block text-sm/6 font-semibold text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all border border-white/10">
            Log in
          </a>

          {/* Tombol Toggle Mobile */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden bg-zinc-950/90 backdrop-blur-md p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <span className="text-white font-bold">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6">
                <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            {menus.map((menu) => (
              <a key={menu.id} href={menu.url} className="block text-2xl font-bold text-white hover:text-blue-500 transition-colors">
                {menu.title}
              </a>
            ))}
            <div className="pt-4 mt-4 border-t border-white/10">
                <a href="/login" className="block text-xl font-semibold text-blue-500">Log in &rarr;</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;