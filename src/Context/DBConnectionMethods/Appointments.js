import { useData } from "../DataContext";

const EditAppointment = async (id, newData) => {
  try {
    const rawResponse = await fetch(
      `https://glamlab-backend.vercel.app/editappointment/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );
    return rawResponse.json();
  } catch (e) {
    console.log(e);
  }
};
const CreateAppointment = async (data) => {
  console.log(data);
  try {
    const response = await fetch(
      "https://glamlab-backend.vercel.app/appointments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (e) {
    console.log("Erro em: ", { e });
  }
};
const FetchAllAppointments = async () => {
  try {
    console.log("Requiring Appointments");
    const response = await fetch(
      "https://glamlab-backend.vercel.app/appointments"
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Erro ao buscar agendamentos:", e);
  }
};
const DeleteAppointment = async (id) => {
  try {
    const response = await fetch(`https://glamlab-backend.vercel.app/appointments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return await response.json();
  } catch (e) {
    console.log("Erro ao deletar agendamento:", e);
  }
};
export {
  CreateAppointment,
  DeleteAppointment,
  EditAppointment,
  FetchAllAppointments,
};
