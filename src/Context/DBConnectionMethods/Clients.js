const FetchAllClients = async () => {
  try {
    const response = await fetch("https://glamlab-backend.vercel.app/clients");
    return response.json();
  } catch (e) {
    console.log("Erro ao buscar todos os clientes: " + e.message);
    return "Erro ao buscar clientes";
  }
};
const CreateClient = async (clientData) => {
  try {
    const response = await fetch("https://glamlab-backend.vercel.app/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientData),
    });
    return response.json();
  } catch (e) {
    console.log("Erro ao criar cliente: " + e.message);
    throw new Error("Erro ao criar cliente");
  }
};

const DeleteClient = async (clientId) => {
  try {
    const response = await fetch(`https://glamlab-backend.vercel.app/clients/${clientId}`, {
      method: "DELETE",
    });
    return response.json();
  } catch (e) {
    console.log("Erro ao deletar cliente: " + e.message);
    throw new Error("Erro ao deletar cliente");
  }
};
export { FetchAllClients, DeleteClient, CreateClient };
