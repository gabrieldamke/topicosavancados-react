import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

interface EditUserModalProps {
  user: any | undefined;
  open: boolean;
  onClose: () => void;
  onSave: (user: any) => void;
}

function EditUserModal({ user, open, onClose, onSave }: EditUserModalProps) {
  const [email, setEmail] = useState<string | undefined>(user?.email);
  const [firstName, setFirstName] = useState<string | undefined>(
    user?.first_name
  );
  const [lastName, setLastName] = useState<string | undefined>(user?.last_name);

  useEffect(() => {
    setEmail(user?.email);
    setFirstName(user?.first_name);
    setLastName(user?.last_name);
  }, [user]);

  const handleSave = () => {
    if (user) {
      const updatedUser: any = {
        ...user,
        email,
        first_name: firstName,
        last_name: lastName,
      };
      onSave(updatedUser);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Nome"
          type="text"
          fullWidth
          variant="outlined"
          value={firstName || ""}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Sobrenome"
          type="text"
          fullWidth
          variant="outlined"
          value={lastName || ""}
          onChange={(e) => setLastName(e.target.value)}
        />
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
          onClick={handleSave}
          color="primary"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUserModal;
