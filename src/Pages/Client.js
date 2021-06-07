import React, { useEffect, useState } from "react";
import {
  customStyles,
  TableLink,
} from "../Components/GeneralElements/TableElements";
import Modal from "react-modal";
import Axios from "axios";
import * as Yup from "yup";
import {
  FormContainer,
  FormErrorMessage,
  FormGroup,
  FormInput,
  FormInputWrapper,
  FormLabel,
  FormTitle,
  FormWrapper,
  ImagePreview,
  ImagePreviewContainer,
  Paragraphe,
} from "../Components/GeneralElements/formElements";
import {
  ButtonsWrapper,
  OutlineButton,
  PrimaryButton,
} from "../Components/GeneralElements/buttonElements";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

const SUPPORTED_FORMATS = ["image/svg+xml", "image/gif", "image/png"];

const schema = Yup.object().shape({
  company: Yup.string().required("Required").min(2, "Too Short!"),
  logo: Yup.mixed()
    .required("Required ")
    .test("fileSize", "The file is too large", (value) => {
      return value && value.size <= 2000000;
    })
    .test("type", "Unsupported Format", (value) => {
      return value && SUPPORTED_FORMATS.includes(value.type);
    }),
});

function Logos({ location }) {
  const [client, setClient] = useState({});
  const [action, setAction] = useState("add");
  const [displayImg, setDisplayImg] = useState("none");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      company: action === "edit" ? client.company : "",
      logo: null,
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("data", JSON.stringify(values));
      if (action === "edit") {
        console.log("edit img value : " + values.logo);
        if (values.logo !== null) {
          formData.append("logo", values.logo);
        }

        formData.append("id", client.id_client);
        console.log(client);

        //UPDATE data
        Axios.put("/client", formData, {
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
        formData.append("logo", values.logo);
        Axios.post("/client", formData, {
          Headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((response) => {
            history.push("/clients");
          })
          .catch((err) => {
            setModalIsOpen(true);
          });
      }
    },
  });

  const logoHandler = (e) => {
    formik.setFieldValue(
      "logo",
      e.target.files[0],
      action === "edit" ? false : true
    );
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setLogo(file);
    }
  };

  useEffect(() => {
    if (logo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(logo);
      setDisplayImg("block");
    } else {
      setPreview(null);
    }
  }, [logo]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const id = params.get("id");
    // setSolutionId(params.get("id"));

    const action = params.get("action");
    setAction(action);

    if (action === "edit") {
      Axios.get("/client", {
        params: {
          id: id,
        },
      })
        .then((response) => {
          console.log(response.data);
          setClient(response.data);
          // setErrorOccured(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

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
              history.push("/clients");
            }}
          >
            back to Clients
          </PrimaryButton>
        </ButtonsWrapper>
      </Modal>

      <FormContainer onSubmit={formik.handleSubmit}>
        <FormTitle>
          {action === "edit" ? "Update Client" : "Add Client"}
        </FormTitle>
        <FormWrapper>
          <FormGroup>
            <FormInputWrapper>
              <FormLabel htmlFor="company">Company Name</FormLabel>
              <FormInput
                name="company"
                id="company"
                type="text"
                placeholder="Solution Label"
                onChange={formik.handleChange}
                value={formik.values.company}
              />
              {formik.errors.company && (
                <FormErrorMessage>{formik.errors.company}</FormErrorMessage>
              )}
            </FormInputWrapper>
            <FormInputWrapper>
              <FormLabel htmlFor="logo">Logo</FormLabel>
              <FormInput
                onChange={logoHandler}
                name="logo"
                id="logo"
                type="file"
                accept="logo/*"
              />
              {formik.errors.logo && (
                <FormErrorMessage>{formik.errors.logo}</FormErrorMessage>
              )}

              <ImagePreviewContainer
                style={{ display: action === "edit" ? "block" : displayImg }}
              >
                <ImagePreview
                  src={preview ? preview : client.logo}
                  alt="uploaded-logo-preview"
                />
              </ImagePreviewContainer>
            </FormInputWrapper>
          </FormGroup>
        </FormWrapper>
        <ButtonsWrapper>
          <PrimaryButton marginL="1em" type="submit">
            Save
          </PrimaryButton>
          <TableLink to="/clients">
            <OutlineButton marginL="1em">Cancel</OutlineButton>
          </TableLink>
        </ButtonsWrapper>
      </FormContainer>
    </>
  );
}

export default Logos;
