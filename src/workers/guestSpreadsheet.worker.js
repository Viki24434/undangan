import ExcelJS from 'exceljs';
import { cleanGuest, GUEST_LIMIT, guestNameKey } from '../services/guestList';

const columns = ['Nama Tamu', 'No. WhatsApp', 'Kelompok', 'Catatan'];

function checkArchive(buffer) {
  const view = new DataView(buffer);
  let end = -1;
  for (
    let position = buffer.byteLength - 22;
    position >= Math.max(0, buffer.byteLength - 65557);
    position -= 1
  ) {
    if (view.getUint32(position, true) === 0x06054b50) {
      end = position;
      break;
    }
  }
  if (end < 0) throw new Error('File bukan workbook .xlsx yang valid.');
  const count = view.getUint16(end + 10, true);
  let position = view.getUint32(end + 16, true);
  let expanded = 0;
  if (!count || count > 250)
    throw new Error('Workbook terlalu rumit. Gunakan contoh Excel.');
  for (let index = 0; index < count; index += 1) {
    if (position + 46 > end || view.getUint32(position, true) !== 0x02014b50)
      throw new Error('Struktur file Excel tidak valid.');
    expanded += view.getUint32(position + 24, true);
    if (expanded > 32 * 1024 * 1024)
      throw new Error(
        'Isi workbook terlalu besar. Gunakan file khusus daftar tamu.',
      );
    position +=
      46 +
      view.getUint16(position + 28, true) +
      view.getUint16(position + 30, true) +
      view.getUint16(position + 32, true);
  }
}

function cellText(cell) {
  const value = cell.value;
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' && Number.isSafeInteger(value))
    return String(value);
  if (value.richText) return value.richText.map((part) => part.text).join('');
  throw new Error(
    'Gunakan teks biasa, bukan rumus, tanggal, atau tautan pada kolom isian.',
  );
}

async function readFile(file) {
  if (!/\.xlsx$/i.test(file.name) || file.size > 2 * 1024 * 1024)
    throw new Error('Gunakan file .xlsx maksimal 2 MB.');
  const buffer = await file.arrayBuffer();
  checkArchive(buffer);
  const workbook = new ExcelJS.Workbook();
  try {
    await workbook.xlsx.load(buffer);
  } catch {
    throw new Error(
      'File Excel tidak dapat dibaca. Simpan ulang sebagai .xlsx atau gunakan file contoh.',
    );
  }
  const sheet = workbook.getWorksheet('Daftar Tamu');
  if (!sheet)
    throw new Error(
      'Sheet "Daftar Tamu" tidak ditemukan. Gunakan contoh Excel.',
    );
  if (sheet.rowCount > GUEST_LIMIT + 1)
    throw new Error(
      'Maksimal 5.000 baris tamu. Hapus baris atau format tambahan di bawah tabel.',
    );
  const header = sheet.getRow(1);
  const indexes = columns.map((name) => {
    let found = 0;
    header.eachCell((cell, index) => {
      if (cellText(cell).trim().toLowerCase() === name.toLowerCase())
        found = index;
    });
    if (!found)
      throw new Error(`Kolom "${name}" tidak ditemukan pada baris pertama.`);
    return found;
  });
  let sentIndex = 0;
  header.eachCell((cell, index) => {
    if (cellText(cell).trim() === 'Status Kirim') sentIndex = index;
  });
  const guests = [];
  const issues = [];
  const names = new Set();
  let duplicates = 0;
  let invalid = 0;
  for (let rowNumber = 2; rowNumber <= sheet.rowCount; rowNumber += 1) {
    try {
      const row = sheet.getRow(rowNumber);
      const values = indexes.map((index) => cellText(row.getCell(index)));
      if (values.every((value) => !value.trim())) continue;
      const [name, phone, group, note] = values;
      if (
        typeof row.getCell(indexes[1]).value === 'number' &&
        phone.startsWith('8')
      )
        throw new Error(
          'Nomor WhatsApp kehilangan angka 0. Ubah format menjadi Text, lalu isi ulang dengan 08 atau 62.',
        );
      const sentText = sentIndex ? cellText(row.getCell(sentIndex)).trim() : '';
      if (sentText && !['Sudah dikirim', 'Belum dikirim'].includes(sentText))
        throw new Error(
          'Status Kirim harus "Sudah dikirim" atau "Belum dikirim".',
        );
      const guest = cleanGuest({
        name,
        phone,
        group,
        note,
        sent: sentText === 'Sudah dikirim',
      });
      const key = guestNameKey(guest.name);
      if (names.has(key)) {
        duplicates += 1;
        continue;
      }
      names.add(key);
      guests.push(guest);
    } catch (error) {
      invalid += 1;
      if (issues.length < 20)
        issues.push(`Baris ${rowNumber}: ${error.message}`);
    }
  }
  return { guests, issues, invalid, duplicates };
}

async function exportFile({ guests, links }) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'ciptain';
  const sheet = workbook.addWorksheet('Daftar Tamu', {
    views: [{ state: 'frozen', ySplit: 1, showGridLines: false }],
  });
  sheet.columns = [...columns, 'Status Kirim', 'Link Undangan'].map(
    (header, index) => ({
      header,
      width: [32, 24, 22, 40, 22, 65][index],
      style: {
        font: { name: 'Arial', size: 11 },
        numFmt: '@',
        alignment: { vertical: 'middle', wrapText: true },
      },
    }),
  );
  for (const guest of guests) {
    const row = sheet.addRow([
      guest.name,
      guest.phone,
      guest.group,
      guest.note,
      guest.sent ? 'Sudah dikirim' : 'Belum dikirim',
      links[guest.id] || '',
    ]);
    row.height = 32;
  }
  sheet.getRow(1).height = 32;
  sheet.getRow(1).eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF243E35' },
    };
    cell.font = {
      name: 'Arial',
      size: 11,
      bold: true,
      color: { argb: 'FFFFFFFF' },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });
  sheet.autoFilter = { from: 'A1', to: `F${Math.max(1, sheet.rowCount)}` };
  return workbook.xlsx.writeBuffer();
}

self.onmessage = async ({ data: { type, payload } }) => {
  try {
    const result =
      type === 'import' ? await readFile(payload) : await exportFile(payload);
    self.postMessage({ result });
  } catch (error) {
    self.postMessage({ error: error.message || 'File Excel gagal diproses.' });
  }
};
