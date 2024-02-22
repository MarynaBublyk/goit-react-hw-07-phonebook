import { createSlice, isAnyOf } from '@reduxjs/toolkit';
// Імпорт асинхронних Thunk-дій fetchContacts, addContacts, deleteContacts з файлу './operations'
import { fetchContacts, addContacts, deleteContacts } from './operations';

// // Исходные контакты телефона
// const phoneContacts = {
//   items: [
//     { id: 'id-1', name: 'Timothée Chalamet', number: '459-12-56' },
//     { id: 'id-2', name: 'Zendaya', number: '443-89-12' },
//     { id: 'id-3', name: 'Rebecca Ferguson', number: '645-17-79' },
//     { id: 'id-4', name: 'Javier Bardem', number: '427-91-26' },
//   ],
// };

// Визначення функції getActions, яка повертає умову isAnyOf для зазначеного типу дії
const getActions = type =>
  isAnyOf(fetchContacts[type], addContacts[type], deleteContacts[type]);

// Початковий стан для slice contactsSlice
const initialState = { items: [], isLoading: false, error: null };

// Створення slice для керування контактами
const contactsSlice = createSlice({
  name: 'contacts', // ім'я для slice
  initialState, // Початковий стан контактів
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        // Обробка успішного виконання fetchContacts
        state.items = action.payload; // Оновлення списку контактів у стані
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        // Обробка успішного виконання addContacts
        state.items.unshift(action.payload); // Додавання нового контакту на початок списку контактів може
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        // Обробка успішного виконання deleteContacts
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1); // Видалення контакту зі списку
      })

      .addMatcher(getActions('pending'), state => {
        // Обробка дій зі статусом 'pending' очікування
        state.isLoading = true; // Установка прапора isLoading true
      })
      .addMatcher(getActions('rejected'), (state, action) => {
        // Обробка дій зі статусом 'rejected' відхилено
        state.isLoading = false; // Скидання прапора isLoading false
        state.error = action.payload; // Встановлення повідомлення про помилку
      })
      .addMatcher(getActions('fulfilled'), state => {
        // Обробка дій зі статусом 'fulfilled' виконано
        state.isLoading = false; // Скидання прапора isLoading false
        state.error = null; // Скидання повідомлення про помилку null
      }),
});

// Експорт дій addContact и deleteContact зі slice контактов
export const { addContact, deleteContact } = contactsSlice.actions;

// Експорт редуктора (reducer) contactsReducer з slice contactsSlice
export const contactsReducer = contactsSlice.reducer;
