import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import React from "react";

export const AppointmentCard = ({ appointment }) => {
  return (
    <Flex
      
      fontFamily={"Segoe UI"}
      width={"100%"}
      height={"fit-content"}
      padding={4}
      borderRadius={"2xl"}
      flexDir={"column"}
      fontSize={"sm"}
      sx={{
        boxShadow:"0px 6px 19px -4px rgba(0,0,0,0.1)"
      }}
      _hover={{
        bg: "rgba(0,0,0,0.03)",
      }}
    >
    
      <Flex gap={5} alignItems={"center"}>
        <Text
          sx={{
            fontSize: "md",
            fontWeight:"600"
          }}
        >
          {appointment.client?.name}
        </Text>
        <Text>{appointment.service.name}</Text>
      </Flex>
      <Flex alignItems={"center"} gap={1}>
        <Text>{new Date(appointment.date).toLocaleDateString()}</Text>
        ●
        <Text>
          {new Date(appointment.date).getHours() +
            "h" +
            new Date(appointment.date).getMinutes()}
        </Text>
      </Flex>
    </Flex>
  );
};
