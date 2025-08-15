import React, { useEffect, useMemo } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiFileText,
  FiSettings,
} from "react-icons/fi";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useData } from "../Context/DataContext";
import { useState } from "react";
// Registrar módulos do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const cardBg = useColorModeValue("#FFF9F5", "#1A202C");
  const textColor = "#3A4046";

  // Memoizar dados para evitar recriação e erro de canvas
  const revenueData = useMemo(
    () => ({
      labels: ["Jan", "Feb", "Mar"],
      datasets: [
        {
          label: "Receita",
          data: [1200, 2400, 3000],
          borderColor: "#C8B58D",
          backgroundColor: "rgba(200, 181, 141, 0.2)",
          fill: true,
          tension: 0.3,
        },
      ],
    }),
    []
  );

  const clientsData = useMemo(
    () => ({
      labels: ["Novos", "Recorrentes"],
      datasets: [
        {
          data: [54, 33.5],
          backgroundColor: ["#C7D1C8", "#C8B58D"],
        },
      ],
    }),
    []
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false } },
    }),
    []
  );
  const { appointments, UpdateAppointments } = useData();
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const total = appointments.reduce((acc, appointment) => {
      const services =
        appointment.status == "confirmed" ?
        Object.values(appointment.servicesPrice || {}) : [];

      const subtotal = services.reduce((sum, value) => sum + value, 0);
      return acc + subtotal;
    }, 0);
    setTotalRevenue(total);
  }, [appointments]);
  return (
    <Flex h="100vh" bg="#FFF9F5">
      {/* Conteúdo principal */}
      <Flex direction="column" flex={1} p={6} gap={6}>
        {/* Topbar */}

        {/* Cards principais */}
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          <Box bg={cardBg} p={5} rounded="lg" shadow="md">
            <Stat>
              <StatLabel>Total de Vendas</StatLabel>
              <StatNumber>R$ {totalRevenue.toFixed(2)}</StatNumber>
              <StatHelpText>↑ 8% semana passada</StatHelpText>
            </Stat>
          </Box>

          <Box bg={cardBg} p={5} rounded="lg" shadow="md" h="200px">
            <Stat>
              <StatLabel>Receita</StatLabel>
              <Box h="150px">
                <Line data={revenueData} options={chartOptions} />
              </Box>
            </Stat>
          </Box>

          <Box bg={cardBg} p={5} rounded="lg" shadow="md">
            <Stat>
              <StatLabel>Agendamentos</StatLabel>
              <Text>Corte de cabelo: 45</Text>
              <Text>Coloração: 20</Text>
              <Text>Manicure: 30</Text>
              <Text>Pedicure: 25</Text>
            </Stat>
          </Box>
        </SimpleGrid>

        {/* Parte inferior */}
        <SimpleGrid columns={[1, 2]} spacing={6}>
          <Box bg={cardBg} p={5} rounded="lg" shadow="md" h="250px">
            <Stat>
              <StatLabel>Clientes</StatLabel>
              <Box h="200px">
                <Pie
                  data={clientsData}
                  options={{ responsive: true, maintainAspectRatio: false }}
                />
              </Box>
            </Stat>
          </Box>

          <Box bg={cardBg} p={5} rounded="lg" shadow="md" h="250px">
            <Stat>
              <StatLabel>Tráfego do site</StatLabel>
              <StatNumber>1.340</StatNumber>
              <Box h="150px">
                <Line data={revenueData} options={chartOptions} />
              </Box>
            </Stat>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
