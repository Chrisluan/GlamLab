import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { NavigationProvider } from "./Context/NavigationContext.jsx";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { DataProvider } from "./Context/DataContext.jsx";
import { ModalProvider } from "./Context/ModalsContext";
import theme from "./Theme/theme.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <DataProvider>
        <NavigationProvider>
          <Suspense fallback={<Spinner />}>
            <ModalProvider>
              <App />
            </ModalProvider>
          </Suspense>
        </NavigationProvider>
      </DataProvider>
    </ChakraProvider>
  </StrictMode>
);
