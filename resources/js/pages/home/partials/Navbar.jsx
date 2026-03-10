import React, { useState } from 'react';

const Navbar = ({ menus, logo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            {logo && logo.icon ? (
              <img
                src={`/storage/${logo.icon}`}
                alt={logo.title}
                className="h-8 w-auto"
              />
            ) : (
              <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center text-[10px]">
                Logo
              </div>
            )}

            <span className="text-sm/6 font-semibold text-white truncate">
              {logo?.title || "Nama Website"}
            </span>
          </a>
        </div>

        {/* Tombol Toggle Mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Menu Desktop */}
        <div className="hidden lg:flex lg:gap-x-12">
          {menus.map((menu) => (
            menu.children && menu.children.length > 0 ? (
              <div key={menu.id} className="relative group">
                {/* Tombol dengan Icon Chevron */}
                <button className="flex items-center gap-1 text-sm/6 font-semibold text-white py-4">
                  {menu.title}
                  <svg
                    className="size-4 transition-transform duration-300 group-hover:rotate-180"
                    viewBox="0 0 20 20" fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {/* Dropdown */}
                <div className="absolute pt-1 hidden group-hover:block w-48">
                  <div className="bg-white shadow-lg py-2 rounded-md">
                    {menu.children.map((child) => (
                      <a
                        key={child.id}
                        href={child.url}
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
                      >
                        {child.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={menu.id} href={menu.url} className="text-sm/6 font-semibold text-white py-4">
                {menu.title}
              </a>
            )
          ))}
        </div>

        {/* Auth Link Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/login" className="text-sm/6 font-semibold text-white">Log in <span aria-hidden="true">&rarr;</span></a>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50 bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10 ml-auto">
            <div className="flex items-center justify-between">
              <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-200">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                  <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {menus.map((menu) => (
                    <a key={menu.id} href={menu.url} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5 flex items-center gap-3">
                      {menu.icon && <img src={`/storage/${menu.icon}`} alt="" className="w-5 h-5 object-contain" />}
                      {menu.title}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5">Log in</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;