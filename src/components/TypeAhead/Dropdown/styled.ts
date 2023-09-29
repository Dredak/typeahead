import styled from 'styled-components';

export const List = styled.ul`
  /* justify-content: center;
  align-items: center;
  display: flex; */
  /* flex-direction: column; */
  background-color: whitesmoke;
  border: 1px solid lightgray;
  list-style: none;
  padding: 0;
  position: absolute;
  width: 100%;
`;

export const ListItem = styled.li`
  padding: 5px;
  user-select: none;
  width: 100%;

  @media (hover: hover) {
    &:hover {
      background-color: lightblue;
    }
  }

  &[aria-selected='true'] {
    background-color: dodgerblue;
    font-weight: bold;
  }
`;
