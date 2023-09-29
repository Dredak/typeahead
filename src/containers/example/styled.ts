import styled from 'styled-components';
import TypeAheadCommon from '../../components/TypeAhead';

export const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 5px;
  margin-top: 10px;
`;

export const TypeAhead = styled(TypeAheadCommon)`
  margin-top: 100px;
  width: 300px;
`;
