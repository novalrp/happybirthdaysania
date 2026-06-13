/**
 * Types definition for the Digital Birthday Book Applet
 */

export interface PolaroidMemory {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
  description: string;
}

export interface LoveReason {
  id: string;
  emoji: string;
  title: string;
  shortText: string;
  fullMessage: string;
}

export interface BingoBox {
  id: string;
  title: string; // e.g. "Kotak Biru 💙", "Kotak Pink 💖", "Kotak Emas 💛"
  prize: string; // e.g. "Romantic Dinner Date & Movie Ticket!"
  bgClass: string;
  icon: string;
}

export interface CouponData {
  chosenBoxId: string;
  prizeText: string;
  savedAt: string;
}



