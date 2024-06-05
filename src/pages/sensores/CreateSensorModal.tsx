import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Dispositivo } from "../../api/ApiProvider";

interface Sensor {
  id?: number;
  nome?: string;
  tipo?: string;
}

interface SensorModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (sensor: Sensor, dispositivoId: number) => void;
  initialData?: Sensor;
  dispositivos: Dispositivo[];
}

const CreateSensorModal: React.FC<SensorModalProps> = ({
  open,
  onClose,
  onSave,
  initialData = { nome: "", tipo: "" },
  dispositivos,
}) => {
  const [sensor, setSensor] = useState<Sensor>(initialData);

  const handleChange = (field: keyof Sensor, value: string) => {
    setSensor((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (sensor.nome && sensor.tipo && dispositivoId) {
      onSave(sensor, dispositivoId);
      onClose();
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  const [dispositivoId, setDispositivoId] = useState<number>(
    dispositivos[0]?.id || 0
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Cadastrar/Editar Sensor</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="nome"
          label="Nome do Sensor"
          type="text"
          fullWidth
          variant="outlined"
          value={sensor.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
        />
        <TextField
          margin="dense"
          id="tipo"
          label="Tipo de Sensor"
          type="text"
          fullWidth
          variant="outlined"
          value={sensor.tipo}
          onChange={(e) => handleChange("tipo", e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="dispositivo-label">Dispositivo</InputLabel>
          <Select
            labelId="dispositivo-label"
            id="dispositivo-select"
            value={dispositivoId}
            label="Dispositivo"
            onChange={(e) => setDispositivoId(Number(e.target.value))}
          >
            {dispositivos.map((dispositivo) => (
              <MenuItem key={dispositivo.id} value={dispositivo.id}>
                {dispositivo.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
};

export default CreateSensorModal;
