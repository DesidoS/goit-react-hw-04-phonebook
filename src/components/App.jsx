import { Component } from 'react';
import { Notify } from 'notiflix';
// conponents //
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Section from './Section';
// styles //
import { Container } from './App.styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = data => {
    this.setState(prevState => ({
      contacts: [data, ...prevState.contacts],
    }));
    Notify.success(`${data.name} has been added to contacts.`);
  };

  onFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };
  componentDidMount = () => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  };
  componentDidUpdate = (_, prevState) => {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  render() {
    const contacts = this.getVisibleContacts();
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm names={this.state} addContact={this.addContact} />
        </Section>
        {this.state.contacts.length > 0 ? (
          <Section title="Contacts">
            <Filter
              filter={this.state.filter}
              onFilterChange={this.onFilterChange}
            />
            <ContactList
              contacts={contacts}
              onDeleteContact={this.deleteContact}
            />
          </Section>
        ) : null}
      </Container>
    );
  }
}

export default App;

// {
//   id: 'id-1',
//   name: 'Rosie Simpson',
//   number: '459-12-56',
//   type: 'mobile',
// },
// {
//   id: 'id-2',
//   name: 'Hermione Kline',
//   number: '443-89-12',
//   type: 'work',
// },
// {
//   id: 'id-3',
//   name: 'Eden Clements',
//   number: '645-17-79',
//   type: 'mobile',
// },
// {
//   id: 'id-4',
//   name: 'Annie Copeland',
//   number: '227-91-26',
//   type: 'home',
// },
