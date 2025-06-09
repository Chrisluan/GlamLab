import { useContext, useState } from "react";

import { Button, Flex, Heading, Box } from "@chakra-ui/react";
import Sidebar from "./Components/Sidebar/Sidebar";
import { ContentContainer } from "./Components/Content/ContentContainer";
import { NavigationContext } from "./Context/NavigationContext";
function App() {
  const { SelectedPageComponent } = useContext(NavigationContext);

  return (
    <Flex height={"100dvh"}>
      <Sidebar />
      <ContentContainer>
        <SelectedPageComponent></SelectedPageComponent>
      </ContentContainer>
    </Flex>
  );
}

export default App;
