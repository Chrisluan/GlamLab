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
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useData } from "../../Context/DataContext";
import { CreateService } from "../../Context/DBConnectionMethods/Services";
import { FaDollarSign } from "react-icons/fa";
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

const CreateServiceModal = ({ popIn, setPopIn }) => {
  const [form, setForm] = useState({});
  const [sending, setSending] = useState(false);
  const [appointmentValue, setAppointmentValue] = useState(null);
  const {UpdateServices } = useData();
  const toast = useToast();

  const HandleFormChanges = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
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
      const response = await CreateService(formWithoutId);
      const newId = response.insertedId;

      await UpdateServices();

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
            Serviço {form?.name} criado com sucesso!
          </Box>
        ),
      });

      setPopIn(false);
    } catch (e) {
      console.error(e);
      toast({
        title: "Erro ao criar serviço",
        status: "error",
        description: e.message,
      });
    }
    setForm({});
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
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Novo Serviço</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <FormControl isRequired onChange={HandleFormChanges}>
              <FormLabel>Nome</FormLabel>
              <Input name="name" title="Nome do Serviço" type="name"></Input>
            </FormControl>

            <FormControl>
              <FormLabel>Preço Base</FormLabel>
              <InputGroup>
                <InputLeftAddon pointerEvents="none">R$</InputLeftAddon>

                <Input
                  name="minimumPrice"
                  title="Valor Mínimo"
                  type="number"
                  min={0}
                  max={1000}
                  onChange={HandleFormChanges}
                ></Input>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Comissão Padrão</FormLabel>
              <InputGroup>
                <Input
                  name="defaultComission"
                  title="Comissão Padrão"
                  type="number"
                  onChange={HandleFormChanges}
                ></Input>
                <InputRightAddon pointerEvents="none">%</InputRightAddon>
              </InputGroup>
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
export default CreateServiceModal;
