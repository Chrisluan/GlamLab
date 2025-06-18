import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { useData } from "../Context/DataContext";

import { AppointmentCard } from "../Components/Appointments/AppointmentCard";
export const Appointments = () => {
  const {clients} = useData();

  
  return <AppointmentCard></AppointmentCard>;
};
export default Appointments;
