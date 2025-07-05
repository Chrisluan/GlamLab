const FetchAllProfessionals = async () => {
  try {
    const response = await fetch("https://glamlab-backend.vercel.app/professionals");
    return response.json();
  } catch (e) {
    console.log("Erro ao buscar todos os clientes: " + e.message);
    return "Erro ao buscar clientes";
  }
};
export { FetchAllProfessionals };