const corner = (asset, location, width) => {
  const corners = {
    topLeft: { position: { top: '-3%', left: '-5%' }, rotate: 0 },
    topRight: { position: { top: '-3%', right: '-5%' }, rotate: 90 },
    bottomLeft: { position: { bottom: '-4%', left: '-5%' }, rotate: 270 },
    bottomRight: { position: { right: '-5%', bottom: '-4%' }, rotate: 180 },
  };
  const { position, rotate } = corners[location];

  return { asset, position, width, rotate };
};

const cornerPair = (asset, width = '38%') => [
  corner(asset, 'topLeft', width),
  corner(asset, 'bottomRight', width),
];

const portraitFlowers = (
  groomFlower = 'blush-flower-single',
  brideFlower = 'blush-peony-single',
) => ({
  groom: [
    {
      asset: groomFlower,
      position: { bottom: '-9%', left: '-17%' },
      width: '34%',
      rotate: -24,
    },
  ],
  bride: [
    {
      asset: brideFlower,
      position: { bottom: '-9%', right: '-17%' },
      width: '34%',
      rotate: 24,
    },
  ],
});

export const ornamentPresets = {
  'invitation-celestial-moon-star': {
    backgroundArt: 'celestial-moon',
    cover: [
      corner('celestial-corner', 'topLeft', '33%'),
      corner('celestial-corner', 'bottomRight', '30%'),
    ],
    hero: [
      {
        asset: 'celestial-side-garland',
        position: { top: '18%', left: '-9%' },
        width: '24%',
        opacity: 0.75,
      },
      {
        asset: 'celestial-constellation',
        position: { top: '16%', right: '-6%' },
        width: '24%',
        opacity: 0.8,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'celestial-accent',
          position: { left: '-12%' },
          width: '32%',
          rotate: -8,
        },
      ],
      bride: [
        {
          asset: 'celestial-crown',
          position: { right: '-12%' },
          width: '32%',
          rotate: 8,
        },
      ],
    },
    closing: [
      {
        asset: 'celestial-flower',
        position: { right: '-8%', bottom: '-5%' },
        width: '38%',
        opacity: 0.8,
      },
      {
        asset: 'celestial-candles',
        position: { left: '-7%', bottom: '2%' },
        width: '25%',
        opacity: 0.65,
      },
    ],
  },
  'invitation-islamic-elegant': {
    backgroundArt: 'islamic-tugu',
    cover: [
      corner('islamic-corner', 'topLeft', '33%'),
      corner('islamic-corner', 'bottomRight', '30%'),
    ],
    hero: [
      {
        asset: 'islamic-side-garland',
        position: { top: '18%', left: '-9%' },
        width: '24%',
        opacity: 0.75,
      },
      {
        asset: 'islamic-lantern',
        position: { top: '14%', right: '-6%' },
        width: '22%',
        opacity: 0.85,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'islamic-flower',
          position: { left: '-12%' },
          width: '32%',
          rotate: -10,
        },
      ],
      bride: [
        {
          asset: 'islamic-flower',
          position: { right: '-12%' },
          width: '32%',
          rotate: 10,
          flipX: true,
        },
      ],
    },
    closing: [
      {
        asset: 'islamic-arrangement',
        position: { right: '-8%', bottom: '-8%' },
        width: '48%',
        opacity: 0.75,
      },
    ],
  },
  'invitation-rustic-boho': {
    backgroundArt: 'rustic-boho-leaf',
    cover: [
      corner('rustic-boho-corner', 'topLeft', '34%'),
      corner('rustic-boho-corner', 'bottomRight', '30%'),
    ],
    hero: [
      {
        asset: 'rustic-boho-side-garland',
        position: { top: '18%', left: '-9%' },
        width: '24%',
        opacity: 0.75,
      },
      {
        asset: 'rustic-boho-lantern',
        position: { top: '14%', right: '-6%' },
        width: '23%',
        opacity: 0.85,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'rustic-boho-leaf',
          position: { left: '-12%' },
          width: '34%',
          rotate: -12,
        },
      ],
      bride: [
        {
          asset: 'rustic-boho-accent',
          position: { right: '-12%' },
          width: '32%',
          rotate: 8,
        },
      ],
    },
    closing: [
      {
        asset: 'rustic-boho-arrangement',
        position: { right: '-8%', bottom: '-8%' },
        width: '48%',
        opacity: 0.8,
      },
      {
        asset: 'rustic-boho-bouquet',
        position: { left: '-7%', bottom: '-3%' },
        width: '28%',
        opacity: 0.65,
      },
    ],
  },
  'invitation-royal-gold-luxury': {
    backgroundArt: 'royal-gold-mirror',
    cover: [
      {
        asset: 'royal-gold-corner',
        position: { top: '-3%', left: '-5%' },
        width: '32%',
        rotate: 90,
      },
      {
        asset: 'royal-gold-corner',
        position: { top: '-3%', right: '-5%' },
        width: '32%',
        rotate: 180,
      },
    ],
    hero: [
      {
        asset: 'royal-gold-side-garland',
        position: { top: '18%', right: '-9%' },
        width: '24%',
        opacity: 0.75,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'royal-gold-accent',
          position: { left: '-12%' },
          width: '32%',
          rotate: -8,
        },
      ],
      bride: [
        {
          asset: 'royal-gold-crown',
          position: { right: '-12%' },
          width: '34%',
          rotate: 8,
        },
      ],
    },
    closing: [
      {
        asset: 'royal-gold-bouquet',
        position: { right: '-8%', bottom: '-5%' },
        width: '40%',
        opacity: 0.8,
      },
      {
        asset: 'royal-gold-candles',
        position: { left: '-7%', bottom: '2%' },
        width: '25%',
        opacity: 0.65,
      },
    ],
  },
  'invitation-cute-boy-birthday': {
    backgroundArt: 'cute-boy-ribbon',
    cover: [
      corner('cute-boy-corner', 'topLeft', '34%'),
      corner('cute-boy-corner', 'bottomRight', '30%'),
      {
        asset: 'cute-boy-party-hat',
        position: { right: '-3%', top: '37%' },
        width: '18%',
        rotate: 12,
      },
    ],
    hero: [
      {
        asset: 'cute-boy-side-garland',
        position: { top: '18%', left: '-9%' },
        width: '24%',
        opacity: 0.75,
      },
      {
        asset: 'cute-boy-accent',
        position: { top: '20%', right: '-8%' },
        width: '22%',
        opacity: 0.7,
      },
    ],
    closing: [
      {
        asset: 'cute-boy-gift-stack',
        position: { right: '-4%', bottom: '-5%' },
        width: '36%',
        opacity: 0.85,
      },
      {
        asset: 'cute-boy-bouquet',
        position: { left: '-10%', top: '-2%' },
        width: '30%',
        opacity: 0.65,
      },
    ],
  },
  'invitation-cute-girl-birthday': {
    backgroundArt: 'cute-girl-ribbon',
    cover: [
      corner('cute-girl-corner', 'topLeft', '34%'),
      corner('cute-girl-corner', 'bottomRight', '30%'),
      {
        asset: 'cute-girl-party-hat',
        position: { right: '-3%', top: '37%' },
        width: '18%',
        rotate: 12,
      },
    ],
    hero: [
      {
        asset: 'cute-girl-side-garland',
        position: { top: '18%', left: '-9%' },
        width: '24%',
        opacity: 0.75,
      },
      {
        asset: 'cute-girl-accent',
        position: { top: '20%', right: '-8%' },
        width: '22%',
        opacity: 0.7,
      },
    ],
    closing: [
      {
        asset: 'cute-girl-gift-stack',
        position: { right: '-4%', bottom: '-5%' },
        width: '36%',
        opacity: 0.85,
      },
      {
        asset: 'cute-girl-bouquet',
        position: { left: '-10%', top: '-2%' },
        width: '30%',
        opacity: 0.65,
      },
    ],
  },
  'invitation-rose-gold-elegant-birthday': {
    backgroundArt: 'party-rose-gold-ribbon',
    cover: [
      corner('party-rose-gold-corner', 'topLeft', '34%'),
      corner('party-rose-gold-corner', 'bottomRight', '30%'),
      {
        asset: 'party-rose-gold-party-hat',
        position: { right: '-3%', top: '37%' },
        width: '18%',
        rotate: 12,
      },
    ],
    hero: [
      {
        asset: 'party-rose-gold-side-garland',
        position: { top: '18%', left: '-9%' },
        width: '24%',
        opacity: 0.75,
      },
    ],
    closing: [
      {
        asset: 'party-rose-gold-gift-stack',
        position: { right: '-4%', bottom: '-5%' },
        width: '36%',
        opacity: 0.85,
      },
      {
        asset: 'party-rose-gold-bouquet',
        position: { left: '-10%', top: '-2%' },
        width: '30%',
        opacity: 0.65,
      },
    ],
  },

  'invitation-black-gold-luxury-birthday': {
    backgroundArt: 'party-gold-ribbon',
    cover: [
      corner('party-gold-corner', 'topLeft', '34%'),
      corner('party-gold-corner', 'bottomRight', '30%'),
      {
        asset: 'party-gold-party-hat',
        position: { right: '-3%', top: '37%' },
        width: '18%',
        rotate: 12,
      },
    ],
    hero: [
      {
        asset: 'party-gold-side-garland',
        position: { top: '18%', left: '-9%' },
        width: '24%',
        opacity: 0.75,
      },
      {
        asset: 'party-gold-accent',
        position: { top: '20%', right: '-8%' },
        width: '22%',
        opacity: 0.7,
      },
    ],
    closing: [
      {
        asset: 'party-gold-gift-stack',
        position: { right: '-4%', bottom: '-5%' },
        width: '36%',
        opacity: 0.85,
      },
      {
        asset: 'party-gold-bouquet',
        position: { left: '-10%', top: '-2%' },
        width: '30%',
        opacity: 0.65,
      },
    ],
  },
  'invitation-cream-pink-birthday': {
    backgroundArt: 'cream-pink-ribbon',
    cover: [
      corner('cream-pink-corner', 'topLeft', '35%'),
      corner('cream-pink-corner', 'bottomRight', '30%'),
      {
        asset: 'cream-pink-party-hat',
        position: { right: '-3%', top: '38%' },
        width: '20%',
        rotate: 12,
      },
    ],
    hero: [
      {
        asset: 'cream-pink-side-garland',
        position: { top: '18%', left: '-9%' },
        width: '24%',
        opacity: 0.8,
      },
    ],
    closing: [
      {
        asset: 'cream-pink-gift-stack',
        position: { right: '-4%', bottom: '-5%' },
        width: '36%',
        opacity: 0.85,
      },
      {
        asset: 'cream-pink-bouquet',
        position: { left: '-10%', top: '-2%' },
        width: '32%',
        opacity: 0.65,
      },
    ],
  },
  'invitation-papua': {
    backgroundArt: 'papua-lukisan',
    cover: [
      corner('papua-corner', 'topLeft', '31%'),
      corner('papua-corner', 'topRight', '31%'),
    ],
    hero: [
      {
        asset: 'papua-side-garland',
        position: { top: '18%', right: '-9%' },
        width: '24%',
        opacity: 0.8,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'papua-tifa',
          position: { left: '-12%' },
          width: '26%',
          rotate: -8,
        },
      ],
      bride: [
        {
          asset: 'papua-manik',
          position: { right: '-12%' },
          width: '30%',
          rotate: 8,
        },
      ],
    },
    closing: [
      {
        asset: 'papua-pelaminan',
        position: { right: '-8%', bottom: '-8%' },
        width: '48%',
        opacity: 0.6,
      },
    ],
  },
  'invitation-aceh': {
    backgroundArt: 'aceh-kain',
    cover: [
      corner('aceh-corner', 'topLeft', '31%'),
      corner('aceh-corner', 'topRight', '31%'),
    ],
    hero: [
      {
        asset: 'aceh-side-garland',
        position: { top: '18%', left: '-9%' },
        width: '24%',
        opacity: 0.8,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'aceh-kupiah',
          position: { left: '-12%' },
          width: '34%',
          rotate: -8,
        },
      ],
      bride: [
        {
          asset: 'aceh-crown',
          position: { right: '-12%' },
          width: '34%',
          rotate: 8,
        },
      ],
    },
    closing: [
      {
        asset: 'aceh-pelaminan',
        position: { right: '-8%', bottom: '-8%' },
        width: '48%',
        opacity: 0.65,
      },
      {
        asset: 'aceh-rencong',
        position: { left: '-4%', bottom: '5%' },
        width: '20%',
        opacity: 0.65,
      },
    ],
  },
  'invitation-batak': {
    backgroundArt: 'batak-kain',
    cover: [
      corner('batak-corner', 'topLeft', '31%'),
      corner('batak-corner', 'topRight', '31%'),
    ],
    hero: [
      {
        asset: 'batak-side-garland',
        position: { top: '18%', right: '-9%' },
        width: '24%',
        opacity: 0.8,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'batak-syal',
          position: { left: '-12%' },
          width: '30%',
          rotate: -8,
        },
      ],
      bride: [
        {
          asset: 'batak-sortali',
          position: { right: '-12%' },
          width: '34%',
          rotate: 8,
        },
      ],
    },
    closing: [
      {
        asset: 'batak-pelaminan',
        position: { right: '-8%', bottom: '-8%' },
        width: '48%',
        opacity: 0.65,
      },
    ],
  },
  'invitation-palembang': {
    backgroundArt: 'palembang-kain-detail',
    cover: [
      corner('palembang-corner', 'topLeft', '31%'),
      corner('palembang-corner', 'topRight', '31%'),
    ],
    hero: [
      {
        asset: 'palembang-side-garland',
        position: { top: '18%', right: '-9%' },
        width: '24%',
        opacity: 0.8,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'palembang-pending',
          position: { left: '-12%' },
          width: '28%',
          rotate: -10,
        },
      ],
      bride: [
        {
          asset: 'palembang-crown',
          position: { right: '-12%' },
          width: '34%',
          rotate: 8,
        },
      ],
    },
    closing: [
      {
        asset: 'palembang-bouquet',
        position: { right: '-8%', bottom: '-5%' },
        width: '42%',
        opacity: 0.75,
      },
    ],
  },
  'invitation-makasar': {
    backgroundArt: 'makasar-kain',
    cover: [
      corner('makasar-corner', 'topLeft', '31%'),
      corner('makasar-corner', 'topRight', '31%'),
    ],
    hero: [
      {
        asset: 'makasar-side-garland',
        position: { top: '18%', left: '-9%' },
        width: '24%',
        opacity: 0.8,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'makasar-passapu',
          position: { left: '-12%' },
          width: '34%',
          rotate: -8,
        },
      ],
      bride: [
        {
          asset: 'makasar-pinang-goyang',
          position: { right: '-12%' },
          width: '30%',
          rotate: 8,
        },
      ],
    },
    closing: [
      {
        asset: 'makasar-pelaminan',
        position: { right: '-8%', bottom: '-8%' },
        width: '48%',
        opacity: 0.7,
      },
      {
        asset: 'makasar-ponto-gessa',
        position: { left: '-5%', bottom: '8%' },
        width: '20%',
        opacity: 0.6,
      },
    ],
  },
  'invitation-bali': {
    cover: [
      corner('bali-corner', 'topLeft', '31%'),
      corner('bali-corner', 'topRight', '31%'),
    ],
    hero: [
      {
        asset: 'bali-side-garland',
        position: { top: '16%', left: '-9%' },
        width: '24%',
        opacity: 0.8,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'bali-destar',
          position: { left: '-12%' },
          width: '34%',
          rotate: -8,
        },
      ],
      bride: [
        {
          asset: 'bali-crown',
          position: { right: '-12%' },
          width: '34%',
          rotate: 8,
        },
      ],
    },
    closing: [
      {
        asset: 'bali-pelaminan',
        position: { right: '-10%', bottom: '-8%' },
        width: '48%',
        opacity: 0.6,
      },
      {
        asset: 'bali-keris',
        position: { left: '-4%', bottom: '4%' },
        width: '18%',
        opacity: 0.6,
      },
    ],
  },
  'invitation-betawi': {
    cover: [
      corner('betawi-corner', 'topLeft', '31%'),
      corner('betawi-corner', 'topRight', '31%'),
    ],
    hero: [
      {
        asset: 'betawi-side-garland',
        position: { top: '16%', right: '-9%' },
        width: '24%',
        opacity: 0.8,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'betawi-safa',
          position: { left: '-12%' },
          width: '34%',
          rotate: -8,
        },
      ],
      bride: [
        {
          asset: 'betawi-crown',
          position: { right: '-12%' },
          width: '34%',
          rotate: 8,
        },
      ],
    },
    closing: [
      {
        asset: 'betawi-pelaminan',
        position: { right: '-8%', bottom: '-8%' },
        width: '48%',
        opacity: 0.75,
      },
    ],
  },
  'invitation-minangkabau': {
    cover: [
      corner('minang-corner', 'topLeft', '32%'),
      corner('minang-corner', 'topRight', '32%'),
    ],
    hero: [
      {
        asset: 'minang-side-garland',
        position: { top: '18%', left: '-9%' },
        width: '24%',
        opacity: 0.8,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'minang-deta',
          position: { left: '-12%' },
          width: '36%',
          rotate: -8,
        },
      ],
      bride: [
        {
          asset: 'minang-crown',
          position: { right: '-12%' },
          width: '36%',
          rotate: 8,
        },
      ],
    },
    closing: [
      {
        asset: 'minang-rumah-gadang',
        position: { right: '-12%', bottom: '-3%' },
        width: '47%',
        opacity: 0.5,
      },
    ],
  },
  'invitation-black-gold': {
    cover: cornerPair('blush-corner', '30%'),
    hero: [
      {
        asset: 'blush-leaf-spray',
        position: { top: '18%', right: '-8%' },
        width: '25%',
      },
    ],
    couple: portraitFlowers('blush-flower-single', 'blush-peony-single'),
  },
  'invitation-white-gold': {
    cover: cornerPair('blush-corner', '32%'),
    hero: [
      {
        asset: 'blush-leaf-spray-light',
        position: { top: '16%', right: '-8%' },
        width: '25%',
      },
    ],
    couple: portraitFlowers('blush-flower-accent', 'blush-peony-single'),
  },
  'invitation-gold': {
    cover: cornerPair('blush-corner', '34%'),
    hero: [
      {
        asset: 'blush-leaf-spray',
        position: { top: '4%', left: '-5%' },
        width: '30%',
      },
    ],
    couple: portraitFlowers(),
    closing: [
      {
        asset: 'blush-bouquet',
        position: { right: '-3%', bottom: 0 },
        width: '38%',
      },
    ],
  },
  'invitation-botanical': {
    cover: cornerPair('blush-corner', '36%'),
    hero: [
      {
        asset: 'blush-bottom-garland',
        position: { bottom: '-10%', left: '12%' },
        width: '76%',
      },
    ],
    couple: portraitFlowers('blush-flower-single', 'blush-peony-single'),
  },
  'invitation-rose': {
    cover: cornerPair('peony-corner', '37%'),
    hero: [
      {
        asset: 'peony-bottom-garland',
        position: { bottom: '-10%', left: '8%' },
        width: '84%',
      },
    ],
    couple: portraitFlowers('peony-single', 'peony-single'),
    closing: [
      {
        asset: 'peony-bouquet',
        position: { right: 0, bottom: '-5%' },
        width: '40%',
      },
    ],
  },
  'invitation-midnight': {
    cover: cornerPair('blush-corner', '30%'),
    hero: [
      {
        asset: 'blush-bottom-garland',
        position: { bottom: '-10%', left: '10%' },
        width: '80%',
        opacity: 0.72,
      },
    ],
    couple: portraitFlowers('blush-flower-single', 'blush-peony-single'),
  },
  'invitation-terracotta': {
    cover: cornerPair('blush-corner', '38%'),
    hero: [
      {
        asset: 'blush-bottom-garland',
        position: { bottom: '-10%', left: '12%' },
        width: '76%',
      },
    ],
    couple: portraitFlowers(),
  },
  'invitation-ivory': {
    cover: cornerPair('blush-corner', '33%'),
    hero: [
      {
        asset: 'blush-bottom-garland',
        position: { bottom: '-10%', left: '13%' },
        width: '74%',
      },
    ],
    couple: portraitFlowers(),
  },
  'invitation-birthday': {
    cover: cornerPair('blush-corner', '34%'),
    hero: [
      {
        asset: 'blush-bottom-garland',
        position: { bottom: '-10%', left: '10%' },
        width: '80%',
      },
    ],
  },
  'invitation-cosmic': {
    cover: cornerPair('peony-corner', '32%'),
    hero: [
      {
        asset: 'peony-bottom-garland',
        position: { bottom: '-10%', left: '10%' },
        width: '80%',
        opacity: 0.72,
      },
    ],
  },
  'invitation-emerald': {
    cover: cornerPair('blush-corner', '33%'),
    hero: [
      {
        asset: 'blush-leaf-spray',
        position: { top: '-5%', left: '2%' },
        width: '30%',
      },
    ],
  },
  'invitation-little-moon': {
    cover: cornerPair('blush-corner', '32%'),
    hero: [
      {
        asset: 'blush-bottom-garland',
        position: { bottom: '-10%', left: '12%' },
        width: '76%',
        opacity: 0.74,
      },
    ],
  },
  'invitation-coastal': {
    cover: cornerPair('blush-corner', '34%'),
    hero: [
      {
        asset: 'blush-bottom-garland',
        position: { bottom: '-10%', left: '10%' },
        width: '80%',
      },
    ],
    couple: portraitFlowers('blush-leaf-spray', 'blush-leaf-spray'),
  },
  'invitation-lavender': {
    cover: cornerPair('peony-corner', '33%'),
    hero: [
      {
        asset: 'peony-bottom-garland',
        position: { bottom: '-10%', left: '9%' },
        width: '82%',
      },
    ],
    couple: portraitFlowers('peony-single', 'peony-single'),
  },
  'invitation-garden-party': {
    cover: cornerPair('blush-corner', '36%'),
    hero: [
      {
        asset: 'blush-top-garland',
        position: { top: '-7%', left: '8%' },
        width: '84%',
      },
    ],
  },
  'invitation-sunflower': {
    cover: [
      corner('sunflower-corner', 'topLeft', '34%'),
      corner('sunflower-corner', 'bottomRight', '34%'),
      {
        asset: 'sunflower-accent',
        position: { top: '39%', right: '-4%' },
        width: '20%',
        rotate: 18,
      },
    ],
    hero: [
      {
        asset: 'sunflower-bottom-garland',
        position: { bottom: '-8%', left: '8%' },
        width: '84%',
      },
      {
        asset: 'sunflower-top-garland',
        position: { top: '-8%', left: '14%' },
        width: '72%',
        opacity: 0.8,
      },
      {
        asset: 'sunflower-side-garland',
        position: { top: '17%', right: '-8%' },
        width: '27%',
        opacity: 0.85,
      },
      {
        asset: 'sunflower-leaf-accent',
        position: { top: '-4%', right: '-4%' },
        width: '27%',
      },
    ],
    couple: {
      groom: [
        {
          asset: 'sunflower-single',
          position: { bottom: '-10%', left: '-16%' },
          width: '32%',
          rotate: -18,
        },
        {
          asset: 'sunflower-leaf-spray',
          position: { bottom: '-8%', left: '4%' },
          width: '30%',
          rotate: -12,
        },
      ],
      bride: [
        {
          asset: 'sunflower-bloom',
          position: { bottom: '-10%', right: '-16%' },
          width: '32%',
          rotate: 18,
        },
        {
          asset: 'sunflower-leaf-spray-light',
          position: { bottom: '-8%', right: '4%' },
          width: '30%',
          rotate: 12,
        },
      ],
    },
    closing: [
      {
        asset: 'sunflower-bouquet',
        position: { right: '-3%', bottom: '-3%' },
        width: '46%',
      },
    ],
  },
  'invitation-burgundy': {
    cover: cornerPair('red-corner', '34%'),
    hero: [
      {
        asset: 'red-bottom-garland',
        position: { bottom: '-10%', left: '10%' },
        width: '80%',
      },
    ],
    couple: portraitFlowers('red-rose-single', 'red-rose-accent'),
    closing: [
      {
        asset: 'red-bouquet',
        position: { right: '-3%', bottom: '-3%' },
        width: '42%',
      },
    ],
  },
  'invitation-pink-blush': {
    cover: cornerPair('peony-corner', '35%'),
    hero: [
      {
        asset: 'peony-bottom-garland',
        position: { bottom: '-10%', left: '9%' },
        width: '82%',
      },
    ],
    couple: portraitFlowers('peony-single', 'peony-accent'),
    closing: [
      {
        asset: 'peony-bouquet',
        position: { right: '-3%', bottom: '-3%' },
        width: '42%',
      },
    ],
  },
  'invitation-sunda-siger': {
    cover: [
      corner('sunda-corner', 'topLeft', '34%'),
      corner('sunda-corner', 'topRight', '34%'),
      {
        asset: 'sunda-siger',
        position: { bottom: '-4%', left: '27%' },
        width: '46%',
        opacity: 0.94,
      },
      {
        asset: 'sunda-bottom-garland',
        position: { bottom: '-5%', left: '8%' },
        width: '84%',
        zIndex: 2,
      },
    ],
    hero: [
      {
        asset: 'sunda-bottom-garland',
        position: { bottom: '-7%', left: '8%' },
        width: '84%',
      },
      {
        asset: 'sunda-side-garland',
        position: { top: '16%', left: '-8%' },
        width: '25%',
        opacity: 0.82,
      },
      {
        asset: 'sunda-umbrella',
        position: { top: '10%', right: '-4%' },
        width: '24%',
        opacity: 0.9,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'sunda-bendo',
          position: { bottom: '-8%', left: '-14%' },
          width: '37%',
          rotate: -8,
        },
      ],
      bride: [
        {
          asset: 'sunda-crown',
          position: { bottom: '-8%', right: '-15%' },
          width: '38%',
          rotate: 8,
        },
      ],
    },
    closing: [
      {
        asset: 'sunda-bouquet',
        position: { right: '-4%', bottom: '-5%' },
        width: '43%',
      },
      {
        asset: 'sunda-angklung',
        position: { left: '-9%', bottom: '-9%' },
        width: '30%',
        opacity: 0.9,
      },
      {
        asset: 'sunda-kujang',
        position: { left: '7%', bottom: '5%' },
        width: '14%',
        opacity: 0.68,
      },
    ],
  },
  'invitation-jawa-paes': {
    cover: [
      corner('jawa-corner', 'topLeft', '35%'),
      corner('jawa-corner', 'topRight', '35%'),
      {
        asset: 'jawa-kembar-mayang',
        position: { bottom: '-7%', left: '32%' },
        width: '36%',
        opacity: 0.9,
      },
      {
        asset: 'jawa-bottom-garland',
        position: { bottom: '-5%', left: '8%' },
        width: '84%',
        zIndex: 2,
      },
    ],
    hero: [
      {
        asset: 'jawa-bottom-garland',
        position: { bottom: '-7%', left: '8%' },
        width: '84%',
      },
      {
        asset: 'jawa-tuwuhan',
        position: { top: '13%', left: '-11%' },
        width: '29%',
        opacity: 0.82,
      },
      {
        asset: 'jawa-tuwuhan',
        position: { top: '13%', right: '-11%' },
        width: '29%',
        flipX: true,
        opacity: 0.82,
      },
    ],
    couple: {
      groom: [
        {
          asset: 'jawa-blangkon',
          position: { top: '-12%', left: '-13%' },
          width: '39%',
          rotate: -8,
        },
      ],
      bride: [
        {
          asset: 'jawa-crown',
          position: { top: '-14%', right: '-13%' },
          width: '38%',
          rotate: 8,
        },
      ],
    },
    closing: [
      {
        asset: 'jawa-bouquet',
        position: { right: '-4%', bottom: '-5%' },
        width: '43%',
      },
      {
        asset: 'jawa-keris',
        position: { left: '-6%', bottom: '-6%' },
        width: '24%',
        opacity: 0.78,
      },
      {
        asset: 'jawa-ronce',
        position: { left: '14%', top: '7%' },
        width: '17%',
        opacity: 0.74,
      },
    ],
  },
};

