import { API_BASE_URL } from './api';
import { adminService } from './adminService';

const MAX_ARCHIVE = 125 * 1024 * 1024;
const MAX_ASSETS = 100 * 1024 * 1024;
const MAX_MANIFEST = 20 * 1024 * 1024;
const MEDIA = /^\/api\/media\/[a-f0-9-]{36}\.(png|jpg|webp)$/;
const MIME = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' };

async function checksum(bytes) {
  if (!globalThis.crypto?.subtle) {
    throw new Error(
      'Buka admin melalui HTTPS atau localhost untuk memproses cadangan.',
    );
  }
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash), (part) =>
    part.toString(16).padStart(2, '0'),
  ).join('');
}

function assertManifest(manifest) {
  if (
    manifest?.format !== 'undangan-theme-backup' ||
    manifest.version !== 1 ||
    !Array.isArray(manifest.templates) ||
    !manifest.templates.length ||
    manifest.templates.length > 500 ||
    !Array.isArray(manifest.assets) ||
    manifest.assets.length > 1000
  ) {
    throw new Error(
      'Format cadangan tidak didukung. Pilih ZIP hasil ekspor tema.',
    );
  }
  let bytes = 0;
  const sources = new Set();
  for (const asset of manifest.assets) {
    if (
      !asset ||
      !MEDIA.test(asset.source) ||
      asset.path !== `uploads/${asset.source.split('/').at(-1)}` ||
      !/^[a-f0-9]{64}$/.test(asset.sha256) ||
      !Number.isInteger(asset.size) ||
      asset.size < 1 ||
      asset.size > 5 * 1024 * 1024 ||
      sources.has(asset.source)
    ) {
      throw new Error('Daftar gambar dalam cadangan tidak valid.');
    }
    sources.add(asset.source);
    bytes += asset.size;
  }
  if (bytes > MAX_ASSETS) {
    throw new Error(
      'Total gambar cadangan melebihi 100 MB. Ekspor lebih sedikit tema.',
    );
  }
}

function archiveEntries(buffer) {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  let end = bytes.length - 22;
  const minimum = Math.max(0, bytes.length - 65557);
  while (end >= minimum && view.getUint32(end, true) !== 0x06054b50) end--;
  if (
    end < minimum ||
    end + 22 + view.getUint16(end + 20, true) !== bytes.length ||
    view.getUint16(end + 4, true) !== 0 ||
    view.getUint16(end + 6, true) !== 0 ||
    view.getUint16(end + 8, true) !== view.getUint16(end + 10, true)
  ) {
    throw new Error('Arsip ZIP tidak valid atau tidak didukung.');
  }
  const count = view.getUint16(end + 10, true);
  const centralSize = view.getUint32(end + 12, true);
  let offset = view.getUint32(end + 16, true);
  const centralEnd = offset + centralSize;
  if (!count || count > 1002 || centralEnd !== end) {
    throw new Error('Jumlah file atau struktur cadangan tidak valid.');
  }
  const entries = new Map();
  let expanded = 0;
  const decoder = new TextDecoder('utf-8', { fatal: true });
  for (let index = 0; index < count; index++) {
    if (
      offset + 46 > centralEnd ||
      view.getUint32(offset, true) !== 0x02014b50
    ) {
      throw new Error('Daftar file ZIP rusak.');
    }
    const flags = view.getUint16(offset + 8, true);
    const method = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const size = view.getUint32(offset + 24, true);
    const nameSize = view.getUint16(offset + 28, true);
    const extraSize = view.getUint16(offset + 30, true);
    const commentSize = view.getUint16(offset + 32, true);
    const next = offset + 46 + nameSize + extraSize + commentSize;
    if (
      next > centralEnd ||
      flags & 1 ||
      method !== 0 ||
      compressedSize !== size
    ) {
      throw new Error(
        'Gunakan ZIP asli hasil ekspor tema. ZIP terenkripsi atau yang dikompresi ulang tidak didukung.',
      );
    }
    const name = decoder.decode(
      bytes.subarray(offset + 46, offset + 46 + nameSize),
    );
    if (
      entries.has(name) ||
      !(
        name === 'manifest.json' ||
        name === 'uploads/' ||
        /^uploads\/[a-f0-9-]{36}\.(png|jpg|webp)$/.test(name)
      ) ||
      size > (name === 'manifest.json' ? MAX_MANIFEST : 5 * 1024 * 1024)
    ) {
      throw new Error(
        'Nama file, ukuran, atau isi arsip tidak sesuai cadangan tema.',
      );
    }
    expanded += size;
    entries.set(name, size);
    offset = next;
  }
  if (offset !== centralEnd || expanded > MAX_ASSETS + MAX_MANIFEST) {
    throw new Error('Isi cadangan terlalu besar atau rusak.');
  }
  return entries;
}

