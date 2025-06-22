import {
  Box,
  Text,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
} from "@chakra-ui/react";
import React from "react";
import { SlOptions } from "react-icons/sl";
import { FaCheck } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FaEye } from "react-icons/fa";
export const AppointmentCard = ({
  appointment,
  OpenModal,
  OnCancel,
  OnConfirm,
}) => {
  return (
    <Flex
      fontFamily={"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}
      width={"100%"}
      height={"fit-content"}
      padding={4}
      borderRadius={"2xl"}
      flexDir={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      fontSize={"sm"}
      sx={{
        boxShadow: "0px 6px 19px -4px rgba(0,0,0,0.1)",
      }}
      _hover={{
        bg: "rgb(255, 255, 255)",
      }}
    >
      <Flex flexDir={"column"}>
        <Flex gap={5} alignItems={"center"}>
          <Text
            sx={{
              fontSize: "md",
              fontWeight: "600",
            }}
          >
            {appointment.client?.name}
          </Text>
          <Text>{appointment.service?.name}</Text>
        </Flex>
        <Flex alignItems={"center"} gap={1}>
          <Text>Agendado para:</Text>
          <Text>{new Date(appointment.date).toLocaleDateString()}</Text>●
          <Text>
            {new Date(appointment.date).getHours() +
              "h" +
              new Date(appointment.date).getMinutes()}
          </Text>
        </Flex>
      </Flex>
      <Box>
        <Menu>
          <MenuButton as={Button}>
            <SlOptions></SlOptions>
          </MenuButton>
          <MenuList p={0}>
            <MenuItem gap={2} onClick={() => SeeMore()}>
              <FaEye></FaEye>Ver mais
            </MenuItem>
            <MenuDivider />
            <MenuItem gap={2} onClick={() => OnConfirm()}>
              <FaCheck />
              Confirmar
            </MenuItem>
            <MenuItem
              gap={2}
              onClick={() => {
                OpenModal();
              }}
            >
              <FaEdit></FaEdit>Editar
            </MenuItem>
            <MenuItem
              gap={2}
              sx={{
                color: "red",
              }}
              onClick={() => OnCancel()}
            >
              <MdCancel></MdCancel>Cancelar agendamento
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};
