import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
function DeleteUserModal({ open, onClose, onConfirm }: DeleteUserModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Deletar Usuário</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza de que deseja excluir este usuário? Esta ação não pode ser
          desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          startIcon={<CancelIcon />}
          variant="outlined"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          startIcon={<DeleteIcon />}
          variant="contained"
        >
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteUserModal;
