import { configureStore } from '@reduxjs/toolkit';

import userSlice, { userActions } from './userSlice.ts';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

store.dispatch(userActions.checkLogin());

export default store;
