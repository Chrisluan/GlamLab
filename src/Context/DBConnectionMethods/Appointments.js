

const CreateNewAppointment = () => {};

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
    )
    return rawResponse.json();
  } catch (e) {
    console.log(e);
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
export { CreateNewAppointment, EditAppointment, FetchAllAppointments };
