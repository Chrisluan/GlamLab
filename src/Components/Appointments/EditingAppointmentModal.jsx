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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useData } from "../../Context/DataContext";
import {
  EditAppointment
} from "../../Context/DBConnectionMethods/Appointments";

const EditingAppointmentModal = ({ popIn, setPopIn, appointment }) => {
  const [form, setForm] = useState({});
  const [sending, setSending] = useState(false);
  const { clients, professionals, UpdateAllData } = useData();
  const toast = useToast();
  const HandleFormChanges = (e) => {
    //Não vou mentir, essa função foi feita por IA, só dei o nome 👁️🫦👁️

    const { name, value } = e.target; // ex: name = "client.name"

    const keys = name.split(".");
    setForm((prevForm) => {
      const updatedForm = { ...prevForm };
      let current = updatedForm;

      // percorre as chaves menos a última
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }

      // define o valor final
      current[keys[keys.length - 1]] = JSON.parse(value);
      console.log(updatedForm);

      return updatedForm;
    });
  };
  useEffect(() => {
    if (appointment) {
      setForm(appointment);
    }
  }, [appointment]);
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
        <ModalHeader>
          
          Editando agendamento de {form?.client?.name}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form>
            <FormControl>
              <Select
                isDisabled
                name="client"
                type="name"
                title="nome"
                onChange={HandleFormChanges}
              >
                {clients.map((client) => {
                  return (
                    <option
                      defaultValue={form?.client?.name}
                      key={client._id}
                      value={JSON.stringify(client)}
                    >
                      {client.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl>
              <Select
                name="professional"
                title="professional"
                onChange={HandleFormChanges}
              >
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
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={sending}
            onClick={async () => {
              setSending(true);
              const { _id, ...formWithoutId } = form;
              const response = await EditAppointment(
                form._id,
                formWithoutId
              ).then(async () => {
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
