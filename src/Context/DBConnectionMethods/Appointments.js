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
  const validData = Object.keys(data).reduce((acc, key) => {
    if (validInputs.includes(key)) {
      acc[key] = data[key];
    }
    return acc;
  }, {});

  try {
    const response = fetch("https://glamlab-backend.vercel.app/appointments", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
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
export { CreateAppointment, EditAppointment, FetchAllAppointments };
