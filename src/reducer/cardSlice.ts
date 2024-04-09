import { createSlice } from '@reduxjs/toolkit';

const cardSlice = createSlice({
  name: 'card',
  initialState: {
    cards: [],
  },
  reducers: {
    updateCards: (state, action) => {
      state.cards = action.payload.cards;

      return state;
    },
  },
});

export type CardSliceType = {
  username: string;
  token: string;
  isLogin: boolean;
};

export const cardActions = cardSlice.actions;
export default cardSlice.reducer;
