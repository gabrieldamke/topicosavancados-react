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

interface DeleteEntityModalProps {
  entityName: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteEntityModal({
  entityName,
  open,
  onClose,
  onConfirm,
}: DeleteEntityModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  function renderGender() {
    let masculino = ["Gateway", "Dispositivo"];
    let feminino = ["Medição"];
    if (masculino.includes(entityName)) return "este ";
    if (feminino.includes(entityName)) return "esta ";
    return "esta ";
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Deletar {entityName}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza de que deseja excluir {renderGender()}
          {entityName.toLowerCase() || `entidade`}? Esta ação não pode ser
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

export default DeleteEntityModal;
