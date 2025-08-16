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
import { CreateClient } from "../../Context/DBConnectionMethods/Clients";
import { getToday } from "../../Utils/Date";
import { ValidateForm } from "../../Utils/Validation";
const EditClientModal = ({ popIn, setPopIn, startValues }) => {
  const [form, setForm] = useState(startValues);
  const [isFormValid, setIsFormValid] = useState(false);
  const [sending, setSending] = useState(false);
  const { UpdateClients } = useData();
  const toast = useToast();

  useEffect(() => {
    const Validate = () => {
      const { isValid } = ValidateForm(["name", "birthdate", "phone"], form);
      setIsFormValid(isValid);
    };
    Validate();
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
    const { ...formWithoutId } = form;
    try {
      const response = await CreateClient(formWithoutId);
      const newId = response.insertedId;

      await UpdateClients();

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
        description: "Preencha estes campos: " + e.cause.join(", "),
      });
    }
    setForm({});
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
              gap: 15,
            }}
          >
            <FormControl isRequired onChange={HandleFormChanges}>
              <FormLabel>Nome</FormLabel>
              <Input name="name" title="name" type="name"></Input>
            </FormControl>
            <Flex gap={5}>
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
              <FormLabel>Data de nascimento</FormLabel>
              <Input
                name="birthdate"
                title="birthdate"
                type="date"
                max={getToday()}
                onChange={HandleFormChanges}
              ></Input>
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
              SendToDb();
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
export default EditClientModal;
