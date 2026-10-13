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
