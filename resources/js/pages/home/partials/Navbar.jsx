import React, { useState, useEffect } from 'react';
import { Sun, Moon, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ menus, logo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [openSubMenu, setOpenSubMenu] = useState(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function untuk memastikan scroll kembali normal jika komponen unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  // Varians untuk kontainer utama (Panel Menu)
  const panelVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        when: "beforeChildren", // Selesaikan animasi panel dulu baru isi menu
      }
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { ease: "easeInOut", duration: 0.4 }
    }
  };

  // Varians untuk efek Domino/Tangga pada item menu
  const itemVariants = {
    hidden: { opacity: 0, y: -20, rotateX: -45 }, // Muncul seperti kartu miring
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1, // Jeda antar item (efek domino)
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 transition-colors duration-300">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
            {logo && logo.icon ? (
              <img src={`/storage/${logo.icon}`} alt={logo.title} className="h-8 w-auto transition-transform group-hover:scale-110" />
            ) : (
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">S</div>
            )}
            <span className="text-sm/6 font-bold text-white tracking-tight">{logo?.title || "SIADLAB"}</span>
          </a>
        </div>

        {/* Desktop Menu - Tetap seperti semula */}
        <div className="hidden lg:flex lg:gap-x-10 items-center">
          {menus.map((menu) => (
            menu.children?.length > 0 ? (
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
                      <a key={child.id} href={child.url} className="block px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">{child.title}</a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={menu.id} href={menu.url} className="text-sm/6 font-semibold text-white/80 hover:text-white transition-colors">{menu.title}</a>
            )
          ))}
        </div>

        <div className="flex lg:flex-1 justify-end items-center gap-6">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-95">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="/login" className="hidden lg:block text-sm/6 font-semibold text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all border border-white/10">Log in</a>
          <div className="flex lg:hidden">
            <button type="button" onClick={() => setMobileMenuOpen(true)} className="p-2 text-white">
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DENGAN EFEK DOMINO */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ perspective: "1000px" }} // Menambah kedalaman untuk efek rotateX
            className="fixed inset-0 z-[100] lg:hidden bg-zinc-950/95 backdrop-blur-md p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-white font-bold text-xl">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-white">
                <X className="size-6" />
              </button>
            </div>

            <div className="space-y-2">
              {menus.map((menu, idx) => {
                const hasChildren = menu.children?.length > 0;
                const isOpen = openSubMenu === menu.id;

                return (
                  <motion.div
                    key={menu.id}
                    custom={idx} // Mengirim index ke varians untuk kalkulasi delay
                    variants={itemVariants}
                    className="border-b border-white/5 pb-2"
                    style={{ transformOrigin: "top" }} // Titik tumpu rotasi di atas (seperti tanggalan)
                  >
                    {hasChildren ? (
                      <>
                        <button
                          onClick={() => setOpenSubMenu(isOpen ? null : menu.id)}
                          className="flex items-center justify-between w-full py-3 text-2xl font-bold text-white transition-colors"
                        >
                          {menu.title}
                          <motion.svg
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            className={`size-6 ${isOpen ? 'text-cyan-500' : 'opacity-50'}`}
                            viewBox="0 0 20 20" fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                          </motion.svg>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 space-y-4 border-l-2 border-cyan-500/50 mt-2 mb-4">
                                {menu.children.map((child) => (
                                  <a key={child.id} href={child.url} onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-zinc-400 active:text-white">{child.title}</a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a href={menu.url} onClick={() => setMobileMenuOpen(false)} className="block py-3 text-2xl font-bold text-white active:text-cyan-500 transition-colors">{menu.title}</a>
                    )}
                  </motion.div>
                );
              })}

              <motion.div
                custom={menus.length}
                variants={itemVariants}
                className="pt-6 mt-4"
              >
                <a href="/login" className="block text-xl font-bold text-cyan-500">Log in &rarr;</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;