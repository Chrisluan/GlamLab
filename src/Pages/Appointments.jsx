import React, { useContext, useEffect, useState, Suspense, lazy } from "react";
import {
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Button,
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
      
      <Suspense fallback={<LoadingScreen></LoadingScreen>}>
        {appointments
          .sort((a, b) => {
            return (
              Math.abs(new Date(a.date) - now) -
              Math.abs(new Date(b.date) - now)
            );
          })
          .map((appointment, i) => (
            <AppointmentCard
              key={i}
              appointment={appointment}
            />
          ))}
      </Suspense>
    </Flex>
  )
};

export default Appointments;
