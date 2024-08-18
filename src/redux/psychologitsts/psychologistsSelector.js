//psychologistsSelector.js
import { createSelector } from 'reselect';

export const selectPsychologists = state => state.psychologists.data;
export const selectPsychologistsStatus = state => state.psychologists.status;
export const selectFilter = state => state.psychologists.filter;
export const selectSortType = state => state.psychologists.sortType;
export const selectItemsPerPage = state => state.psychologists.itemsPerPage;
export const selectHasMore = state => state.psychologists.hasMore;
export const selectFavoriteIds = state => state.psychologists.favoriteIds;

export const selectFilteredPsychologists = createSelector(
  [selectPsychologists, selectFilter],
  (psychologists, filter) => {
    if (!filter.trim()) return psychologists;
    return psychologists.filter(psychologist =>
      psychologist.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export const selectSortedPsychologists = createSelector(
  [selectFilteredPsychologists, selectSortType],
  (filteredPsychologists, sortType) => {
    switch (sortType) {
      case 'A to Z':
        return filteredPsychologists.slice().sort((a, b) => a.name.localeCompare(b.name));
      case 'Z to A':
        return filteredPsychologists.slice().sort((a, b) => b.name.localeCompare(a.name));
      case 'Less than 10$':
        return filteredPsychologists.filter(psychologist => psychologist.price_per_hour < 10);
      case 'Greater than 10$':
        return filteredPsychologists.filter(psychologist => psychologist.price_per_hour >= 10);
      case 'Popular':
        return filteredPsychologists.slice().sort((a, b) => b.rating - a.rating);
      case 'Not popular':
        return filteredPsychologists.slice().sort((a, b) => a.rating - b.rating);
      case 'Show all':
        return filteredPsychologists;
      default:
        return filteredPsychologists;
    }
  }
);

export const selectFavoritePsychologists = createSelector(
  [selectPsychologists, selectFavoriteIds],
  (psychologists, favoriteIds) => {
    return psychologists.filter(psychologist => favoriteIds.includes(psychologist.id));
  }
);
export const selectFilteredAndSortedFavorites = createSelector(
  [selectFavoritePsychologists, selectFilter, selectSortType],
  (favoritePsychologists, filter, sortType) => {
    let filtered = favoritePsychologists;

    if (filter.trim()) {
      filtered = filtered.filter(psychologist =>
        psychologist.name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    switch (sortType) {
      case 'A to Z':
        return filtered.slice().sort((a, b) => a.name.localeCompare(b.name));
      case 'Z to A':
        return filtered.slice().sort((a, b) => b.name.localeCompare(a.name));
      case 'Less than 10$':
        return filtered.filter(psychologist => psychologist.price_per_hour < 10);
      case 'Greater than 10$':
        return filtered.filter(psychologist => psychologist.price_per_hour >= 10);
      case 'Popular':
        return filtered.slice().sort((a, b) => b.rating - a.rating);
      case 'Not popular':
        return filtered.slice().sort((a, b) => a.rating - b.rating);
      case 'Show all':
        return filtered;
      default:
        return filtered;
    }
  }
);
