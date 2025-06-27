const FetchAllClients = async () => {
  try {
    const response = await fetch("http://localhost:3000/clients");
    return response.json();
  } catch (e) {
    console.log("Erro ao buscar todos os clientes: " + e.message);
    return "Erro ao buscar clientes";
  }
};
export { FetchAllClients };
