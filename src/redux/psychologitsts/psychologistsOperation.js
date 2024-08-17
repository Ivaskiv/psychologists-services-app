//psychologistsOperation.js;
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get, remove } from 'firebase/database';
import { db } from '../../firebaseConfig';

export const fetchAllPsychologists = createAsyncThunk(
  'psychologists/fetchAllPsychologists',
  async (_, { dispatch }) => {
    try {
      const snapshot = await get(ref(db, 'psychologists'));
      const data = snapshot.val() || [];
      const psychologists = Object.entries(data).map(([key, value]) => ({
        ...value,
        id: key,
      }));
      return {
        psychologists,
        totalCount: psychologists.length,
      };
    } catch (error) {
      console.error('Error loading psychologists:', error);
      throw error;
    }
  }
);

export const fetchUserFavorites = createAsyncThunk(
  'psychologists/fetchUserFavorites',
  async (userId, { rejectWithValue }) => {
    try {
      const snapshot = await get(ref(db, `users/${userId}/favorites`));
      const data = snapshot.val() || {};
      const favoriteIds = Object.keys(data);

      console.log('Fetched favorite IDs:', favoriteIds);

      return favoriteIds;
    } catch (error) {
      console.error('Error fetching user favorites:', error.message);

      return rejectWithValue(error.message);
    }
  }
);

export const addFavoritesPsychologists = createAsyncThunk(
  'psychologists/addFavoritePsychologists',
  async ({ userId, psychologistId }) => {
    try {
      await set(ref(db, `users/${userId}/favorites/${psychologistId}`), true);
      return psychologistId;
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  }
);

export const removeFavoritePsychologist = createAsyncThunk(
  'psychologists/removeFavoritePsychologist',
  async ({ userId, psychologistId }) => {
    try {
      await remove(ref(db, `users/${userId}/favorites/${psychologistId}`));
      return psychologistId;
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }
);
