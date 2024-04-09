import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    token: '',
    isLogin: false,
  },
  reducers: {
    checkLogin: (state) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        state.token = token;
        state.isLogin = true;
      }

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
    clearUser: (state) => {
      state.username = '';
      state.token = '';
      localStorage.removeItem('access_token');
      state.isLogin = false;

      return state;
    },
  },
});

export type UserSliceType = {
  username: string;
  token: string;
  isLogin: boolean;
};

export const userActions = userSlice.actions;
export default userSlice.reducer;
