import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.barchy.online');

const CONTACT_LINKS = [
  {
    label: 'Phone',
    value: '+91 9605796725',
    href: 'tel:+919605796725',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'muhammadshameelks@gmail.com',
    href: 'mailto:muhammadshameelks@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'muhammad-shameel-k-s',
    href: 'https://linkedin.com/in/muhammad-shameel-k-s/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Palakkad, Kerala, India',
    href: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
];

export default function ContactForm() {
  const [showNote, setShowNote] = useState(true);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await pb.collection('messages').create(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="px-6 md:px-12 lg:px-20 py-24 md:py-32 relative overflow-hidden bg-surface-warm/50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side — Content + Contact Cards */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-10 rounded-xl bg-pastel-orange/40 flex items-center justify-center text-orange-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            </div>
            <span className="font-[Silkscreen] text-[16px] text-accent tracking-[0.2em] uppercase font-bold">
              Chapter 06 — The Connection
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-[1.1] text-fg"
          >
            Enough about me. <br />
            <span className="text-accent">Let's connect.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-fg-muted text-lg font-light mb-8 max-w-lg leading-relaxed"
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </motion.p>

          {/* Contact Info - Vertical List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-2 mb-8"
          >
            {CONTACT_LINKS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href || undefined}
                target={item.href?.startsWith('http') ? '_blank' : undefined}
                rel={item.href?.startsWith('http') ? 'noreferrer' : undefined}
                whileHover={{ x: 4 }}
                className={`
                  group flex items-center gap-4 p-3 rounded-xl border transition-all duration-300
                  ${item.href 
                    ? 'bg-white border-border hover:border-accent/40 hover:bg-pastel-orange/20 cursor-pointer' 
                    : 'bg-surface border-border/50 cursor-default'}
                `}
              >
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                  ${i === 0 ? 'bg-pastel-green/50 text-green-600' : i === 1 ? 'bg-pastel-blue/50 text-blue-600' : i === 2 ? 'bg-pastel-purple/50 text-purple-600' : 'bg-pastel-orange/50 text-orange-600'}
                `}>
                  {item.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-[Silkscreen] text-[10px] text-fg-faint tracking-wider uppercase">
                    {item.label}
                  </div>
                  <div className="text-sm font-medium text-fg truncate group-hover:text-accent transition-colors">
                    {item.value}
                  </div>
                </div>

                {/* Arrow for clickable items */}
                {item.href && (
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                    className="text-fg-faint"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </motion.div>
                )}
              </motion.a>
            ))}
          </motion.div>

          {/* Resume Download */}
          <motion.a
            href="/resume.pdf"
            download="Shameel_Resume.pdf"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2.5 px-5 py-3 bg-fg text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Resume
          </motion.a>
        </div>

        {/* Right Side — Form */}
        <div className="relative">
          {/* Silly Note + Arrow */}
          <AnimatePresence>
            {showNote && (
              <motion.div
                initial={{ opacity: 0, y: 10, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -top-20 -left-4 md:-left-8 z-20 pointer-events-auto sm:block"
              >
                <div className="bg-pastel-orange/90 backdrop-blur-sm border-2 border-orange-200 p-3 rounded-2xl shadow-lg transform -rotate-2 max-w-[160px] sm:max-w-[200px] relative">
                  <button 
                    onClick={() => setShowNote(false)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-orange-800 text-white rounded-full flex items-center justify-center text-[10px] hover:bg-orange-900 transition-colors cursor-pointer shadow-sm"
                    aria-label="Dismiss note"
                  >
                    ✕
                  </button>
                  <p className="font-[Silkscreen] text-[10px] text-orange-800 leading-tight">
                    This form is handled by a <span className="font-bold underline">PocketBase</span> instance inside a <span className="font-bold text-orange-600">Kubernetes</span> pod, humming away on a <span className="italic">Sony VAIO</span> in my bedroom.
                  </p>
                  
                  {/* Unique Arrow SVG */}
                  <div className="absolute -bottom-10 right-4 text-orange-400 pointer-events-none">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 5C5 5 15 5 25 15C35 25 35 35 35 35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
                      <path d="M28 35H35V28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative z-10 bg-white p-8 md:p-10 rounded-[2.5rem] border border-border shadow-xl shadow-accent/5"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center"
              >
                <div className="w-20 h-20 bg-pastel-green/50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-fg mb-2">Message Received!</h3>
                <p className="text-fg-muted">I'll get back to you faster than a pod restart.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-sm font-bold text-accent underline underline-offset-4"
                >
                  Send another?
                </button>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-20 text-center"
              >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-fg mb-2">Submission Failed</h3>
                <p className="text-fg-muted">Something went wrong. Please try again later.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-sm font-bold text-accent underline underline-offset-4"
                >
                  Try again
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[14px] font-[Silkscreen] uppercase tracking-wider text-fg-faint ml-1">Name</label>
                  <input 
                    required
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-fg-faint text-fg font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[14px] font-[Silkscreen] uppercase tracking-wider text-fg-faint ml-1">Email</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-fg-faint text-fg font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[14px] font-[Silkscreen] uppercase tracking-wider text-fg-faint ml-1">Message</label>
                  <textarea 
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What's on your mind?"
                    className="w-full px-6 py-4 rounded-2xl bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-fg-faint text-fg font-medium resize-none"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'submitting'}
                  className="w-full py-5 bg-accent text-white rounded-2xl font-bold text-sm shadow-lg shadow-accent/20 hover:bg-accent-dark transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      Deploy Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  </section>
  );
}
