import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import { NavigationContext } from "../../Context/NavigationContext";
export const ContentContainer = ({ children }) => {
  const {CurrentPageProps} = useContext(NavigationContext)
  return (
    <Flex
      sx={{
        width: "100%",
        height: "100%",
        padding: "20px",
        flexDir: "column",
        gap:2,
        
      }}
    >
      <Flex width={"100%"} bg={"#f6f6f6"} sx={{
        borderRadius:"10px"
      }} padding={2}>
        <Heading>{CurrentPageProps.title}</Heading>
      </Flex>
      <Flex
        sx={{
          bg: "#f6f6f6",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          p: 2,
          borderRadius:"10px"
        }}
      >
        {children}
      </Flex>
    </Flex>
  );
};
