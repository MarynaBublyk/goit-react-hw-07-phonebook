import { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Form, Label, Button, Input } from './ContactForm.styled';
import { ReactComponent as AddIcon } from '../icons/add.svg';

import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from '../../redux/selectors';
import { addContacts } from '../../redux/operations';

// Генерація унікальних ідентифікаторів для полів форми
const nameInputId = nanoid();
const numberInputId = nanoid();

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  // Обрабка відправки форми
  const handleSubmit = event => {
    event.preventDefault();

    const isInContacts = contacts.some(
      contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
    );

    // Перевірка чи існує контакт з таким іменем. Якщо контакт вже існує, з'являється попередження.
    if (isInContacts) {
      alert(`${name} is already in contacts`);
      return;
    }

    //Виклик функції onSubmit із батьківського компонента з передачею об'єкта контакта
    dispatch(addContacts({ name, number }));
    setName('');
    setNumber('');
  };

  // Обробка зміни значень полів форми
  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor={nameInputId}>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я\s'\-]+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>

      <Label htmlFor={numberInputId}>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="[0-9\-\(\)\+\s]+"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>

      <Button type="submit">
        <AddIcon fill="#cc0000" width="25" height="25" />
        Add contact
      </Button>
    </Form>
  );
};

export default ContactForm;
