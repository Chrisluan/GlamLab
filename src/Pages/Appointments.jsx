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
} from "@chakra-ui/react";
import { useData } from "../Context/DataContext";
import LoadingScreen from "../Components/Global/LoadingScreen";
import EditingModal from "../Components/Appointments/EditingModal";
import { useModal } from "../Context/ModalsContext";

// Lazy import do AppointmentCard
const AppointmentCard = lazy(() =>
  import("../Components/Appointments/AppointmentCard")
);

export const Appointments = () => {
  const { appointments } = useData();
  const now = new Date();

  return (
    <Flex width={"100%"} flexDir={"column"} gap={1}>
      <Accordion allowToggle bg={"brand.500"}>
        <AccordionItem>
          <AccordionButton textAlign={"left"}>
            <Text>Agendado para hoje</Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Suspense fallback={<LoadingScreen></LoadingScreen>}>
              {appointments
                .filter(
                  (appointment) =>
                    new Date(appointment?.date).toDateString() ===
                    new Date().toDateString()
                )
                .map((appointment) => {
                  return (
                    <AppointmentCard
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
            <AppointmentCard key={i} appointment={appointment} />
          ))}
      </Suspense>
    </Flex>
  );
};

export default Appointments;
