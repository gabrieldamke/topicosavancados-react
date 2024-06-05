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
import { IgnorarMetodos } from "../../interfaces/IgnorarMetodos";
import { FieldProperties } from "../../interfaces/FieldProperties";

interface EditEntityModalProps<T> {
  entity: Omit<T, keyof IgnorarMetodos> | undefined;
  open: boolean;
  onClose: () => void;
  onSave: (entity: Omit<T, keyof IgnorarMetodos>) => void;
  attributeConfig: {
    [K in keyof Omit<T, keyof IgnorarMetodos>]: FieldProperties;
  };
  entityName?: string;
}

function EditEntityModal<T extends {}>({
  entity,
  open,
  onClose,
  onSave,
  attributeConfig,
  entityName,
}: EditEntityModalProps<T>) {
  const [formData, setFormData] = useState<
    Omit<T, keyof IgnorarMetodos> | undefined
  >(entity);

  useEffect(() => {
    setFormData(entity);
  }, [entity]);

  const handleChange = <K extends keyof Omit<T, keyof IgnorarMetodos>>(
    key: K,
    value: any
  ) => {
    setFormData(
      (prev) =>
        ({
          ...prev,
          [key]: value,
        } as Omit<T, keyof IgnorarMetodos>)
    );
  };

  const handleSave = () => {
    if (formData) {
      onSave(formData as Omit<T, keyof IgnorarMetodos>);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar {entityName || "Entidade"}</DialogTitle>
      <DialogContent>
        {formData &&
          (
            Object.keys(attributeConfig) as Array<
              keyof Omit<T, keyof IgnorarMetodos>
            >
          ).map((key) => {
            const { label, render, editable } = attributeConfig[key];
            if (!render) {
              return null;
            }
            return (
              <TextField
                key={key as string}
                margin="dense"
                label={label}
                type="text"
                fullWidth
                variant="outlined"
                value={formData[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                disabled={!editable}
              />
            );
          })}
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

export default EditEntityModal;
