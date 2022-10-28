import PropTypes from 'prop-types';
import { TiDelete } from 'react-icons/ti';
import { Delete } from './ContactList.styled';
import { GiFactory, GiSmartphone, GiFamilyHouse } from 'react-icons/gi';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number, type }) => (
        <li key={id}>
          <Delete
            onClick={() => {
              onDeleteContact(id);
            }}
          >
            <TiDelete
              style={{
                color: 'tomato',
                fontSize: '36px',
                marginBottom: '-4px',
              }}
            />
          </Delete>
          {name}: {number} :{type === 'mobile' ? <GiSmartphone /> : null}
          {type === 'work' ? <GiFactory /> : null}
          {type === 'home' ? <GiFamilyHouse /> : null}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
