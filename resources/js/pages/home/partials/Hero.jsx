import React from 'react';

const Hero = ({ data }) => {
  // Jika tidak ada data aktif, kita bisa tampilkan skeleton atau null
  if (!data) return null;

  return (
    <section className="relative w-full h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <img 
        src={`/storage/${data.image_path}`} 
        alt={data.title}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          {data.title}
        </h1>
        
        {data.subtitle && (
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            {data.subtitle}
          </p>
        )}

        {data.cta_text && data.cta_link && (
          <a 
            href={data.cta_link}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
          >
            {data.cta_text}
          </a>
        )}
      </div>
    </section>
  );
};

export default Hero;