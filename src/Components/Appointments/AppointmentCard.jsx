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
} from "@chakra-ui/react";
import React from "react";
import { useModal } from "../../Context/ModalsContext";
import { SlOptions } from "react-icons/sl";
import { FaCheck, FaEdit, FaEye, FaTrash, FaWindowClose } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
const AppointmentCard = ({
  id,
  appointment,
  setEditingAppointments,
  OnCancel,
  OnConfirm,
  OnMakePending,
}) => {
  const { openEditModal } = useModal();
  const formattedTime = new Date(appointment.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = new Date(appointment.date).toLocaleDateString();

  var totalPrice = Object.values(appointment.servicesPrice).reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  return (
    <Flex
      id={appointment._id}
      fontFamily={"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}
      width="100%"
      px={4}
      py={2}
      border="1px solid"
      borderColor="brand.200"
      borderRadius="md"
      justifyContent="space-between"
      alignItems="center"
      fontSize="sm"
      _hover={{ bg: "brand.200" }}
    >
      <Flex direction="column" width={"100%"} gap={1}>
        <Flex gap={2} wrap="wrap" align="center">
          <Text fontWeight="600">{appointment.client?.name}</Text>
          <Text color="gray.600">
            {Object.values(appointment.services)
              .map((s) => s.name)
              .join(", ")}
          </Text>
        </Flex>

        <Flex gap={2} width={"100%"} wrap="wrap" fontSize="xs" color="gray.600">
          <Text>Prof.: {appointment.professional?.name}</Text>
          <Text>
            {formattedDate} •{" "}
            {new Date(appointment.date)
              .toLocaleString("default", { weekday: "long" })
              .toLocaleUpperCase()}{" "}
            • {formattedTime}
          </Text>
          <Text fontWeight="semibold" color="green.600">
            R$ {totalPrice.toFixed(2)}
          </Text>
        </Flex>
      </Flex>

      <Flex width={"100%"} justifyContent="end">
        <DayTags date={appointment.date}></DayTags>
      </Flex>
      <Menu>
        <MenuButton as={Button} variant="ghost" size="sm" p={1}>
          <SlOptions />
        </MenuButton>
        <MenuList p={0}>
          <MenuItem gap={2} onClick={() => SeeMore()}>
            <FaEye /> Ver mais
          </MenuItem>
          <MenuDivider />
          {appointment.status == "pending" ? (
            <MenuItem gap={2} onClick={async () => await OnConfirm()}>
              <FaCheck /> Confirmar
            </MenuItem>
          ) : (
            <MenuItem gap={2} onClick={async () => await OnMakePending()}>
              <IoCloseSharp /> Cancelar
            </MenuItem>
          )}

          <MenuItem gap={2} onClick={() => openEditModal(appointment)}>
            <FaEdit /> Editar
          </MenuItem>
          <MenuItem gap={2} color="red.500" onClick={() => OnCancel()}>
            <FaTrash /> Excluir
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

const DayTags = ({ date }) => {
  if (!date) {
    return null;
  }
  const day = new Date(date).getDate();
  const month = new Date(date).toLocaleString("default", { month: "short" });
  const year = new Date(date).getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  const dayOfWeek = new Date(date).toLocaleString("default", {
    weekday: "short",
  });
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.toLocaleString("default", { month: "short" });
  const todayYear = today.getFullYear();

  const period =
    day === todayDay && month === todayMonth && year === todayYear
      ? "Hoje"
      : todayDay + 1 === day && month === todayMonth && year === todayYear
      ? "Amanhã"
      : todayDay - 1 === day && month === todayMonth && year === todayYear
      ? "Ontem"
      : `${dayOfWeek} ${formattedDate}`;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingInline={2}
      bg={
        period === "Hoje"
          ? "green.500"
          : period === "Amanhã"
          ? "blue.500"
          : period === "Ontem"
          ? "red.500"
          : "gray.500"
      }
      borderRadius="md"
    >
      <Text fontSize="12px" fontWeight="bold" color="white">
        {period}
      </Text>
    </Box>
  );
};

export default AppointmentCard;
