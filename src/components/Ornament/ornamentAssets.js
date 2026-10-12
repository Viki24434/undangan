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

const blush = floralSet('bunga_mawar_peony_pastel');
const rose = floralSet('bunga_mawar');
const peony = floralSet('bunga_peony');
const sunflower = floralSet('bunga_matahari');
const sundaExport = 'adat_sunda';
const sunda = {
  corner: png(sundaExport, 'sudut_kiri.png'),
  top: png(sundaExport, 'atas.png'),
  bottom: png(sundaExport, 'bawah.png'),
  side: png(sundaExport, 'samping.png'),
  bouquet: png(sundaExport, 'bucket.png'),
  angklung: png(sundaExport, 'angklung.png'),
  bendo: png(sundaExport, 'bendo.png'),
  kujang: png(sundaExport, 'kujang.png'),
  crown: png(sundaExport, 'mahkota.png'),
  umbrella: png(sundaExport, 'payung.png'),
  siger: png(sundaExport, 'siger.png'),
};
const jawaExport = 'adat_jawa';
const jawa = {
  corner: png(jawaExport, 'sudut_kiri.png'),
  top: png(jawaExport, 'atas.png'),
  bottom: png(jawaExport, 'bawah.png'),
  bouquet: png(jawaExport, 'bucket.png'),
  blangkon: png(jawaExport, 'blangkon.png'),
  batik: png(jawaExport, 'kain_batik.png'),
  mayang: png(jawaExport, 'kembar_mayang.png'),
  keris: png(jawaExport, 'keris.png'),
  crown: png(jawaExport, 'mahkota.png'),
  ronce: png(jawaExport, 'ronce.png'),
  tuwuhan: png(jawaExport, 'tuwuhan.png'),
};

export const ornamentAssets = {
  'bali-corner': asset(
    png('adat_bali', 'sudut_kiri.png'),
    'corner',
  ),
  'bali-top-garland': asset(
    png('adat_bali', 'atas.png'),
    'garland',
  ),
  'bali-bottom-garland': asset(
    png('adat_bali', 'bawah.png'),
    'garland',
  ),
  'bali-side-garland': asset(
    png('adat_bali', 'samping.png'),
    'side',
  ),
  'bali-bokor': asset(
    png('adat_bali', 'bokor.png'),
    'arrangement',
  ),
  'bali-destar': asset(
    png('adat_bali', 'destar.png'),
    'arrangement',
  ),
  'bali-crown': asset(
    png('adat_bali', 'mahkota.png'),
    'arrangement',
  ),
  'bali-subeng': asset(
    png('adat_bali', 'subeng.png'),
    'arrangement',
  ),
  'bali-kain': asset(
    png('adat_bali', 'kain_bali.png'),
    'arrangement',
  ),
  'bali-pelaminan': asset(
    png('adat_bali', 'pelaminan.png'),
    'arrangement',
  ),
  'bali-keris': asset(
    png('adat_bali', 'keris_bali.png'),
    'arrangement',
  ),
  'betawi-corner': asset(
    png('ada_betawi', 'sudut_kiri.png'),
    'corner',
  ),
  'betawi-top-garland': asset(
    png('ada_betawi', 'atas.png'),
    'garland',
  ),
  'betawi-bottom-garland': asset(
    png('ada_betawi', 'bawah.png'),
    'garland',
  ),
  'betawi-side-garland': asset(
    png('ada_betawi', 'samping.png'),
    'side',
  ),
  'betawi-bouquet': asset(
    png('ada_betawi', 'bucket.png'),
    'bouquet',
  ),
  'betawi-safa': asset(
    png('ada_betawi', 'safa.png'),
    'arrangement',
  ),
  'betawi-crown': asset(
    png('ada_betawi', 'mahkota.png'),
    'arrangement',
  ),
  'betawi-cucuk-sanggul': asset(
    png('ada_betawi', 'cucuk_sanggul.png'),
    'arrangement',
  ),
  'betawi-kain': asset(
    png('ada_betawi', 'kain_betawi.png'),
    'arrangement',
  ),
  'betawi-pelaminan': asset(
    png('ada_betawi', 'pelaminan.png'),
    'arrangement',
  ),
  'minang-corner': asset(
    png('adat_minangkabau', 'sudut_kiri.png'),
    'corner',
  ),
  'minang-top-garland': asset(
    png('adat_minangkabau', 'atas.png'),
    'garland',
  ),
  'minang-bottom-garland': asset(
    png('adat_minangkabau', 'bawah.png'),
    'garland',
  ),
  'minang-side-garland': asset(
    png('adat_minangkabau', 'samping.png'),
    'side',
  ),
  'minang-bouquet': asset(
    png('adat_minangkabau', 'bucket.png'),
    'bouquet',
  ),
  'minang-deta': asset(
    png('adat_minangkabau', 'deta.png'),
    'arrangement',
  ),
  'minang-dulang': asset(
    png('adat_minangkabau', 'dulang.png'),
    'arrangement',
  ),
  'minang-songket': asset(
    png('adat_minangkabau', 'kain_songket.png'),
    'arrangement',
  ),
  'minang-crown': asset(
    png('adat_minangkabau', 'mahkota.png'),
    'arrangement',
  ),
  'minang-pelaminan': asset(
    png('adat_minangkabau', 'pelaminan.png'),
    'arrangement',
  ),
  'minang-rumah-gadang': asset(
    png('adat_minangkabau', 'rumah_gadang.png'),
    'arrangement',
  ),
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
  'red-rose-bloom': asset(rose.flower3, 'flower'),
  'red-leaf-spray-light': asset(rose.leaf2, 'branch'),
  'red-blossom-spray': asset(rose.leaf3, 'branch'),
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
  'sunda-corner': asset(sunda.corner, 'corner'),
  'sunda-top-garland': asset(sunda.top, 'garland'),
  'sunda-bottom-garland': asset(sunda.bottom, 'garland'),
  'sunda-side-garland': asset(sunda.side, 'side'),
  'sunda-bouquet': asset(sunda.bouquet, 'bouquet'),
  'sunda-angklung': asset(sunda.angklung, 'arrangement'),
  'sunda-bendo': asset(sunda.bendo, 'arrangement'),
  'sunda-kujang': asset(sunda.kujang, 'arrangement'),
  'sunda-crown': asset(sunda.crown, 'arrangement'),
  'sunda-umbrella': asset(sunda.umbrella, 'arrangement'),
  'sunda-siger': asset(sunda.siger, 'arrangement'),
  'jawa-corner': asset(jawa.corner, 'corner'),
  'jawa-top-garland': asset(jawa.top, 'garland'),
  'jawa-bottom-garland': asset(jawa.bottom, 'garland'),
  'jawa-bouquet': asset(jawa.bouquet, 'bouquet'),
  'jawa-blangkon': asset(jawa.blangkon, 'arrangement'),
  'jawa-batik': asset(jawa.batik, 'arrangement'),
  'jawa-kembar-mayang': asset(jawa.mayang, 'arrangement'),
  'jawa-keris': asset(jawa.keris, 'arrangement'),
  'jawa-crown': asset(jawa.crown, 'arrangement'),
  'jawa-ronce': asset(jawa.ronce, 'arrangement'),
  'jawa-tuwuhan': asset(jawa.tuwuhan, 'arrangement'),
};
