import { createSlice } from '@reduxjs/toolkit';

const cardSlice = createSlice({
  initialState: {
    cards: <UserCard>[],
  },
  name: 'card',
  reducers: {
    updateCards: (state, action) => {
      state.cards = action.payload.cards;

      return state;
    },
  },
});

export type UserCard = {
  cardId: number;
  cardNickname: string;
  cardNumber: string;
};

export const cardActions = cardSlice.actions;
export default cardSlice.reducer;
