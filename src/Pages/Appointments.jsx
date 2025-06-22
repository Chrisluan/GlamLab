import React, { useContext } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useData } from "../Context/DataContext";

import { AppointmentCard } from "../Components/Appointments/AppointmentCard";
export const Appointments = () => {
  const { appointments } = useData();
  const now = new Date();

  return (
    <Flex width={"100%"} flexDir={"column"} gap={1}>
      {appointments
        .sort((a, b) => {
          return (
            Math.abs(new Date(a.date) - now) - Math.abs(new Date(b.date) - now)
          );
        })
        .map((appointment, i) => (
          <AppointmentCard key={i} appointment={appointment} />
        ))}
    </Flex>
  );
};
export default Appointments;
