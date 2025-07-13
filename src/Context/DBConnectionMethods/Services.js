const FetchAllServices = async () => {
  try {
    console.log("Requiring Services");
    const response = await fetch("https://glamlab-backend.vercel.app/services");
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Erro ao buscar agendamentos:", e);
  }
};
const CreateNewService = async (data) => {
  try {
    console.log("Requiring Services");
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
    return (await response).json;
  } catch (e) {
    console.error("Erro ao buscar agendamentos:", e);
  }
};
export { FetchAllServices, CreateNewService };
