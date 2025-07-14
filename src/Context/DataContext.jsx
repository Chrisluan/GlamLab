import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  CreateAppointment,
  EditAppointment,
  FetchAllAppointments,
  DeleteAppointment
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
    setClients(await FetchAllClients());
    setAppointments(await FetchAllAppointments());
    setProfessionals(await FetchAllProfessionals());
    setServices(await FetchAllServices());
  };
  useEffect(() => {
    FetchData();
  }, []);

  const UpdateAllData = async () => {
    await FetchData();
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
