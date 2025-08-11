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
  Flex,
  Input,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useData } from "../../Context/DataContext";
import { EditAppointment } from "../../Context/DBConnectionMethods/Appointments";

const EditingAppointmentModal = ({ popIn, setPopIn, appointment }) => {
  const [form, setForm] = useState({});
  const [sending, setSending] = useState(false);
  const [selectedServices, setSelectedServices] = useState([
    { service: "", price: 0 },
  ]);
  const { clients, services, professionals, UpdateAllData } = useData();
  const toast = useToast();

  const handleServiceChange = (e, index) => {
    const serviceId = e.target.value;
    const fullService = services.find((s) => s._id === serviceId);
    const price = fullService?.minimumPrice || 0;

    const updatedServices = [...selectedServices];
    updatedServices[index] = {
      serviceId,
      price,
    };
    setSelectedServices(updatedServices);

    HandleFormChanges({
      target: {
        name: `services.${index}`,
        value: fullService, // salva o objeto completo
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
    const updatedServices = [...selectedServices];
    updatedServices[index].price = Number(e.target  .value);
    setSelectedServices(updatedServices);

    HandleFormChanges({
      target: {
        name: `servicesPrice.${index}`,
        value: e.target.value,
      },
    });
  };

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

      const parseValue = (val) => {
        if (val === "true") return true;
        if (val === "false") return false;
        if (!isNaN(val) && val.trim() !== "") return Number(val);
        return val;
      };

      current[keys[keys.length - 1]] = parseValue(value);

      return updatedForm;
    });
  };

  useEffect(() => {
    if (appointment) {
      setForm(appointment);

      const servicesArray = Array.isArray(appointment.services)
        ? appointment.services.map((service, i) => {
            const fullService = services.find((s) => s._id === service._id);
            return {
              service: JSON.stringify(fullService || service),
              price:
                appointment.servicesPrice?.[i] ??
                fullService?.minimumPrice ??
                0,
            };
          })
        : [];

      setSelectedServices(servicesArray);
    }
  }, [appointment, services]);

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
        <ModalHeader>Editando agendamento de {form?.client?.name}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form>
            <FormControl>
              <FormLabel>Cliente</FormLabel>
              <Select isDisabled name="client" onChange={HandleFormChanges}>
                {clients.map((client) => (
                  <option
                    key={client._id}
                    value={JSON.stringify(client)}
                    selected={
                      form?.client?._id === client._id ? "selected" : undefined
                    }
                  >
                    {client.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Flex gap={2}>
              <FormControl>
                <FormLabel>Profissional</FormLabel>
                <Select
                  name="professional"
                  onChange={HandleFormChanges}
                  value={
                    form?.professional ? JSON.stringify(form.professional) : ""
                  }
                >
                  <option value="">Selecione um profissional</option>
                  {professionals.map((professional) => (
                    <option
                      key={professional._id}
                      value={JSON.stringify(professional)}
                    >
                      {professional.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Data do agendamento</FormLabel>
                <Input
                  name="date"
                  type="datetime-local"
                  onChange={HandleFormChanges}
                  defaultValue={form.date}
                />
              </FormControl>
            </Flex>

            <FormControl isRequired mt={4}>
              {selectedServices.map((item, index) => (
                <Flex flexDir={"column"} key={index} gap={2}>
                  <FormLabel p={0} mb={0}>
                    Serviço {index + 1}
                  </FormLabel>
                  <Flex gap={2} alignItems={"center"}>
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
                mt={3}
                onClick={() =>
                  setSelectedServices([
                    ...selectedServices,
                    { service: "", price: 0 },
                  ])
                }
              >
                Adicionar mais serviços...
              </Button>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={sending}
            onClick={async () => {
              setSending(true);
              const { _id, ...formWithoutId } = form;
              await EditAppointment(form._id, formWithoutId).then(async () => {
                toast({
                  title: `Agendamento de ${form?.client.name} editado com sucesso`,
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                  position: "top-right",
                  size: "sm",
                });
                setPopIn(false);
                setSending(false);
                await UpdateAllData();
              });
            }}
            mr={3}
          >
            Confirmar
          </Button>
          <Button variant="secondary" onClick={() => setPopIn(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditingAppointmentModal;
