import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { lazy } from "react";
const DataContext = createContext(null);
DataContext.displayName = "DataContext";

const DataProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [finances, setFinances] = useState([]);

  useEffect(() => {
    const GetAppointments = async () => {
      if (appointments.length < 1) {
        try {
          console.log("Requiring Appointments")
          const response = await fetch(
            "https://glamlab-backend.vercel.app/appointments?amount=10"
          );
          const data = await response.json();
          setAppointments(data);
        } catch (e) {
          console.error("Erro ao buscar agendamentos:", e);
        }
      }
    };
    GetAppointments();
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

export { DataProvider, DataContext, useData };
