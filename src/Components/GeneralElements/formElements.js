import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #060b26;
`;
export const FormWrapper = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    flex-direction: row;
  }
`;

export const FormGrouper = styled.div`
  padding: 0 0.5em;
`;

export const FormInputWrapper = styled.div`
  margin: 0 auto 1.5em;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.7em;
  color: #31383e;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 450px) {
    font-size: 0.8rem;
  }
`;

export const FormErrorMessage = styled.div`
  display: block;
  font-size: 1rem;
  font-style: italic;
  font-weight: 300;
  color: #fc6867;

  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
`;

export const FormInput = styled.input`
  font-size: 1rem;
  padding: 9px 16px;
  width: 100%;
  color: #31383e;
  background-color: #f7f7fa;
  border-radius: 5px;
  border: 1px solid #599bd3;
  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
`;

export const FormSelect = styled.select`
  /* appearance: none; */
  outline: none;
  font-size: 1rem;
  padding: 9px 16px;
  width: 100%;
  color: #31383e;
  background-color: #f7f7fa;
  border-radius: 5px;
  border: 1px solid #599bd3;
  cursor: pointer;
  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
`;

// export const FormSelectOption = styled.option`
//   font-size: 1rem;
//   padding: 9px 16px;
//   width: 100%;
//   color: #31383e;
//   background-color: #f7f7fa;
//   border-radius: 5px;
//   border: 1px solid #599bd3;
//   @media screen and (max-width: 450px) {
//     font-size: 0.7rem;
//   }
// `;

export const FormTextarea = styled.textarea`
  font-size: 1rem;
  padding: 9px 16px;
  width: 100%;
  color: #31383e;
  background-color: #f7f7fa;
  border-radius: 5px;
  border: 1px solid #599bd3;

  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
`;
