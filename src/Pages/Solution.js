import React, { useEffect, useState } from "react";
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
  ImagePreview,
  ImagePreviewContainer,
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
    .required("required")
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

function Solution({ location }) {
  //Use react HOOK FORM
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [solution, setSolution] = useState({ brief: [] });
  const [solutionId, setSolutionId] = useState(0);
  const [action, setAction] = useState("add");
  const [displayImg, setDisplayImg] = useState("none");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const imputFileHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    }

    setValue("image", file);
  };

  useEffect(() => {
    register("image");
  }, [register]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
      setDisplayImg("block");
    } else {
      setPreview(null);
    }
  }, [image]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const id = params.get("id");
    setSolutionId(params.get("id"));

    const action = params.get("action");
    setAction(action);

    if (action === "edit") {
      Axios.get("http://localhost:5000/solution", {
        params: {
          id: id,
        },
      })
        .then((response) => {
          console.log(response.data);
          response.data.brief = JSON.parse(response.data.brief);
          setSolution(response.data);
          console.log(solution);
          // setErrorOccured(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  //History Used To Redirect
  const history = useHistory();

  console.log(errors);
  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("image", data.image[0]);
    if (action === "edit") {
      formData.append("id", solution.id_solution);
      console.log(solution);

      //UPDATE data
      Axios.put("/solution", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          //redirect to Solutions controller
          history.push("/solutions");
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      //INSERT data
      Axios.post("/solution", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          //redirect to Solutions controller
          history.push("/solutions");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>
        {action === "edit" ? "Update Solution" : "Add Solution"}
      </FormTitle>
      <FormWrapper>
        <FormGroup>
          <FormInputWrapper>
            <FormLabel htmlFor="label">Label</FormLabel>
            <FormInput
              defaultValue={action === "edit" ? solution.libel : ""}
              {...register("label")}
              id="label"
              type="text"
              placeholder="Solution Label"
            />
            {errors.label && (
              <FormErrorMessage>{errors.label.message}</FormErrorMessage>
            )}
          </FormInputWrapper>
          <FormInputGroup>
            <FormInputGroupTitle>Brief</FormInputGroupTitle>
            <FormInputWrapper>
              <FormLabel htmlFor="feature1">First feature</FormLabel>
              <FormInput
                {...register("feature1")}
                id="feature1"
                type="text"
                defaultValue={solution.brief[0]}
              />
              {errors.feature1 && (
                <FormErrorMessage>{errors.feature1.message}</FormErrorMessage>
              )}
            </FormInputWrapper>
            <FormInputWrapper>
              <FormLabel htmlFor="feature2">Second feature</FormLabel>
              <FormInput
                {...register("feature2")}
                id="feature2"
                type="text"
                defaultValue={solution.brief[1]}
              />
              {errors.feature2 && (
                <FormErrorMessage>{errors.feature2.message}</FormErrorMessage>
              )}
            </FormInputWrapper>
            <FormInputWrapper>
              <FormLabel htmlFor="feature3">Third feature</FormLabel>
              <FormInput
                {...register("feature3")}
                id="feature3"
                type="text"
                defaultValue={solution.brief[2]}
              />
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
              defaultValue={solution.description}
            ></FormTextarea>
            {errors.description && (
              <FormErrorMessage>{errors.description.message}</FormErrorMessage>
            )}
          </FormInputWrapper>
          <FormInputWrapper>
            <FormLabel htmlFor="price">price</FormLabel>
            <FormInput
              {...register("price")}
              id="price"
              type="number"
              defaultValue={solution.price}
            />
            {errors.price && (
              <FormErrorMessage>{errors.price.message}</FormErrorMessage>
            )}
          </FormInputWrapper>

          <FormInputWrapper>
            <FormLabel htmlFor="image">image</FormLabel>
            <FormInput
              onChange={imputFileHandler}
              id="image"
              type="file"
              accept="image/*"
            />
            {errors.image && (
              <FormErrorMessage>{errors.image.message}</FormErrorMessage>
            )}

            <ImagePreviewContainer
              style={{ display: action === "edit" ? "block" : displayImg }}
            >
              <ImagePreview
                src={preview ? preview : solution.image}
                alt="uploaded-image-preview"
              />
            </ImagePreviewContainer>
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
