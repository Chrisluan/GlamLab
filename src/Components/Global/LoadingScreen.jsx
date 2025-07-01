import { Spinner, Flex, Heading } from "@chakra-ui/react";

const LoadingScreen = () => {
  return (
    <Flex justifyContent={"center"} width={"100%"} alignItems={"center"}>
      <Spinner thickness="10px" size={"xl"}></Spinner>
      <Heading ml={5}></Heading>
    </Flex>
  );
};
export default LoadingScreen;