const themeFamilies = {
  'invitation-celestial-moon-star': 'celestial',
  'invitation-islamic-elegant': 'islamic',
  'invitation-rustic-boho': 'rustic-boho',
  'invitation-royal-gold-luxury': 'royal-gold',
  'invitation-cute-boy-birthday': 'cute-boy',
  'invitation-cute-girl-birthday': 'cute-girl',
  'invitation-rose-gold-elegant-birthday': 'party-rose-gold',

  'invitation-black-gold-luxury-birthday': 'party-gold',
  'invitation-cream-pink-birthday': 'cream-pink',
  'invitation-papua': 'papua',
  'invitation-aceh': 'aceh',
  'invitation-batak': 'batak',
  'invitation-palembang': 'palembang',
  'invitation-makasar': 'makasar',
  'invitation-bali': 'bali',
  'invitation-betawi': 'betawi',
  'invitation-minangkabau': 'minang',
  'invitation-black-gold': 'blush',
  'invitation-white-gold': 'blush',
  'invitation-gold': 'blush',
  'invitation-botanical': 'blush',
  'invitation-rose': 'peony',
  'invitation-midnight': 'blush',
  'invitation-terracotta': 'blush',
  'invitation-ivory': 'blush',
  'invitation-birthday': 'blush',
  'invitation-cosmic': 'peony',
  'invitation-emerald': 'blush',
  'invitation-little-moon': 'blush',
  'invitation-coastal': 'blush',
  'invitation-lavender': 'peony',
  'invitation-garden-party': 'blush',
  'invitation-sunflower': 'sunflower',
  'invitation-burgundy': 'red',
  'invitation-pink-blush': 'peony',
  'invitation-sunda-siger': 'sunda',
  'invitation-jawa-paes': 'jawa',
};

