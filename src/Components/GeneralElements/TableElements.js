import styled from "styled-components";
import { Link } from "react-router-dom";

export const GlobalContainer = styled.div`
  width: 80%;
  max-width: 1000px;
  margin: 4em auto;
`;

export const TableContainer = styled.table`
  background: #fff;
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 4em;
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const TableHeader = styled.th`
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
`;

export const TableData = styled.td`
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #dddddd;
  }
`;

export const TableError = styled.div`
  color: #ddd;
  width: 80%;
  margin: auto;
`;
export const TableImg = styled.img`
  max-width: 200px;
`;

export const TableLink = styled(Link)`
  width: fit-content;
  text-decoration: none;
  color: black;
`;

export const customStyles = {
  content: {
    width: "fit-content",
    padding: "2em",
    height: "fit-content",
    margin: "auto",
  },
};
