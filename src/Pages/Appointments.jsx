import React, { useContext, useEffect, useState, Suspense, lazy } from "react";
import {
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { DeleteAppointment, useData } from "../Context/DataContext";
import LoadingScreen from "../Components/Global/LoadingScreen";
import EditingModal from "../Components/Appointments/EditingAppointmentModal";
import { useModal } from "../Context/ModalsContext";

// Lazy import do AppointmentCard
const AppointmentCard = lazy(() =>
  import("../Components/Appointments/AppointmentCard")
);

export const Appointments = () => {
  const { appointments, UpdateAppointments } = useData();
  const toast = useToast();
  const now = new Date();
  const HandleOnDelete = async (id) => {
    try {
      const response = await DeleteAppointment(id);

      if (response) {
        toast({
          position: "top-right",
          title: "Agendamento deletado com sucesso",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        await UpdateAppointments();
      }
    } catch (e) {
      toast({
        title: "Erro ao deletar agendamento",
        description: "Tente novamente mais tarde.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const todaysAppointments = appointments.filter(
    (appointment) =>
      new Date(appointment.date).toDateString() == new Date().toDateString()
  );
  const todaysEstimatedGain = todaysAppointments?.reduce(
    (total, appointment) => {
      const services = Object.values(appointment.servicesPrice || {});
      const subtotal = services.reduce((sum, value) => sum + value, 0);
      return total + subtotal;
    },
    0
  );
  return (
    <Flex width={"100%"} flexDir={"column"} gap={1}>
      <Accordion allowToggle defaultChecked bg={"brand.200"}>
        <AccordionItem>
          <AccordionButton textAlign={"left"}>
            <Text>Agendado para hoje</Text>
            <AccordionIcon />
            <Text>R$ {todaysEstimatedGain.toFixed(2)} </Text>
          </AccordionButton>
          <AccordionPanel>
            <Suspense fallback={<LoadingScreen></LoadingScreen>}>
              {todaysAppointments.map((appointment) => {
                return (
                  <AppointmentCard
                    OnCancel={async () => await HandleOnDelete(appointment._id)}
                    key={appointment._id}
                    appointment={appointment}
                  />
                );
              })}
            </Suspense>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Suspense fallback={<LoadingScreen></LoadingScreen>}>
        {appointments
          .sort((a, b) => {
            return (
              Math.abs(new Date(a.date) - now) -
              Math.abs(new Date(b.date) - now)
            );
          })
          .filter(
            (appointment) =>
              new Date(appointment?.date).toDateString() !==
              new Date().toDateString()
          )
          .map((appointment, i) => (
            <AppointmentCard
              OnCancel={async () => await HandleOnDelete(appointment._id)}
              id={i}
              key={i}
              appointment={appointment}
            />
          ))}
      </Suspense>
    </Flex>
  );
};

export default Appointments;
