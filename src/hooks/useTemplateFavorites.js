import { useSyncExternalStore } from 'react';
import {
  favoriteSnapshot,
  favoriteStorageError,
  subscribeFavorites,
  toggleFavorite,
} from '../services/templateFavorites';

export default function useTemplateFavorites() {
  const favorites = useSyncExternalStore(subscribeFavorites, favoriteSnapshot);
  return { favorites, toggleFavorite, error: favoriteStorageError() };
}
