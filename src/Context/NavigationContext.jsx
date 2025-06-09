import { createContext, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import options from "../Components/Sidebar/configs/Options.json";

//Pages
import Appointments from "../Pages/Appointments";
import Dashboard from "../Pages/Dashboard";
import Configuration from "../Pages/Configuration";
import Finances from "../Pages/Finances";
import Professionals from "../Pages/Professionals";
import NoPage from "../Pages/NoPage";


const pagesComponents = {
  Appointments,
  NoPage,
  Dashboard,
  Finances,
  Professionals,
  Configuration
  
};

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  const defaultOption = options.find((option) => option.isDefault === true);
  const noPageOption = { page: "NoPage", title: "Página não encontrada" };

  const [CurrentPageProps, setCurrentPageProps] = useState(
    defaultOption?.page && pagesComponents[defaultOption.page]
      ? defaultOption
      : noPageOption
  );

  const switchPage = (novaPagina) => {
    const selected = options.find((op) => op.page === novaPagina);
    if (!selected || !pagesComponents[novaPagina]) {
      console.warn(`Página "${novaPagina}" não existe.`);
      setCurrentPageProps(noPageOption);
    } else {
      setCurrentPageProps(selected);
    }
  };

  const SelectedPageComponent = pagesComponents[CurrentPageProps?.page] || NoPage;

  return (
    <NavigationContext.Provider
      value={{ CurrentPageProps, SelectedPageComponent, switchPage, pagesComponents }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export { NavigationContext, NavigationProvider, options };
