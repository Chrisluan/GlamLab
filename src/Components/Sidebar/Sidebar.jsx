import { Flex, Heading } from "@chakra-ui/react";
import React, { useState, useContext } from "react"; // Importar useState
import SidebarButtonContainer from "./components/SidebarButtonContainer";
import SidebarButton from "./components/SidebarButton";
import { NavigationContext } from "../../Context/NavigationContext";
import { options } from "../../Context/NavigationContext";
export const Sidebar = () => {
  const { switchPage, CurrentPageProps } = useContext(NavigationContext);

  return (
    <Flex
      height={"100dvh"}
      flexDir={"column"}
      width={"230px"}
      gap={2}
      backgroundColor={"#f6f6f6"}
    >
      <Flex justifyContent={"center"} alignItems={"center"} height="80px">
        <Heading fontSize={"2xl"}>GlamLab</Heading>
      </Flex>

      <Flex flexDir={"column"}>
        {/* 2. Passar o valor e o manipulador onChange para o contêiner */}
        <SidebarButtonContainer
          value={CurrentPageProps.page}
          onChange={switchPage}
        >
          {options.map((o, i) => {
            return <SidebarButton defaultChecked={o.isDefault} key={i} value={o.page}>{o.title}</SidebarButton>;
          })}
        </SidebarButtonContainer>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
