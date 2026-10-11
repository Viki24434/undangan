const png = (exportName, filename) =>
  `/assets/png/${exportName}/${encodeURIComponent(filename)}`;

const floralSet = (exportName) => ({
  corner: png(exportName, 'sudut_kiri.png'),
  top: png(exportName, 'atas.png'),
  bottom: png(exportName, 'bawah.png'),
  side: png(exportName, 'samping.png'),
  bouquet: png(exportName, 'bucket.png'),
  flower1: png(exportName, 'bunga1.png'),
  flower2: png(exportName, 'bunga2.png'),
  flower3: png(exportName, 'bunga3.png'),
  leaf1: png(exportName, 'daun1.png'),
  leaf2: png(exportName, 'daun2.png'),
  leaf3: png(exportName, 'daun3.png'),
});

const asset = (src, role) => ({ src, role });

const blush = floralSet('Export_20261011_150336');
const rose = floralSet('Export_20261011_150344');
const peony = floralSet('Export_20261011_151409');
const sunflower = floralSet('Export_20261011_170632');

export const ornamentAssets = {
  'blush-corner': asset(blush.corner, 'corner'),
  'blush-top-garland': asset(blush.top, 'garland'),
  'blush-bottom-garland': asset(blush.bottom, 'garland'),
  'blush-side-garland': asset(blush.side, 'side'),
  'blush-bouquet': asset(blush.bouquet, 'bouquet'),
  'blush-flower-single': asset(blush.flower1, 'flower'),
  'blush-peony-single': asset(blush.flower2, 'flower'),
  'blush-flower-accent': asset(blush.flower3, 'flower'),
  'blush-leaf-spray': asset(blush.leaf1, 'branch'),
  'blush-leaf-spray-light': asset(blush.leaf2, 'branch'),
  'blush-blossom-spray': asset(blush.leaf3, 'branch'),
  'red-corner': asset(rose.corner, 'corner'),
  'red-top-garland': asset(rose.top, 'garland'),
  'red-bottom-garland': asset(rose.bottom, 'garland'),
  'red-side-garland': asset(rose.side, 'side'),
  'red-bouquet': asset(rose.bouquet, 'bouquet'),
  'red-rose-single': asset(rose.flower1, 'flower'),
  'red-rose-accent': asset(rose.flower2, 'flower'),
  'red-rose-branch': asset(rose.leaf1, 'branch'),
  'peony-corner': asset(peony.corner, 'corner'),
  'peony-top-garland': asset(peony.top, 'garland'),
  'peony-bottom-garland': asset(peony.bottom, 'garland'),
  'peony-side-garland': asset(peony.side, 'side'),
  'peony-bouquet': asset(peony.bouquet, 'bouquet'),
  'peony-single': asset(peony.flower1, 'flower'),
  'peony-accent': asset(peony.flower2, 'flower'),
  'peony-leaf-spray': asset(peony.leaf1, 'branch'),
  'peony-leaf-spray-light': asset(peony.leaf2, 'branch'),
  'peony-blossom-spray': asset(peony.leaf3, 'branch'),
  'sunflower-corner': asset(sunflower.corner, 'corner'),
  'sunflower-top-garland': asset(sunflower.top, 'garland'),
  'sunflower-bottom-garland': asset(sunflower.bottom, 'garland'),
  'sunflower-side-garland': asset(sunflower.side, 'side'),
  'sunflower-bouquet': asset(sunflower.bouquet, 'bouquet'),
  'sunflower-single': asset(sunflower.flower1, 'flower'),
  'sunflower-bloom': asset(sunflower.flower2, 'flower'),
  'sunflower-accent': asset(sunflower.flower3, 'flower'),
  'sunflower-leaf-spray': asset(sunflower.leaf1, 'branch'),
  'sunflower-leaf-spray-light': asset(sunflower.leaf2, 'branch'),
  'sunflower-leaf-accent': asset(sunflower.leaf3, 'branch'),
};
