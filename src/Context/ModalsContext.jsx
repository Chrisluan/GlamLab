import { createContext, useContext, useState } from "react";
import EditingModal from "../Components/Appointments/EditingModal";
// Importe os outros modais se existirem

const ModalContext = createContext(null);
ModalContext.displayName = "ModalContext";

export const ModalProvider = ({ children }) => {
  const [editingModal, setEditingModal] = useState({ open: false, data: null });
  const [warningModal, setWarningModal] = useState({ open: false, title: "", message: "" });
  const [messageModal, setMessageModal] = useState({ open: false, title: "", message: "" });
  const [createModal, setCreateModal] = useState({ open: false });

  const openEditModal = (appointment) => {
    console.log(appointment)
    setEditingModal({ open: true, data: appointment });
  };

  const closeEditModal = () => {
    setEditingModal({ open: false, data: null });
  };

  const openCreateModal = () => {
    setCreateModal({ open: true });
  };

  const closeCreateModal = () => {
    setCreateModal({ open: false });
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

  const contextValue = {
    openEditModal,
    closeEditModal,
    openCreateModal,
    closeCreateModal,
    openWarningModal,
    closeWarningModal,
    openMessageModal,
    closeMessageModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <EditingModal
        popIn={editingModal.open}
        setPopIn={closeEditModal}
        appointment={editingModal.data}
      />

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
  if (!context) throw new Error("useModal deve ser usado dentro de ModalProvider");
  return context;
};
