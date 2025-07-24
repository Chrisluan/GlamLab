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
const DeleteService = async (id) => {
  try {
    console.log("Requiring Services");
    const response = await fetch(
      `https://glamlab-backend.vercel.app/services/${id}`,
      {
        method: "DELETE",
      }
    );
    return (await response).json;
  } catch (e) {
    console.error("Erro ao buscar agendamentos:", e);
  }
};
const EditService = async (id, data) => {
  try {
    console.log("Requiring Services");
    const response = await fetch(
      `https://glamlab-backend.vercel.app/services/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );  
    return (await response).json;
  }
  catch (e) {
    console.error("Erro ao buscar agendamentos:", e);
  }
}


const CreateService = async (data) => {
  try {
    console.log("Requiring Services");
    const response = await fetch(
      "https://glamlab-backend.vercel.app/services",
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

export { FetchAllServices, CreateService, DeleteService, EditService };