const familyDetails = {
  celestial: [
    'celestial-rings',
    'celestial-constellation',
    'celestial-candles',
  ],
  islamic: ['islamic-rings', 'islamic-ribbon', 'islamic-lantern'],
  'rustic-boho': [
    'rustic-boho-arrangement',
    'rustic-boho-ribbon',
    'rustic-boho-detail',
  ],
  'royal-gold': [
    'royal-gold-pearls',
    'royal-gold-ribbon',
    'royal-gold-candles',
  ],
  'cute-boy': ['cute-boy-gift', 'cute-boy-ribbon', 'cute-boy-cake'],
  'cute-girl': ['cute-girl-gift', 'cute-girl-ribbon', 'cute-girl-cake'],
  'party-rose-gold': [
    'party-rose-gold-gift',
    'party-rose-gold-ribbon',
    'party-rose-gold-cake',
  ],

  'party-gold': ['party-gold-gift', 'party-gold-ribbon', 'party-gold-cake'],
  'cream-pink': ['cream-pink-gift', 'cream-pink-ribbon', 'cream-pink-cake'],
  papua: ['papua-kapak', 'papua-noken', 'papua-wadah'],
  aceh: ['aceh-kalung', 'aceh-simplah', 'aceh-pelaminan'],
  batak: ['batak-kalung', 'batak-kain', 'batak-pinar'],
  palembang: ['palembang-anting', 'palembang-kain', 'palembang-tepak'],
  makasar: ['makasar-genno-susun', 'makasar-baju', 'makasar-pelaminan'],
  bali: ['bali-subeng', 'bali-kain', 'bali-pelaminan'],
  betawi: ['betawi-cucuk-sanggul', 'betawi-kain', 'betawi-pelaminan'],
  minang: ['minang-pelaminan', 'minang-songket', 'minang-dulang'],
  blush: [
    'blush-flower-accent',
    'blush-leaf-spray-light',
    'blush-blossom-spray',
  ],
  peony: ['peony-accent', 'peony-leaf-spray-light', 'peony-blossom-spray'],
  sunflower: [
    'sunflower-accent',
    'sunflower-leaf-spray-light',
    'sunflower-leaf-accent',
  ],
  red: ['red-rose-bloom', 'red-leaf-spray-light', 'red-blossom-spray'],
  sunda: ['sunda-kujang', 'sunda-angklung', 'sunda-siger'],
  jawa: ['jawa-batik', 'jawa-kembar-mayang', 'jawa-ronce'],
};

