import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithCustomToken,
} from 'firebase/auth';
import axios from 'axios';
import { auth } from '../../firebaseConfig';

// дія для входу в систему
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Firebase для входу
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      console.error('Login action failed:', error.message); // Покращене логування
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

// дія для реєстрації нового користувача
export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      return {
        displayName: userCredential.user.displayName,
        uid: userCredential.user.uid,
        providerId: userCredential.user.providerId,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

// дія для виходу з системи
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    return {};
  } catch (error) {
    return rejectWithValue(error.message || 'Logout failed');
  }
});
