import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  CreateAppointment,
  EditAppointment,
  FetchAllAppointments,
} from "./DBConnectionMethods/Appointments";
import { lazy } from "react";
import { FetchAllClients } from "./DBConnectionMethods/Clients";

const DataContext = createContext(null);
DataContext.displayName = "DataContext";

const DataProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [finances, setFinances] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      setClients(await FetchAllClients());
      setAppointments(await FetchAllAppointments());
    };
    FetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{ appointments, clients, professionals, finances }}
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
};
