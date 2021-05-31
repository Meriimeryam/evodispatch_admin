import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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

//IMAGE Supported format:
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

//Validation Schema With YUP:

const schema = Yup.object().shape({
  label: Yup.string().required("Required").min(2, "Too Short!"),
  feature1: Yup.string().required("Required"),
  feature2: Yup.string(),
  feature3: Yup.string(),
  description: Yup.string()
    .required("Required")
    .matches(
      "^[a-zA-Z0-9À-ÿ.,:?!\\(\\)\\-'\\s]+$",
      "please enter a valid description"
    ),
  price: Yup.number().required("Required").positive("Must be positive "),
  image: Yup.mixed()
    .required("You need to provide a file")
    .test("fileSize", "The file is too large", (value) => {
      return value && value[0].size <= 2000000;
    })
    .test("type", "Unsupported Format", (value) => {
      return value && SUPPORTED_FORMATS.includes(value[0].type);
    }),
  // .test(
  //   "fileFormat",
  //   "Unsupported Format",
  //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
  // )
  // .test("fileSize", "File too large", (value) => value.size <= FILE_SIZE),
});

/*


 */

function Solution() {
  //Use react HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //History Used To Redirect
  const history = useHistory();
  console.log(errors);
  const onSubmit = (data) => {
    console.log(data);
    // const formData = new FormData();
    // formData.append("data", JSON.stringify(data));
    // formData.append("image", data.image[0]);
    // //send data to server
    // Axios.post("/solution", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then((response) => {
    //     //redirect to Solutions controller
    //     history.push("/solutions");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>Add solution</FormTitle>
      <FormWrapper>
        <FormGroup>
          <FormInputWrapper>
            <FormLabel htmlFor="label">Label</FormLabel>
            <FormInput {...register("label")} id="label" type="text" />
            {errors.label && (
              <FormErrorMessage>{errors.label.message}</FormErrorMessage>
            )}
          </FormInputWrapper>
          <FormInputGroup>
            <FormInputGroupTitle>Brief</FormInputGroupTitle>
            <FormInputWrapper>
              <FormLabel htmlFor="feature1">First feature</FormLabel>
              <FormInput {...register("feature1")} id="feature1" type="text" />
              {errors.feature1 && (
                <FormErrorMessage>{errors.feature1.message}</FormErrorMessage>
              )}
            </FormInputWrapper>
            <FormInputWrapper>
              <FormLabel htmlFor="feature2">Second feature</FormLabel>
              <FormInput {...register("feature2")} id="feature2" type="text" />
              {errors.feature2 && (
                <FormErrorMessage>{errors.feature2.message}</FormErrorMessage>
              )}
            </FormInputWrapper>
            <FormInputWrapper>
              <FormLabel htmlFor="feature3">Third feature</FormLabel>
              <FormInput {...register("feature3")} id="feature3" type="text" />
              {errors.feature3 && (
                <FormErrorMessage>{errors.feature3.message}</FormErrorMessage>
              )}
            </FormInputWrapper>
          </FormInputGroup>
        </FormGroup>
        <FormGroup>
          <FormInputWrapper>
            <FormLabel htmlFor="description">description</FormLabel>
            <FormTextarea
              {...register("description")}
              id="description"
              placeholder="Solution description"
            ></FormTextarea>
            {errors.description && (
              <FormErrorMessage>{errors.description.message}</FormErrorMessage>
            )}
          </FormInputWrapper>
          <FormInputWrapper>
            <FormLabel htmlFor="price">price</FormLabel>
            <FormInput {...register("price")} id="price" type="number" />
            {errors.price && (
              <FormErrorMessage>{errors.price.message}</FormErrorMessage>
            )}
          </FormInputWrapper>

          <FormInputWrapper>
            <FormLabel htmlFor="image">image</FormLabel>
            <FormInput {...register("image")} id="image" type="file" />
            {errors.image && (
              <FormErrorMessage>{errors.image.message}</FormErrorMessage>
            )}
          </FormInputWrapper>
        </FormGroup>
      </FormWrapper>
      <PrimaryButton marginL="1em" type="submit">
        Save
      </PrimaryButton>
    </FormContainer>
  );
}

export default Solution;
