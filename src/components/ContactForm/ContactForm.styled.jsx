import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
export const TypeLabel = styled.label`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
export const Radio = styled.input`
  margin-top: 10px;
`;
export const Type = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Field = styled.input`
  height: 32px;
  font-size: 24px;
  border-radius: 8px;
  border: none;
  padding: 5px;
`;

export const Add = styled.button`
  font-size: 24px;
  border-radius: 8px;
  border: none;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: darkgray;
  }
`;