const dividerItem = (asset) => ({ asset, animation: false });

for (const [theme, family] of Object.entries(themeFamilies)) {
  const preset = ornamentPresets[theme];
  const [flower, leaf, spray] = familyDetails[family];
  const centerpiece =
    {
      bali: 'bali-bokor',
      makasar: 'makasar-pelaminan',
      aceh: 'aceh-pelaminan',
      papua: 'papua-pelaminan',
      islamic: 'islamic-arrangement',
      celestial: 'celestial-moon',
    }[family] || `${family}-bouquet`;
  preset.background = {
    main:
      preset.backgroundArt ||
      (family === 'minang' ? 'minang-rumah-gadang' : centerpiece),
    edge: family === 'jawa' ? 'jawa-tuwuhan' : `${family}-side-garland`,
  };
  preset.dividers = {
    story: [dividerItem(leaf)],
    events: [dividerItem(spray)],
    gallery: [dividerItem(centerpiece)],
    wishes: [dividerItem(flower)],
  };
  if (!preset.closing) {
    preset.closing = [
      {
        asset: centerpiece,
        position: { bottom: '-3%', right: '-4%' },
        width: '38%',
      },
    ];
  }
  if (
    ![
      'sunda',
      'jawa',
      'minang',
      'betawi',
      'bali',
      'palembang',
      'makasar',
      'batak',
      'aceh',
      'papua',
      'cream-pink',
      'party-gold',
      'cute-boy',
      'cute-girl',
      'party-rose-gold',
      'royal-gold',
      'rustic-boho',
      'islamic',
      'celestial',
    ].includes(family)
  ) {
    if (!preset.hero.some((item) => item.asset === `${family}-top-garland`)) {
      preset.hero.push({
        asset: `${family}-top-garland`,
        position: { top: '-9%', left: '18%' },
        width: '64%',
        opacity: 0.45,
      });
    }
    if (family === 'red' || family === 'peony') {
      preset.closing.push({
        asset: family === 'red' ? 'red-rose-branch' : 'peony-leaf-spray',
        position: { top: '12%', left: '-8%' },
        width: '24%',
        opacity: 0.55,
      });
    }
    preset.cover = [
      ...preset.cover,
      {
        asset: leaf,
        position: { top: '36%', right: '-9%' },
        width: '23%',
        opacity: 0.55,
        rotate: 18,
      },
    ];
    preset.hero = [
      ...preset.hero,
      {
        asset: family + '-side-garland',
        position: { top: '20%', left: '-10%' },
        width: '24%',
        opacity: 0.65,
      },
    ];
  } else {
    preset.hero = [
      ...preset.hero,
      {
        asset: family + '-top-garland',
        position: { top: '-8%', left: '14%' },
        width: '72%',
        opacity: 0.75,
      },
    ];
  }
  preset.hero = [
    ...preset.hero.filter(
      (item) => !/-top-garland$|-bottom-garland$/.test(item.asset),
    ),
    {
      asset: `${family}-top-garland`,
      position: { top: 0, left: '10%' },
      width: '80%',
      opacity: 1,
    },
    {
      asset: `${family}-bottom-garland`,
      position: { bottom: 0, left: '10%' },
      width: '80%',
      opacity: 1,
    },
  ];
}

