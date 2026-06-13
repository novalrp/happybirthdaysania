import { PolaroidMemory, LoveReason, BingoBox } from "../types";

export const polaroidMemories: PolaroidMemory[] = [
  {
    id: "mem-1",
    imageUrl: "https://drive.google.com/thumbnail?id=1MyihUYnbwQLMr-G2cFnP1D5wfolzZi08&sz=w1000",
    caption: "First Impression",
    date: "8 April 2023 · Senyuman Pertama",
    description: "Senja hari itu. Aku ingat betul bagaimana jantungku berdegup kencang saat melihat senyuman pertamamu. Di situlah petualangan indah kita resmi dimulai."
  },
  {
    id: "mem-2",
    imageUrl: "https://drive.google.com/thumbnail?id=1H6pyacuCLY1aF8b8xWpoy5Og_zyJgcw4",
    caption: "Hari Bersamamu☕",
    date: "17 Mei 2024 · Moment Indah Bersamamu",
    description: "Setiap es krim yang kita bagi bersama dan setiap lelucon konyol yang selalu berhasil membuatku tertawa lepas. Bersamamu, hal-hal paling sederhana sekalipun selalu berubah menjadi kenangan terindah."
  },
  {
    id: "mem-3",
    imageUrl: "https://drive.google.com/thumbnail?id=1fXp1ITLzTspI-JusobHgBzFajrdx1cq0",
    caption: "Petualangan Indah Berdua 🌅",
    date: "3 Juni 2024 · Menatap Masa Depan",
    description: "Berdiri bergandengan tangan, menyaksikan matahari tenggelam perlahan. Di momen itu, aku bersyukur luar biasa kepada semesta karena telah mengirimkan malaikat secantik dan sebaik dirimu ke dalam hidupku."
  }
];

export const loveReasons: LoveReason[] = [
  {
    id: "reason-1",
    emoji: "🌸",
    title: "Senyuman Hangatmu",
    shortText: "Tempat jiwaku beristirahat...",
    fullMessage: "Senyumanmu adalah obat paling ampuh untuk meredakan badai di pikiranku. Saat kamu tersenyum dengan tulus, seluruh dunia terasa berjalan lebih lambat dan jauh lebih damai."
  },
  {
    id: "reason-2",
    emoji: "☕",
    title: "Perhatian Kecilmu",
    shortText: "Hal kecil yang berarti besar...",
    fullMessage: "Aku suka bagaimana kamu selalu ingat kebiasaan kecilku, mengusap kepalaku dengan lembut saat aku cemas, atau memelukku erat tanpa perlu aku minta. Perhatianmu membuatku merasa begitu sangat dicintai."
  },
  {
    id: "reason-3",
    emoji: "⚡",
    title: "Tingkah Gemas & Apa Adanya",
    shortText: "Ekspresif yang bikin kangen...",
    fullMessage: "Aku suka bagaimana kamu selalu jujur dan ekspresif dengan perasaanmu. Bahkan saat kamu lagi gak sabaran, panik, atau cemberut, itu justru kelihatan lucu dan menggemaskan di mataku. Sifat apa adanya-mu itulah yang bikin hari-hariku selalu seru dan gak pernah datar."
  },
  {
    id: "reason-4",
    emoji: "💖",
    title: "Kehadiranmu Saja",
    shortText: "Cukup bersamamu saja...",
    fullMessage: "Hanya dengan duduk di sampingmu tanpa bersuara sekalipun sudah membuatku merasa lengkap. Hadirmu di bumi ini adalah kado terindah yang pernah Tuhan berikan untukku."
  }
];

export const initialBingoBoxes: BingoBox[] = [
  {
    id: "box-1",
    title: "Kotak Coklat Manis 🍫",
    prize: "Jalan-jalan ke Kuningan 🚗⛰️",
    bgClass: "from-amber-100 to-amber-200 border-amber-400 text-amber-900 shadow-amber-100",
    icon: "🍫"
  },
  {
    id: "box-2",
    title: "Kotak Boba Kesukaan 🧋",
    prize: "Keliling kota Cirebon 🛵✨",
    bgClass: "from-orange-100 to-orange-200 border-orange-400 text-orange-800 shadow-orange-100",
    icon: "🥂"
  },
  {
    id: "box-3",
    title: "Kotak Donat Gemas 🍩",
    prize: "Belanja sesukamu 🛍️🛒",
    bgClass: "from-pink-100 to-pink-200 border-pink-400 text-pink-800 shadow-pink-100",
    icon: "🍩"
  }
];