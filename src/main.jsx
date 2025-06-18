import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { NavigationProvider } from "./Context/NavigationContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { DataProvider } from "./Context/DataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <NavigationProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </NavigationProvider>
    </ChakraProvider>
  </StrictMode>
);
