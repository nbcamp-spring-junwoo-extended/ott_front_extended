import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  initialState: {
    isLogin: false,
    token: '',
    userId: 0,
    username: '',
  },
  name: 'user',
  reducers: {
    checkLogin: (state) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        state.token = token;
        state.isLogin = true;
      }

      return state;
    },
    clearUser: (state) => {
      state.username = '';
      state.token = '';
      localStorage.removeItem('access_token');
      state.isLogin = false;

      return state;
    },
    login: (state, action) => {
      state.username = action.payload.username;

      state.token = action.payload.token;
      localStorage.setItem('access_token', state.token);

      state.isLogin = true;

      return state;
    },
    updateToken: (state, action) => {
      state.token = action.payload.token;

      return state;
    },
    updateUserId: (state, action) => {
      state.userId = action.payload.userId;
      return state;
    },
  },
});

export type UserSliceType = {
  isLogin: boolean;
  token: string;
  username: string;
};

export const userActions = userSlice.actions;
export default userSlice.reducer;
