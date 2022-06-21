import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import { Container } from './App.styled';
import { IValues } from '../ContactForm/ContactForm';


const getInitialContactsState = () => {
  const savedContacts = localStorage.getItem('contacts');

  return savedContacts ? JSON.parse(savedContacts) : [];
};



function App() {
  const [contacts, setContacts] = useState<{ name: string, number: string, id: string, }[]>(getInitialContactsState);
  const [filter, setFilter] = useState('');


    useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);
  

  const addContactInfo = (personData: IValues) => {
    const { name, number } = personData;
    const normalizedNameContact = name.toLowerCase();
    const person = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const findContactName = (newNameData: string) =>
      contacts.find(({name} : {name: string}) => name.toLowerCase() === newNameData);

    findContactName(normalizedNameContact)
      ? alert(`${name} is already in contacts`)
      : setContacts(prevContacts => [...prevContacts, person]);
  };

  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({name} : {name: string}) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = (contactId: string) => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId),
    );
  };
  

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContactInfo} />

      {contacts.length > 0 && (
        <>
          <h2>Contacts</h2>

          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            visibleContacts={getVisibleContacts()}
            onDeleteContact={deleteContact}
          />
        </>
      )}
    </Container>
  );
}

export default App;
