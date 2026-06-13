import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Heart, Sparkles, Star } from "lucide-react";
import { polaroidMemories, loveReasons } from "../data/mockData";
import confetti from "canvas-confetti";

interface FlipbookProps {
  onOpenGift: () => void;
}

export function Flipbook({ onOpenGift }: FlipbookProps) {
  // Mobile single page vs Desktop dual-page view.
  // Book has 5 logical pages:
  // - Page 1: Cover
  // - Page 2: Polaroid Memory 1
  // - Page 3: Polaroid Memory 2 & 3 (and reasons list)
  // - Page 4: Interactive Candle Cake Wish
  // - Page 5: Closing letter & Vibrating Present box
  const [currentPage, setCurrentPage] = useState(0); // Index of reading (0 to 4)
  const [activeReasonId, setActiveReasonId] = useState<string | null>(null);
  const [candleLit, setCandleLit] = useState(true);

  // Confetti helper for blowing candle
  const blowCandle = (e: React.MouseEvent) => {
    if (!candleLit) return;
    setCandleLit(false);

    // Fire sound-less sparkle confetti from the cursor or cake location
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 80,
      angle: 90,
      spread: 70,
      origin: { x, y },
      colors: ["#fbbf24", "#f59e0b", "#fffbeb", "#f3f4f6"]
    });

    // Also fire a general celebratory burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
    }, 200);
  };

  const handleNextPage = () => {
    if (currentPage < 4) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-6 flex flex-col items-center">
      {/* Page indicator badges above book */}
      <div className="flex gap-1.5 mb-5 select-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`h-2 rounded-full transition-all duration-350 cursor-pointer ${
              currentPage === i
                ? "w-10 bg-[#ef4444]"
                : "w-2 bg-[#d0d0c8] hover:bg-[#8a8a82]"
            }`}
            title={`Halaman ${i + 1}`}
          />
        ))}
      </div>

      {/* Main 3D Book Container with Bold Typography custom deep shadow */}
      <div className="relative w-full h-[620px] sm:h-auto sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-gradient-to-br from-[#f0f0e8] to-[#d2d2c9] border border-[#e0e0d6] p-2 sm:p-5 flex items-center justify-center">
        {/* Book Outer Leather Cover Shadow Base */}
        <div className="absolute inset-4 rounded-2xl bg-[#1a1a18] -z-10 shadow-inner blur-[2px]" />

        {/* Responsive Book Layout */}
        <div className="relative w-full h-full flex flex-col sm:flex-row overflow-hidden bg-[#fcfcf9] border-[6px] border-[#1a1a18] rounded-2xl shadow-lg font-sans">

          {/* BACKGROUND TEXTURE overlay */}
          <div className="absolute inset-0 paper-pattern opacity-70 pointer-events-none z-0" />

          {/* 3D Spine Crease Shadows (Only displays on dual page layout, i.e., desktop view) */}
          <div className="hidden sm:block absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 book-spine-gradient z-20 pointer-events-none" />

          {/* RENDER PAGES DYNAMICALLY USING MOTION TRANSITIONS */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.45 }}
              className="relative z-10 w-full h-full flex flex-col sm:flex-row"
            >

              {/* VIEW LOGIC: Desktop splits book into LEFT & RIGHT pages. Mobile shows the core page. */}

              {/* =======================================================
                  PAGE 1: THE BOOK COVER (currentPage === 0)
                  ======================================================= */}
              {currentPage === 0 && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-[#1a1a18] via-[#2d2d2b] to-[#111110] text-[#fcfcf9] p-6 sm:p-12 relative overflow-hidden select-none">
                  {/* Gold Filigree Corner Borders */}
                  <div className="absolute inset-3 border border-amber-300/20 rounded-xl pointer-events-none" />
                  <div className="absolute inset-4 border-2 border-amber-500/35 rounded-lg pointer-events-none" />

                  {/* Corner Ornaments */}
                  <div className="absolute top-5 left-5 text-amber-500/60 text-xl font-bold">❦</div>
                  <div className="absolute top-5 right-5 text-amber-500/60 text-xl font-bold">❦</div>
                  <div className="absolute bottom-5 left-5 text-amber-500/60 text-xl font-bold">❦</div>
                  <div className="absolute bottom-5 right-5 text-amber-500/60 text-xl font-bold">❦</div>

                  <div className="relative z-10 flex flex-col items-center text-center max-w-md">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-[#ef4444] text-5xl mb-4"
                    >
                      ❤️
                    </motion.div>

                    <h1 className="font-serif italic text-4xl sm:text-5xl font-black tracking-tight text-white leading-none drop-shadow-sm">
                      Hari Ini dan Seterusnya: Tentang Kamu 
                    </h1>
                    <span className="font-handwritten text-4xl text-amber-300 mt-2 block">
                      Spesial Ulang Tahunmu
                    </span>

                    <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#ef4444] to-transparent my-6" />

                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8a8a82] font-semibold mb-8">
                      Teruntuk Pacarku SANIA Sayang 🌸
                    </p>

                    <p className="font-sans text-xs text-[#c0c0b8] italic leading-relaxed max-w-xs px-2">
                      Setiap detik bersamamu adalah lembaran cerita bahagia.
                      <br />
                      13 Juni 2026
                    </p>

                    <motion.div
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      onClick={handleNextPage}
                      className="mt-8 flex items-center justify-center gap-2 bg-[#ef4444] hover:bg-[#d93838] text-white rounded-full py-2.5 px-6 font-sans text-xs font-bold uppercase tracking-widest cursor-pointer shadow-md transition-all active:scale-95"
                    >
                      <span>Buka Halaman ➔</span>
                    </motion.div>
                  </div>

                  {/* Red/Gold realistic ribbon accent at the bottom */}
                  <div className="absolute bottom-0 right-10 w-8 h-20 bg-[#ef4444] z-0 rounded-b-sm border-l border-r border-[#d93838]/30 shadow-md transform translate-y-4" />
                </div>
              )}

              {/* =======================================================
                  PAGE 2: THE MEMORIES (currentPage === 1)
                  ======================================================= */}
              {currentPage === 1 && (
                <div className="w-full h-full flex flex-col sm:flex-row">
                  {/* Left Page: Polaroid Picture Panel */}
                  <div className="w-full sm:w-1/2 h-[42%] sm:h-full p-3 sm:p-6 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-[#e0e0d6] relative bg-[#fcfcf9]">
                    <div className="absolute inset-y-0 right-0 w-8 left-page-spine-shadow pointer-events-none z-10 hidden sm:block" />

                    {/* Cute Polaroid frame layout */}
                    <motion.div
                      whileHover={{ scale: 1.02, rotate: -1 }}
                      className="bg-white p-2.5 pb-6 sm:p-3.5 sm:pb-8 rounded-sm shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] border border-[#e0e0d6] text-[#1a1a18] max-w-[200px] sm:max-w-[260px] relative select-none"
                    >
                      {/* Masking tape on top corner */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-[#eaea9e]/40 border-t border-b border-yellow-300/20 rotate-[-4deg] z-15" />

                      <div className="w-full aspect-square overflow-hidden bg-[#f0f0e8] rounded-xs mb-2 sm:mb-3.5 relative border border-[#e0e0d6]">
                        <img
                          src={polaroidMemories[0].imageUrl}
                          alt={polaroidMemories[0].caption}
                          className="w-full h-full object-cover grayscale-[10%]"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-1.5 right-1.5 text-[8px] sm:text-[10px] bg-[#ef4444]/90 text-white font-mono font-bold rounded-full px-2 py-0.5">
                          ❤️ Sweetest
                        </span>
                      </div>

                      <div className="text-center font-handwritten text-lg sm:text-xl text-[#1a1a18] font-bold leading-none mt-1">
                        {polaroidMemories[0].caption}
                      </div>
                      <div className="text-center font-mono text-[8px] sm:text-[9px] text-[#8a8a82] uppercase tracking-wider font-semibold mt-1">
                        {polaroidMemories[0].date}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Page: Text/Diary Description Panel */}
                  <div className="w-full sm:w-1/2 h-[58%] sm:h-full p-5 sm:p-8 flex flex-col justify-between bg-[#fdfdfa] relative overflow-y-auto">
                    <div className="absolute inset-y-0 left-0 w-8 right-page-spine-shadow pointer-events-none z-10 hidden sm:block" />

                    <div className="my-auto flex flex-col">
                      <div className="flex items-center gap-1.5 text-[#ef4444] mb-2">
                        <Sparkles className="w-3.5 h-3.5 animate-spin" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a8a82]">Bab I</span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1a1a18] leading-tight tracking-tight">
                        Hari-hari bersamamu ✨
                      </h2>
                      <p className="font-sans text-xs sm:text-sm text-[#4a4a46] leading-relaxed mt-3 sm:mt-4">
                        {polaroidMemories[0].description}
                      </p>

                      <div className="mt-4 sm:mt-6 flex flex-col border-t border-[#e0e0d6] pt-3 sm:pt-4">
                        <span className="font-handwritten text-lg sm:text-2xl text-[#ef4444] font-bold leading-snug">
                          &ldquo;Aku tak pernah menyesal menunggumu, karena kamu adalah rute terbaik pulangku.&rdquo;
                        </span>
                      </div>
                    </div>

                    {/* Desktop/Mobile Next action guide footer */}
                    <div className="flex justify-between items-center text-[9px] sm:text-[10px] text-[#8a8a82] mt-4 pt-3 border-t border-[#e0e0d6]/50 font-mono font-semibold uppercase tracking-wider">
                      <span>Hal. 2 dari 5</span>
                      <span className="animate-pulse">Geser / Ketuk tombol ➔</span>
                    </div>
                  </div>
                </div>
              )}

              {/* =======================================================
                  PAGE 3: STORY & INTERACTIVE LOVE REASONS (currentPage === 2)
                  ======================================================= */}
              {currentPage === 2 && (
                <div className="w-full h-full flex flex-col sm:flex-row">
                  {/* Left Page: Polaroid Memory 2 */}
                  <div className="w-full sm:w-1/2 h-[35%] sm:h-full p-3 sm:p-6 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-[#e0e0d6] relative bg-[#fcfcf9] select-none">
                    <div className="absolute inset-y-0 right-0 w-8 left-page-spine-shadow pointer-events-none z-10 hidden sm:block" />

                    <motion.div
                      whileHover={{ scale: 1.02, rotate: 1 }}
                      className="bg-white p-2.5 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] border border-[#e0e0d6] text-[#1a1a18] max-w-[180px] sm:max-w-[240px] relative"
                    >
                      <div className="absolute -top-3 left-1/3 -translate-x-1/2 w-14 sm:w-16 h-4 sm:h-5 bg-[#eaea9e]/40 border-t border-b border-yellow-300/20 rotate-[3deg] z-15" />

                      <div className="w-full aspect-square overflow-hidden bg-[#f0f0e8] rounded-xs mb-2 sm:mb-3.5 relative border border-[#e0e0d6]">
                        <img
                          src={polaroidMemories[1].imageUrl}
                          alt={polaroidMemories[1].caption}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-center font-handwritten text-base sm:text-lg text-[#1a1a18] font-bold leading-none">
                        {polaroidMemories[1].caption}
                      </div>
                      <div className="text-center font-mono text-[8px] text-[#8a8a82] font-semibold mt-1">
                        {polaroidMemories[1].date}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Page: Reasons why I love you section */}
                  <div className="w-full sm:w-1/2 h-[65%] sm:h-full p-4 sm:p-8 flex flex-col justify-between bg-[#fdfdfa] relative overflow-y-auto">
                    <div className="absolute inset-y-0 left-0 w-8 right-page-spine-shadow pointer-events-none z-10 hidden sm:block" />

                    <div>
                      <div className="flex items-center gap-1.5 text-[#ef4444] font-bold mb-1.5">
                        <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8a8a82]">Bab II: Why I Love You</span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1a1a18] tracking-tight">
                        Alasan Aku Cinta Kamu 💐
                      </h2>
                      <p className="font-sans text-[11px] sm:text-xs text-[#8a8a82] mt-1 mb-4 leading-relaxed">
                        Ketuk segel pesan hati di bawah ini untuk melihat isi selembar surat tulus dari lubuk hatiku:
                      </p>

                      {/* Sparkly Click List */}
                      <div className="flex flex-col gap-2">
                        {loveReasons.map((reason) => (
                          <div key={reason.id} className="relative">
                            <button
                              onClick={() => setActiveReasonId(activeReasonId === reason.id ? null : reason.id)}
                              id={`reason-tab-${reason.id}`}
                              className={`w-full flex items-center justify-between text-left p-2 rounded-xl border transition-all duration-300 ${
                                activeReasonId === reason.id
                                  ? "bg-[#fff5f5] border-[#ef4444]"
                                  : "bg-[#fcfcf9] border-[#e0e0d6] hover:bg-[#f6f6f0] hover:border-[#8a8a82]"
                              } cursor-pointer`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{reason.emoji}</span>
                                <span className="text-xs sm:text-sm font-semibold text-[#1a1a18]">
                                  {reason.title}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-[#ef4444] font-bold uppercase tracking-wider">
                                {activeReasonId === reason.id ? "Tutup" : "Surat ✉️"}
                              </span>
                            </button>

                            {/* Dropdown text details */}
                            <AnimatePresence>
                              {activeReasonId === reason.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="bg-white/90 backdrop-blur-xs border border-[#ef4444]/30 rounded-b-xl p-2.5 text-xs leading-relaxed text-[#4a4a46] border-t-0 shadow-inner"
                                >
                                  <span className="font-bold underline text-[#ef4444] block mb-0.5">
                                    {reason.shortText}
                                  </span>
                                  <p className="font-handwritten text-base sm:text-lg text-[#1a1a18] leading-snug">
                                    {reason.fullMessage}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[9px] sm:text-[10px] text-[#8a8a82] mt-4 pt-3 border-t border-[#e0e0d6]/50 font-mono font-semibold uppercase tracking-wider">
                      <span>Hal. 3 dari 5</span>
                      <span>Berikutnya ➔</span>
                    </div>
                  </div>
                </div>
              )}

              {/* =======================================================
                  PAGE 4: INTERACTIVE CAKE WISH (currentPage === 3)
                  ======================================================= */}
              {currentPage === 3 && (
                <div className="w-full h-full flex flex-col sm:flex-row">
                  {/* Left Page: Memory Polaroid 3 */}
                  <div className="w-full sm:w-1/2 h-[35%] sm:h-full p-3 sm:p-6 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-[#e0e0d6] relative bg-[#fcfcf9] select-none">
                    <div className="absolute inset-y-0 right-0 w-8 left-page-spine-shadow pointer-events-none z-10 hidden sm:block" />

                    <motion.div
                      whileHover={{ scale: 1.02, rotate: -1 }}
                      className="bg-white p-2.5 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.1)] border border-[#e0e0d6] text-[#1a1a18] max-w-[180px] sm:max-w-[240px] relative"
                    >
                      <div className="absolute -top-3 left-1/3 -translate-x-1/2 w-14 sm:w-16 h-4 sm:h-5 bg-[#eaea9e]/40 border-t border-b border-yellow-300/20 rotate-[-2deg] z-15" />

                      <div className="w-full aspect-square overflow-hidden bg-[#f0f0e8] rounded-xs mb-2 sm:mb-3.5 relative border border-[#e0e0d6]">
                        <img
                          src={polaroidMemories[2].imageUrl}
                          alt={polaroidMemories[2].caption}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-center font-handwritten text-base sm:text-lg text-[#1a1a18] font-bold leading-none">
                        {polaroidMemories[2].caption}
                      </div>
                      <div className="text-center font-mono text-[8px] text-[#8a8a82] font-semibold mt-1">
                        {polaroidMemories[2].date}
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Page: Interactive Cake Wish */}
                  <div className="w-full sm:w-1/2 h-[65%] sm:h-full p-4 sm:p-8 flex flex-col justify-between bg-[#fdfdfa] relative overflow-y-auto">
                    <div className="absolute inset-y-0 left-0 w-8 right-page-spine-shadow pointer-events-none z-10 hidden sm:block" />

                    <div className="my-auto flex flex-col items-center text-center">
                      <div className="flex gap-1.5 items-center mb-1 text-[#eab308] font-bold">
                        <Star className="w-3.5 h-3.5 fill-current text-[#eab308] animate-spin" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8a8a82]">Halaman Harapan</span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1a1a18] tracking-tight">
                        Tiup Lilin & Harapan 🎂
                      </h2>
                      <p className="font-sans text-[11px] sm:text-xs text-[#4a4a46] max-w-xs mt-1 mb-4 leading-relaxed">
                        Di hari ulang tahunmu, persiapkan sebuah harapan terindah dari hatimu, lalu ketuk lilin itu untuk meniupnya!
                      </p>

                      {/* Aesthetic Digital Cake drawing with CSS and Framer Motion */}
                      <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex flex-col items-center justify-end select-none">
                        {/* THE CANDLE */}
                        <div className="absolute bottom-20 sm:bottom-24 w-3 h-10 sm:w-3.5 sm:h-12 bg-linear-to-b from-pink-400 to-indigo-500 rounded-sm shadow-sm flex flex-col items-center">
                          {/* Candle Stripes */}
                          <div className="w-full h-full border-b border-t border-white/30 border-dashed" />

                          {/* CANDLE FLAME (Flickering & glowing animation) */}
                          <AnimatePresence>
                            {candleLit ? (
                              <motion.div
                                key="flame"
                                initial={{ scale: 0.8 }}
                                animate={{
                                  scale: [1, 1.15, 0.95, 1.1, 1],
                                  y: [0, -1.5, 0.5, -2, 0],
                                  rotate: [0, -2, 3, -1, 2, 0],
                                  filter: ["drop-shadow(0 0 4px #fdba74)", "drop-shadow(0 0 10px #f59e0b)"]
                                }}
                                exit={{ opacity: 0, scale: 0, y: -20 }}
                                transition={{
                                  repeat: Infinity,
                                  duration: 0.8,
                                  ease: "easeInOut"
                                }}
                                onClick={blowCandle}
                                className="absolute -top-6 sm:-top-7 w-3.5 h-6 sm:w-4 sm:h-7 bg-gradient-to-t from-yellow-400 via-orange-500 to-red-600 rounded-full cursor-pointer animate-pulse"
                              >
                                {/* Inner bright blue core of flame */}
                                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-2.5 bg-blue-300 rounded-full" />
                              </motion.div>
                            ) : (
                              /* Smoke puffs when candle blown out */
                              <motion.div
                                key="smoke"
                                initial={{ opacity: 1, scale: 0.4, y: -5 }}
                                animate={{ opacity: 0, scale: 1.8, y: -45, x: [-5, 10, -5] }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute -top-8 w-6 h-6 bg-stone-400/50 rounded-full filter blur-xs pointer-events-none"
                              />
                            )}
                          </AnimatePresence>
                        </div>

                        {/* THE CAKE BODY */}
                        {/* Upper Frosting */}
                        <div className="w-28 h-7 sm:w-36 sm:h-8 bg-pink-100 border border-pink-200 rounded-t-xl z-10 flex justify-around items-center px-2 shadow-inner">
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-rose-500/80 rounded-full" />
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-amber-500/80 rounded-full" />
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-teal-500/80 rounded-full" />
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-pink-500/80 rounded-full" />
                          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-500/80 rounded-full" />
                        </div>

                        {/* Main Cake Layer */}
                        <div className="w-32 h-14 sm:w-40 sm:h-16 bg-[#e1c5ab] border border-[#d2b395] flex items-center justify-center relative shadow-md">
                          {/* Cream Line Crease */}
                          <div className="absolute inset-x-0 top-5 sm:top-6 h-2.5 sm:h-3 bg-white/70" />
                          {/* Cherries / Hearts around the cake */}
                          <span className="font-serif text-[10px] sm:text-[11px] font-bold text-[#83562a] z-10 uppercase tracking-widest">
                            Yummy Wishes
                          </span>
                        </div>

                        {/* Golden Plate Base */}
                        <div className="w-36 h-2 sm:w-44 sm:h-2.5 bg-yellow-400 border border-yellow-500/60 rounded-full shadow-md" />
                      </div>

                      {/* Click Guidance Prompt */}
                      {candleLit ? (
                        <p className="mt-3 text-[10px] text-pink-600 font-bold uppercase tracking-widest font-mono animate-pulse">
                          *Ketuk Api Lilin di Atas untuk Meniupnya!*
                        </p>
                      ) : (
                        <div className="mt-3 flex flex-col items-center">
                          <span className="text-xs font-bold text-teal-600 block">✨ Lilin Berhasil Ditiup! ✨</span>
                          <span className="text-[10px] text-stone-500 mt-0.5">Semoga semua harapan baikmu dikabulkan ya...</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-[9px] sm:text-[10px] text-[#8a8a82] mt-4 pt-3 border-t border-stone-200/20 font-mono font-semibold uppercase tracking-wider">
                      <span>Hal. 4 dari 5</span>
                      <span>Next Page ➔</span>
                    </div>
                  </div>
                </div>
              )}

              {/* =======================================================
                  PAGE 5: CLOSING & SHAKING PRESENT BOX (currentPage === 4)
                  ======================================================= */}
              {currentPage === 4 && (
                <div className="w-full h-full flex flex-col sm:flex-row bg-[#fcfcf9]">
                  {/* Left Page: Signature letter greeting card */}
                  <div className="w-full sm:w-1/2 h-1/2 sm:h-full p-5 sm:p-8 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-[#e0e0d6] relative bg-[#fdfdfa] overflow-y-auto">
                    <div className="absolute inset-y-0 right-0 w-8 left-page-spine-shadow pointer-events-none z-10 hidden sm:block" />

                    <div className="my-auto flex flex-col text-left">
                      <div className="flex items-center gap-1.5 text-[#ef4444] mb-2">
                        <Heart className="w-4 h-4 fill-[#ef4444]" />
                        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#8a8a82]">Sebuah janji Cinta</span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1a1a18] leading-tight tracking-tight">
                        Terima Kasih, Sania Sayang...
                      </h3>

                      <p className="font-sans text-[11px] sm:text-xs text-[#4a4a46] leading-relaxed mt-2 sm:mt-4 relative">
                        Terima kasih sudah selalu berjalan bersamaku di setiap lekuk dan jalan berbatu dunia ini. Terima kasih untuk kesabaranmu, tawamu yang selalu riang, dan pelukan hangatmu saat dunia terasa lelah.
                      </p>
                      <p className="font-sans text-[11px] sm:text-xs text-[#4a4a46] leading-relaxed mt-1 sm:mt-2.5">
                        Aku berjanji akan selalu berusaha menjadi versi terbaik diriku demi kebahagiaanmu. Selamat ulang tahun sayang. Aku cinta kamu, kemarin, saat ini, esok, dan selama-lamanya! 
                      </p>

                      <div className="mt-3 sm:mt-5 text-right">
                        <span className="text-[9px] sm:text-[10px] text-[#8a8a82] font-mono block uppercase tracking-wider">Dengan cinta terdalam,</span>
                        <span className="font-handwritten text-2xl sm:text-3xl font-extrabold text-[#ef4444] select-none block leading-none mt-1">
                          Novalmu ❤️
                        </span>
                      </div>
                    </div>

                    <div className="text-[9px] text-[#8a8a82] font-mono uppercase tracking-wider font-semibold mt-2 pt-2 border-t border-stone-200/20">
                      Hal. 5 dari 5 • Penutup
                    </div>
                  </div>

                  {/* Right Page: Glowing Vibrating PRESENT BOX to Trigger Bingo Game overlay */}
                  <div className="w-full sm:w-1/2 h-1/2 sm:h-full p-5 sm:p-8 flex flex-col justify-between bg-[#fcfcf9] relative overflow-y-auto">
                    <div className="absolute inset-y-0 left-0 w-8 right-page-spine-shadow pointer-events-none z-10 hidden sm:block" />

                    <div className="my-auto flex flex-col items-center text-center">
                      <div className="flex items-center gap-1.5 text-[#ef4444] mb-1 font-bold">
                        <Star className="w-4 h-4 fill-[#eab308] text-[#eab308] animate-pulse" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8a8a82]">Kado Utama</span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1a1a18] tracking-tight">
                        Hadiah Spesial 🎁
                      </h2>
                      <p className="font-sans text-[11px] sm:text-xs text-[#4a4a46] mt-1 mb-4 sm:mb-8 leading-relaxed max-w-[200px]">
                        Nah, ini kado utamanya! Ketuk kotak hadiah di bawah ini untuk mengklaim kado istimewanya!
                      </p>

                      {/* GORGEOUS VIBRATING GOWING GIFT BOX TO TRIGGER BINGO */}
                      <div className="relative flex items-center justify-center cursor-pointer" onClick={onOpenGift}>
                        {/* Glow surrounding */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ef4444] to-[#ec4899] rounded-full filter blur-xl opacity-30 animate-pulse" />

                        {/* Animated Vibrated Gift Container */}
                        <div
                          className="w-24 h-24 sm:w-28 sm:h-28 bg-[#fdfdfa] border-2 border-dashed border-[#ef4444] rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 animate-[gift-vibrate_1.3s_infinite]"
                          title="Klik Kado ini!"
                        >
                          <div className="relative flex items-center justify-center">
                            {/* Massive cute gold present box icon */}
                            <span className="text-4xl sm:text-5xl drop-shadow-md select-none transform hover:rotate-6">🎁</span>

                            {/* Floating decorative star overlays */}
                            <Sparkles className="absolute -top-3.5 -right-3.5 text-[#eab308] h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                            <Star className="absolute -bottom-2 -left-2 text-[#ef4444] h-3.5 w-3.5 sm:h-4 sm:w-4 fill-[#ef4444]" />
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 sm:mt-8 text-[10px] text-[#ef4444] font-bold uppercase tracking-[0.2em] font-mono animate-pulse">
                        *Ketuk kado di atas untuk pilih hadiah!*
                      </p>
                    </div>

                    <div className="hidden sm:flex justify-end text-[10px] text-[#8a8a82] font-mono uppercase font-semibold tracking-wider pt-2 border-t border-stone-200/20">
                      end
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Manual Reading Navigation Panel at the bottom */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          id="prev-page-btn"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#e0e0d6] text-[#4a4a46] bg-[#fcfcf9] hover:bg-[#f5f5f0] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider cursor-pointer transition-all shadow-xs"
        >
          <ChevronLeft className="w-4 h-4 text-[#ef4444]" />
          Sebelumnya
        </button>

        <span className="text-[10px] font-mono text-[#8a8a82] self-center font-bold uppercase tracking-widest">
          Hal {currentPage + 1} / 5
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === 4}
          id="next-page-btn"
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#e0e0d6] text-[#4a4a46] bg-[#fcfcf9] hover:bg-[#f5f5f0] disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider cursor-pointer transition-all shadow-xs"
        >
          Selanjutnya
          <ChevronRight className="w-4 h-4 text-[#ef4444]" />
        </button>
      </div>
    </div>
  );
}
