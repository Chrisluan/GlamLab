import React, { useContext } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableCaption,
  Tr,
  Th,
  Tbody,
  Thead,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import { useData } from "../Context/DataContext";
export const ServiceCard = () => {

  const {services} = useData();
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Thead>
      </Table>
    </TableContainer>
  );
};
export default ServiceCard;
