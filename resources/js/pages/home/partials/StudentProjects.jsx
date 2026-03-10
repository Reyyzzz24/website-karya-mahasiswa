import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";

const StudentProjects = ({ projects = [] }) => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-950">
            <div className="container mx-auto px-6 max-w-6xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Karya Mahasiswa</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <motion.div
                            key={project.nim}
                            whileHover={{ y: -5 }}
                            className="h-[400px] w-full"
                        >
                            {/* Card dengan latar belakang gambar */}
                            <Card className="relative h-full w-full overflow-hidden rounded-2xl border-0 shadow-lg group">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    {project.project_image ? (
                                        <img
                                            src={`/storage/${project.project_image}`}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200" />
                                    )}
                                    {/* Gradient Overlay untuk teks agar mudah dibaca */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                </div>

                                {/* Konten di atas gambar */}
                                <div className="relative h-full p-6 flex flex-col justify-end text-white">
                                    <div className="mb-2">
                                        <span className="bg-blue-600 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded">
                                            {project.nim}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2">
                                        {project.title}
                                    </h3>
                                    
                                    <p className="text-sm text-gray-200 font-medium mb-4">
                                        {project.student_name}
                                    </p>

                                    <div className="flex gap-3 mt-auto">
                                        <a href={project.project_url} target="_blank" className="text-xs font-bold uppercase underline hover:text-blue-300">
                                            View Project
                                        </a>
                                        <a href={project.journal_url} target="_blank" className="text-xs font-bold uppercase underline hover:text-emerald-300">
                                            Journal
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StudentProjects;