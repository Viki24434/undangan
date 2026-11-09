import { createPortal } from 'react-dom';

export default function DesignBackdrops({ items }) {
  return items.map((item) => {
    const host = document.querySelector(
      `[data-design-backdrop-mount="${item.mount}"]`,
    );
    const label = item.side === 'before' ? 'Latar kiri' : 'Latar kanan';
    return host
      ? createPortal(
          <span
            className="template-design-backdrop-group"
            data-backdrop-group={`${item.mount}-${item.side}`}
            data-design-ornament={`${label} · kelompok`}
            data-design-key={`background-${item.side}`}
            data-design-extra="true"
            style={item.style}
          >
            {item.layers.map((layer, index) => (
              <span
                key={index}
                className="template-design-backdrop-art"
                data-design-ornament={`${label} · gambar ${index + 1}`}
                data-design-key={`background-${item.side}-art-${index}`}
                data-design-extra="true"
                data-backdrop-index={index}
                style={{
                  backgroundImage: layer.image,
                  backgroundPosition: layer.position,
                  backgroundSize: layer.size,
                  backgroundRepeat: layer.repeat,
                  zIndex: item.layers.length - index,
                }}
              />
            ))}
          </span>,
          host,
          `${item.mount}-${item.side}`,
        )
      : null;
  });
}
