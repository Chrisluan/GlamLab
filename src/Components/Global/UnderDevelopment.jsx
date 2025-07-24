import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import underDevImage from "../../assets/underdev.png";
import { useContext } from "react";
import { NavigationContext } from "../../Context/NavigationContext";
export const UnderDevelopment = () => {
  // Context can be used here if needed in the future
  const { CurrentPageProps } = useContext(NavigationContext);
  return (
    <Flex
      flexDir={"column"}
      gap={3}
      width={"100%"}
      height={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image w={"300px"} src={underDevImage} />
      <Flex
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        textAlign={"center"}
        gap={2}
      >
        <Heading color={"brand.700"} fontWeight={200}>Página <b>{CurrentPageProps.title}</b>  em Desenvolvimento</Heading>
        <Text as={"p"}>
          A página {CurrentPageProps.title} está em desenvolvimento e será atualizada em breve.
        </Text>
      </Flex>
    </Flex>
  );
};
export default UnderDevelopment;
