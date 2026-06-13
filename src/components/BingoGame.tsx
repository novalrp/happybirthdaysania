import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, Sparkles, X, Heart, RefreshCw, Trophy, Share2 } from "lucide-react";
import confetti from "canvas-confetti";
import { initialBingoBoxes } from "../data/mockData";
import { CouponData } from "../types";

interface BingoGameProps {
  onClose: () => void;
}

export function BingoGame({ onClose }: BingoGameProps) {
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  const [hasChosen, setHasChosen] = useState(false);
  const [boxes, setBoxes] = useState(initialBingoBoxes);

  // Bingo state is purely in-memory now so it resets automatically when the web page is opened or refreshed
  useEffect(() => {
    // Starts completely fresh on mount
    setSelectedBoxId(null);
    setHasChosen(false);
  }, []);

  const handleSelectBox = (boxId: string, prizeText: string) => {
    if (hasChosen) return; // Prevent clicking multiple boxes

    setSelectedBoxId(boxId);
    setHasChosen(true);

    // Fire high-density celebratory fireworks!
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti burst from both corners
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  // Helper to reset choices if the user wants to play again
  const handleReset = () => {
    if (window.confirm("Apakah kamu yakin ingin mereset pilihan kado ini? Kamu bisa memilih ulang hadiah!")) {
      setSelectedBoxId(null);
      setHasChosen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overflow-y-auto">
      {/* Outer Floating Cards Containment */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="relative bg-[#fcfcf9] w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-[#e0e0d6] flex flex-col items-center my-8 text-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-bingo-btn"
          className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#f5f5f0] hover:bg-[#e0e0d6] text-[#4a4a46] hover:text-[#1a1a18] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-1.5 mb-1.5 text-[#ef4444]">
          <Gift className="w-5 h-5 animate-bounce" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a8a82]">Special Sania's day</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1a1a18] tracking-tight">
         Kado Ulang Tahun Sania🎁
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#4a4a46] mt-2 mb-8 max-w-md leading-relaxed">
          {hasChosen
            ? "Wahh! Inilah hadiah kado ulang tahunmu yang telah kamu pilih! Tunjukkan voucher kupon digital ini kepada noval untuk menukarnya ya! ❤️"
            : "Pilih salah satu dari 3 kotak misteri di bawah untuk mengetahui hadiah ulang tahunmu hari ini! Ingat, kamu hanya bisa memilih SATU kotak saja ya!"}
        </p>

        {/* The 3 Gift Boxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-8 perspective-[1000px]">
          {boxes.map((box) => {
            const isSelected = selectedBoxId === box.id;
            const isRevealed = hasChosen;
            const isOther = hasChosen && !isSelected;

            return (
              <div
                key={box.id}
                className="relative h-64 w-full cursor-pointer group"
                onClick={() => !isRevealed && handleSelectBox(box.id, box.prize)}
              >
                {/* Visual card content with absolute fill & layout */}
                <motion.div
                  className="w-full h-full relative"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: isRevealed ? 180 : 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {/* FRONT FACE of the Gift Card */}
                  <div
                    className="absolute inset-0 bg-[#fdfdfa] border-2 border-dashed border-[#e0e0d6] rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {/* Ribbon Accent */}
                    <div className="absolute top-0 inset-x-0 h-4 bg-[#ef4444] rounded-t-xl" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-[#ef4444] -translate-x-1/2 z-0" />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-2xl z-10">🎀</div>

                    <div className="relative z-10 flex flex-col items-center mt-6">
                      {/* Vibrating Present Container */}
                      <motion.div
                        animate={!isRevealed ? {
                          y: [0, -6, 0],
                          rotate: [0, -3, 3, -3, 3, 0]
                        } : {}}
                        transition={!isRevealed ? {
                          repeat: Infinity,
                          duration: 2.2,
                          ease: "easeInOut"
                        } : {}}
                        className="w-16 h-16 bg-gradient-to-br from-[#ef4444] to-[#c22d2d] rounded-xl flex items-center justify-center shadow-inner relative"
                      >
                        <Gift className="w-8 h-8 text-white" />
                      </motion.div>

                      <span className="font-serif font-black text-[#1a1a18] text-sm mt-4">
                        {box.title}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#8a8a82] font-mono font-bold mt-1.5">
                        Ketuk untuk Buka
                      </span>
                    </div>
                  </div>

                  {/* BACK FACE of the Gift Card (REVEALED PRIZE) */}
                  <div
                    className={`absolute inset-0 rounded-2xl p-4 flex flex-col items-center justify-center border-2 border-[#e0e0d6] shadow-inner text-[#1a1a18] bg-linear-to-br ${box.bgClass} ${
                      isOther ? "opacity-60 saturate-50 border-neutral-300 bg-neutral-50" : "border-[#ef4444] ring-4 ring-[#ef4444]/15"
                    }`}
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    {/* Selected Banner */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-[#ef4444] text-[9px] text-white font-bold py-0.5 px-2 rounded-full flex items-center gap-0.5 shadow-sm uppercase tracking-wider font-mono">
                        <Trophy className="w-2.5 h-2.5" />
                        Pilihanmu
                      </div>
                    )}

                    {isOther && (
                      <div className="absolute top-2 right-2 bg-neutral-400 text-[9px] text-white font-semibold py-0.5 px-2 rounded-full font-mono uppercase tracking-wider">
                        Tertutup
                      </div>
                    )}

                    <div className="flex flex-col items-center text-center">
                      <span className="text-3xl mb-2">{isOther ? "🔒" : box.icon}</span>
                      <span className="font-serif text-[11px] font-bold text-[#8a8a82] uppercase tracking-wider">
                        {box.title}
                      </span>
                      <p className="font-sans text-xs font-bold leading-snug mt-3 text-[#1a1a18] max-h-32 overflow-y-auto px-1">
                        {box.prize}
                      </p>

                      {isSelected && (
                        <div className="mt-4 flex items-center gap-1 text-[9px] text-[#ef4444] font-bold uppercase tracking-[0.25em] font-mono">
                          <Sparkles className="w-3 h-3 text-[#ef4444] animate-spin" />
                          Kupon Aktif
                          <Sparkles className="w-3 h-3 text-[#ef4444] animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Voucher Bottom Card (displays when selected) */}
        <AnimatePresence>
          {hasChosen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full bg-[#fdfdfa] border-2 border-double border-[#e0e0d6] rounded-2xl p-5 mb-6 text-left relative overflow-hidden"
            >
              {/* Gold Security Border Overlay */}
              <div className="absolute inset-0 border border-[#e0e0d6]/70 rounded-2xl pointer-events-none m-1" />

              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h4 className="font-serif text-[#ef4444] font-extrabold text-xs uppercase tracking-widest flex items-center gap-1">
                    <span>👑 VOUCHER HADIAH AKTIF</span>
                  </h4>
                  <p className="font-sans text-xs text-[#4a4a46] mt-1 pr-6 font-semibold leading-relaxed">
                    Hadiah yang terpilih:{" "}
                    <span className="text-[#ef4444] font-bold">
                      {boxes.find((b) => b.id === selectedBoxId)?.prize}
                    </span>
                  </p>
                  <div className="flex gap-4 mt-3 text-[9px] font-mono text-[#8a8a82] font-semibold uppercase tracking-wider">
                    <span>SEALED: HBD-2026-OK</span>
                    <span>DATE: 13.06.2026</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0 z-20">
                  <button
                    onClick={handleReset}
                    id="reset-bingo-btn"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 border border-[#e0e0d6] hover:bg-[#f5f5f0] text-[#4a4a46] px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                    title="Ulangi Pilihan"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#ef4444]" />
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      const prize = boxes.find((b) => b.id === selectedBoxId)?.prize;
                      navigator.clipboard.writeText(`Hai sayang! Aku dapet hadiah ulang tahun: "${prize}" dari Buku Digitalmu! 💖🎁`);
                      alert("Voucher disalin ke Clipboard! Sekarang kamu bisa kirim teks ini lewat WhatsApp novalmu ✨");
                    }}
                    id="share-voucher-btn"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-[#ef4444] hover:bg-[#d93838] text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Kirim WA
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to romantic book button */}
        <button
          onClick={onClose}
          id="back-to-book-from-bingo-btn"
          className="bg-[#1a1a18] hover:bg-[#2d2d2b] text-white font-bold py-3.5 px-8 rounded-full shadow-md text-xs uppercase tracking-widest cursor-pointer transition-all"
        >
          Kembali ke Lembar Buku 📖
        </button>
      </motion.div>
    </div>
  );
}
