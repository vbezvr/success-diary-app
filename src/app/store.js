import { configureStore } from '@reduxjs/toolkit';
import diaryApp from '../features/reducer';

export const store = configureStore({
  reducer: diaryApp
});