ornamentPresets['invitation-platinum-champagne'] = {
  paperTexture: 'champagne-teksur-kertas',
  waxSeal: 'champagne-segel-lilin',
  background: { main: 'champagne-ranting-daun', edge: 'champagne-daun-kiri' },
  cover: [
    {
      asset: 'champagne-atas-kiri',
      position: { top: '-4%', left: '-9%' },
      width: '42%',
    },
    {
      asset: 'champagne-atas-kanan',
      position: { top: '-4%', right: '-9%' },
      width: '42%',
    },
  ],
  hero: [],
  couple: {
    groom: [
      {
        asset: 'champagne-bunga-kiri',
        position: { left: '-12%' },
        width: '35%',
        rotate: -12,
      },
    ],
    bride: [
      {
        asset: 'champagne-bunga-kanan',
        position: { right: '-12%' },
        width: '35%',
        rotate: 12,
      },
    ],
  },
  dividers: {
    story: [dividerItem('champagne-ranting-daun')],
    events: [dividerItem('champagne-mahkota')],
    gallery: [dividerItem('champagne-pagar-bunga')],
    wishes: [dividerItem('champagne-bunga-kanan')],
  },
  closing: [
    {
      asset: 'champagne-bawah-kiri',
      position: { bottom: '-3%', left: '-10%' },
      width: '46%',
    },
    {
      asset: 'champagne-bawah-kanan',
      position: { bottom: '-3%', right: '-10%' },
      width: '46%',
    },
  ],
};

