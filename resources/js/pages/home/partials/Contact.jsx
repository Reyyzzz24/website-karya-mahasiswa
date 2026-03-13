import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = ({ data: contactData }) => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const email = contactData?.email || "filkom@unida.ac.id";
    const phone = contactData?.phone_number || "+62 251 8240 773";

    // Fungsi format untuk link WhatsApp (08 -> 628)
    const formatWA = (num) => {
        let cleaned = num.replace(/\D/g, '');
        return cleaned.startsWith('0') ? '62' + cleaned.substring(1) : cleaned;
    };

    const waLink = `https://wa.me/${formatWA(phone)}`;

    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://formspree.io/f/xrbgknkv", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                setShowSuccessModal(true);
                reset();
            }
        });
    };

    return (
        <section id="hubungi" className="py-24 bg-gray-50 dark:bg-[#030303] transition-colors duration-500 overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Header Section */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <span className="text-blue-600 dark:text-blue-500 font-mono tracking-widest text-sm uppercase">Contact Us</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Hubungi <span className="text-cyan-500 dark:text-cyan-600">Kami.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* KIRI: Info & Interactive Map */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <p className="text-gray-600 dark:text-zinc-400 text-lg leading-relaxed max-w-md">
                                Silakan hubungi kami melalui formulir atau klik kontak di bawah ini untuk terhubung langsung dengan tim kami.
                            </p>

                            <div className="flex flex-col gap-4 text-gray-500 dark:text-zinc-500 text-sm font-medium">
                                <a href={`mailto:${email}`} className="hover:text-blue-500 transition-colors flex items-center gap-2">
                                    <Mail size={16} /> {email}
                                </a>
                                <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                                    <Phone size={16} /> {phone}
                                </a>
                            </div>
                        </div>

                        {/* Google Maps Iframe */}
                        <div className="relative h-80 w-full overflow-hidden group">
                            {/* Overlay Glow / Frame */}
                            <div className="absolute inset-0 z-10 pointer-events-none border-1 border-gray-200 dark:border-white/5" />

                            <div className="h-full w-full dark:grayscale dark:invert-[0.9] dark:contrast-[1.2] transition-all duration-700">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.9402526318186!2d106.84662397573618!3d-6.654327965053218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c9e3579e3571%3A0xc9285d678295aef0!2sFakultas%20Ilmu%20Komputer!5e0!3m2!1sid!2sid!4v1773386234127!5m2!1sid!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Maps Lokasi UNIDA"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* KANAN: Form Card */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[32px] opacity-0 group-hover:opacity-10 transition duration-500" />

                            <div className="relative bg-white dark:bg-[#0c0c0c] p-8 md:p-12 rounded-[32px] border border-gray-100 dark:border-white/[0.05] overflow-hidden">
                                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[length:32px_32px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]" />

                                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 dark:text-zinc-500">Name</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                placeholder="Your Name"
                                                required
                                                className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/[0.05] rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 dark:text-zinc-500">Email Address</label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                placeholder="Your Email Address"
                                                required
                                                className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/[0.05] rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 dark:text-zinc-500">Message</label>
                                        <textarea
                                            rows={5}
                                            value={data.message}
                                            onChange={e => setData('message', e.target.value)}
                                            placeholder="Type your message here..."
                                            required
                                            className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/[0.05] rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={processing}
                                        className="w-full md:w-max px-12 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {processing ? 'Sending...' : 'Submit'}
                                        {!processing && <Send size={16} />}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSuccessModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-white dark:bg-[#0c0c0c] p-10 rounded-[40px] max-w-sm w-full text-center border dark:border-white/10"
                        >
                            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Pesan Terkirim!</h3>
                            <p className="text-gray-500 dark:text-zinc-500 mb-8 text-sm">
                                Tim kami akan segera merespons pesan Anda.
                            </p>
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="w-full py-4 bg-gray-100 dark:bg-zinc-800 dark:text-white font-bold rounded-2xl transition-all"
                            >
                                Tutup
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Contact;