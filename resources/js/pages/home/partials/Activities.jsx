import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

const Activities = ({ activities = [] }) => {
    const [selectedActivity, setSelectedActivity] = useState(null);

    return (
        <section id="kegiatan" className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6 max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
                    Kegiatan Kami
                </h2>
                <div className="h-1.5 w-20 bg-cyan-500 mx-auto rounded-full mb-6"></div>

                <p className="text-center text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-12 px-4">
                    Ruang bagi mahasiswa untuk berbagi cerita, berkolaborasi dalam karya, dan merayakan kebersamaan melalui berbagai kegiatan yang penuh makna dan inspirasi.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.map((activity) => (
                        <motion.div
                            key={activity.id}
                            whileHover={{ y: -8 }}
                            className="cursor-pointer"
                            onClick={() => setSelectedActivity(activity)}
                        >
                            <Card className="h-full flex flex-col overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-xl transition-shadow !p-0">
                                <div className="relative w-full h-56 overflow-hidden">
                                    <img
                                        src={`/storage/${activity.photo}`}
                                        alt={activity.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm z-10">
                                        {new Date(activity.event_date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                        {activity.title}
                                    </h3>
                                    <div className="flex items-center text-gray-500 text-sm mb-4">
                                        <MapPin size={16} className="mr-2 text-emerald-500" />
                                        {activity.location}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mt-auto">
                                        {activity.description}
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Detail Kegiatan */}
            <Modal
                isOpen={!!selectedActivity}
                onClose={() => setSelectedActivity(null)}
                title=""
                maxWidth="2xl"
                noPadding={true}
            >
                {selectedActivity && (
                    <div className="flex flex-col">
                        <img
                            src={`/storage/${selectedActivity.photo}`}
                            alt={selectedActivity.title}
                            className="w-full h-72 object-cover"
                        />
                        <div className="p-8 space-y-6">
                            <div className="flex flex-wrap gap-4">
                                <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                                    <Calendar size={14} />
                                    {new Date(selectedActivity.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>

                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                {selectedActivity.title}
                            </h2>

                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {selectedActivity.description}
                            </p>

                            <div className="border-t pt-6 flex justify-between items-center">
                                <div className="text-sm text-gray-500 flex items-center">
                                    <MapPin size={16} className="mr-2" /> {selectedActivity.location}
                                </div>

                                <div className="flex gap-3">
                                    {selectedActivity.video_url && (
                                        <a href={selectedActivity.video_url} target="_blank" rel="noreferrer">
                                            <Button variant="secondary" className="gap-2">
                                                <ExternalLink size={16} /> Video
                                            </Button>
                                        </a>
                                    )}
                                    <Button onClick={() => setSelectedActivity(null)} variant="outline">Tutup</Button>
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