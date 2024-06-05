import {
  Box,
  Button,
  Card,
  Typography,
  Grid,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditEntityModal from "../common/EditEntityModal";
import SensorsIcon from "@mui/icons-material/Sensors";
import DeleteEntityModal from "../common/DeleteEntityModal";
import AddEntityModal from "../common/CreateEntityModal";
import {
  Dispositivo,
  DispositivoDTO,
  Gateway,
  Sensor,
} from "../../api/ApiProvider";
import {
  DeletarDispositivo,
  GetDispositivos,
  UpdateDispositivo,
  AdicionarDispositivo,
} from "../../store/dispositivo.store";
import { RootState } from "../../store/store";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import SensoresModal from "../sensores/SensoresModal";

export default function DispositivoList() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const dispositivos = useSelector(
    (root: RootState) => root.dispositivo.dispositivos
  );

  type GroupedDevices = Record<number, Dispositivo[]>;

  const [groupedDevices, setGroupedDevices] = useState<GroupedDevices>({});

  const [selectedDispositivo, setSelectedDispositivo] = useState<{
    dispositivo?: Dispositivo;
    type?: "edit" | "delete" | "add";
  }>({});
  const [isModalEditDispositivoOpen, setIsModalEditDispositivoOpen] =
    useState(false);
  const [isModalDeleteDispositivoOpen, setIsModalDeleteDispositivoOpen] =
    useState(false);
  const [isModalAddDispositivoOpen, setIsModalAddDispositivoOpen] =
    useState(false);

  const [isModalSensoresOpen, setIsModalSensoresOpen] = useState(false);

  useEffect(() => {
    dispatch(GetDispositivos());
  }, [dispatch]);

  useEffect(() => {
    // Group devices by their gateway ID, handling undefined gateways
    const newGroupedDevices = dispositivos.reduce<GroupedDevices>(
      (acc, dispositivo) => {
        const gatewayId = dispositivo.gateway?.id;
        if (gatewayId) {
          if (!acc[gatewayId]) {
            acc[gatewayId] = [];
          }
          acc[gatewayId].push(dispositivo);
        }
        return acc;
      },
      {}
    );
    setGroupedDevices(newGroupedDevices);
  }, [dispositivos]);

  const handleOpenAddModal = () => {
    setSelectedDispositivo({ type: "add" });
    setIsModalAddDispositivoOpen(true);
  };

  const handleEditDispositivo = (entity: any) => {
    dispatch(UpdateDispositivo(entity, true));
  };

  const handleDeleteDispositivo = (dispositivoId: number | undefined) => {
    dispatch(DeletarDispositivo(dispositivoId));
  };

  const handleAddDispositivo = (dispositivo: any) => {
    dispatch(
      AdicionarDispositivo(
        { ...dispositivo, sensoresIds: [], atuadoresIds: [] },
        true
      )
    );
    setIsModalAddDispositivoOpen(false);
  };

  const openModal = (dispositivo: Dispositivo, type: "edit" | "delete") => {
    setSelectedDispositivo({ dispositivo, type });

    switch (type) {
      case "edit":
        setIsModalEditDispositivoOpen(true);
        break;
      case "delete":
        setIsModalDeleteDispositivoOpen(true);
        break;
    }
  };

  const handleOpenModalSensores = (dispositivo: Dispositivo) => {
    setSelectedDispositivo({ dispositivo: dispositivo });
    setIsModalSensoresOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalEditDispositivoOpen(false);
    setIsModalDeleteDispositivoOpen(false);
    setIsModalAddDispositivoOpen(false);
    setIsModalSensoresOpen(false);
    setSelectedDispositivo({});
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
      {Object.keys(groupedDevices).length > 0 ? (
        Object.entries(groupedDevices).map(([gatewayId, devices]) => (
          <Accordion key={gatewayId} elevation={2}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                Gateway {devices[0].gateway?.nome || "Unknown"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {devices.map((dispositivo) => (
                  <Grid item key={dispositivo.id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{ display: "flex", flexDirection: "row", padding: 2 }}
                    >
                      <Grid container>
                        <Grid item xs={12} md={6}>
                          <Typography variant="h6" gutterBottom>
                            ID: {dispositivo.id}
                          </Typography>
                          <Typography variant="subtitle1">
                            Nome: {dispositivo.nome}
                          </Typography>
                          <Typography variant="subtitle1">
                            Descrição: {dispositivo.descricao}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ marginTop: 2 }}
                          >
                            <Button
                              startIcon={<EditIcon />}
                              onClick={() => openModal(dispositivo, "edit")}
                              color="primary"
                            >
                              Editar
                            </Button>
                            <Button
                              startIcon={<DeleteIcon />}
                              onClick={() => openModal(dispositivo, "delete")}
                              color="secondary"
                            >
                              Deletar
                            </Button>
                            <Button
                              startIcon={<SensorsIcon />}
                              onClick={() =>
                                handleOpenModalSensores(dispositivo)
                              }
                              color="info"
                            >
                              Sensores
                            </Button>
                          </Stack>
                        </Grid>
                        {dispositivo.latitude && dispositivo.longitude && (
                          <Grid item xs={12} md={6}>
                            <VectorMap
                              map={worldMill}
                              backgroundColor="transparent"
                              zoomOnScroll={false}
                              style={{
                                width: "100%",
                                height: "200px",
                              }}
                              regionStyle={{
                                initial: {
                                  fill: "#b8e994",
                                },
                                hover: {
                                  fill: "#a4de78",
                                },
                              }}
                              markerStyle={{
                                initial: {
                                  fill: "#FF5722",
                                  stroke: "#FFFFFF",
                                },
                              }}
                              markers={[
                                {
                                  latLng: [
                                    dispositivo.latitude,
                                    dispositivo.longitude,
                                  ],
                                  name:
                                    dispositivo.nome ||
                                    `Localização do Gateway`,
                                },
                              ]}
                            />
                          </Grid>
                        )}
                      </Grid>
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
          Nenhum dispositivo encontrado
        </Typography>
      )}
      <EditEntityModal
        entityName="Dispositivo"
        entity={selectedDispositivo.dispositivo as DispositivoDTO}
        attributeConfig={{
          nome: { label: "Nome", render: true, editable: true },
          descricao: { label: "Descrição", render: true, editable: true },
        }}
        open={isModalEditDispositivoOpen}
        onClose={handleCloseModal}
        onSave={handleEditDispositivo}
      />
      <DeleteEntityModal
        entityName="Dispositivo"
        open={isModalDeleteDispositivoOpen}
        onClose={handleCloseModal}
        onConfirm={() =>
          handleDeleteDispositivo(selectedDispositivo.dispositivo?.id)
        }
      />
      <AddEntityModal
        attributeConfig={{
          nome: { label: "Nome", render: true, editable: true, required: true },
          descricao: {
            label: "Descrição",
            render: true,
            editable: true,
            required: true,
          },
          gatewayId: {
            label: "ID do Gateway",
            render: true,
            editable: true,
            required: true,
          },
          latitude: {
            label: "Latitude",
            render: true,
            editable: false,
            required: true,
          },
          longitude: {
            label: "Longitude",
            render: true,
            editable: false,
            required: true,
          },
        }}
        open={isModalAddDispositivoOpen}
        onClose={handleCloseModal}
        onSave={handleAddDispositivo}
        locationMap={true}
      />
      <SensoresModal
        open={isModalSensoresOpen}
        handleClose={handleCloseModal}
        sensores={selectedDispositivo.dispositivo?.sensores as Sensor[]}
        dispositivoId={selectedDispositivo.dispositivo?.id as number}
      />
    </Box>
  );
}
