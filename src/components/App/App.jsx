import { getContacts } from '../../redux/selectors';
import { useSelector } from 'react-redux';
import { Container, Title, SubTitle, Wrapper } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';

const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm />
      <SubTitle>Contacts</SubTitle>
      {contacts.length > 0 ? (
        // Якщо є контакти, показуємо компонент фільтрації
        <Filter />
      ) : (
        // Якщо немає контактів, виводимо повідомлення про відсутність контактів
        <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
      )}
      {contacts.length > 0 && (
        // Якщо є контакти, показуємо компонент списку контактів
        <ContactList />
      )}
    </Container>
  );
};

export default App;
