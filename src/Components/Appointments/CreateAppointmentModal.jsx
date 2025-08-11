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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useData } from "../../Context/DataContext";
import { CreateAppointment } from "../../Context/DBConnectionMethods/Appointments";

import { SearchAndSelectBar } from "../Global/SearchAndSelectBar";
import { ValidateForm } from "../../Utils/Validation";
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
      void el.offsetWidth;
      el.classList.add("blink");
    } else {
      console.warn("Elemento não encontrado:", newId);
    }
  }, 100);

const CreateAppointmentModal = ({ popIn, setPopIn }) => {
  const [form, setForm] = useState({});
  const [selectedServices, setSelectedServices] = useState([
    { service: "", price: 0 },
  ]);
  const [sending, setSending] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { professionals, clients, services, UpdateAppointments } = useData();


  const toast = useToast();

  useEffect(() => {
    const checkFormValidity = async () => {
      const { isValid } = await ValidateForm(
        ["client", "date", "services", "professional", "status"],
        form
      );
      setIsFormValid(isValid);
      console.log("Formulário válido?", isValid);
    };
    checkFormValidity();
  }, [form]);
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
  const handleServiceChange = (e, index) => {
    const service = JSON.parse(e.target.value);
    const price = service.minimumPrice || 0;

    const updatedServices = [...selectedServices];
    updatedServices[index] = {
      service: e.target.value,
      price,
    };
    setSelectedServices(updatedServices);

    // Atualiza o form principal
    HandleFormChanges({
      target: {
        name: `services.${index}`,
        value: e.target.value,
      },
    });

    HandleFormChanges({
      target: {
        name: `servicesPrice.${index}`,
        value: price,
      },
    });
  };

  const handlePriceChange = (e, index) => {
    const value = parseFloat(e.target.value) || 0;

    const updatedServices = [...selectedServices];
    updatedServices[index].price = value;
    setSelectedServices(updatedServices);

    HandleFormChanges({
      target: {
        name: `servicesPrice.${index}`,
        value,
      },
    });
  };
  const SendToDb = async () => {
    setSending(true);
    const { ...formWithoutId } = form;

    try {
      console.log("Enviando dados para o banco:", formWithoutId);
      const response = await CreateAppointment(formWithoutId);
      const newId = response.insertedId;

      await UpdateAppointments();

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
            Agendamento de {form?.client.name} criado com sucesso!
          </Box>
        ),
      });

      setPopIn(false);
    } catch (e) {
      toast({
        title: e.message,
        status: "error",
        description: e.cause.join(", "),
      });
    }
    setForm({});
    setSelectedServices([{ service: "", price: 0 }]);

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
        <ModalHeader>Novo agendamento</ModalHeader>
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
              <FormControl isRequired>
                <FormLabel>Cliente</FormLabel>
                <SearchAndSelectBar
                  list={clients}
                  onChange={HandleFormChanges}
                />
                
              </FormControl>

              <FormControl>
                <FormLabel>Data do agendamento</FormLabel>
                <Input
                  name="date"
                  title="date"
                  type="datetime-local"
                  onChange={HandleFormChanges}
                ></Input>
              </FormControl>
            </Flex>
            <FormControl onChange={HandleFormChanges}>
              <FormLabel>Profissional</FormLabel>
              <Select name="professional" title="professional">
                <option value={null}>Selecione um profissional</option>
                {professionals.map((professional) => {
                  return (
                    <option
                      defaultValue={null}
                      key={professional._id}
                      value={JSON.stringify(professional)}
                    >
                      {professional.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <Flex gap={5}>
              <FormControl isRequired flex={2}>
                {selectedServices.map((item, index) => (
                  <Flex flexDir={"column"} key={index} gap={2}>
                    <FormLabel p={0} mb={0}>
                      Serviço {index + 1}
                    </FormLabel>
                    <Flex gap={2} alignItems={"center"} key={index}>
                      <Select
                        flex={2}
                        name={`services.${index}`}
                        value={item.service}
                        onChange={(e) => handleServiceChange(e, index)}
                      >
                        <option value="">Selecione um serviço</option>
                        {services.map((service) => (
                          <option
                            key={service._id}
                            value={JSON.stringify(service)}
                          >
                            {service.name}
                          </option>
                        ))}
                      </Select>
                      <FormControl flex={0.5}>
                        <InputGroup>
                          <InputLeftAddon>
                            <Text>R$</Text>
                          </InputLeftAddon>
                          <Input
                            name={`servicesPrice.${index}`}
                            type="number"
                            value={item.price}
                            onChange={(e) => handlePriceChange(e, index)}
                          />
                        </InputGroup>
                      </FormControl>
                    </Flex>
                  </Flex>
                ))}

                <Button
                  variant="outline"
                  onClick={(e) => {
                    setSelectedServices([
                      ...selectedServices,
                      { service: "", price: 0 },
                    ]);
                  }}
                >
                  Adicionar mais serviços...
                </Button>
              </FormControl>
            </Flex>
            <FormControl flex={1} onChange={HandleFormChanges}>
              <FormLabel>Situação</FormLabel>
              <Select name="status" title="status">
                <option defaultValue={"pending"} value={"pending"}>
                  Pendente
                </option>
                <option defaultValue={"confirmed"} value={"confirmed"}>
                  Confirmado
                </option>
              </Select>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={() => setPopIn(false)}>
            Cancelar
          </Button>
          <Button
            isLoading={sending}
            isDisabled={!isFormValid}
            onClick={() => {
              try {
                SendToDb();
              } catch (e) {
                console.error("Erro ao enviar dados:", e);
                toast({
                  title: `Erro ao enviar dados: ${e.message}`,
                  status: "error",
                  description: e.message,
                });
              }
            }}
            mr={3}
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CreateAppointmentModal;
