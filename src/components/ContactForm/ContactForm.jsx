import { Component } from 'react';
Searchbar;
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import {
  Form,
  Label,
  Field,
  Add,
  TypeLabel,
  Type,
  Radio,
} from './ContactForm.styled';
import { GiFactory, GiSmartphone, GiFamilyHouse } from 'react-icons/gi';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    type: 'mobile',
  };
  onInputChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { name, number, type } = this.state;
    const names = [];
    this.props.names.contacts.forEach(({ name }) =>
      names.push(name.toLowerCase())
    );

    if (names.includes(name.toLowerCase())) {
      Notify.warning(`${name}is already in contacts.`);
      this.resetFieldts();
      return;
    }

    this.props.addContact({ id: nanoid(), name, number, type });
    this.resetFieldts();
  };

  resetFieldts = () => {
    this.setState(() => ({
      name: '',
      number: '',
    }));
  };

  render() {
    return (
      <>
        <Form onSubmit={this.onSubmit}>
          <Label>
            Name
            <Field
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={this.state.name}
              onChange={this.onInputChange}
            />
          </Label>
          <Label>
            Number
            <Field
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={this.state.number}
              onChange={this.onInputChange}
            />
          </Label>
          <Type>
            <TypeLabel>
              <GiSmartphone />
              <Radio
                type="radio"
                checked={this.state.type === 'mobile'}
                name="type"
                value="mobile"
                onChange={this.onInputChange}
              />
            </TypeLabel>
            <TypeLabel>
              <GiFactory />
              <Radio
                type="radio"
                checked={this.state.type === 'work'}
                name="type"
                value="work"
                onChange={this.onInputChange}
              />
            </TypeLabel>
            <TypeLabel>
              <GiFamilyHouse />
              <Radio
                type="radio"
                checked={this.state.type === 'home'}
                name="type"
                value="home"
                onChange={this.onInputChange}
              />
            </TypeLabel>
          </Type>

          <Add type="submit">Add contact</Add>
        </Form>
      </>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  names: PropTypes.object.isRequired,
  addContact: PropTypes.func.isRequired,
};
