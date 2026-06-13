import React, { useState, useEffect, useRef } from "react";
import { Music, Play, Pause, Volume2, VolumeX, Disc } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function FloatingMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio lazily to bypass autoplay restrictions safely
  useEffect(() => {
    // Beautiful, calm indie-acoustic guitar and piano track
    audioRef.current = new Audio("https://www.image2url.com/r2/default/audio/1781284523065-0d06c6e7-6a15-44a9-ad12-042533b1f955.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay blocked or audio load error: ", err);
          // Fallback if blocked
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMute = !isMuted;
    setIsMuted(newMute);
    audioRef.current.volume = newMute ? 0 : volume;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-3 rounded-full shadow-lg border border-pink-100/50">
      {/* Spinning Vinyl Record Icon */}
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className={`w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-md relative ${
            isPlaying ? "ring-2 ring-pink-400 ring-offset-2" : ""
          }`}
        >
          {/* Internal grooves */}
          <div className="w-8 h-8 rounded-full border border-neutral-700/50 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border border-neutral-700/50 flex items-center justify-center">
              <span className="w-2.5 h-2.5 bg-pink-400 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Play/Pause overlay */}
        <button
          onClick={togglePlay}
          id="music-play-toggle-btn"
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full transition-all duration-200"
          title={isPlaying ? "Pause Musik" : "Putar Musik"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          )}
        </button>
      </div>

      {/* Track details & Controls */}
      <div className="flex flex-col text-left">
        <span className="text-[10px] uppercase font-bold tracking-widest text-pink-500 font-mono">
          Background Music
        </span>
        <span className="text-xs font-semibold text-neutral-700 max-w-[100px] truncate">
          Romantic Melodies 🌸
        </span>
      </div>

      {/* Volume & Mute Controls */}
      <div className="flex items-center gap-2 border-l border-neutral-200/50 pl-3">
        <button
          onClick={toggleMute}
          id="music-mute-toggle-btn"
          className="text-neutral-500 hover:text-pink-500 transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setVolume(v);
            if (isMuted && v > 0) {
              setIsMuted(false);
            }
          }}
          className="w-16 h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
      </div>

      {/* Floating Animated Musical Notes when playing */}
      {isPlaying && (
        <div className="absolute top-0 left-4 pointer-events-none w-0 h-0">
          <motion.span
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], y: -30, x: -10, scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            className="absolute text-xs text-pink-400"
          >
            ♫
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], y: -35, x: 15, scale: [0.6, 1.1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.7 }}
            className="absolute text-xs text-purple-400"
          >
            ♪
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], y: -25, x: 0, scale: [0.7, 1.0, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 1.3 }}
            className="absolute text-[10px] text-pink-500"
          >
            ♥
          </motion.span>
        </div>
      )}
    </div>
  );
}
