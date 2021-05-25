import styled from "styled-components";

export const PrimaryButton = styled.button`
  background-color: #22a1fe;
  color: white;
  border-radius: 10px;
  border: 2px solid #22a1fe;
  padding: 1em 2.5em;
  text-align: center;
  white-space: nowrap;
  text-transform: capitalize;
`;

export const OutlineButton = styled.button`
  background-color: transparent;
  color: #22a1fe;
  border: 2px solid #22a1fe;
  border-radius: 10px;
  padding: 1em 2.5em;
  text-align: center;
  white-space: nowrap;
  text-transform: capitalize;
`;

export const PlusButton = styled.div`
  background-color: transparent;
  border-radius: 3px;
  border: 2px solid #22a1fe;
  color: #22a1fe;
  padding: 0.5em 1em;
  width: fit-content;
  &:hover {
    background-color: #22a1fe;
    color: white;
  }
`;
