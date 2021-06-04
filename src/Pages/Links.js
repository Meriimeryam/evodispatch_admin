import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import * as Yup from "yup";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiOutlineInstagram,
} from "react-icons/ai";
import {
  ButtonsWrapper,
  PrimaryButton,
} from "../Components/GeneralElements/buttonElements";
import {
  FormContainer,
  FormErrorMessage,
  FormInput,
  FormInputGroup,
  FormInputGroupTitle,
  FormInputWrapper,
  FormLabel,
  FormTitle,
  FormWrapper,
  Paragraphe,
} from "../Components/GeneralElements/formElements";
import { customStyles } from "../Components/GeneralElements/TableElements";

const schema = Yup.object().shape({
  facebook: Yup.string().url("Please enter a valid"),
  instagram: Yup.string().url("Please enter a valid"),
  youtube: Yup.string().url("Please enter a valid"),
  twitter: Yup.string().url("Please enter a valid"),
  api: Yup.string().url("Please enter a valid").required(),
});

function Links() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [linksList, setLinksList] = useState([{ link: "" }, {}, {}, {}, {}]);

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      facebook: linksList[0].link ? linksList[0].link : "",
      instagram: linksList[1].link ? linksList[1].link : "",
      youtube: linksList[2].link ? linksList[2].link : "",
      twitter: linksList[3].link ? linksList[3].link : "",
      api: linksList[4].link ? linksList[4].link : "",
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      //   const formData = new FormData();
      //   formData.append("data", JSON.stringify(values));
      Axios.put("/links", values)
        .then((res) => {
          history.push("/");
        })
        .catch((err) => {
          setModalIsOpen(true);
        });
    },
  });

  useEffect(() => {
    Axios.get("/links")
      .then((res) => {
        setLinksList(res.data);
      })
      .catch(() => {});
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
            }}
          >
            Close
          </PrimaryButton>
        </ButtonsWrapper>
      </Modal>
      <FormContainer onSubmit={formik.handleSubmit}>
        <FormTitle>Website Links</FormTitle>
        <FormWrapper>
          <FormInputGroup>
            <FormInputGroupTitle>Social Media</FormInputGroupTitle>
            <FormInputWrapper>
              <FormLabel htmlFor="facebook">
                <AiFillFacebook color="#4867AA" /> Facebook
              </FormLabel>
              <FormInput
                name="facebook"
                id="facebook"
                type="text"
                placeholder="http://www.facebook.com/example"
                onChange={formik.handleChange}
                value={formik.values.facebook}
              />
              {formik.errors.facebook && (
                <FormErrorMessage>{formik.errors.facebook}</FormErrorMessage>
              )}
            </FormInputWrapper>
            <FormInputWrapper>
              <FormLabel htmlFor="instagram">
                <AiOutlineInstagram /> Instagram
              </FormLabel>
              <FormInput
                name="instagram"
                id="instagram"
                type="text"
                placeholder="http://www.instagram.com/example"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              />
              {formik.errors.instagram && (
                <FormErrorMessage>{formik.errors.instagram}</FormErrorMessage>
              )}
            </FormInputWrapper>
            <FormInputWrapper>
              <FormLabel htmlFor="youtube">
                <AiFillYoutube color="#FF0000" /> Youtube
              </FormLabel>
              <FormInput
                name="youtube"
                id="youtube"
                type="text"
                placeholder="http://www.youtube.com/example"
                onChange={formik.handleChange}
                value={formik.values.youtube}
              />
              {formik.errors.youtube && (
                <FormErrorMessage>{formik.errors.youtube}</FormErrorMessage>
              )}
            </FormInputWrapper>
            <FormInputWrapper>
              <FormLabel htmlFor="twitter">
                <AiFillTwitterSquare color="#1DA1F2" /> Twitter
              </FormLabel>
              <FormInput
                name="twitter"
                id="twitter"
                type="text"
                placeholder="http://www.twitter.com/example"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              />
              {formik.errors.twitter && (
                <FormErrorMessage>{formik.errors.twitter}</FormErrorMessage>
              )}
            </FormInputWrapper>
          </FormInputGroup>
          <FormInputGroup>
            <FormInputGroupTitle>
              Web Api Documentation Link
            </FormInputGroupTitle>
            <FormInputWrapper>
              <FormLabel htmlFor="api">Api Link</FormLabel>
              <FormInput
                name="api"
                id="api"
                type="text"
                placeholder="http://ex.test.com/example"
                onChange={formik.handleChange}
                value={formik.values.api}
              />
              {formik.errors.api && (
                <FormErrorMessage>{formik.errors.api}</FormErrorMessage>
              )}
            </FormInputWrapper>
          </FormInputGroup>
        </FormWrapper>
        <PrimaryButton marginL="1em" type="submit">
          Save
        </PrimaryButton>
      </FormContainer>
    </>
  );
}

export default Links;
