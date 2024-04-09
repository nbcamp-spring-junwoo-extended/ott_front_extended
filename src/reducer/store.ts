import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice.ts';
import cardSlice from './cardSlice.ts';

const store = configureStore({
  reducer: {
    user: userSlice,
    card: cardSlice,
  },
});

export default store;
