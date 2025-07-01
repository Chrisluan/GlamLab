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
import { useModal } from "../../Context/ModalsContext";
import { SlOptions } from "react-icons/sl";
import { FaCheck } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { FaEye } from "react-icons/fa";
const AppointmentCard = ({
  appointment,
  setEditingAppointments,
  OnCancel,
  OnConfirm,
}) => {
  const { openEditModal } = useModal();
  return (
    <Flex
      fontFamily={"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}
      width={"100%"}
      height={"fit-content"}
      padding={4}
      transition="all 0.3s"
      border={"1px solid"}
      borderColor={"brand.200"}
      borderRadius={"md"}
      flexDir={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      fontSize={"sm"}
      _hover={{
        bg: "brand.200",
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
          <Text aria-label="services">{appointment.service?.name}</Text>
        </Flex>
        <Flex alignItems={"center"} gap={1}>
          <Text aria-label="appointment date">
            {new Date(appointment.date).toLocaleDateString()}
          </Text>
          ●
          <Text aria-label="appointment time">
            {new Date(appointment.date).getHours() +
              "h" +
              new Date(appointment.date).getMinutes()}
          </Text>
        </Flex>
      </Flex>
      <Box>
        <Menu>
          <MenuButton as={Button} variant={"secondary"}>
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
                console.log(appointment)
                openEditModal(appointment);
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
export default AppointmentCard;
