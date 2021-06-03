import styled from "styled-components";

export const PrimaryButton = styled.button`
  background-color: #22a1fe;
  color: white;
  border-radius: 10px;
  border: 2px solid #22a1fe;
  padding: 1em 2em;
  text-align: center;
  white-space: nowrap;
  text-transform: capitalize;
  margin-left: ${({ marginL }) => marginL};

  &:hover {
    cursor: pointer;
    border: 2px solid #22a1fe;
    background-color: transparent;
    color: #22a1fe;
  }
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
  &:hover {
    cursor: pointer;
    border: 2px solid #22a1fe;
    background-color: #22a1fe;
    color: #fff;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2em;
  margin-bottom: 0;
`;
