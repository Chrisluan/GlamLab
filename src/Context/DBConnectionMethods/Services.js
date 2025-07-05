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
export { FetchAllServices };
