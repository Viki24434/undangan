const text = (value) =>
  String(value ?? '')
    .normalize('NFKC')
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('id');
const same = (first, second) =>
  Boolean(text(first) && text(first) === text(second));
const photoKey = (value) => String(value || '').split(/[?#]/)[0];

export function invitationSnapshot(form) {
  return form
    ? JSON.stringify([
        form.title,
        form.slug,
        form.templateId,
        form.eventDate,
        form.status,
        form.data,
      ])
    : '';
}

export function invitationChecklist(
  form,
  baseline,
  { saved, baselineStatus = 'ready', now = Date.now() } = {},
) {
  const data = form.data || {};
  const wedding = Boolean(
    data.groom || data.bride || data.presentation?.kind === 'wedding',
  );
  const rows = [];
  function add(id, title, status, messages, section, evidence, review = false) {
    rows.push({
      id,
      title,
      status,
      messages,
      section,
      evidence: JSON.stringify([form.templateId, evidence, status, messages]),
      review,
    });
  }
  const names = wedding ? [data.groom?.name, data.bride?.name] : [data.honoree];
  const originalNames = wedding
    ? [baseline?.groom?.name, baseline?.bride?.name]
    : [baseline?.honoree];
  const family = wedding
    ? [
        data.groom?.father,
        data.groom?.mother,
        data.bride?.father,
        data.bride?.mother,
      ]
    : [data.family];
  const originalFamily = wedding
    ? [
        baseline?.groom?.father,
        baseline?.groom?.mother,
        baseline?.bride?.father,
        baseline?.bride?.mother,
      ]
    : [baseline?.family];
  const missingNames =
    [...names, ...family].some((name) => !text(name)) || !text(form.title);
  const exampleNames =
    family.some((name, index) => same(name, originalFamily[index])) ||
    names.some((name, index) => same(name, originalNames[index]));
  add(
    'names',
    wedding ? 'Nama mempelai & keluarga' : 'Nama yang dirayakan & keluarga',
    missingNames ? 'missing' : exampleNames ? 'warning' : 'ready',
    missingNames
      ? ['Lengkapi judul undangan, nama utama, dan informasi keluarga.']
      : exampleNames
        ? [
            'Ada nama yang masih sama dengan contoh template. Pastikan memang nama customer.',
          ]
        : ['Nama utama terisi. Periksa kembali ejaan dan nama keluarga.'],
    !text(form.title)
      ? 'Informasi undangan'
      : wedding
        ? 'Profil mempelai'
        : 'Tokoh & cerita acara',
    [form.title, names, data.groom, data.bride, data.family],
    true,
  );
  const date = Date.parse(form.eventDate ? `${form.eventDate}:00+07:00` : '');
  const exampleDate =
    Number.isFinite(date) && date === Date.parse(baseline?.targetDate);
  add(
    'date',
    'Tanggal & waktu acara',
    !Number.isFinite(date)
      ? 'missing'
      : exampleDate || date < now
        ? 'warning'
        : 'ready',
    !Number.isFinite(date)
      ? ['Tanggal dan waktu belum valid.']
      : exampleDate
        ? [
            'Tanggal masih sama dengan contoh template. Cocokkan dengan customer.',
          ]
        : date < now
          ? ['Tanggal acara sudah lewat. Pastikan ini disengaja.']
          : ['Tanggal terisi. Waktu pada editor menggunakan WIB.'],
    'Informasi undangan',
    form.eventDate,
    true,
  );
  const events = data.events || [];
  const incomplete = events.flatMap((event, index) => {
    const missing = [
      ['title', 'nama acara'],
      ['time', 'waktu'],
      ['venue', 'tempat'],
      ['address', 'alamat'],
    ]
      .filter(([key]) => !text(event[key]))
      .map(([, label]) => label);
    return missing.length
      ? [`Acara ${index + 1}: lengkapi ${missing.join(', ')}.`]
      : [];
  });
  const exampleVenue = events.some((event) =>
    baseline?.events?.some(
      (sample) =>
        same(event.venue, sample.venue) && same(event.address, sample.address),
    ),
  );
  add(
    'events',
    'Jadwal, tempat & alamat',
    !events.length || incomplete.length
      ? 'missing'
      : exampleVenue
        ? 'warning'
        : 'ready',
    !events.length
      ? ['Belum ada jadwal acara.']
      : incomplete.length
        ? incomplete
        : exampleVenue
          ? ['Ada tempat dan alamat yang masih sama dengan contoh template.']
          : ['Jadwal dan lokasi terisi. Periksa titik peta melalui preview.'],
    'Jadwal & lokasi',
    events,
    true,
  );
  const requiredPhotos = [
    data.image,
    ...(wedding ? [data.groom?.photo, data.bride?.photo] : []),
  ];
  const photos = [...requiredPhotos, ...(data.photos || [])].filter((value) =>
    text(value),
  );
  const examples = [
    baseline?.image,
    baseline?.groom?.photo,
    baseline?.bride?.photo,
    ...(baseline?.photos || []),
  ]
    .filter(Boolean)
    .map(photoKey);
  const examplePhoto = photos.some((value) =>
    examples.includes(photoKey(value)),
  );
  const missingPhotos = requiredPhotos.some((value) => !text(value));
  add(
    'photos',
    'Foto cover, profil & galeri',
    missingPhotos ? 'missing' : examplePhoto ? 'warning' : 'ready',
    missingPhotos
      ? ['Lengkapi foto cover dan foto profil yang digunakan.']
      : examplePhoto
        ? [
            'Masih ada foto yang sama dengan contoh template. Periksa kepemilikan dan urutannya.',
          ]
        : [
            `${photos.length} foto terisi. Periksa potongan dan urutannya di preview.`,
          ],
    !text(data.image)
      ? 'Informasi undangan'
      : wedding && (!text(data.groom?.photo) || !text(data.bride?.photo))
        ? 'Profil mempelai'
        : 'Foto slideshow & galeri',
    photos,
    true,
  );
  const music = data.musicEnabled !== false;
  add(
    'music',
    'Musik latar',
    'ready',
    [
      music
        ? data.musicUrl
          ? 'Musik pilihan terpasang. Dengarkan melalui preview.'
          : 'Musik bawaan tema digunakan. Dengarkan melalui preview.'
        : 'Musik sengaja dinonaktifkan.',
    ],
    'Musik undangan',
    [music, data.musicUrl],
    true,
  );
  const banks = data.banks || [];
  const badBank = banks.some(
    (bank) => !text(bank.name) || !text(bank.rek) || !text(bank.owner),
  );
  const sampleBank = banks.some(
    (bank) =>
      /^(0+|1+|1234567890|123456789|9876543210)$/.test(
        String(bank.rek).replace(/\s/g, ''),
      ) ||
      baseline?.banks?.some(
        (sample) =>
          same(bank.rek, sample.rek) && same(bank.owner, sample.owner),
      ),
  );
  add(
    'banks',
    'Rekening hadiah',
    !banks.length
      ? 'optional'
      : badBank
        ? 'missing'
        : sampleBank
          ? 'warning'
          : 'ready',
    !banks.length
      ? ['Tidak digunakan. Rekening hadiah bersifat opsional.']
      : badBank
        ? ['Lengkapi bank, nomor rekening, dan nama pemilik.']
        : sampleBank
          ? [
              'Ada rekening yang menyerupai data contoh. Cocokkan dengan customer.',
            ]
          : ['Rekening terisi. Pastikan nomor dan pemilik sudah benar.'],
    wedding ? 'Rekening hadiah' : 'Informasi undangan',
    banks,
    banks.length > 0,
  );
  const matchesSaved = Boolean(
    saved && invitationSnapshot(saved) === invitationSnapshot(form),
  );
  add(
    'saved',
    'Versi tersimpan',
    matchesSaved ? 'ready' : 'warning',
    [
      matchesSaved
        ? 'Data sama dengan versi tersimpan.'
        : 'Ada perubahan yang belum disimpan. Simpan sebelum mengirim link preview customer.',
    ],
    'Informasi undangan',
    invitationSnapshot(form),
  );
  add(
    'preview',
    'Pemeriksaan tampilan akhir',
    'warning',
    [
      'Buka preview, periksa foto, peta, musik, dan tampilan ponsel. Persetujuan customer tetap melalui WhatsApp.',
    ],
    null,
    invitationSnapshot(form),
    true,
  );
  if (baselineStatus !== 'ready')
    add(
      'baseline',
      'Pembanding data contoh',
      'warning',
      [
        baselineStatus === 'loading'
          ? 'Sedang memuat contoh template untuk dibandingkan.'
          : 'Contoh template belum dapat dimuat. Pemeriksaan data contoh belum lengkap.',
      ],
      null,
      baselineStatus,
    );
  return rows;
}
