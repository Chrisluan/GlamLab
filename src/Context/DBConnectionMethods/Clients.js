import { ValidateForm } from "../../Utils/Validation";
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
  const { isValid, invalidFields } = ValidateForm(
      ["name", "phone"],
      clientData
    );

  if (!isValid) {
    throw new Error("Preencha todos os campos obrigatórios.", {
      cause: invalidFields,
    });
  }
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
    throw new Error("Erro ao criar cliente: ", e.message);
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
