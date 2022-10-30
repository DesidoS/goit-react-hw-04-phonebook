import PropTypes from 'prop-types';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import { GiFactory, GiSmartphone, GiFamilyHouse } from 'react-icons/gi';
import {
  Form,
  Label,
  Field,
  Add,
  TypeLabel,
  Type,
  Radio,
} from './ContactForm.styled';

const ContactForm = ({ addContact, names }) => {
  const [contactName, setContactName] = useState('');
  const [number, setNumber] = useState('');
  const [type, setType] = useState('mobile');

  const onInputChange = e => {
    const fieldName = e.currentTarget.name;
    const fieldValue = e.currentTarget.value;

    if (fieldName === 'name') {
      setContactName(fieldValue);
    }
    if (fieldName === 'number') {
      setNumber(fieldValue);
    }
    if (fieldName === 'type') {
      setType(fieldValue);
    }
  };

  const resetFieldts = () => {
    setContactName('');
    setNumber('');
    setType('mobile');
  };

  const onSubmit = e => {
    e.preventDefault();
    if (names.length > 0) {
      const namesInPhonebook = [];
      names.forEach(({ contactName }) =>
        namesInPhonebook.push(contactName.toLowerCase())
      );
      if (namesInPhonebook.includes(contactName.toLowerCase())) {
        Notify.warning(`${contactName}is already in contacts.`);
        resetFieldts();
        return;
      }
    }

    addContact({ id: nanoid(), contactName, number, type });
    resetFieldts();
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Label>
          Name
          <Field
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={contactName}
            onChange={onInputChange}
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
            value={number}
            onChange={onInputChange}
          />
        </Label>
        <Type>
          <TypeLabel>
            <GiSmartphone />
            <Radio
              type="radio"
              checked={type === 'mobile'}
              name="type"
              value="mobile"
              onChange={onInputChange}
            />
          </TypeLabel>
          <TypeLabel>
            <GiFactory />
            <Radio
              type="radio"
              checked={type === 'work'}
              name="type"
              value="work"
              onChange={onInputChange}
            />
          </TypeLabel>
          <TypeLabel>
            <GiFamilyHouse />
            <Radio
              type="radio"
              checked={type === 'home'}
              name="type"
              value="home"
              onChange={onInputChange}
            />
          </TypeLabel>
        </Type>

        <Add type="submit">Add contact</Add>
      </Form>
    </>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  names: PropTypes.array.isRequired,
  addContact: PropTypes.func.isRequired,
};
