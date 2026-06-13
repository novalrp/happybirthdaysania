import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Play, ArrowRight, Star } from "lucide-react";
import confetti from "canvas-confetti";
import videoBirthday from "./birthday.mp4";

interface GrandOpeningProps {
  onComplete: () => void;
}

export function GrandOpening({ onComplete }: GrandOpeningProps) {
  const [step, setStep] = useState<"envelope" | "video">("envelope");
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Trigger default confetti on mount
  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ef4444", "#eab308", "#3b82f6", "#ec4899"]
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ef4444", "#eab308", "#3b82f6", "#ec4899"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const openLetter = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#ef4444", "#eab308", "#3b82f6", "#ec4899", "#a855f7"]
    });
    setStep("video");
  };

  const handleEnterBook = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    onComplete();
  };

  // Fungsi untuk play/pause video secara manual saat diklik
  const togglePlayVideo = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Playback diblokir browser:", err));
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden bg-[#f5f5f0]">
      {/* Decorative Floating Glitter/Hearts in the Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              backgroundColor: i % 4 === 0 ? "#ef4444" : i % 4 === 1 ? "#eab308" : i % 4 === 2 ? "#3b82f6" : "#ec4899"
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.7, 0.15]
            }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === "envelope" ? (
          /* STEP 1: Envelope */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col items-center max-w-md w-full text-center"
          >
            <div className="absolute -top-12 z-10 bg-amber-50/90 backdrop-blur border border-amber-300 shadow-md text-[9px] font-bold text-amber-800 uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full font-mono flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-spin" />
              Ada Kejutan Menantimu
            </div>

            <div className="relative w-full bg-[#fcfcf9] border-4 border-double border-[#e0e0d6] p-8 rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] flex flex-col items-center">
              <div className="absolute top-2 left-2 text-lg text-[#e0e0d6]">✥</div>
              <div className="absolute top-2 right-2 text-lg text-[#e0e0d6]">✥</div>
              <div className="absolute bottom-2 left-2 text-lg text-[#e0e0d6]">✥</div>
              <div className="absolute bottom-2 right-2 text-lg text-[#e0e0d6]">✥</div>

              <Heart className="w-16 h-16 text-[#ef4444] fill-[#ef4444]/10 mb-4 animate-bounce" />

              <h1 className="font-serif italic text-3xl font-black text-[#1a1a18] leading-tight tracking-tight mb-2">
                Halo Sayangku ✨
              </h1>
              <p className="font-sans text-sm text-[#4a4a46] max-w-xs mb-8">
                Hari ini adalah hari yang paling spesial untukku dan untukmu. Aku punya kado kecil yang kubuat khusus hanya untuk pacarku yang cantik sekali.
              </p>

              <button onClick={openLetter} className="relative group focus:outline-none">
                <div className="relative w-24 h-24 bg-[#ef4444] rounded-full flex items-center justify-center shadow-lg cursor-pointer transform group-hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-[#ef4444]/20">
                  <div className="absolute inset-2 border-2 border-[#d93838]/50 rounded-full border-dashed" />
                  <div className="z-10 flex flex-col items-center">
                    <span className="text-[10px] text-white/90 font-bold uppercase tracking-wider">BUKA</span>
                    <Heart className="w-7 h-7 text-white fill-white mt-0.5" />
                    <span className="text-[8px] text-white/70 font-mono">100% LOVE</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[#ef4444]/20 rounded-full filter blur-xl animate-pulse -z-10" />
              </button>

              <p className="mt-6 text-xs text-[#8a8a82] font-medium italic animate-pulse">
                *Klik stempel lilin merah di atas untuk membukanya*
              </p>
            </div>
          </motion.div>
        ) : (
          /* STEP 2: Video Modal Popup (Sudah Diperbaiki) */
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="relative flex flex-col items-center max-w-2xl w-full bg-[#fcfcf9] border border-[#e0e0d6] rounded-3xl p-6 sm:p-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            <div className="absolute inset-0 paper-pattern opacity-60 pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col items-center text-center">
              <div className="flex gap-1.5 justify-center mb-2">
                <Sparkles className="w-5 h-5 text-[#eab308] fill-[#eab308]/10 animate-spin" />
                <span className="font-serif italic font-black text-[#ef4444] text-lg">Happy Birthday, My Love!</span>
                <Sparkles className="w-5 h-5 text-[#eab308] fill-[#eab308]/10 animate-spin" />
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1a1a18] mt-1 mb-4 leading-tight tracking-tight">
                Selamat Ulang Tahun 🎉🎉🎉
              </h2>

              {/* Bingkai Video Kamera - Klik di area ini akan memicu play/pause */}
              <div 
                onClick={togglePlayVideo}
                className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-neutral-900 group mb-6 cursor-pointer"
              >
              <video
                ref={videoRef}
                src={videoBirthday}
                className="w-full h-full object-cover"
                controls // 💡 TAMBAHKAN INI SEMENTARA UNTUK TES
                autoPlay
                loop
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

                {/* Tombol Play Merah otomatis hilang jika video berputar */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#ef4444]/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[#fdfdfa] border border-[#e0e0d6] rounded-xl p-4 max-w-xl text-left w-full mb-6 relative">
                <p className="font-serif text-sm text-[#4a4a46] leading-relaxed font-semibold">
                  &ldquo;Semoga Senang Yaa Melihatnya..&rdquo;
                </p>
                <div className="absolute right-3 bottom-2 font-handwritten text-2xl text-[#ef4444] font-bold">
                  - Noval 😎
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleEnterBook}
                className="flex items-center gap-2.5 bg-[#ef4444] hover:bg-[#d93838] text-white font-bold py-3.5 px-8 rounded-full shadow-md uppercase tracking-wider text-xs cursor-pointer transition-all focus:outline-none"
              >
                <span>Buka Buku Digital Kita 📖</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}