ornamentPresets['invitation-platinum-aurora'] = {
  paperTexture: 'aurora-tekstur-kertas',
  waxSeal: 'aurora-segel-lilin',
  envelope: 'aurora-amplop',
  envelopeFlap: 'aurora-tutup-amplop',
  background: { main: 'aurora-daun-kanan', edge: 'aurora-daun-kiri' },
  cover: [
    {
      asset: 'aurora-atas-kiri',
      position: { top: '-2%', left: '-9%' },
      width: '44%',
    },
    {
      asset: 'aurora-atas-kanan',
      position: { top: '-2%', right: '-9%' },
      width: '44%',
    },
  ],
  hero: [],
  couple: {
    groom: [
      {
        asset: 'aurora-bunga',
        position: { left: '-12%' },
        width: '35%',
        rotate: -12,
      },
    ],
    bride: [
      {
        asset: 'aurora-bunga',
        position: { right: '-12%' },
        width: '35%',
        rotate: 12,
        flipX: true,
      },
    ],
  },
  dividers: {
    story: [dividerItem('aurora-bunga')],
    events: [dividerItem('aurora-mahkota')],
    gallery: [dividerItem('aurora-bunga-pembatas')],
    wishes: [dividerItem('aurora-lentera')],
  },
  closing: [
    {
      asset: 'aurora-bawah-kiri',
      position: { bottom: '-3%', left: '-10%' },
      width: '46%',
    },
    {
      asset: 'aurora-bawah-kanan',
      position: { bottom: '-3%', right: '-10%' },
      width: '46%',
    },
  ],
};

