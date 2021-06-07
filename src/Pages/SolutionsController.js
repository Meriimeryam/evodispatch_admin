import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import {
  ButtonsWrapper,
  PrimaryButton,
} from "../Components/GeneralElements/buttonElements";

import Axios from "axios";
import {
  GlobalContainer,
  TableBody,
  TableContainer,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  TableError,
  TableImg,
  TableLink,
  customStyles,
} from "../Components/GeneralElements/TableElements";
import * as AiIcons from "react-icons/ai";
import { Paragraphe } from "../Components/GeneralElements/formElements";

Modal.setAppElement("#root");

function SolutionsController() {
  const [solutionsList, setSolutionsList] = useState([]);
  const [errorOccured, setErrorOccured] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deletedSolution, setDeletedSolution] = useState({});

  useEffect(() => {
    Axios.get("/solution")
      .then((response) => {
        setSolutionsList(response.data);
        setErrorOccured(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteItem = () => {
    const solutions = Object.assign([], solutionsList);
    solutions.splice(solutions.indexOf(deletedSolution), 1);
    Axios.delete("/solution", {
      data: {
        source: deletedSolution.id_solution,
      },
    })
      .then((res) => {
        console.log(res);
        setSolutionsList(solutions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <GlobalContainer>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <h2>Delete Confirmation</h2>

        <Paragraphe>Are you sure you want to delete this solution?</Paragraphe>
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
            <TableHeader>Label</TableHeader>
            <TableHeader>Image</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {errorOccured ? (
            <TableError>Error</TableError>
          ) : (
            solutionsList.map((solution, key) => {
              return (
                <TableRow key={key}>
                  <TableData>{solution.libel}</TableData>
                  <TableData>
                    <TableImg src={solution.image} />
                  </TableData>
                  <TableData>
                    <TableLink
                      to={
                        "/add-solutions?action=edit&id=" + solution.id_solution
                      }
                    >
                      <AiIcons.AiFillEdit fontSize="2em" />
                    </TableLink>
                    <AiIcons.AiFillDelete
                      cursor="pointer"
                      fontSize="2em"
                      onClick={() => {
                        setModalIsOpen(true);
                        setDeletedSolution(solution);
                      }}
                    />
                  </TableData>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </TableContainer>

      <TableLink to="/add-solutions?action=add">
        <PrimaryButton>add solution</PrimaryButton>
      </TableLink>
    </GlobalContainer>
  );
}

export default SolutionsController;
