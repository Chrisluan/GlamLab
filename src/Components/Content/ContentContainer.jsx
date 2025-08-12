import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { useContext, Suspense, lazy } from "react";
import { NavigationContext } from "../../Context/NavigationContext";
import LoadingScreen from "../Global/LoadingScreen";
import { useModal } from "../../Context/ModalsContext";
import { form } from "framer-motion/client";
export const ContentContainer = ({ children }) => {
  const { CurrentPageProps } = useContext(NavigationContext);
  const { openEditModal, openCreateModal, openCreateClientModal, openCreateServiceModal } = useModal();
  return (
    <Flex
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        padding: "20px",
        flexDir: "column",
        gap: 2,
      }}
    >
      <Flex
        width={"100%"}
        bg={"brand.50"}
        justifyContent={"space-between"}
        sx={{
          borderRadius: "10px",
        }}
        padding={2}
        
      >
        <Heading fontSize={"larger"}>{CurrentPageProps.title}</Heading>
        <Flex flexDir={"row"} gap={2}>
          {renderPageButton({ openCreateModal, openCreateClientModal, openCreateServiceModal}, CurrentPageProps)}
        </Flex>
      </Flex>
      <Flex
        sx={{
          overflow: "auto",
          bg: "brand.100",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          p: 2,
          borderRadius: "10px",
        }}
       
      >
        {children}
      </Flex>
    </Flex>
  );
};
const renderPageButton = (actions, CurrentPageProps) => {
  switch (CurrentPageProps.title) {
    case "Agendamentos":
      return (
        <Button onClick={() => actions.openCreateModal()}>
          Agendar
        </Button>
      );
    case "Clientes":
      return (
        <Button onClick={() => actions.openCreateClientModal()}>
          Novo Cliente
        </Button>
      );

    case "Serviços":
      return (
        <Button onClick={() => actions.openCreateServiceModal()}>
          Novo Serviço
        </Button>
      );

    default:
      return null;
  }
};
