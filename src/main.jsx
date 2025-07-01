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
      <NavigationProvider>
        <Suspense fallback={() => <Spinner></Spinner>}>
          <DataProvider>
            
              <App />
            
          </DataProvider>
        </Suspense>
      </NavigationProvider>
    </ChakraProvider>
  </StrictMode>
);
