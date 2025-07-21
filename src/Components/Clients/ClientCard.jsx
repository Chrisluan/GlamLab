import {
  Box,
  Text,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { useModal } from "../../Context/ModalsContext";

const ClientCard = ({ client, onDelete }) => {
  const { openEditModal } = useModal();

  return (
    <Flex
      fontFamily="Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
      
      px={4}
      py={3}
      border="1px solid"
      borderColor="brand.200"
      borderRadius="md"
      justifyContent="space-between"
      alignItems="center"
      fontSize="sm"
      _hover={{ bg: "brand.200" }}
    >
      <Flex  gap={3} align="center" w="100%">
        <Avatar
          name={client?.name}
          src={client?.avatarUrl}
          size="sm"
          bg="#C8B58D"
          color="white"
        />
        <Flex direction="column" flex="1">
          <Text fontWeight="600">{client?.name}</Text>
          <Text fontSize="xs" color="gray.600">
            📞 {client?.phone}
          </Text>
          {client?.email && (
            <Text fontSize="xs" color="gray.600">
              📧 {client?.email}
            </Text>
          )}
        </Flex>

        <Menu>
          <MenuButton as={Button} variant="ghost" size="sm" p={1}>
            <SlOptions />
          </MenuButton>
          <MenuList p={0}>
            <MenuItem
              gap={2}
              onClick={() => openEditModal(client)}
              icon={<FaEdit />}
            >
              Editar
            </MenuItem>
            <MenuDivider />
            <MenuItem
              gap={2}
              color="red.500"
              onClick={() => onDelete(client)}
              icon={<MdDelete />}
            >
              Deletar
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export {ClientCard};
