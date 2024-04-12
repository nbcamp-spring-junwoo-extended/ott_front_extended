import { createSlice } from '@reduxjs/toolkit';

const cardSlice = createSlice({
  name: 'card',
  initialState: {
    cards: <UserCard>[],
  },
  reducers: {
    updateCards: (state, action) => {
      state.cards = action.payload.cards;

      return state;
    },
  },
});

export type UserCard = {
  cardId: number;
  cardNumber: string;
  cardNickname: string;
};

export const cardActions = cardSlice.actions;
export default cardSlice.reducer;
