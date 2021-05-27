import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { PrimaryButton } from "../Components/GeneralElements/buttonElements";
import {
  FormContainer,
  FormErrorMessage,
  FormGroup,
  FormInput,
  FormInputGroup,
  FormInputGroupTitle,
  FormInputWrapper,
  FormLabel,
  FormTextarea,
  FormTitle,
  FormWrapper,
} from "../Components/GeneralElements/formElements";

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const SolutionDataSchema = Yup.object().shape({
  label: Yup.string().min(2, "Too Short!").required("Required"),
  feature1: Yup.string().required("Required"),
  feature2: Yup.string(),
  feature3: Yup.string(),
  description: Yup.string()
    .matches(
      "^[a-zA-Z0-9À-ÿ.,:?!\\(\\)\\-'\\s]+$",
      "please enter a valid description"
    )
    .required(),
  price: Yup.number().required(),
  image: Yup.mixed()
    .required()
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= FILE_SIZE
    ),
});

function Solution() {
  const formik = useFormik({
    initialValues: {
      label: "",
      feature1: "",
      feature2: "",
      feature3: "",
      description: "",
      price: 0,
      image: undefined,
    },
    validationSchema: SolutionDataSchema,
    onSubmit: (values) => {
      Axios.post("http://localhost:5000/solution", {
        values,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <FormTitle>Add solution</FormTitle>
      <FormWrapper>
        <FormGroup>
          <FormInputWrapper>
            <FormLabel htmlFor="label">Label</FormLabel>
            <FormInput
              id="label"
              name="label"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.label}
            />
            <FormErrorMessage>Something wrong</FormErrorMessage>
          </FormInputWrapper>
          <FormInputGroup>
            <FormInputGroupTitle>Brief</FormInputGroupTitle>
            <FormInputWrapper>
              <FormLabel htmlFor="feature1">First feature</FormLabel>
              <FormInput
                id="feature1"
                name="feature1"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.feature1}
              />
              <FormErrorMessage>Something wrong</FormErrorMessage>
            </FormInputWrapper>
            <FormInputWrapper>
              <FormLabel htmlFor="feature2">Second feature</FormLabel>
              <FormInput
                id="feature2"
                name="feature2"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.feature2}
              />
              <FormErrorMessage>Something wrong</FormErrorMessage>
            </FormInputWrapper>
            <FormInputWrapper>
              <FormLabel htmlFor="feature3">Third feature</FormLabel>
              <FormInput
                id="feature3"
                name="feature3"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.feature3}
              />
              <FormErrorMessage>Something wrong</FormErrorMessage>
            </FormInputWrapper>
          </FormInputGroup>
        </FormGroup>
        <FormGroup>
          <FormInputWrapper>
            <FormLabel htmlFor="description">description</FormLabel>
            <FormTextarea
              id="description"
              placeholder="Solution description"
              onChange={formik.handleChange}
              value={formik.values.description}
            ></FormTextarea>
            <FormErrorMessage>Something wrong</FormErrorMessage>
          </FormInputWrapper>
          <FormInputWrapper>
            <FormLabel htmlFor="price">price</FormLabel>
            <FormInput
              id="price"
              name="price"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            <FormErrorMessage>Something wrong</FormErrorMessage>
          </FormInputWrapper>

          <FormInputWrapper>
            <FormLabel htmlFor="image">image</FormLabel>
            <FormInput
              id="image"
              name="image"
              type="file"
              onChange={formik.handleChange}
              value={formik.values.image}
            />
            <FormErrorMessage>Something wrong</FormErrorMessage>
          </FormInputWrapper>
        </FormGroup>
      </FormWrapper>
      <PrimaryButton marginL="1em">Save</PrimaryButton>
    </FormContainer>
  );
}

export default Solution;
