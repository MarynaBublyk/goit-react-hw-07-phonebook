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
      },
    },
    prepare(newContact) {
      return {
        payload: { id: nanoid(), ...newContact }, // Подготовка данных для добавления контакта с уникальным идентификатором
      };
    },
    removeContact(state, action) {
      const index = state.items.findIndex(
        contact => contact.id !== action.payload
      );
      state.items.splice(index, 1); // Удаление контакта из списка контактов
    },
  },
});

// Экспорт действий addContact и removeContact из slice контактов
export const { addContact, removeContact } = contactsSlice.actions;

// Создание персистентного редьюсера для сохранения состояния контактов с использованием redux-persist
export const contactsReducer = persistReducer(
  { key: 'contacts', storage },
  contactsSlice.reducer
);
