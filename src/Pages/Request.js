import React from "react";
import {
  GlobalContainer,
  TableBody,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "../Components/GeneralElements/TableElements";

function Request() {
  return (
    <GlobalContainer>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableHeader>vars</TableHeader>
            <TableHeader>value</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </TableContainer>
    </GlobalContainer>
  );
}

export default Request;