export async function exportThemes(ids, onProgress, signal) {
  onProgress('Mengambil konfigurasi tema…');
  const { data: manifest } = await adminService.exportThemeBackup(ids, signal);
  assertManifest(manifest);
  const { default: JSZip } = await import('jszip');
  const archive = new JSZip();
  const json = JSON.stringify(manifest);
  if (new TextEncoder().encode(json).length > MAX_MANIFEST) {
    throw new Error('Data tema terlalu besar. Ekspor lebih sedikit tema.');
  }
  archive.file('manifest.json', json);
  for (const [index, asset] of manifest.assets.entries()) {
    signal?.throwIfAborted();
    onProgress(`Mengambil gambar ${index + 1} dari ${manifest.assets.length}…`);
    const response = await fetch(
      `${API_BASE_URL}/media/${asset.source.split('/').at(-1)}`,
      { credentials: 'include', signal },
    );
    if (!response.ok)
      throw new Error(`Gambar ${asset.path} belum dapat diunduh.`);
    const bytes = await response.arrayBuffer();
    if (
      bytes.byteLength !== asset.size ||
      (await checksum(bytes)) !== asset.sha256
    ) {
      throw new Error('Gambar berubah selama ekspor. Coba ekspor kembali.');
    }
    archive.file(asset.path, bytes, {
      compression: 'STORE',
      createFolders: false,
    });
  }
  onProgress('Menyiapkan file ZIP…');
  const blob = await archive.generateAsync({
    type: 'blob',
    compression: 'STORE',
  });
  signal?.throwIfAborted();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `cadangan-tema-${new Date().toISOString().replace(/[:.]/g, '-')}.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
  return manifest.templates.length;
}

export async function readThemeBackup(file, onProgress, signal) {
  if (!file || file.size > MAX_ARCHIVE || !/\.zip$/i.test(file.name)) {
    throw new Error('Pilih file cadangan ZIP maksimal 125 MB.');
  }
  onProgress('Memeriksa isi cadangan…');
  const buffer = await file.arrayBuffer();
  const entries = archiveEntries(buffer);
  if (!entries.has('manifest.json'))
    throw new Error('Manifest cadangan tidak ditemukan.');
  const { default: JSZip } = await import('jszip');
  const archive = await JSZip.loadAsync(buffer, { createFolders: false });
  let manifest;
  try {
    manifest = JSON.parse(await archive.file('manifest.json').async('string'));
  } catch {
    throw new Error('Manifest cadangan rusak atau bukan JSON yang valid.');
  }
  assertManifest(manifest);
  const expected = new Set([
    'manifest.json',
    'uploads/',
    ...manifest.assets.map((asset) => asset.path),
  ]);
  for (const name of entries.keys()) {
    if (!expected.has(name))
      throw new Error('Cadangan berisi file yang tidak dikenal.');
  }
  for (const [index, asset] of manifest.assets.entries()) {
    signal?.throwIfAborted();
    onProgress(`Memeriksa gambar ${index + 1} dari ${manifest.assets.length}…`);
    if (!archive.file(asset.path) || entries.get(asset.path) !== asset.size) {
      throw new Error(
        `Gambar ${asset.path} hilang atau ukurannya tidak cocok.`,
      );
    }
    const bytes = await archive.file(asset.path).async('arraybuffer');
    if (
      bytes.byteLength !== asset.size ||
      (await checksum(bytes)) !== asset.sha256
    ) {
      throw new Error(`Gambar ${asset.path} rusak. Buat cadangan baru.`);
    }
  }
  const { data: preview } = await adminService.inspectThemeBackup(
    manifest,
    signal,
  );
  return { manifest, archive, preview, replacements: {} };
}

export async function importThemes(prepared, mode, onProgress, signal) {
  const { manifest, archive, replacements } = prepared;
  for (const [index, asset] of manifest.assets.entries()) {
    signal?.throwIfAborted();
    onProgress(
      `Mengunggah gambar ${index + 1} dari ${manifest.assets.length}…`,
    );
    if (replacements[asset.source]) continue;
    const bytes = await archive.file(asset.path).async('uint8array');
    const type = MIME[asset.path.split('.').at(-1)];
    replacements[asset.source] = await adminService.uploadBackupImage(
      new Blob([bytes], { type }),
      asset.sha256,
      signal,
    );
  }
  signal?.throwIfAborted();
  onProgress('Menyimpan tema ke database…');
  const { data } = await adminService.restoreThemeBackup(
    manifest,
    replacements,
    mode,
    signal,
  );
  return data;
}
