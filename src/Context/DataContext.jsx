import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  CreateAppointment,
  EditAppointment,
  FetchAllAppointments,
  DeleteAppointment,
} from "./DBConnectionMethods/Appointments";
import { lazy } from "react";
import { FetchAllClients } from "./DBConnectionMethods/Clients";
import { FetchAllProfessionals } from "./DBConnectionMethods/Professionals";
import { FetchAllServices } from "./DBConnectionMethods/Services";
const DataContext = createContext(null);
DataContext.displayName = "DataContext";

const DataProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [services, setServices] = useState([]);
  const [finances, setFinances] = useState([]);

  const FetchData = async () => {
    UpdateAppointments();
    UpdateClients();
    UpdateProfessionals();
    UpdateServices();
  };
  useEffect(() => {
    FetchData();
  }, []);

  const UpdateAllData = async () => {
    console.log("Requiring All Data");
    await FetchData();
  };
  const UpdateServices = async () => {
    console.log("Requiring Services");
    setServices(await FetchAllServices());
  };
  const UpdateAppointments = async () => {
    console.log("Requiring Appointments");
    setAppointments(await FetchAllAppointments());
  };
  const UpdateClients = async () => {
    console.log("Requiring Clients");

    setClients(await FetchAllClients());
  };
  const UpdateProfessionals = async () => {
    console.log("Requiring Professionals");

    setProfessionals(await FetchAllProfessionals());
  };

  return (
    <DataContext.Provider
      value={{
        appointments,
        services,
        clients,
        professionals,
        finances,
        UpdateAllData,
        UpdateServices,
        UpdateAppointments,
        UpdateClients,
        UpdateProfessionals,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useData deve ser usado dentro de um DataProvider");
  return context;
};

export {
  DataProvider,
  DataContext,
  useData,
  CreateAppointment,
  EditAppointment,
  DeleteAppointment,
};
