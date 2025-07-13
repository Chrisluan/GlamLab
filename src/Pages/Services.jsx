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
              <Tr key={item._id + i}>
                <Td>{item.name}</Td>
                <Td>R$ {item.minimumPrice},00</Td>
                <Td isNumeric>{item.defaultComission}%</Td>
                <Td>
                  <Flex gap={2}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => handleEdit(item)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(item._id)}
                    >
                      Deletar
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default Services;
