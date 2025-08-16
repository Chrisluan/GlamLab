import { createContext, useContext, useState } from "react";
import EditingModal from "../Components/Appointments/EditingAppointmentModal";
import CreateModal from "../Components/Appointments/CreateAppointmentModal";
import CreateClientModal from "../Components/Clients/CreateClientModal";
import CreateServiceModal from "../Components/Services/CreateServiceModal";
// Importe os outros modais se existirem

const ModalContext = createContext(null);
ModalContext.displayName = "ModalContext";

export const ModalProvider = ({ children }) => {
  const [editingModal, setEditingModal] = useState({ open: false, data: null });
  const [clientEditingModal, setClientEditingModal] = useState({
    open: false,
    data: null,
  })
  const [warningModal, setWarningModal] = useState({
    open: false,
    title: "",
    message: "",
  });
  const [messageModal, setMessageModal] = useState({
    open: false,
    title: "",
    message: "",
  });
  const [createModal, setCreateModal] = useState({ open: false, data: null });
  const [createService, setCreateServiceModal] = useState({ open: false });

  const [createClientModal, setCreateClientModal] = useState({ open: false });

  const openEditModal = (appointment) => {
    setEditingModal({ open: true, data: appointment });
  };

  const closeEditModal = () => {
    setEditingModal({ open: false, data: null });
  };

  const openCreateModal = () => {
    setCreateModal({ open: true });
  };
  const openCreateServiceModal = () => {
    setCreateServiceModal({ open: true });
  };
  const closeCreateServiceModal = () => {
    setCreateServiceModal({ open: false });
  };

  const closeCreateModal = () => {
    setCreateModal({ open: false, data: null });
  };

  const openWarningModal = ({ title, message }) => {
    setWarningModal({ open: true, title, message });
  };

  const closeWarningModal = () => {
    setWarningModal({ open: false, title: "", message: "" });
  };

  const openMessageModal = ({ title, message }) => {
    setMessageModal({ open: true, title, message });
  };

  const closeMessageModal = () => {
    setMessageModal({ open: false, title: "", message: "" });
  };
  const openCreateClientModal = () => {
    setCreateClientModal({ open: true });
  };
  const closeCreateClientModal = () => {
    setCreateClientModal({ open: false });
  };

  const contextValue = {
    openEditModal,
    closeEditModal,
    openCreateModal,
    closeCreateModal,
    openWarningModal,
    closeWarningModal,
    openMessageModal,
    closeMessageModal,
    openCreateClientModal,
    closeCreateClientModal,
    openCreateServiceModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {editingModal.open && (
        <EditingModal
          popIn={editingModal.open}
          setPopIn={closeEditModal}
          appointment={editingModal.data}
        />
      )}
      {createModal.open && (
        <CreateModal popIn={createModal.open} setPopIn={closeCreateModal} />
      )}
      {createClientModal.open && (
        <CreateClientModal
          popIn={createClientModal.open}
          setPopIn={closeCreateClientModal}
        />
      )}
      {createService.open && (
        <CreateServiceModal
          popIn={createService.open}
          setPopIn={closeCreateServiceModal}
        />
      )}

      {children}
      {/* Warning Modal */}
      {/* <WarningModal
        isOpen={warningModal.open}
        title={warningModal.title}
        message={warningModal.message}
        onClose={closeWarningModal}
      /> */}

      {/* Message Modal */}
      {/* <MessageModal
        isOpen={messageModal.open}
        title={messageModal.title}
        message={messageModal.message}
        onClose={closeMessageModal}
      /> */}

      {/* Create Modal */}
      {/* <CreateModal isOpen={createModal.open} onClose={closeCreateModal} /> */}
    </ModalContext.Provider>
  );
};

// Hook para usar
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal deve ser usado dentro de ModalProvider");
  return context;
};