ornamentPresets['invitation-platinum-sunda'] = {
  paperTexture: 'platinum-sunda-tekstur-kertas',
  waxSeal: 'platinum-sunda-segel-lilin',
  envelope: 'platinum-sunda-amplop',
  envelopeFlap: 'platinum-sunda-tutup-amplop',
  background: {
    main: 'platinum-sunda-daun-kanan',
    edge: 'platinum-sunda-daun-kiri',
  },
  cover: [
    {
      asset: 'platinum-sunda-atas-kiri',
      position: { top: '-2%', left: '-7%' },
      width: '37%',
      animation: false,
    },
    {
      asset: 'platinum-sunda-atas-kanan',
      position: { top: '-2%', right: '-7%' },
      width: '37%',
      animation: false,
    },
  ],
  hero: [],
  couple: {
    groom: [
      {
        asset: 'platinum-sunda-daun-kiri',
        position: { left: '-12%' },
        width: '28%',
      },
    ],
    bride: [
      {
        asset: 'platinum-sunda-daun-kiri',
        position: { left: '-12%' },
        width: '28%',
      },
      {
        asset: 'platinum-sunda-samping',
        position: { right: '8%' },
        frameTop: '15%',
        width: '10%',
        transformOrigin: '50% 0%',
      },
    ],
  },
  dividers: {
    story: [dividerItem('platinum-sunda-angklung')],
    events: [dividerItem('platinum-sunda-kujang')],
    gallery: [dividerItem('platinum-sunda-payung')],
    wishes: [dividerItem('platinum-sunda-siger')],
  },
  closing: [
    {
      asset: 'platinum-sunda-bawah-kiri',
      position: { bottom: '-3%', left: '-8%' },
      width: '37%',
      animation: false,
    },
    {
      asset: 'platinum-sunda-bawah-kanan',
      position: { bottom: '-3%', right: '-8%' },
      width: '37%',
      animation: false,
    },
  ],
};

