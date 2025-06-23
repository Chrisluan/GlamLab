import React, { useContext, useState } from "react";
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
  const [ isOpen, setIsOpen ] = useState(false);

  const OpenModal = (id) => setIsOpen(true);

  const EditModal = ()=>{
    return (
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={()=>setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={()=>setIsOpen(false)}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
  return (
    <Flex width={"100%"} flexDir={"column"} gap={1}>
      

      {appointments
        .sort((a, b) => {
          return (
            Math.abs(new Date(a.date) - now) - Math.abs(new Date(b.date) - now)
          );
        })
        .map((appointment, i) => (
          <AppointmentCard
            OpenModal={()=>OpenModal()}
            key={i}
            appointment={appointment}
          />
        ))}
    </Flex>
  );
};
export default Appointments;
