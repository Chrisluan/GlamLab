import React, { useContext, useEffect, useState } from "react";
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

import { AppointmentCard } from "../Components/Appointments/AppointmentCard";
export const Appointments = () => {
  const { appointments } = useData();
  const now = new Date();
  const [isOpen, setIsOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState();

  useEffect(() => {
    console.log(editingAppointment);
    if (editingAppointment != null) OpenEditingModal();
  }, [editingAppointment]);

  const OpenEditingModal = () => setIsOpen(true);

  const EditModal = ({ popIn }) => {
    return (
      <Modal
        blockScrollOnMount={false}
        isOpen={popIn}
        motionPreset="slideInBottom"
        onClose={() => {
          setIsOpen(false);
          setEditingAppointment(null);
        }}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Editando agendamento de {editingAppointment?.client.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  return (
    <Flex width={"100%"} flexDir={"column"} gap={1}>
      <EditModal popIn={isOpen}></EditModal>

      {appointments
        .sort((a, b) => {
          return (
            Math.abs(new Date(a.date) - now) - Math.abs(new Date(b.date) - now)
          );
        })
        .map((appointment, i) => (
          <AppointmentCard
            setEditingAppointments={setEditingAppointment}
            key={i}
            appointment={appointment}
          />
        ))}
    </Flex>
  );
};
export default Appointments;
