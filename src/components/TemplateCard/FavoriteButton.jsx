import useTemplateFavorites from '../../hooks/useTemplateFavorites';

export default function FavoriteButton({ template }) {
  const { favorites, toggleFavorite } = useTemplateFavorites();
  const selected = favorites.includes(template.id);
  return (
    <button
      type="button"
      className="template-favorite"
      aria-label={`${selected ? 'Hapus' : 'Simpan'} ${template.name} ${selected ? 'dari' : 'ke'} favorit`}
      aria-pressed={selected}
      onClick={() => toggleFavorite(template.id)}
      title={selected ? 'Hapus dari favorit' : 'Simpan di perangkat ini'}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill={selected ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path d="M20.5 5.8a5.2 5.2 0 0 0-7.3 0L12 7l-1.2-1.2a5.2 5.2 0 0 0-7.3 7.4L12 21l8.5-7.8a5.2 5.2 0 0 0 0-7.4Z" />
      </svg>
    </button>
  );
}
