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
  'invitation-gold': {
    cover: cornerPair('blush-corner', '34%'),
    hero: [{ asset: 'blush-leaf-spray', position: { top: '4%', left: '-5%' }, width: '30%' }],
    couple: portraitFlowers(),
    closing: [{ asset: 'blush-bouquet', position: { right: '-3%', bottom: 0 }, width: '38%' }],
  },
  'invitation-botanical': {
    cover: cornerPair('blush-corner', '36%'),
    hero: [
      {
        asset: 'blush-top-garland',
        position: { bottom: '-10%', left: '12%' },
        width: '76%',
      },
    ],
    couple: portraitFlowers('blush-flower-single', 'blush-peony-single'),
  },
  'invitation-rose': {
    cover: cornerPair('peony-corner', '37%'),
    hero: [{ asset: 'peony-top-garland', position: { bottom: '-10%', left: '8%' }, width: '84%' }],
    couple: portraitFlowers('peony-single', 'peony-single'),
    closing: [{ asset: 'peony-bouquet', position: { right: 0, bottom: '-5%' }, width: '40%' }],
  },
  'invitation-midnight': {
    cover: cornerPair('blush-corner', '30%'),
    hero: [{ asset: 'blush-top-garland', position: { bottom: '-10%', left: '10%' }, width: '80%', opacity: 0.72 }],
    couple: portraitFlowers('blush-flower-single', 'blush-peony-single'),
  },
  'invitation-terracotta': {
    cover: cornerPair('blush-corner', '38%'),
    hero: [{ asset: 'blush-top-garland', position: { bottom: '-10%', left: '12%' }, width: '76%' }],
    couple: portraitFlowers(),
  },
  'invitation-ivory': {
    cover: cornerPair('blush-corner', '33%'),
    hero: [{ asset: 'blush-top-garland', position: { bottom: '-10%', left: '13%' }, width: '74%' }],
    couple: portraitFlowers(),
  },
  'invitation-birthday': {
    cover: cornerPair('blush-corner', '34%'),
    hero: [{ asset: 'blush-top-garland', position: { bottom: '-10%', left: '10%' }, width: '80%' }],
  },
  'invitation-cosmic': {
    cover: cornerPair('peony-corner', '32%'),
    hero: [{ asset: 'peony-top-garland', position: { bottom: '-10%', left: '10%' }, width: '80%', opacity: 0.72 }],
  },
  'invitation-emerald': {
    cover: cornerPair('blush-corner', '33%'),
    hero: [{ asset: 'blush-leaf-spray', position: { top: '-5%', left: '2%' }, width: '30%' }],
  },
  'invitation-little-moon': {
    cover: cornerPair('blush-corner', '32%'),
    hero: [{ asset: 'blush-top-garland', position: { bottom: '-10%', left: '12%' }, width: '76%', opacity: 0.74 }],
  },
  'invitation-coastal': {
    cover: cornerPair('blush-corner', '34%'),
    hero: [{ asset: 'blush-top-garland', position: { bottom: '-10%', left: '10%' }, width: '80%' }],
    couple: portraitFlowers('blush-leaf-spray', 'blush-leaf-spray'),
  },
  'invitation-lavender': {
    cover: cornerPair('peony-corner', '33%'),
    hero: [{ asset: 'peony-top-garland', position: { bottom: '-10%', left: '9%' }, width: '82%' }],
    couple: portraitFlowers('peony-single', 'peony-single'),
  },
  'invitation-garden-party': {
    cover: cornerPair('blush-corner', '36%'),
    hero: [{ asset: 'blush-top-garland', position: { top: '-7%', left: '8%' }, width: '84%' }],
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
        asset: 'sunflower-top-garland',
        position: { bottom: '-8%', left: '8%' },
        width: '84%',
      },
      {
        asset: 'sunflower-bottom-garland',
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
        asset: 'red-top-garland',
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
        asset: 'peony-top-garland',
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
};
