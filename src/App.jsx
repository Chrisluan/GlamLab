import { lazy, Suspense, useContext, useState } from "react";
import "./App.css";
import { Button, Flex, Heading, Box } from "@chakra-ui/react";
import Sidebar from "./Components/Sidebar/Sidebar";
import { ContentContainer } from "./Components/Content/ContentContainer";
import { NavigationContext } from "./Context/NavigationContext";
import { ModalProvider } from "./Context/ModalsContext";
import LoadingScreen from "./Components/Global/LoadingScreen";
function App() {
  const { SelectedPageComponent } = useContext(NavigationContext);

  return (
    <Flex height={"100dvh"}>
      <ModalProvider>
        <Sidebar />
        <ContentContainer>
          <Suspense fallback={<LoadingScreen></LoadingScreen>}>
            <SelectedPageComponent></SelectedPageComponent>
          </Suspense>
        </ContentContainer>
      </ModalProvider>
    </Flex>
  );
}

export default App;
