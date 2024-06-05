import React from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Sensor } from "../../api/ApiProvider";

// Componente SensoresModal com tipagem
interface SensoresModalProps {
  sensores: Sensor[];
  dispositivoId: number;
  open: boolean;
  handleClose: () => void;
}

const SensoresModal: React.FC<SensoresModalProps> = ({
  sensores = [],
  dispositivoId,
  open,
  handleClose,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-sensores-titulo"
      aria-describedby="modal-sensores-descricao"
    >
      <Box sx={style}>
        <Typography id="modal-sensores-titulo" variant="h6" component="h2">
          Sensores do Dispositivo
        </Typography>
        <List dense>
          {sensores.map((sensor) => (
            <ListItem key={sensor.id}>
              <ListItemText primary={sensor.nome} secondary={sensor.tipo} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          sx={{ mt: 2 }}
        >
          Fechar
        </Button>
      </Box>
    </Modal>
  );
};

export default SensoresModal;
