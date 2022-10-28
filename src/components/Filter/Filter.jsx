import PropTypes from 'prop-types';
import { Label, Field } from './Filter.styled';

const Filter = ({ filter, onFilterChange }) => {
  return (
    <Label>
      Find contact by name
      <Field type="name" required value={filter} onChange={onFilterChange} />
    </Label>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
