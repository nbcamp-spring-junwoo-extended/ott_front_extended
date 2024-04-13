import { configureStore } from '@reduxjs/toolkit';

import cardSlice from './cardSlice.ts';
import userSlice, { userActions } from './userSlice.ts';

const store = configureStore({
  reducer: {
    card: cardSlice,
    user: userSlice,
  },
});

store.dispatch(userActions.checkLogin());

export default store;
