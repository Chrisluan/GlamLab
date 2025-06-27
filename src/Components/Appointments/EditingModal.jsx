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
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import { useData } from "../../Context/DataContext";
import {
  CreateNewAppointment,
  EditAppointment,
} from "../../Context/DBConnectionMethods/Appointments";

const EditingModal = ({
  popIn,
  setPopIn,
  setCurrentEditing,
  currentEditing,
}) => {
  const [form, setForm] = useState({});
  const [sending, setSending] = useState(false);
  const { clients } = useData();
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
    if (currentEditing) {
      setForm(currentEditing);
    }
  }, [currentEditing]);
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={popIn}
      motionPreset="slideInBottom"
      onClose={() => {
        setPopIn(false);
        setCurrentEditing(null);
      }}
      size={"3xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Editando agendamento de {currentEditing?.client.name}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <form>
            <FormControl>
              <Select
                name="client"
                type="name"
                title="nome"
                onChange={HandleFormChanges}
              >
                {clients.map((client) => {
                  return (
                    <option
                      defaultValue={currentEditing?.client.name}
                      key={client._id}
                      value={JSON.stringify(client)}
                    >
                      {client.name}
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
              ).then(() => {
                toast({

                  title:`Agendamento de ${form?.client.name} editado com Sucesso`,
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                  position:"top-right",
                  size:"sm"
                })
                setPopIn(false);
                setSending(false);
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
export default EditingModal;
