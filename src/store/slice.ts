import { createSlice } from '@reduxjs/toolkit';
import { CharactaeDetailData } from '../types';

export interface SavedState {
  items: Array<CharactaeDetailData>;
  data: [];
}

const initialState: SavedState = { items: [], data: [] };

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const isExist = state.items.find((item) => item.id == action.payload?.id);
      if (!isExist) {
        state.items.push({
          ...action.payload,
        });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    removeAllItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, removeAllItems } = savedSlice.actions;

export default savedSlice.reducer;
