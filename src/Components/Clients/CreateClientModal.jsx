import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  Select,
  useToast,
  FormLabel,
  Flex,
  Input,
  Text,
  Link,
  Box,
  InputGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useData } from "../../Context/DataContext";
import { CreateAppointment } from "../../Context/DBConnectionMethods/Appointments";
import { CreateClient } from "../../Context/DBConnectionMethods/Clients";

const scrollToAppointment = (newId) =>
  setTimeout(() => {
    const el = document.getElementById(newId);
    if (el) {
      if (!document.getElementById("blink-style")) {
        const style = document.createElement("style");
        style.id = "blink-style";
        style.textContent = `
                    @keyframes blink {
                      0% { background-color: #E8E3D9; }
                      50% { background-color: transparent; }
                      100% { background-color: #E8E3D9; }
                    }

                    .blink {
                      animation: blink 1s ease-in-out 3;
                    }
                  `;
        document.head.appendChild(style);
      }
      el.scrollIntoView({ behavior: "smooth", block: "center" });

      el.classList.remove("blink");
      void el.offsetWidth; // força reflow para reiniciar a animação
      el.classList.add("blink");
    } else {
      console.warn("Elemento não encontrado:", newId);
    }
  }, 100);

const CreateClientModal = ({ popIn, setPopIn }) => {
  const [form, setForm] = useState({});
  const [selectedServices, setSelectedServices] = useState([
    { service: "", price: 0 },
  ]);
  const [sending, setSending] = useState(false);
  const [appointmentValue, setAppointmentValue] = useState(null);
  const { professionals, clients, services, UpdateAllData } = useData();
  const toast = useToast();


  const HandleFormChanges = (e) => {
    const { name, value } = e.target;

    const keys = name.split(".");
    setForm((prevForm) => {
      const updatedForm = { ...prevForm };
      let current = updatedForm;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }

      let parsedValue;
      try {
        parsedValue = JSON.parse(value);
      } catch {
        parsedValue = value;
      }

      current[keys[keys.length - 1]] = parsedValue;
      return updatedForm;
    });
  };
  const SendToDb = async () => {
    setSending(true);
    const { ...formWithoutId } = form;
    try {
      const response = await CreateClient(formWithoutId);
      const newId = response.insertedId;

      await UpdateAllData();

      toast({
        duration: 6000000,
        isClosable: true,
        position: "top-right",
        render: ({ onClose }) => (
          <Box
            p={4}
            bg="green.500"
            color="white"
            borderRadius="md"
            boxShadow="md"
            cursor="pointer"
            onClick={() => {
              scrollToAppointment(newId);
              onClose();
            }}
          >
            Agendamento de {form?.name} criado com sucesso!
          </Box>
        ),
      });

      setPopIn(false);
    } catch (e) {
      console.error(e);
      toast({
        title: "Erro ao criar agendamento",
        status: "error",
        description: e.message,
      });
    }
    setForm({});
    setSelectedServices([{ service: "", price: 0 }]);
    setAppointmentValue(null);

    setSending(false);
  };

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={popIn}
      motionPreset="slideInBottom"
      onClose={() => {
        setPopIn(false);
      }}
      size={"3xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Novo Cliente</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Flex gap={5}>
              <FormControl isRequired onChange={HandleFormChanges}>
                <FormLabel>Nome</FormLabel>
                <Input name="name"
                title="name"
                type="name"></Input>
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  title="email"
                  type="email"
                  onChange={HandleFormChanges}
                ></Input>
              </FormControl>
              
            </Flex>
             <FormControl>
                <FormLabel>Telefone</FormLabel>
                <Input
                  name="phone"
                  title="phone"
                  type="phone"
                  onChange={HandleFormChanges}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Data de nascimento</FormLabel>
                <Input
                  name="birthdate"
                  title="birthdate"
                  type="datetime-local"
                  onChange={HandleFormChanges}
                ></Input>
              </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setPopIn(false)}>
            Cancelar
          </Button>
          <Button isLoading={sending} onClick={() => SendToDb()} mr={3}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CreateClientModal;
