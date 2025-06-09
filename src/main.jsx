import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { NavigationProvider } from "./context/NavigationContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </ChakraProvider>
  </StrictMode>
);
