import React, { useEffect, useState } from "react";
import {
  customStyles,
  GlobalContainer,
  TableBody,
  TableContainer,
  TableData,
  TableError,
  TableHead,
  TableHeader,
  TableImg,
  TableLink,
  TableRow,
} from "../Components/GeneralElements/TableElements";
import Modal from "react-modal";
import { Paragraphe } from "../Components/GeneralElements/formElements";
import {
  ButtonsWrapper,
  PrimaryButton,
} from "../Components/GeneralElements/buttonElements";
import * as AiIcons from "react-icons/ai";
import Axios from "axios";

Modal.setAppElement("#root");

function LogosController() {
  const [clientList, setClientList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorOccured, setErrorOccured] = useState(true);
  const [deletedClient, setDeletedClient] = useState({});

  useEffect(() => {
    Axios.get("/client")
      .then((response) => {
        console.log("test");
        setClientList(response.data);
        setErrorOccured(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteItem = () => {
    const logos = Object.assign([], clientList);
    logos.splice(logos.indexOf(deletedClient), 1);
    Axios.delete("/client", {
      data: {
        source: deletedClient.id_client,
      },
    })
      .then((res) => {
        console.log(res);
        setClientList(logos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <GlobalContainer>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <h2>Delete Confirmation</h2>

        <Paragraphe>Are you sure you want to delete this Client?</Paragraphe>
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
            <TableHeader>Company Name</TableHeader>
            <TableHeader>Image</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {errorOccured ? (
            <TableError>Error</TableError>
          ) : (
            clientList.map((client, key) => {
              return (
                <TableRow key={key}>
                  <TableData>{key}</TableData>
                  <TableData>{client.company}</TableData>
                  <TableData>
                    <TableImg src={client.logo} />
                  </TableData>
                  <TableData>
                    <TableLink
                      to={"/add-client?action=edit&id=" + client.id_client}
                    >
                      <AiIcons.AiFillEdit fontSize="2em" />
                    </TableLink>
                    <AiIcons.AiFillDelete
                      cursor="pointer"
                      fontSize="2em"
                      onClick={() => {
                        setModalIsOpen(true);
                        setDeletedClient(client);
                      }}
                    />
                  </TableData>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </TableContainer>
      <TableLink to="/add-client?action=add">
        <PrimaryButton>add client</PrimaryButton>
      </TableLink>
    </GlobalContainer>
  );
}

export default LogosController;
