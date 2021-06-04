import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import Modal from "react-modal";
import {
  ButtonsWrapper,
  PrimaryButton,
} from "../Components/GeneralElements/buttonElements";
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
  Paragraphe,
} from "../Components/GeneralElements/formElements";
import { customStyles } from "../Components/GeneralElements/TableElements";

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
    .required("Required from add")
    .test("fileSize", "The file is too large", (value) => {
      return value && value.size <= 2000000;
    })
    .test("type", "Unsupported Format", (value) => {
      return value && SUPPORTED_FORMATS.includes(value.type);
    }),
  // .test(
  //   "fileFormat",
  //   "Unsupported Format",
  //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
  // )
  // .test("fileSize", "File too large", (value) => value.size <= FILE_SIZE),
});

const Editschema = Yup.object().shape({
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
  image: Yup.lazy((value) => {
    console.log(value);
    if (value !== null) {
      return Yup.mixed()
        .required("required from edit")
        .test("fileSize", "The file is too large", (value) => {
          return value && value.size <= 2000000;
        })
        .test("type", "Unsupported Format", (value) => {
          return value && SUPPORTED_FORMATS.includes(value.type);
        });
    }
    return Yup.mixed().notRequired();
  }),
  // .test(
  //   "fileFormat",
  //   "Unsupported Format",
  //   (value) => value && SUPPORTED_FORMATS.includes(value.type)
  // )
  // .test("fileSize", "File too large", (value) => value.size <= FILE_SIZE),
});

/* */

function Solution({ location }) {
  //Use react HOOK FORM
  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   formState: { formik.errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  const [solution, setSolution] = useState({
    brief: [],
    libel: "",
    description: "",
    price: 0,
  });
  // const [solutionId, setSolutionId] = useState(0);
  const [action, setAction] = useState("add");
  const [displayImg, setDisplayImg] = useState("none");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      label: action === "edit" ? solution.libel : "",
      feature1: action === "edit" ? solution.brief[0] : "",
      feature2: action === "edit" ? solution.brief[1] : "",
      feature3: action === "edit" ? solution.brief[2] : "",
      description: action === "edit" ? solution.description : "",
      price: action === "edit" ? solution.price : 0,
      image: null,
    },
    validationSchema: action === "edit" ? Editschema : schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values.image);
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      if (action === "edit") {
        console.log("edit img value : " + values.image);
        if (values.image !== null) {
          formData.append("image", values.image);
        }

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
            // history.push("/solutions");
          })
          .catch((error) => {
            setModalIsOpen(true);
            console.log(error);
          });
      } else {
        formData.append("image", values.image);
        //INSERT data
        Axios.post("/solution", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => {
            //redirect to Solutions controller
            //i didn't have to add if i just hade to open the modal in catch
            history.push("/solutions");

            // console.log(response);
          })
          .catch((error) => {
            setModalIsOpen(true);
            console.log(error);
          });
      }
    },
  });

  const imputFileHandler = (e) => {
    formik.setFieldValue(
      "image",
      e.target.files[0],
      action === "edit" ? false : true
    );
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
    }
  };

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
    // setSolutionId(params.get("id"));

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
          console.log(response.data);
          console.log(solution);
          // setErrorOccured(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  //History Used To Redirect

  // console.log(formik.errors);

  return (
    <>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <h2>Error !</h2>

        <Paragraphe>
          There Have Been An Error! Please Try Again Later !
        </Paragraphe>
        <ButtonsWrapper>
          <PrimaryButton
            onClick={() => {
              setModalIsOpen(false);
              history.push("/solutions");
            }}
          >
            back to Solutions
          </PrimaryButton>
        </ButtonsWrapper>
      </Modal>

      <FormContainer onSubmit={formik.handleSubmit}>
        <FormTitle>
          {action === "edit" ? "Update Solution" : "Add Solution"}
        </FormTitle>
        <FormWrapper>
          <FormGroup>
            <FormInputWrapper>
              <FormLabel htmlFor="label">Label</FormLabel>
              <FormInput
                name="label"
                id="label"
                type="text"
                placeholder="Solution Label"
                onChange={formik.handleChange}
                value={formik.values.label}
              />
              {formik.errors.label && (
                <FormErrorMessage>{formik.errors.label}</FormErrorMessage>
              )}
            </FormInputWrapper>
            <FormInputGroup>
              <FormInputGroupTitle>Brief</FormInputGroupTitle>
              <FormInputWrapper>
                <FormLabel htmlFor="feature1">First feature</FormLabel>
                <FormInput
                  name="feature1"
                  id="feature1"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.feature1}
                />
                {formik.errors.feature1 && (
                  <FormErrorMessage>{formik.errors.feature1}</FormErrorMessage>
                )}
              </FormInputWrapper>
              <FormInputWrapper>
                <FormLabel htmlFor="feature2">Second feature</FormLabel>
                <FormInput
                  name="feature2"
                  id="feature2"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.feature2}
                />
                {formik.errors.feature2 && (
                  <FormErrorMessage>{formik.errors.feature2}</FormErrorMessage>
                )}
              </FormInputWrapper>
              <FormInputWrapper>
                <FormLabel htmlFor="feature3">Third feature</FormLabel>
                <FormInput
                  name="feature3"
                  id="feature3"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.feature3}
                />
                {formik.errors.feature3 && (
                  <FormErrorMessage>{formik.errors.feature3}</FormErrorMessage>
                )}
              </FormInputWrapper>
            </FormInputGroup>
          </FormGroup>
          <FormGroup>
            <FormInputWrapper>
              <FormLabel htmlFor="description">description</FormLabel>
              <FormTextarea
                name="description"
                id="description"
                placeholder="Solution description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              {formik.errors.description && (
                <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
              )}
            </FormInputWrapper>
            <FormInputWrapper>
              <FormLabel htmlFor="price">price</FormLabel>
              <FormInput
                name="price"
                id="price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
              {formik.errors.price && (
                <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
              )}
            </FormInputWrapper>

            <FormInputWrapper>
              <FormLabel htmlFor="image">image</FormLabel>
              <FormInput
                onChange={imputFileHandler}
                name="image"
                id="image"
                type="file"
                accept="image/*"
              />
              {formik.errors.image && (
                <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
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
    </>
  );
}

export default Solution;
