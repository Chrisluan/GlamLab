import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { NavigationProvider } from "./Context/NavigationContext.jsx";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import { DataProvider } from "./Context/DataContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <NavigationProvider>
        <Suspense fallback={()=><Spinner></Spinner>}>
          <DataProvider>
            <App />
          </DataProvider>
        </Suspense>
      </NavigationProvider>
    </ChakraProvider>
  </StrictMode>
);
