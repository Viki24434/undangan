import { useState } from 'react';
import { createCalendarEvent } from './calendar';

export default function CalendarButton({ event, targetDate }) {
  const [status, setStatus] = useState('');

  function downloadCalendar() {
    try {
      const calendar = createCalendarEvent(event, targetDate);
      const url = URL.createObjectURL(
        new Blob([calendar], { type: 'text/calendar;charset=utf-8' }),
      );
      const link = document.createElement('a');
      link.href = url;
      link.download = `${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus('Buka file kalender yang diunduh untuk menyimpan jadwal.');
    } catch {
      setStatus('Jadwal belum bisa diunduh. Silakan catat waktu acara.');
    }
  }

  return (
    <div className="invitation-calendar">
      <button
        type="button"
        className="invitation-calendar-button"
        onClick={downloadCalendar}
      >
        Simpan ke kalender ↓
      </button>
      <p role="status">{status}</p>
    </div>
  );
}
