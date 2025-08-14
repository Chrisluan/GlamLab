import { ValidateForm } from "../../Utils/Validation";

const EditAppointment = async (id, newData) => {
  try {
    const rawResponse = await fetch(
      `https://glamlab-backend.vercel.app/appointments/${id}`,
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
  console.log("Criando agendamento com os dados:", data);
  const { isValid, invalidFields } = await ValidateForm(
    ["client", "date", "services", "professional", "status"],
    data
  );
 
  if (!isValid) {
    throw new Error("Preencha todos os campos obrigatórios.", {
      cause: invalidFields,
    });
    
  } else {
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
  }
};
const FetchAllAppointments = async () => {
  try {
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
    const response = await fetch(
      `https://glamlab-backend.vercel.app/appointments/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // Lança erro para que o toast capture
      throw new Error(data?.message || "Erro ao excluir agendamento");
    }

    return data;
  } catch (e) {
    console.error("Erro ao deletar agendamento:", e);
    throw e; // ← MUITO IMPORTANTE: repropagar erro para o toast.promise
  }
};

export {
  CreateAppointment,
  DeleteAppointment,
  EditAppointment,
  FetchAllAppointments,
};
