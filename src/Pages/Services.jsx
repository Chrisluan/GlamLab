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
  Flex,
  Button,
} from "@chakra-ui/react";
import { useData } from "../Context/DataContext";
import ServiceCard from "../Components/Services/ServiceCard";
export const Services = () => {
  const { services } = useData();

  return (
    <TableContainer w={"100%"}>
      <Table size="sm" variant={"striped"}>
        <TableCaption>Todos os serviços cadastrados</TableCaption>
        <Thead>
          <Tr>
            <Th>Serviço</Th>
            <Th>Preço Minimo</Th>
            <Th isNumeric>Comissão Padrão</Th>
          </Tr>
        </Thead>
        <Tbody>
          {services.map((item, i) => {
            return (
              <ServiceCard item={item} key={item._id + i}>

              </ServiceCard>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default Services;
