import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
const EditingModal = ({ popIn, setPopIn, setCurrentEditing, currentEditing }) => {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={popIn}
      motionPreset="slideInBottom"
      onClose={() => {
        setPopIn(false);
        setCurrentEditing(null);
      }}
      size={"full"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Editando agendamento de {currentEditing?.client.name}
        </ModalHeader>
        <ModalCloseButton  />
        <ModalBody></ModalBody>

        <ModalFooter>
          <Button  mr={3} >
            Confirmar
          </Button>
          <Button variant="secondary" onClick={() => setPopIn(false)}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default EditingModal;