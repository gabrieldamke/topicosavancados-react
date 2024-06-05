import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  Button,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import {
  AdicionarSensor,
  GetSensores,
  UpdateSensor,
} from "../../store/sensor.store";
import { RootState } from "../../store/store";
import { Sensor, Dispositivo, SensorDTO } from "../../api/ApiProvider";
import { ThunkDispatch } from "@reduxjs/toolkit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddEntityModal from "../common/CreateEntityModal";
import CreateSensorModal from "./CreateSensorModal";

export default function SensorList() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const sensores = useSelector((state: RootState) => state.sensor.sensores);
  const [isSensorAddModalOpen, setisSensorAddModalOpen] =
    useState<boolean>(false);
  const [groupedSensors, setGroupedSensors] = useState<
    Record<number, Sensor[]>
  >({});

  const dispositivos = useSelector(
    (state: RootState) => state.dispositivo.dispositivos
  );

  useEffect(() => {
    dispatch(GetSensores());
  }, [dispatch]);

  useEffect(() => {
    const grouped = sensores.reduce((acc, sensor) => {
      const deviceId = sensor.dispositivo?.id || 0;
      if (!acc[deviceId]) acc[deviceId] = [];
      acc[deviceId].push(sensor);
      return acc;
    }, {} as Record<number, Sensor[]>);
    setGroupedSensors(grouped);
  }, [sensores]);

  const handleOpenAddModal = () => {
    setisSensorAddModalOpen(true);
  };
  const handleCloseModal = () => {
    setisSensorAddModalOpen(false);
  };
  const handleAddSensor = (sensor: any, dispositivoId: number) => {
    dispatch(AdicionarSensor(sensor, dispositivoId));
  };
  return (
    <Box sx={{ padding: 3, bgcolor: "background.default", minHeight: "100vh" }}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        sx={{ marginBottom: 2 }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddModal}
          color="primary"
        >
          Adicionar Dispositivo
        </Button>
      </Stack>
      {Object.keys(groupedSensors).length > 0 ? (
        Object.entries(groupedSensors).map(([deviceId, sensors]) => (
          <Accordion key={deviceId} elevation={2}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Dispositivo {deviceId}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {sensors.map((sensor) => (
                  <Grid item key={sensor.id} xs={12} sm={6} md={4}>
                    <Card sx={{ padding: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        ID: {sensor.id}
                      </Typography>
                      <Typography variant="subtitle1">
                        Nome: {sensor.nome}
                      </Typography>
                      <Typography variant="subtitle1">
                        Tipo: {sensor.tipo}
                      </Typography>
                      <Button startIcon={<EditIcon />} color="primary">
                        Editar
                      </Button>
                      <Button startIcon={<DeleteIcon />} color="secondary">
                        Deletar
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography
          variant="h4"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 4 }}
        >
          Nenhum sensor encontrado
        </Typography>
      )}
      <CreateSensorModal
        open={isSensorAddModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddSensor}
        dispositivos={dispositivos}
      />
    </Box>
  );
}
