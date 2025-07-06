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
  Link
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useData } from "../../Context/DataContext";
import { CreateAppointment } from "../../Context/DBConnectionMethods/Appointments";

const CreateModal = ({ popIn, setPopIn }) => {
  const [form, setForm] = useState({});
  const [sending, setSending] = useState(false);
  const { professionals, clients, services, UpdateAllData } = useData();
  const toast = useToast();

  useEffect(() => {
    console.log(form);
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
  const SendToDb = async () => {
    setSending(true);
    const { _id, ...formWithoutId } = form;
    console.log(formWithoutId);
    const response = await CreateAppointment(formWithoutId).then(() => {
      toast({
        title: `Agendamento de ${form?.client.name} editado com Sucesso`,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
        size: "sm",
      });

      setPopIn(false);
      setSending(false);
    });
    try {
      await UpdateAllData();
    } catch (e) {
      toast({
        title: "Erro ao atualizar dados locais",
        status: "error",
        description: e.message,
      });
    }
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
          <form style={{
            display:"flex",
            flexDirection:"column",
            gap:10
          }}>
            <Flex gap={5}>
              <FormControl
                isRequired
                onLoad={HandleFormChanges}
                onChange={HandleFormChanges}
              >
                <FormLabel>Cliente</FormLabel>
                <Select name="client" title="nome">
                  {clients.map((client) => {
                    return (
                      <option key={client._id} value={JSON.stringify(client)}>
                        {client.name}
                      </option>
                    );
                  })}
                </Select>
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
              <FormControl flex={2} onChange={HandleFormChanges}>
                <FormLabel>Serviço</FormLabel>
                <Select name="services" title="services">
                  {services.map((service) => {
                    return (
                      <option
                        defaultValue={JSON.stringify(service)}
                        key={services._id}
                        value={JSON.stringify(service)}
                      >
                        {service.name}
                      </option>
                    );
                  })}
                </Select>
                <Button variant="outline">
                    Adicionar mais serviços...
                </Button>
              </FormControl>
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
            </Flex>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button isLoading={sending} onClick={() => SendToDb()} mr={3}>
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
export default CreateModal;
