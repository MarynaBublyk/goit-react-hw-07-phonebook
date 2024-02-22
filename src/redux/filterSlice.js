import { createSlice } from '@reduxjs/toolkit';

// Створення slice фильтра с использованием createSlice
const filterSlice = createSlice({
  name: 'filter', // ім'я slice фільтра
  initialState: '', // Початковий стан фільтра
  reducers: {
    // Визначення редуктора changeFilter, який змінюватиме стан фільтра на основі переданої дії action
    changeFilter(state, action) {
      return (state = action.payload);
    },
  },
});

// Експорт дії action changeFilter sз slice фsльтра
export const { changeFilter } = filterSlice.actions;

// Експорт редьюсера фильтра із slice фільтра
export const filterReducer = filterSlice.reducer;
