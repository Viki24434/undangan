const MAX_INPUT = 10 * 1024 * 1024;
const MAX_OUTPUT = 5 * 1024 * 1024;
const MAX_SIDE = 1600;
const TARGET_BYTES = 350 * 1024;

async function decodeImage(file) {
  if (typeof createImageBitmap === 'function') {
    const bitmap = await createImageBitmap(file);
    return {
      image: bitmap,
      width: bitmap.width,
      height: bitmap.height,
      close: () => bitmap.close(),
    };
  }
  const url = URL.createObjectURL(file);
  const image = new Image();
  try {
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = () => reject(new Error('Gambar tidak dapat dibaca.'));
      image.src = url;
    });
    return {
      image,
      width: image.naturalWidth,
      height: image.naturalHeight,
      close: () => URL.revokeObjectURL(url),
    };
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

function encode(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob
          ? resolve(blob)
          : reject(new Error('Gambar belum dapat diproses.')),
      type,
      quality,
    );
  });
}

export async function prepareImage(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
    throw new Error('Gunakan gambar JPG, PNG, atau WebP.');
  if (!file.size) throw new Error('File gambar kosong.');
  if (file.size > MAX_INPUT) throw new Error('Ukuran gambar maksimal 10 MB.');
  let decoded;
  const canvas = document.createElement('canvas');
  try {
    decoded = await decodeImage(file);
    if (
      !decoded.width ||
      !decoded.height ||
      decoded.width * decoded.height > 40000000
    )
      throw new Error(
        'Resolusi gambar maksimal 40 megapiksel. Kecilkan foto terlebih dahulu.',
      );
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Browser belum dapat memproses gambar.');
    let best;
    let outputType = 'image/webp';
    for (const side of [MAX_SIDE, 1280, 1024]) {
      const scale = Math.min(1, side / Math.max(decoded.width, decoded.height));
      canvas.width = Math.max(1, Math.round(decoded.width * scale));
      canvas.height = Math.max(1, Math.round(decoded.height * scale));
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(decoded.image, 0, 0, canvas.width, canvas.height);
      for (const quality of [0.84, 0.76, 0.68]) {
        let candidate = await encode(canvas, outputType, quality);
        if (outputType === 'image/webp' && candidate.type !== 'image/webp') {
          outputType = file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png';
          candidate = await encode(canvas, outputType, quality);
        }
        if (!best || candidate.size < best.size) best = candidate;
        if (candidate.size <= TARGET_BYTES) break;
        if (outputType === 'image/png') break;
      }
      if (
        best.size <= TARGET_BYTES ||
        Math.max(canvas.width, canvas.height) <= 1024
      )
        break;
    }
    if (
      file.size <= best.size &&
      file.size <= MAX_OUTPUT &&
      Math.max(decoded.width, decoded.height) <= MAX_SIDE
    )
      return file;
    if (best.size > MAX_OUTPUT)
      throw new Error(
        'Gambar masih terlalu besar setelah diproses. Pilih foto dengan resolusi lebih kecil.',
      );
    return best;
  } catch (error) {
    if (error instanceof Error && !(error instanceof DOMException)) throw error;
    throw new Error(
      'Gambar rusak atau tidak didukung browser. Coba ekspor ulang sebagai JPG, PNG, atau WebP.',
      { cause: error },
    );
  } finally {
    decoded?.close();
    canvas.width = 1;
    canvas.height = 1;
  }
}

export function imageSizeText(bytes) {
  return bytes >= 1024 * 1024
    ? (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    : Math.max(1, Math.round(bytes / 1024)) + ' KB';
}

export function imageSavings(before, after) {
  const saved = Math.max(0, Math.round((1 - after / before) * 100));
  return saved
    ? imageSizeText(before) +
        ' \u2192 ' +
        imageSizeText(after) +
        ' (' +
        saved +
        '% lebih kecil)'
    : 'Ukuran foto: ' + imageSizeText(after) + '.';
}

export function imageDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Gambar belum dapat dibaca.'));
    reader.readAsDataURL(blob);
  });
}
