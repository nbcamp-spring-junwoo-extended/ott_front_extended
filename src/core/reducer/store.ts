import { configureStore } from '@reduxjs/toolkit';

import userSlice, { userActions } from './userSlice.ts';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

store.dispatch(userActions.checkLogin());

export default store;
