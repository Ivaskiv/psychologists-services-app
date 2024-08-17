import { createSlice } from '@reduxjs/toolkit';
import {
  addFavoritesPsychologists,
  fetchAllPsychologists,
  fetchUserFavorites,
  removeFavoritePsychologist,
} from './psychologistsOperation.js';

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState: {
    data: [],
    totalPsychologistsCount: 0,
    currentPage: 1,
    itemsPerPage: 3,
    filter: '',
    sortType: 'A to Z',
    hasMore: true,
    status: 'idle',
    error: null,
    favoriteIds: [],
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.currentPage = 1;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
      state.currentPage = 1;
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    setFavoriteIds: (state, action) => {
      state.favoriteIds = action.payload;
    },
    addFavoriteId: (state, action) => {
      const id = action.payload;
      if (!state.favoriteIds.includes(id)) {
        state.favoriteIds.push(id);
      }
    },
    removeFavoriteId: (state, action) => {
      const id = action.payload;
      state.favoriteIds = state.favoriteIds.filter(favoriteId => favoriteId !== id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllPsychologists.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllPsychologists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.psychologists;
        state.totalPsychologistsCount = action.payload.totalCount;
        state.hasMore = state.data.length < state.totalPsychologistsCount;
      })
      .addCase(fetchAllPsychologists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        state.favoriteIds = action.payload;
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        console.error('Error fetching user favorites:', action.payload);
      })
      .addCase(addFavoritesPsychologists.fulfilled, (state, action) => {
        state.favoriteIds.push(action.payload);
      })
      .addCase(removeFavoritePsychologist.fulfilled, (state, action) => {
        state.favoriteIds = state.favoriteIds.filter(id => id !== action.payload);
      });
  },
});

export const {
  setPage,
  setFilter,
  setSortType,
  setHasMore,
  addFavoriteId,
  removeFavoriteId,
  setItemsPerPage,
  setFavoriteIds,
} = psychologistsSlice.actions;

export default psychologistsSlice.reducer;
