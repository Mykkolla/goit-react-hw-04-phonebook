import styled from 'styled-components';

export const AddContactBtn = styled.button`
  margin-left: 20px;

  border: 1px solid ${props => props.theme.colors.accent};
  outline: none;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  :hover,
  :focus {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.secondary};
  }
  svg {
    margin-right: 5px;
    fill: orange;
    stroke: black;
  }
`;