ornamentPresets['invitation-platinum-jawa'] = {
  paperTexture: 'platinum-jawa-tekstur-kertas',
  waxSeal: 'platinum-jawa-segel-lilin',
  envelope: 'platinum-jawa-amplop',
  envelopeFlap: 'platinum-jawa-tutup-amplop',
  background: {
    main: 'platinum-jawa-daun-kanan',
    edge: 'platinum-jawa-daun-kiri',
  },
  cover: [
    {
      asset: 'platinum-jawa-atas-kiri',
      position: { top: '-2%', left: '-7%' },
      width: '37%',
      animation: false,
    },
    {
      asset: 'platinum-jawa-atas-kanan',
      position: { top: '-2%', right: '-7%' },
      width: '37%',
      animation: false,
    },
  ],
  hero: [],
  couple: {
    groom: [
      {
        asset: 'platinum-jawa-daun-kiri',
        position: { left: '-12%' },
        width: '28%',
      },
    ],
    bride: [
      {
        asset: 'platinum-jawa-daun-kanan',
        position: { right: '-12%' },
        width: '28%',
      },
    ],
  },
  dividers: {
    story: [dividerItem('platinum-jawa-keris')],
    events: [dividerItem('platinum-jawa-kembar-mayang')],
    gallery: [dividerItem('platinum-jawa-tuwuhan')],
    wishes: [dividerItem('platinum-jawa-kain-batik')],
  },
  closing: [
    {
      asset: 'platinum-jawa-bawah-kiri',
      position: { bottom: '-3%', left: '-8%' },
      width: '37%',
      animation: false,
    },
    {
      asset: 'platinum-jawa-bawah-kanan',
      position: { bottom: '-3%', right: '-8%' },
      width: '37%',
      animation: false,
    },
  ],
};
