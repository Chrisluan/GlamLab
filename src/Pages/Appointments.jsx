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
  FormHelperText,
  Divider,
} from "@chakra-ui/react";
import {
  DeleteAppointment,
  EditAppointment,
  useData,
} from "../Context/DataContext";
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
  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status == "confirmed"
  );
  const todaysEstimatedGain = todaysAppointments?.reduce(
    (total, appointment) => {
      const services = Object.values(appointment.servicesPrice || {});
      const subtotal = services.reduce((sum, value) => sum + value, 0);
      return total + subtotal;
    },
    0
  );
  const confirmedEstimatedGain = confirmedAppointments?.reduce(
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
            <Text>Hoje</Text>
            <AccordionIcon />
            <Text>R$ {todaysEstimatedGain.toFixed(2)} </Text>
          </AccordionButton>
          <AccordionPanel>
            <Suspense fallback={<LoadingScreen></LoadingScreen>}>
              {todaysAppointments.map((appointment) => {
                return (
                  <AppointmentCard
                    OnCancel={async () => await HandleOnDelete(appointment._id)}
                    OnConfirm={async () =>
                      await EditAppointment(appointment._id, {
                        status: "confirmed",
                      })
                    }
                    OnMakePending={() =>
                      EditAppointment(appointment._id, {
                        status: "pending",
                      }).then(async () => await UpdateAppointments())
                    }
                    key={appointment._id}
                    appointment={appointment}
                  />
                );
              })}
            </Suspense>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Accordion allowToggle defaultChecked bg={"brand.200"}>
        <AccordionItem>
          <AccordionButton textAlign={"left"}>
            <Text>Confirmados totais</Text>
            <AccordionIcon />
            <Text>R$ {confirmedEstimatedGain.toFixed(2)} </Text>
          </AccordionButton>
          <AccordionPanel>
            <Suspense fallback={<LoadingScreen></LoadingScreen>}>
              {confirmedAppointments.map((appointment) => {
                return (
                  <AppointmentCard
                    OnCancel={async () => await HandleOnDelete(appointment._id)}
                    OnConfirm={async () =>
                      await EditAppointment(appointment._id, {
                        status: "confirmed",
                      })
                    }
                    OnMakePending={() =>
                      EditAppointment(appointment._id, {
                        status: "pending",
                      }).then(async () => await UpdateAppointments())
                    }
                    key={appointment._id}
                    appointment={appointment}
                  />
                );
              })}
            </Suspense>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Divider height={3} p={0}></Divider>
      <Text p={0} fontSize={"sm"}>Não confirmados / Pendente</Text>
      <Divider ></Divider>
      <Suspense fallback={<LoadingScreen></LoadingScreen>}>
        {appointments
          .filter(
            (appointment) =>
              new Date(appointment?.date).toDateString() !==
                new Date().toDateString() && appointment.status == "pending"
          )
          .map((appointment, i) => (
            <AppointmentCard
              OnCancel={async () => await HandleOnDelete(appointment._id)}
              OnConfirm={() =>
                EditAppointment(appointment._id, {
                  status: "confirmed",
                }).then(async () => await UpdateAppointments())
              }
              OnMakePending={() =>
                EditAppointment(appointment._id, {
                  status: "pending",
                }).then(async () => await UpdateAppointments())
              }
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
