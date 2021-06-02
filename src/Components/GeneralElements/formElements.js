import styled from "styled-components";
import { Link } from "react-router-dom";

export const FormContainer = styled.form`
  width: 80%;
  max-width: 1200px;
  background-color: #fff;
  margin: 2em auto;
  border-radius: 10px;
  padding: 4em 2em;
  box-shadow: 0 0 3px #599bd3;
`;

export const FormTitle = styled.div`
  font-size: 2rem;
  text-transform: uppercase;
  margin-left: 0.5em;
  margin-bottom: 1em;
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const FormGroup = styled.div`
  width: 50%;
  max-width: 400px;
  padding: 1em;
`;

export const FormInputWrapper = styled.div`
  margin: 0 auto 1.5em;
`;

export const FormInputGroup = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  padding: 1em;
`;

export const FormInputGroupTitle = styled.h4`
  font-size: 1.225rem;
  color: #599bd3;
  margin-bottom: 1em;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.7em;
  color: #31383e;
  text-transform: capitalize;

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

export const FormImagePreviewContainer = styled.div`
  width: 50%;
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
export const LinkedTo = styled(Link)`
  width: fit-content;
`;

export const ImagePreviewContainer = styled.div`
  width: 50%;
  margin-top: 0.7em;
  display: none;
`;

export const ImagePreview = styled.img`
  width: 100%;
`;

export const Paragraphe = styled.p`
  margin: 0.5em auto 1em;
  padding: 2em 0;
  text-align: center;
  width: 100%;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;
