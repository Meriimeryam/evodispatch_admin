import React, { useEffect, useState } from "react";
import Axios from "axios";
import Modal from "react-modal";
import {
  GlobalContainer,
  TableBody,
  TableContainer,
  TableData,
  TableError,
  TableHead,
  TableHeader,
  TableLink,
  TableRow,
  customStyles,
} from "../Components/GeneralElements/TableElements";
import * as AiIcons from "react-icons/ai";
import { Paragraphe } from "../Components/GeneralElements/formElements";
import {
  ButtonsWrapper,
  PrimaryButton,
} from "../Components/GeneralElements/buttonElements";
import { IconContext } from "react-icons";

function RequestController() {
  const [requests, setRequests] = useState([]);
  const [errorOccured, setErrorOccured] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deletedRequest, setDeletedRequest] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:5000/request")
      .then((response) => {
        console.log("test");
        setRequests(response.data);
        setErrorOccured(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteItem = () => {
    const requestsList = Object.assign([], requests);
    requestsList.splice(requestsList.indexOf(deletedRequest), 1);
    console.log(deletedRequest.id_request);
    Axios.delete("http://localhost:5000/request", {
      data: {
        source: deletedRequest.id_request,
      },
    })
      .then((res) => {
        console.log(res);
        setRequests(requestsList);
      })
      .catch((err) => {
        console.log(err);
      });
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
            <TableHeader>#</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Company Name</TableHeader>
            <TableHeader>Fleet Size</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {errorOccured ? (
            <TableError>Error</TableError>
          ) : (
            requests.map((r, key) => {
              return (
                <TableRow key={key}>
                  <TableData>{key}</TableData>
                  <TableData>{r.firstname + " " + r.lastname}</TableData>
                  <TableData>{r.company}</TableData>
                  <TableData>{r.fleet_size}</TableData>
                  <TableData>{r.date}</TableData>
                  <TableData>
                    <IconContext.Provider value={{ size: "2em" }}>
                      <TableLink to={"/view-request?id=" + r.id_request}>
                        <AiIcons.AiFillEye />
                      </TableLink>
                      <AiIcons.AiFillDelete
                        cursor="pointer"
                        onClick={() => {
                          setModalIsOpen(true);
                          setDeletedRequest(r);
                        }}
                      />
                    </IconContext.Provider>
                  </TableData>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </TableContainer>
    </GlobalContainer>
  );
}

export default RequestController;
