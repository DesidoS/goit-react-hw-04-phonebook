import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
// conponents //
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Section from './Section';
// styles //
import { Container } from './App.styled';

const App = () => {
  const [contacts, setConacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    setConacts(contacts => [data, ...contacts]);
    Notify.success(`${data.contactName} has been added to contacts.`);
  };

  const onFilterChange = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    //   const normalizedFilter = filter.toLowerCase();
    //   return contacts.filter(contact =>
    //     contact.contactName.toLowerCase().includes(normalizedFilter)
    //   );
  };

  const deleteContact = contactId => {
    setConacts(contacts => [...contacts.filter(({ id }) => id !== contactId)]);
  };
  const listContacts = getVisibleContacts() ?? contacts;
  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm names={contacts} addContact={addContact} />
      </Section>
      {contacts.length > 0 && (
        <Section title="Contacts">
          <Filter filter={filter} onFilterChange={onFilterChange} />
          <ContactList
            contacts={listContacts}
            onDeleteContact={deleteContact}
          />
        </Section>
      )}
    </Container>
  );
};

export default App;
