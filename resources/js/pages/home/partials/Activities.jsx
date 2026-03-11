import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const Activities = ({ activities = [] }) => {
    const [selectedActivity, setSelectedActivity] = useState(null);

    return (
        <section id="kegiatan" className="py-24 bg-gray-50 dark:bg-[#030303] text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                         <span className="text-blue-600 dark:text-blue-500 font-mono tracking-widest uppercase text-sm">
                            Cerita & Momen
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Kegiatan <span className="text-gray-400 dark:text-gray-500">Kami.</span>
                        </h2>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="hidden md:flex gap-4">
                        <button className="p-3 rounded-full border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition text-gray-400">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="p-3 rounded-full border border-gray-900 dark:border-white/10 hover:bg-gray-800 dark:hover:bg-white/5 bg-gray-900 dark:bg-transparent transition text-white">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Grid Card Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.map((activity) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedActivity(activity)}
                            className="group cursor-pointer"
                        >
                            <div className="h-full bg-white dark:bg-[#161616] border border-gray-100 dark:border-white/[0.05] rounded-[32px] overflow-hidden flex flex-col transition-all hover:shadow-2xl dark:hover:shadow-none hover:border-blue-500/30">

                                {/* Visual Header: Gambar besar agar kegiatan terlihat jelas */}
                                <div className="relative h-64 w-full overflow-hidden">
                                    <img
                                        src={`/storage/${activity.photo}`}
                                        alt={activity.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Overlay Date Badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-lg">
                                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                                            {new Date(activity.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    {/* Location & Tag */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex items-center text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-500/20">
                                            <MapPin size={10} className="mr-1" />
                                            {activity.location}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {activity.title}
                                    </h3>

                                    {/* Description: Dibuat lebih ringkas agar layout rapi */}
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm line-clamp-3 mb-6">
                                        {activity.description}
                                    </p>

                                    {/* Footer: Detail Tambahan */}
                                    <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/[0.05] flex justify-between items-center">
                                        <span className="text-xs font-medium text-gray-400 uppercase tracking-tight">
                                            {new Date(activity.event_date).getFullYear()} • Event
                                        </span>
                                        <div className="text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center group-hover:translate-x-1 transition-transform">
                                            Lihat Detail <ChevronRight size={14} className="ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Detail */}
            <Modal
                isOpen={!!selectedActivity}
                onClose={() => setSelectedActivity(null)}
                title=""
                maxWidth="2xl"
                noPadding={true}
            >
                {selectedActivity && (
                    <div className="bg-white dark:bg-[#0f0f0f] text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden rounded-t-lg md:rounded-lg">
                        <div className="relative h-80">
                            <img
                                src={`/storage/${selectedActivity.photo}`}
                                alt={selectedActivity.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient overlay adaptif */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0f0f0f] to-transparent" />
                        </div>
                        <div className="p-8 -mt-12 relative z-10">
                            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{selectedActivity.title}</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-loose mb-8 text-lg italic">
                                "{selectedActivity.description}"
                            </p>
                            <div className="flex flex-col gap-4 border-t border-gray-200 dark:border-white/10 pt-6">
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                    <Calendar size={18} className="mr-3 text-blue-600 dark:text-blue-500" />
                                    {new Date(selectedActivity.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                                <div className="flex justify-between items-center gap-4">
                                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                                        <MapPin size={18} className="mr-3 text-blue-600 dark:text-blue-500" /> {selectedActivity.location}
                                    </div>
                                    <Button
                                        onClick={() => setSelectedActivity(null)}
                                        className="bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full px-8 transition-colors"
                                    >
                                        Tutup
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
};

export default Activities;