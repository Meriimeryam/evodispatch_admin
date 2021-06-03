import Axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router";
import {
  ButtonsWrapper,
  OutlineButton,
  PrimaryButton,
} from "../Components/GeneralElements/buttonElements";
import { Paragraphe } from "../Components/GeneralElements/formElements";
import {
  customStyles,
  GlobalContainer,
  TableBody,
  TableContainer,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "../Components/GeneralElements/TableElements";

function Request({ location }) {
  const [request, setRequest] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deletedRequest, setDeletedRequest] = useState({});

  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    Axios.get("http://localhost:5000/request", {
      params: {
        id: id,
      },
    })
      .then((res) => {
        setRequest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteItem = () => {
    Axios.delete("http://localhost:5000/request", {
      data: {
        source: deletedRequest.id_request,
      },
    })
      .then((res) => {
        history.push("/request");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendEmail = (email) => {
    window.open("mailto:" + email);
  };

  return (
    <GlobalContainer>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <h2>Delete Confirmation</h2>

        <Paragraphe>Are you sure you want to delete this Request?</Paragraphe>
        <ButtonsWrapper>
          <PrimaryButton
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            Close
          </PrimaryButton>
          <PrimaryButton
            marginL="1em"
            onClick={() => {
              deleteItem();
              setModalIsOpen(false);
            }}
          >
            Delete
          </PrimaryButton>
        </ButtonsWrapper>
      </Modal>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableHeader>vars</TableHeader>
            <TableHeader>value</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableData>Date</TableData>
            <TableData>{request.date}</TableData>
          </TableRow>
          <TableRow>
            <TableData>First Name</TableData>
            <TableData>{request.firstname}</TableData>
          </TableRow>
          <TableRow>
            <TableData>Last Name</TableData>
            <TableData>{request.lastname}</TableData>
          </TableRow>
          <TableRow>
            <TableData>Phone</TableData>
            <TableData>{request.phone}</TableData>
          </TableRow>
          <TableRow>
            <TableData>Email</TableData>
            <TableData>{request.email}</TableData>
          </TableRow>
          <TableRow>
            <TableData>Address</TableData>
            <TableData>{request.address}</TableData>
          </TableRow>
          <TableRow>
            <TableData>Country</TableData>
            <TableData>{request.country}</TableData>
          </TableRow>
          <TableRow>
            <TableData>Post Code</TableData>
            <TableData>{request.postcode}</TableData>
          </TableRow>
          <TableRow>
            <TableData>Company Name</TableData>
            <TableData>{request.company}</TableData>
          </TableRow>
          <TableRow>
            <TableData>Fleet Size</TableData>
            <TableData>{request.fleet_size}</TableData>
          </TableRow>
          <TableRow>
            <TableData>Message</TableData>
            <TableData>{request.message}</TableData>
          </TableRow>
        </TableBody>
      </TableContainer>
      <ButtonsWrapper>
        <PrimaryButton onClick={() => sendEmail(request.email)}>
          Send Email
        </PrimaryButton>
        <OutlineButton
          onClick={() => {
            setModalIsOpen(true);
            setDeletedRequest(request);
          }}
        >
          Delete Request
        </OutlineButton>
      </ButtonsWrapper>
    </GlobalContainer>
  );
}

export default Request;
