import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Hero = ({ data }) => {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <section className="w-full h-[650px] bg-black flex items-center justify-center">
        <div className="text-white animate-pulse font-medium">Loading content...</div>
      </section>
    );
  }

  const slides = Array.isArray(data) ? data : [data];

  return (
    <section className="relative w-full h-[720px] bg-black overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={slides.length > 1}
        className="h-full w-full 
          [--swiper-navigation-color:#ffffff] 
          [--swiper-pagination-color:#ffffff]
          [&_.swiper-button-next]:scale-50 [&_.swiper-button-next]:opacity-0 hover:[&_.swiper-button-next]:opacity-50
          [&_.swiper-button-prev]:scale-50 [&_.swiper-button-prev]:opacity-0 hover:[&_.swiper-button-prev]:opacity-50"
      >
        {slides.map((item, index) => (
          <SwiperSlide key={item.id || index}>
            <div className="relative w-full h-full flex items-center">
              {/* Background Image - Tetap Cover */}
              <img
                src={item.image_path ? `/storage/${item.image_path}` : '/placeholder-hero.jpg'}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />

              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

              {/* Content Container - Rata Kiri */}
              <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
                <div className="max-w-3xl">

                  {/* Small Badge / Top Label (Seperti 'We've raised...') */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm mb-6 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    Fitur Unggulan Mahasiswa
                  </div>

                  {/* Main Title - Rata Kiri */}
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                    {item.title.split(' ').map((word, index, array) => {
                      // Cek apakah ini kata terakhir
                      const isLast = index === array.length - 1;
                      return (
                        <React.Fragment key={index}>
                          <span className={isLast ? "text-cyan-400 dark:text-cyan-600" : ""}>
                            {word}
                          </span>
                          {index < array.length - 1 && ' '}
                        </React.Fragment>
                      );
                    })}
                  </h1>

                  {/* Subtitle - Rata Kiri */}
                  {item.subtitle && (
                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                      {item.subtitle}
                    </p>
                  )}

                  {/* Button Group - Tombol Ganda */}
                  <div className="flex flex-wrap gap-4">
                    {item.cta_text && item.cta_link && (
                      <a
                        href={item.cta_link}
                        className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-black font-bold py-4 px-8 rounded-full transition duration-300 shadow-lg"
                      >
                        {item.cta_text}
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </a>
                    )}

                    {/* Secondary Button (Seperti 'Learn More') */}
                    <button className="px-8 py-4 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition backdrop-blur-sm">
                      Pelajari Selengkapnya
                    </button>
                  </div>
                </div>
              </div>

              {/* Decoration (Garis miring di pojok seperti gambar kedua) */}
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tr from-yellow-400 via-orange-500 to-purple-600 opacity-20 blur-3xl rounded-full -mr-20 -mb-20"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;