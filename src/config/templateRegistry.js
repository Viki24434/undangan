import { lazy } from 'react';

export const templateRegistry = [
  {
    id: 'elegant-gold-01',
    name: 'Elegant Gold Wedding',
    palette: ['#151b18', '#d2b77b', '#202820'],
    category: 'Pernikahan',
    packageId: 'gold',
    description: 'Emas hangat, bingkai klasik, dan cerita yang elegan.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
    component: lazy(() => import('../templates/ElegantWedding/ElegantWedding')),
  },
  {
    id: 'botanical-sage-01',
    name: 'Botanical Sage Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description: 'Hijau sage dan nuansa natural untuk hari bahagia.',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    palette: ['#17251d', '#c6b875', '#24362a'],
    component: lazy(() => import('../templates/Wedding/Wedding')),
  },
  {
    id: 'pastel-birthday-01',
    name: 'Pastel Birthday Party',
    category: 'Ulang tahun',
    packageId: 'silver',
    description: 'Pastel ceria dan detail manis untuk pesta istimewa.',
    img: 'https://images.unsplash.com/photo-1530103862676-de8892b12fa6?w=1200&q=85',
    palette: ['#f4dfe7', '#a64d70', '#eacbd8'],
    component: lazy(() => import('../templates/Birthday/Birthday')),
  },
  {
    id: 'rose-romance-01',
    name: 'Rose Romance Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description: 'Blush romantis, bingkai floral, dan detail rose gold.',
    img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=85',
    palette: ['#2b1721', '#e5a6b6', '#422332'],
    component: lazy(() => import('../templates/RoseRomance/RoseRomance')),
  },
  {
    id: 'midnight-celestial-01',
    name: 'Midnight Celestial Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description: 'Biru malam, aksen bintang, dan kilau champagne.',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=85',
    palette: ['#131d35', '#dfc48c', '#202c48'],
    component: lazy(
      () => import('../templates/MidnightCelestial/MidnightCelestial'),
    ),
  },
  {
    id: 'terracotta-bloom-01',
    name: 'Terracotta Bloom Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description: 'Warna tanah hangat dan bentuk organik bernuansa bohemian.',
    img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=85',
    palette: ['#2d1a15', '#e1a477', '#46291f'],
    component: lazy(
      () => import('../templates/TerracottaBloom/TerracottaBloom'),
    ),
  },
  {
    id: 'ivory-pearl-01',
    name: 'Ivory Pearl Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description: 'Putih ivory, garis halus, dan komposisi editorial minimalis.',
    img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85',
    palette: ['#e9e2d3', '#806b46', '#dcd3c1'],
    component: lazy(() => import('../templates/IvoryPearl/IvoryPearl')),
  },
  {
    id: 'little-moon-aqiqah-01',
    name: 'Little Moon Aqiqah',
    category: 'Aqiqah & khitan',
    packageId: 'silver',
    description: 'Biru lembut, bulan sabit, dan syukur atas hadirnya si kecil.',
    img: 'https://images.unsplash.com/photo-1544425501-799b66236316?w=1200&q=85',
    palette: ['#dbe8f3', '#547da4', '#c7d9eb'],
    component: lazy(() => import('../templates/LittleMoon/LittleMoon')),
  },
  {
    id: 'emerald-khitan-01',
    name: 'Emerald Khitan Celebration',
    category: 'Aqiqah & khitan',
    packageId: 'silver',
    description: 'Hijau emerald dan pola geometris untuk syukuran khitan.',
    img: 'https://images.unsplash.com/photo-1544425501-799b66236316?w=1200&q=85',
    palette: ['#123c32', '#d3bd77', '#1d4d40'],
    component: lazy(() => import('../templates/EmeraldKhitan/EmeraldKhitan')),
  },
  {
    id: 'cosmic-birthday-01',
    name: 'Cosmic Birthday Adventure',
    category: 'Ulang tahun',
    packageId: 'silver',
    description:
      'Ungu galaksi, bintang berkilau, dan pesta petualangan luar angkasa.',
    img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=85',
    palette: ['#201a3b', '#c0a1f3', '#30264f'],
    component: lazy(() => import('../templates/CosmicBirthday/CosmicBirthday')),
  },
  {
    id: 'lavender-vow-01',
    name: 'Lavender Vow Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description: 'Lavender lembut, rangkaian bunga, dan nuansa romantis.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
    palette: ['#211b2d', '#c5aadf', '#332942'],
    component: lazy(() => import('../templates/LavenderVow/LavenderVow')),
  },
  {
    id: 'coastal-promise-01',
    name: 'Coastal Promise Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description: 'Warna laut yang tenang dan aksen pesisir yang segar.',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    palette: ['#142b32', '#9bcac5', '#1d4148'],
    component: lazy(() => import('../templates/CoastalPromise/CoastalPromise')),
  },
  {
    id: 'garden-party-birthday-01',
    name: 'Garden Party Birthday',
    category: 'Ulang tahun',
    packageId: 'silver',
    description: 'Pesta taman penuh bunga, warna hangat, dan keceriaan.',
    img: 'https://images.unsplash.com/photo-1530103862676-de8892b12fa6?w=1200&q=85',
    palette: ['#e9ead8', '#9d6248', '#d9dfc2'],
    component: lazy(() => import('../templates/GardenParty/GardenParty')),
  },
  {
    id: 'sunflower-vow-01',
    name: 'Sunflower Vow Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description:
      'Bunga matahari, dedaunan alami, dan nuansa hangat untuk hari istimewa.',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    palette: ['#302716', '#e0b94f', '#493a1c'],
    component: lazy(() => import('../templates/SunflowerVow/SunflowerVow')),
  },
  {
    id: 'burgundy-vow-01',
    name: 'Burgundy Vow Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description:
      'Merah hati, aksen champagne, dan suasana romantis yang berkelas.',
    img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=85',
    palette: ['#32131f', '#d9ad78', '#4b1c2d'],
    component: lazy(() => import('../templates/BurgundyVow/BurgundyVow')),
  },
  {
    id: 'pink-blush-01',
    name: 'Pink Blush Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description:
      'Nuansa pink lembut, aksen mawar, dan detail manis yang elegan.',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    palette: ['#3b192c', '#e6a3bd', '#57263f'],
    component: lazy(() => import('../templates/PinkBlush/PinkBlush')),
  },
  {
    id: 'sunda-siger-01',
    name: 'Sunda Siger Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description:
      'Ornamen siger, kujang, dan janur dalam nuansa hijau hutan dan emas.',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    palette: ['#17251d', '#d8b66d', '#24382d'],
    component: lazy(() => import('../templates/SundaSiger/SundaSiger')),
  },
  {
    id: 'jawa-paes-01',
    name: 'Jawa Paes Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description:
      'Batik, kembar mayang, blangkon, dan paes dalam nuansa cokelat dan emas.',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    palette: ['#211912', '#d6b16e', '#493521'],
    component: lazy(() => import('../templates/JawaPaes/JawaPaes')),
  },
  {
    id: 'black-gold-01',
    name: 'Black Gold Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description:
      'Hitam pekat, detail emas, dan bingkai klasik untuk perayaan yang megah.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
    palette: ['#111111', '#d8b76a', '#24211b'],
    component: lazy(() => import('../templates/BlackGold/BlackGold')),
  },
  {
    id: 'white-gold-01',
    name: 'White Gold Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description:
      'Putih mutiara, aksen emas lembut, dan komposisi lapang yang anggun.',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    palette: ['#fffdf7', '#a5813f', '#f1e8d4'],
    component: lazy(() => import('../templates/WhiteGold/WhiteGold')),
  },
  {
    ...{
      id: 'minangkabau-01',
      name: 'Minangkabau Wedding',
      category: 'Pernikahan',
      packageId: 'gold',
      description:
        'Merah marun dan emas dengan ornamen rumah gadang, songket, deta, dan mahkota.',
      img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    },
    palette: ['#35120e', '#dfb764', '#581c17'],
    component: lazy(() => import('../templates/Minangkabau/Minangkabau')),
  },
  {
    ...{
      id: 'betawi-01',
      name: 'Betawi Wedding',
      category: 'Pernikahan',
      packageId: 'gold',
      description:
        'Hijau tua, merah, dan emas dengan safa, mahkota, kain Betawi, serta pelaminan.',
      img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    },
    palette: ['#102b23', '#e0bb6a', '#8b302d'],
    component: lazy(() => import('../templates/Betawi/Betawi')),
  },
  {
    ...{
      id: 'bali-01',
      name: 'Bali Wedding',
      category: 'Pernikahan',
      packageId: 'gold',
      description:
        'Putih gading dan emas antik dengan destar, mahkota, bokor, serta ukiran Bali.',
      img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
    },
    palette: ['#faf3e7', '#a37835', '#d9b998'],
    component: lazy(() => import('../templates/Bali/Bali')),
  },
  {
    ...{
      id: 'palembang-01',
      name: 'Palembang Wedding',
      category: 'Pernikahan',
      packageId: 'gold',
      description:
        'Merah delima dan emas dengan mahkota, kain Palembang, pending, serta tepak.',
      img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    },
    palette: ['#391016', '#e5bd70', '#601c26'],
    component: lazy(() => import('../templates/Palembang/Palembang')),
  },
  {
    ...{
      id: 'makasar-01',
      name: 'Makasar Wedding',
      category: 'Pernikahan',
      packageId: 'gold',
      description:
        'Hijau zamrud dan emas dengan passapu, pinang goyang, genno susun, serta kain Makasar.',
      img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    },
    palette: ['#0b302b', '#dfbc6d', '#19483c'],
    component: lazy(() => import('../templates/Makasar/Makasar')),
  },
  {
    ...{
      id: 'batak-01',
      name: 'Batak Wedding',
      category: 'Pernikahan',
      packageId: 'gold',
      description:
        'Hitam arang, merah, dan tembaga dengan kain Batak, sortali, pinar, serta ornamen ukiran.',
      img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    },
    palette: ['#191717', '#ceaa75', '#872f2b'],
    component: lazy(() => import('../templates/Batak/Batak')),
  },
  {
    ...{
      id: 'aceh-01',
      name: 'Aceh Wedding',
      category: 'Pernikahan',
      packageId: 'gold',
      description:
        'Hitam hangat, merah, dan emas dengan kupiah, mahkota, rencong, serta ornamen kain Aceh.',
      img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    },
    palette: ['#21140f', '#e3b653', '#7e251e'],
    component: lazy(() => import('../templates/Aceh/Aceh')),
  },
  {
    ...{
      id: 'papua-01',
      name: 'Papua Wedding',
      category: 'Pernikahan',
      packageId: 'gold',
      description:
        'Warna pasir dan kayu dengan lukisan kulit kayu Asei, noken, tifa, serta manik-manik.',
      img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    },
    palette: ['#f0e2cf', '#83502f', '#dfc6a6'],
    component: lazy(() => import('../templates/Papua/Papua')),
  },
  {
    ...{
      id: 'cream-pink-birthday-01',
      name: 'Happy Birthday Cream Pink',
      category: 'Ulang tahun',
      packageId: 'silver',
      description:
        'Krem hangat dan pink pastel dengan balon, kue, pita, serta kejutan kecil yang ceria.',
      img: 'https://images.unsplash.com/photo-1530103862676-de8892b12fa6?w=1200&q=85',
    },
    palette: ['#fff7e9', '#c46e8e', '#f5d9e2'],
    component: lazy(
      () => import('../templates/CreamPinkBirthday/CreamPinkBirthday'),
    ),
  },
  {
    ...{
      id: 'black-gold-luxury-birthday-01',
      name: 'Black Gold Luxury Birthday',
      category: 'Ulang tahun',
      packageId: 'silver',
      description:
        'Hitam elegan dan emas champagne dengan balon, kue, bintang, serta kado untuk pesta berkelas.',
      img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=85',
    },
    palette: ['#101010', '#d6b66e', '#282219'],
    component: lazy(
      () =>
        import('../templates/BlackGoldLuxuryBirthday/BlackGoldLuxuryBirthday'),
    ),
  },
  {
    ...{
      id: 'cute-boy-birthday-01',
      name: 'Cute Boy Birthday',
      category: 'Ulang tahun',
      packageId: 'silver',
      description:
        'Biru ceria, mint, dan bintang kuning dengan balon, kue, serta kado untuk si kecil.',
      img: 'https://images.unsplash.com/photo-1530103862676-de8892b12fa6?w=1200&q=85',
    },
    palette: ['#edf8ff', '#3282b5', '#d4eee5'],
    component: lazy(
      () => import('../templates/CuteBoyBirthday/CuteBoyBirthday'),
    ),
  },
  {
    ...{
      id: 'cute-girl-birthday-01',
      name: 'Cute Girl Birthday',
      category: 'Ulang tahun',
      packageId: 'silver',
      description:
        'Pink lembut, lavender, dan pita manis dengan balon serta kue untuk pesta kecil yang ceria.',
      img: 'https://images.unsplash.com/photo-1530103862676-de8892b12fa6?w=1200&q=85',
    },
    palette: ['#fff1f6', '#b86695', '#eadcf5'],
    component: lazy(
      () => import('../templates/CuteGirlBirthday/CuteGirlBirthday'),
    ),
  },
  {
    ...{
      id: 'rose-gold-elegant-birthday-01',
      name: 'Rose Gold Elegant Birthday',
      category: 'Ulang tahun',
      packageId: 'silver',
      description:
        'Blush, champagne, dan emas mawar dengan balon, pita, serta detail pesta yang anggun.',
      img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=85',
    },
    palette: ['#fcf3ec', '#a86c59', '#ecd7cb'],
    component: lazy(
      () =>
        import('../templates/RoseGoldElegantBirthday/RoseGoldElegantBirthday'),
    ),
  },
  {
    ...{
      id: 'royal-gold-luxury-01',
      name: 'Royal Gold Luxury Wedding',
      category: 'Pernikahan',
      packageId: 'gold',
      description:
        'Ivory dan emas hangat dengan mahkota, mutiara, ukiran klasik, dan lilin untuk pernikahan yang megah.',
      img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
    },
    palette: ['#f7efdc', '#98702e', '#e8d5ad'],
    component: lazy(
      () => import('../templates/RoyalGoldLuxury/RoyalGoldLuxury'),
    ),
  },
  {
    id: 'rustic-boho-wedding-01',
    name: 'Rustic Boho Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description:
      'Krem hangat, sage, dan kayu dengan dedaunan kering, lentera, serta rangkaian bunga rustic.',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    palette: ['#f4ecdf', '#98714f', '#6e7960'],
    component: lazy(
      () => import('../templates/RusticBohoWedding/RusticBohoWedding'),
    ),
  },
  {
    id: 'islamic-elegant-wedding-01',
    name: 'Islamic Elegant Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description:
      'Hijau zamrud, ivory, dan emas dengan lengkung geometris, lampion, bunga, serta detail cincin.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
    palette: ['#12362d', '#d9ba78', '#f4eddf'],
    component: lazy(
      () => import('../templates/IslamicElegantWedding/IslamicElegantWedding'),
    ),
  },
  {
    id: 'celestial-moon-and-star-01',
    name: 'Celestial Moon & Star Wedding',
    category: 'Pernikahan',
    packageId: 'gold',
    description:
      'Biru malam dan emas dengan bulan sabit, bintang, kristal, serta bunga untuk pernikahan yang romantis.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
    palette: ['#101b33', '#d4b574', '#1b2b49'],
    component: lazy(
      () => import('../templates/CelestialMoonStar/CelestialMoonStar'),
    ),
  },
  {
    id: 'platinum-aurora-01',
    name: 'Aurora Nocturne Wedding',
    category: 'Pernikahan',
    packageId: 'platinum',
    description:
      'Biru malam, cahaya aurora, dan detail bulan dengan cover segel surat, countdown cincin, serta galeri layar penuh.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
    palette: ['#101b2b', '#c9bc98', '#1c2b3e'],
    component: lazy(() => import('../templates/PlatinumAurora/PlatinumAurora')),
  },
  {
    id: 'platinum-champagne-01',
    name: 'Champagne Atelier Wedding',
    category: 'Pernikahan',
    packageId: 'platinum',
    description:
      'Ivory dan champagne dengan bingkai editorial, bunga royal, cover segel surat, countdown cincin, serta galeri layar penuh.',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    palette: ['#f7f1e7', '#926f40', '#eae0cf'],
    component: lazy(
      () => import('../templates/PlatinumChampagne/PlatinumChampagne'),
    ),
  },
  {
    id: 'platinum-sunda-01',
    name: 'Sunda Pusaka Platinum',
    category: 'Pernikahan',
    packageId: 'platinum',
    description:
      'Adat Sunda dengan tugu, lanskap berlapis, amplop batik, animasi dedaunan, dan galeri foto Platinum.',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    palette: ['#17251d', '#d8b66d', '#24382d'],
    component: lazy(() => import('../templates/PlatinumSunda/PlatinumSunda')),
  },
  {
    id: 'platinum-jawa-01',
    name: 'Jawa Pranaya Platinum',
    category: 'Pernikahan',
    packageId: 'platinum',
    description:
      'Adat Jawa dengan pendopo, ukiran batik, kembar mayang, cover surat, lanskap bergerak, dan galeri foto Platinum.',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    palette: ['#211912', '#d6b16e', '#33261b'],
    component: lazy(() => import('../templates/PlatinumJawa/PlatinumJawa')),
  },
  {
    id: 'platinum-minangkabau-01',
    name: 'Minangkabau Pusako Platinum',
    category: 'Pernikahan',
    packageId: 'platinum',
    description:
      'Merah dan emas Minangkabau dengan rumah adat, lanskap berlapis, amplop songket, animasi dedaunan, dan galeri foto Platinum.',
    img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=85',
    palette: ['#35120e', '#dfb764', '#581c17'],
    component: lazy(
      () => import('../templates/PlatinumMinangkabau/PlatinumMinangkabau'),
    ),
  },
];

export const templateCategories = [
  'Semua',
  ...new Set(templateRegistry.map((template) => template.category)),
];
