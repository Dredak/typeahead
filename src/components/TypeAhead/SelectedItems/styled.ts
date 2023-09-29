import styled from 'styled-components';

export const ItemsContainer = styled.ul`
  display: flex;
  gap: 10px;
  list-style: none;
  margin: 0;
  overflow-x: auto;
  padding: 0;
  padding-bottom: 5px;
`;

export const Item = styled.li`
  align-items: center;
  background-color: lightgray;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding: 5px;
  user-select: none;

  @media (hover: hover) {
    &:hover {
      background-color: dodgerblue;
    }
  }
`;

export const ItemDelete = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  transform: rotate(45deg);
`;
