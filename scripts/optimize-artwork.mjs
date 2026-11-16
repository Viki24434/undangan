import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const directory = path.join(root, 'public/assets/png');
const backupIndex = process.argv.indexOf('--backup-dir');
const backup = backupIndex >= 0 ? process.argv[backupIndex + 1] : null;
if (backupIndex >= 0 && !backup) throw new Error('Isi lokasi --backup-dir.');
const files = [];
async function scan(folder) {
  for (const entry of await fs.readdir(folder, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;
    const target = path.join(folder, entry.name);
    if (entry.isDirectory()) await scan(target);
    else if (/\.png$/i.test(entry.name)) files.push(target);
  }
}
await scan(directory);
sharp.concurrency(1);
let cursor = 0;
let finished = 0;
let changed = 0;
let before = 0;
let after = 0;
async function worker() {
  while (cursor < files.length) {
    const file = files[cursor++];
    const input = await fs.readFile(file);
    const output = await sharp(input)
      .keepMetadata()
      .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
      .toBuffer();
    before += input.length;
    if (output.length < input.length * 0.95) {
      const original = await sharp(input)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      const optimized = await sharp(output)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      if (
        original.info.width !== optimized.info.width ||
        original.info.height !== optimized.info.height ||
        !original.data.equals(optimized.data)
      ) {
        throw new Error(`Piksel berubah: ${file}`);
      }
      if (backup) {
        const destination = path.join(
          path.resolve(backup),
          path.relative(directory, file),
        );
        await fs.mkdir(path.dirname(destination), { recursive: true });
        await fs.copyFile(file, destination, fs.constants.COPYFILE_EXCL);
      }
      await fs.writeFile(file, output);
      after += output.length;
      changed++;
    } else after += input.length;
    finished++;
    if (finished % 25 === 0)
      process.stdout.write(`${finished}/${files.length} diperiksa\n`);
  }
}
await Promise.all(Array.from({ length: 4 }, worker));
process.stdout.write(
  JSON.stringify({
    files: files.length,
    changed,
    before,
    after,
    saved: before - after,
    reduction: `${Math.round((1 - after / before) * 100)}%`,
  }) + '\n',
);
