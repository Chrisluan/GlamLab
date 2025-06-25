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

// Lazy import do AppointmentCard
const AppointmentCard = lazy(() =>
  import("../Components/Appointments/AppointmentCard")
);

export const Appointments = () => {
  const { appointments } = useData();
  const now = new Date();
  const [isEditingOpen, setIsEditingOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState();

  useEffect(() => {
    if (editingAppointment != null) openEditingModal();
  }, [editingAppointment]);
  useEffect(() => {
    if (isEditingOpen == false) {
      setEditingAppointment(null);
    }
  }, [isEditingOpen]);
  const openEditingModal = () => setIsEditingOpen(true);

  return appointments ? (
    <Flex width={"100%"} flexDir={"column"} gap={1}>
      <EditingModal
        setPopIn={setIsEditingOpen}
        popIn={isEditingOpen}
        setCurrentEditing={setEditingAppointment}
        currentEditing={editingAppointment}
      />
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
              setEditingAppointments={setEditingAppointment}
              key={i}
              appointment={appointment}
            />
          ))}
      </Suspense>
    </Flex>
  ) : (
    <LoadingScreen></LoadingScreen>
  );
};

export default Appointments;
