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
  Text,
} from "@chakra-ui/react";
export const ServiceCard = ({item}) => {
  
  return (
    <Tr key={item._id}>
      <Td>{item.name}</Td>
      <Td>R$ {item.minimumPrice},00</Td>
      <Td isNumeric>{item.defaultComission}%</Td>
      <Td>
        <Flex gap={2}>
          <Button size="sm" colorScheme="blue" onClick={() => handleEdit(item)}>
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
};
export default ServiceCard;
