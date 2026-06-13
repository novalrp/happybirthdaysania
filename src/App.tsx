import React, { useState } from "react";
import { GrandOpening } from "./components/GrandOpening";
import { Flipbook } from "./components/Flipbook";
import { BingoGame } from "./components/BingoGame";
import { FloatingMusic } from "./components/FloatingMusic";
import { Heart, Sparkles, Star, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [stage, setStage] = useState<"opening" | "book">("opening");
  const [isBingoOpen, setIsBingoOpen] = useState(false);

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-between text-[#2d2d2b] bg-[#f5f5f0] overflow-x-hidden pt-6 pb-12">
      {/* Dynamic Animated Sparkles Background - matching design SVG circles as stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 select-none z-0">
        {[...Array(15)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 105}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              backgroundColor: index % 4 === 0 ? "#ef4444" : index % 4 === 1 ? "#eab308" : index % 4 === 2 ? "#3b82f6" : "#ec4899",
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.15, 0.7, 0.15],
              scale: [0.8, 1.3, 0.8]
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Ambient background lights */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-[#eab308]/10 rounded-full filter blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#ef4444]/15 rounded-full filter blur-3xl pointer-events-none -z-10" />

      {/* Beautiful Header Navbar with Bold Typography elements and window dots */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl px-6 flex justify-between items-center z-20 select-none"
      >
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#ef4444] fill-[#ef4444] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a8a82]">
          
          </span>
        </div>

        {/* Floating Quick Navigation and design indicator dots */}
        <div className="flex items-center gap-4">
          {stage === "book" && (
            <button
              onClick={() => {
                if (confirm("Ingin mengulangi pembukaan surat cinta awal? Video dan confetti akan di-reboot!")) {
                  setStage("opening");
                }
              }}
              id="reset-story-flow-btn"
              className="flex items-center gap-1 bg-[#fcfcf9] hover:bg-[#f5f5f0] text-xs font-bold text-[#8a8a82] border border-[#e0e0d6] px-3 py-1.5 rounded-full shadow-xs cursor-pointer transition-all"
            >
              <RefreshCw className="w-3 h-3 text-[#ef4444]" />
              Reset Alur
            </button>
          )}

          {/* Bold Typography Theme Window dots */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444] opacity-50" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#eab308] opacity-50" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e] opacity-50" />
          </div>
        </div>
      </motion.header>

      {/* Primary Interactive Interface Board */}
      <main className="w-full max-w-5xl px-4 flex-1 flex flex-col items-center justify-center relative z-10 my-8">
        <AnimatePresence mode="wait">
          {stage === "opening" ? (
            /* STEP 1: The Grand Opening (Wax Seal Letter & Video Modal popup) */
            <motion.div
              key="opening-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex items-center justify-center"
            >
              <GrandOpening onComplete={() => setStage("book")} />
            </motion.div>
          ) : (
            /* STEP 2: Realistic custom 3D flipbook */
            <motion.div
              key="book-stage"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center justify-center"
            >
              {/* Header Title Board */}
              <div className="text-center mb-5 max-w-md px-4 select-none">
                <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#ef4444] font-mono flex justify-center items-center gap-1.5">
                  <Star className="w-3 h-3 fill-[#eab308] text-[#eab308]" />
                  HADIAH ULANG TAHUN SPESIAL
                  <Star className="w-3 h-3 fill-[#eab308] text-[#eab308]" />
                </span>
                <h1 className="font-serif text-3xl font-extrabold text-[#1a1a18] mt-1 leading-tight tracking-tight">
                  Ini buku Spesial Untukmu Sania 📖
                </h1>
                <p className="text-xs text-[#8a8a82] mt-1.5">
                  Dirawat Baik-Baik yaa Bukunya😁
                </p>
              </div>

              {/* Custom Flipbook component */}
              <Flipbook onOpenGift={() => setIsBingoOpen(true)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 3: Bingo Gift Overlay Game (Triggers when Present icon clicked on the last page) */}
        <AnimatePresence>
          {isBingoOpen && (
            <BingoGame onClose={() => setIsBingoOpen(false)} />
          )}
        </AnimatePresence>
      </main>

      {/* Sweet Persistent Footer Label */}
      <footer className="w-full max-w-5xl px-6 flex flex-col sm:flex-row justify-between items-center z-10 text-center gap-2 pt-2 mt-auto select-none border-t border-[#e0e0d6]/80">
        <div className="flex items-center gap-1 text-[10px] sm:text-xs font-mono font-bold text-[#8a8a82]">
          <span>FOR MY SOULMATE</span>
          <span>•</span>
          <span className="text-[#ef4444] uppercase tracking-wider">MADE WITH LOVE</span>
        </div>
        <p className="text-[10px] sm:text-xs font-serif italic text-[#8a8a82]">
          "Karena bersamamu, setiap hari adalah perayaan cinta terindah"
        </p>
      </footer>

      {/* Floating Retro Vinyl Record Music player */}
      <FloatingMusic />
    </div>
  );
}
