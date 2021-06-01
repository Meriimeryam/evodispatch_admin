import React, { useEffect, useState } from "react";
import Axios from "axios";
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
} from "../Components/GeneralElements/TableElements";
import * as AiIcons from "react-icons/ai";

function RequestController() {
  const [requests, setRequests] = useState([]);
  const [errorOccured, setErrorOccured] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost:5000/requests")
      .then((response) => {
        console.log("test");
        setRequests(response.data);
        setErrorOccured(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <GlobalContainer>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableHeader>#</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Company Name</TableHeader>
            <TableHeader>Fleet Size</TableHeader>
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
                  <TableData>{r.fleet_size}😎</TableData>
                  <TableData>
                    <TableLink to={"/view-request?id=" + r.id}>
                      <AiIcons.AiFillEye />
                    </TableLink>
                    <AiIcons.AiFillDelete />
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
