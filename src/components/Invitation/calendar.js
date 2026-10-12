function escapeText(value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}

function formatDate(value) {
  return value
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

function foldLine(value) {
  const encoder = new TextEncoder();
  const lines = [];
  let line = '';
  let length = 0;

  for (const character of value) {
    const size = encoder.encode(character).length;
    if (length + size > 75) {
      lines.push(line);
      line = ' ';
      length = 1;
    }
    line += character;
    length += size;
  }

  lines.push(line);
  return lines.join('\r\n');
}

export function createCalendarEvent(event, targetDate, now = new Date()) {
  const times = [...event.time.matchAll(/(\d{1,2})[.:](\d{2})/g)];
  const start = new Date(targetDate);
  if (times[0]) {
    const date = targetDate.slice(0, 10);
    start.setTime(
      new Date(
        `${date}T${times[0][1].padStart(2, '0')}:${times[0][2]}:00+07:00`,
      ).getTime(),
    );
  }
  let end = new Date(start.getTime() + 60 * 60 * 1000);
  if (times[1]) {
    end = new Date(
      `${targetDate.slice(0, 10)}T${times[1][1].padStart(2, '0')}:${times[1][2]}:00+07:00`,
    );
    if (end <= start) end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
  }
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime())) {
    throw new Error('Jadwal acara tidak valid.');
  }
  const uid = `${start.getTime()}-${encodeURIComponent(event.title)}@ciptain.local`;
  return (
    [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Ciptain//Invitation//ID',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatDate(now)}`,
      `DTSTART:${formatDate(start)}`,
      `DTEND:${formatDate(end)}`,
      `SUMMARY:${escapeText(event.title)}`,
      `LOCATION:${escapeText(`${event.venue}, ${event.address}`)}`,
      `DESCRIPTION:${escapeText(`${event.date} | ${event.time}`)}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ]
      .map(foldLine)
      .join('\r\n') + '\r\n'
  );
}
