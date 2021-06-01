import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
} from "../Components/GeneralElements/TableElements";
import * as AiIcons from "react-icons/ai";

function SolutionsController() {
  const [solutionsList, setSolutionsList] = useState([]);
  const [errorOccured, setErrorOccured] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost:5000/solution")
      .then((response) => {
        setSolutionsList(response.data);
        setErrorOccured(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <GlobalContainer>
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
                      <AiIcons.AiFillEdit />
                    </TableLink>
                    <AiIcons.AiFillDelete />
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
