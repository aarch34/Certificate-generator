'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Shield, Award, Medal, Star, RefreshCw, User } from 'lucide-react';

import { nameSchema, NameFormValues } from '@/lib/validation';
import { useWindowSize } from '@/hooks/useWindowSize';
import { RCSBLogoSVG } from '@/components/icons/RCSBLogoSVG';
import { YodhaLogoSVG } from '@/components/icons/YodhaLogoSVG';
import { Loader } from '@/components/ui/loader';
import { CertificateTemplate } from '@/components/certificate/CertificateTemplate';
import { CertificateControls } from '@/components/certificate/CertificateControls';

export default function Home() {
  const [appState, setAppState] = useState<'landing' | 'loading' | 'certificate'>('landing');
  const [validatedName, setValidatedName] = useState('');
  const [fontStyle, setFontStyle] = useState<'serif' | 'cinzel' | 'script'>('script');
  const printRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NameFormValues>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: '' },
  });

  // Calculate certificate scaling to fit viewport (template is 1024px x 723px)
  const padding = width < 480 ? 12 : width < 640 ? 20 : 32;
  const certificateScale = Math.min((width - padding) / 1024, 1);
  const scaledHeight = 723 * certificateScale;

  const onSubmit = (data: NameFormValues) => {
    // Save the formatted (trimmed & cleaned) name
    setValidatedName(data.name);
    // Enter loading state
    setAppState('loading');
  };

  useEffect(() => {
    if (appState !== 'loading') return;

    // Simulate certificate generation / assembly (2 seconds duration)
    const timer = setTimeout(() => {
      setAppState('certificate');
      
      // Fire confetti celebration burst!
      setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#ffd700', '#1b3a24', '#ff9933', '#128807'],
        });
      }, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [appState]);

  const handleReset = () => {
    reset();
    setValidatedName('');
    setAppState('landing');
  };

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen relative overflow-hidden bg-[#040906]">
      {/* Background Decorative Layer: Ambient Radial Gold Light & Subtle Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4af37]/18 via-[#0e2716]/40 to-transparent blur-3xl opacity-80" />
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>
      
      {/* HEADER BAR */}
      <header className="relative z-20 w-full px-4 sm:px-10 py-3 sm:py-4 flex justify-between items-center border-b border-[#d4af37]/20 bg-[#040906]/85 backdrop-blur-xl shadow-lg">
        <div className="flex items-center space-x-3 sm:space-x-6">
          <motion.div whileHover={{ scale: 1.03 }} className="p-1 rounded-xl bg-white/5 border border-[#d4af37]/20 shadow-md">
            <img src="/RCSB-Logo.png" alt="RCSB Logo" className="h-8 sm:h-11 object-contain" />
          </motion.div>
          <div className="h-6 sm:h-7 w-[1px] bg-[#d4af37]/30" />
          <motion.div whileHover={{ scale: 1.03 }} className="p-1 rounded-xl bg-white/5 border border-[#d4af37]/20 shadow-md">
            <img src="/RUAS-logo.png" alt="RUAS Logo" className="h-8 sm:h-11 object-contain px-1" />
          </motion.div>
        </div>
        
        <div className="flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-[#0d2114] to-[#163620] text-[#fcf6ba] text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#d4af37]/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
          <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37] animate-pulse" />
          <span className="hidden sm:inline">Jointly Organised</span>
          <span className="sm:hidden">RCSB &bull; RUAS</span>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center py-8 sm:py-12 px-3 sm:px-4">
        
        {/* LOADING STATE SCREEN */}
        <Loader loading={appState === 'loading'} />

        <AnimatePresence mode="wait">
          {/* LANDING PAGE STATE */}
          {appState === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full max-w-2xl flex flex-col items-center text-center space-y-6 sm:space-y-10"
            >
              {/* Hero Crest Shield Emblem */}
              <div className="relative group flex items-center justify-center">
                {/* Aura rings */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/20 to-[#aa771c]/10 rounded-full blur-2xl scale-125 pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-[#d4af37]/20 animate-spin [animation-duration:20s]" />
                
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                  }}
                  transition={{ 
                    duration: 12, 
                    repeat: Infinity, 
                    repeatDelay: 8,
                    ease: "easeInOut"
                  }}
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 drop-shadow-[0_10px_25px_rgba(212,175,55,0.3)] relative z-10"
                >
                  <YodhaLogoSVG className="w-full h-full" />
                </motion.div>
              </div>

              {/* Title & Banner Header */}
              <div className="space-y-3 sm:space-y-4 max-w-xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em]">
                  <Star className="w-3 h-3 fill-current text-[#d4af37]" />
                  <span>Official Certificate Portal</span>
                  <Star className="w-3 h-3 fill-current text-[#d4af37]" />
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.2em] sm:tracking-[0.25em] uppercase font-serif text-gold-gradient drop-shadow-md">
                  Project Yodha
                </h1>
                
                {/* Triple Metallic Divider Line */}
                <div className="flex items-center justify-center space-x-3 w-40 sm:w-48 mx-auto pt-1">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#d4af37]" />
                  <div className="w-2 h-2 rotate-45 bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#d4af37]" />
                </div>
              </div>

              {/* Event & Speaker Information Feature Card */}
              <div className="w-full glass-panel rounded-2xl p-4 sm:p-7 text-left space-y-3.5 sm:space-y-4 border border-[#d4af37]/25 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs md:text-sm">
                  {/* Column 1: Organizers */}
                  <div className="space-y-1.5 p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]/80 block">
                      Organised By
                    </span>
                    <p className="font-medium text-zinc-200 leading-snug text-xs sm:text-sm">
                      <span className="text-[#fcf6ba] font-semibold">Rotaract Club of Swarna Bengaluru</span> &amp; <span className="text-[#fcf6ba] font-semibold">Rotaract Club of RUAS</span>
                    </p>
                  </div>

                  {/* Column 2: Guest Speaker */}
                  <div className="space-y-1.5 p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]/80 block">
                      Guest Speaker Session
                    </span>
                    <p className="font-medium text-zinc-200 leading-snug text-xs sm:text-sm">
                      <span className="text-white font-bold">JWO. Dilip Kumar Reddy</span>
                    </p>
                    <p className="text-xs text-[#d4af37] italic font-semibold">
                      &ldquo;Kargil Through My Eyes&rdquo;
                    </p>
                  </div>
                </div>

                <p className="text-center text-zinc-300 text-xs md:text-sm font-sans pt-1">
                  Enter your full name below to generate &amp; download your personalized <span className="text-[#d4af37] font-semibold">Certificate of Participation</span>.
                </p>
              </div>

              {/* Form Input Glassmorphic Card */}
              <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="w-full max-w-md glass-panel-gold p-5 sm:p-8 md:p-9 rounded-2xl sm:rounded-3xl space-y-5 sm:space-y-6 text-left relative"
                noValidate
              >
                <div className="space-y-2 relative">
                  <label 
                    htmlFor="name" 
                    className="text-[11px] sm:text-xs uppercase font-extrabold tracking-widest text-[#fcf6ba] flex items-center space-x-1.5"
                  >
                    <User className="w-4 h-4 text-[#d4af37]" />
                    <span>Enter Your Full Name</span>
                  </label>
                  
                  <div className="relative flex items-center">
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. Aarcha U"
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`w-full bg-[#040906] text-white border ${
                        errors.name ? 'border-red-500/80 focus:border-red-500' : 'border-[#d4af37]/30 focus:border-[#d4af37]'
                      } px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-semibold font-sans tracking-wide transition-all outline-none bg-opacity-80 shadow-inner focus:shadow-[0_0_20px_rgba(212,175,55,0.2)]`}
                      {...register('name')}
                    />
                  </div>

                  {errors.name && (
                    <motion.span
                      id="name-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs font-semibold mt-1 font-sans flex items-center"
                    >
                      <Star className="w-3.5 h-3.5 mr-1 fill-current text-red-500 animate-pulse" />
                      {errors.name.message}
                    </motion.span>
                  )}
                </div>

                {/* Generate Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full relative group overflow-hidden rounded-xl p-[2px] cursor-pointer animate-gold-glow shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] via-[#b38728] to-[#aa771c] opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center justify-center space-x-2.5 bg-gradient-to-r from-[#0d2114] via-[#163620] to-[#0d2114] group-hover:from-[#112818] group-hover:to-[#163620] text-white py-3.5 sm:py-4 px-6 rounded-[10px] font-bold font-sans tracking-wider uppercase transition-all text-xs sm:text-sm shadow-inner">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37] group-hover:scale-110 transition-transform" />
                    <span className="text-[#fcf6ba] drop-shadow-sm">Generate Certificate</span>
                  </div>
                </motion.button>
              </form>

              {/* Service Motto Footer */}
              <div className="flex space-x-2 items-center text-[#d4af37]/70 font-serif italic text-xs tracking-wider">
                <span>&ldquo;Service Above Self&rdquo;</span>
              </div>
            </motion.div>
          )}

          {/* CERTIFICATE DISPLAY STATE */}
          {appState === 'certificate' && (
            <motion.div
              key="certificate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="w-full flex flex-col items-center"
            >
              {/* Header Title */}
              <div className="text-center mb-4 sm:mb-5 space-y-1 sm:space-y-1.5">
                <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#d4af37] font-sans flex items-center justify-center">
                  <Medal className="w-4 h-4 mr-1.5 fill-current text-[#d4af37]" />
                  Your Certificate is Ready
                </span>
                <p className="text-zinc-300 text-xs sm:text-sm font-sans max-w-sm">
                  Review the preview below and select your preferred format to download.
                </p>
              </div>

              {/* Certificate scaled preview wrapper */}
              <div 
                className="w-full max-w-[1024px] flex items-start justify-center overflow-hidden rounded-xl shadow-2xl border-2 border-[#d4af37]/40"
                style={{ 
                  height: `${scaledHeight}px`,
                }}
              >
                <CertificateTemplate ref={printRef} name={validatedName} scale={certificateScale} fontStyle={fontStyle} />
              </div>

              {/* Control Download Buttons */}
              <CertificateControls certificateRef={printRef} participantName={validatedName} />

              {/* Reset Form Button */}
              <motion.button
                onClick={handleReset}
                whileHover={{ scale: 1.05 }}
                className="mt-6 flex items-center space-x-2 text-zinc-300 hover:text-[#fcf6ba] font-bold text-xs uppercase tracking-widest transition-colors font-sans py-2.5 px-5 rounded-full bg-[#112819]/60 hover:bg-[#112819]/90 border border-[#d4af37]/30 shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Generate Another Certificate</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER BAR */}
      <footer className="relative z-20 w-full py-4 text-center border-t border-[#d4af37]/15 bg-[#040906] px-4 backdrop-blur-md">
        <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-sans font-semibold block">
          PROJECT YODHA &copy; 2026 &bull; ROTARACT CLUB OF SWARNA BENGALURU &amp; ROTARACT CLUB OF RUAS
        </span>
      </footer>
    </div>
  );
}
