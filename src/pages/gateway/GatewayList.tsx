import { Box, Button, Card, Typography, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditEntityModal from "../common/EditEntityModal";
import DeleteEntityModal from "../common/DeleteEntityModal";
import AddEntityModal from "../common/CreateEntityModal";
import { Gateway, GatewayDto } from "../../api/ApiProvider";
import {
  DeletarGateway,
  GetGateways,
  UpdateGateway,
  AdicionarGateway,
} from "../../store/gateway.store";
import { RootState } from "../../store/store";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

export default function GatewayList() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const gateways = useSelector((root: RootState) => root.gateway.gateways);

  const [selectedGateway, setSelectedGateway] = useState<{
    gateway?: Gateway;
    type?: "edit" | "delete" | "add";
  }>({});
  const [isModalEditGatewayOpen, setIsModalEditGatewayOpen] = useState(false);
  const [isModalDeleteGatewayOpen, setIsModalDeleteGatewayOpen] =
    useState(false);
  const [isModalAddGatewayOpen, setIsModalAddGatewayOpen] = useState(false);

  useEffect(() => {
    dispatch(GetGateways());
    //localStorage.setItem("usuario", "1");
  }, [dispatch]);

  useEffect(() => {
    if (selectedGateway.type === "edit") {
      setIsModalEditGatewayOpen(true);
    } else if (selectedGateway.type === "delete") {
      setIsModalDeleteGatewayOpen(true);
    } else if (selectedGateway.type === "add") {
      setIsModalAddGatewayOpen(true);
    }
  }, [selectedGateway]);

  const openModal = (gateway: Gateway, type: "edit" | "delete") => {
    setSelectedGateway({ gateway, type });
  };

  const handleOpenAddModal = () => {
    setSelectedGateway({ type: "add" });
  };

  const handleEditGateway = (entity: any) => {
    dispatch(UpdateGateway(entity, true));
  };

  const handleDeleteGateway = (gatewayId: number | undefined) => {
    dispatch(DeletarGateway(gatewayId));
  };

  const handleAddGateway = (gateway: any) => {
    const pessoaId = localStorage.getItem("usuario");
    dispatch(
      AdicionarGateway(
        { ...gateway, pessoaId: pessoaId, dispositivosIds: [] },
        true
      )
    );
    setIsModalAddGatewayOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalEditGatewayOpen(false);
    setIsModalDeleteGatewayOpen(false);
    setIsModalAddGatewayOpen(false);
    setSelectedGateway({});
  };

  return (
    <Box sx={{ padding: 3, bgcolor: "background.default", minHeight: "100vh" }}>
      {gateways && gateways.length > 0 ? (
        <>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              color: "primary.main",
              opacity: 0.1,
              userSelect: "none",
              position: "absolute",
              width: "100%",
              top: "50%",
            }}
          >
            Trevisan IoT
          </Typography>
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
              Adicionar Gateway
            </Button>
          </Stack>
          <Grid container spacing={2}>
            {gateways.map((gateway) => (
              <Grid item key={gateway.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ display: "flex", flexDirection: "row", padding: 2 }}
                >
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        ID: {gateway.id}
                      </Typography>
                      <Typography variant="subtitle1">
                        Nome: {gateway.nome}
                      </Typography>
                      <Typography variant="subtitle1">
                        Descrição: {gateway.descricao}
                      </Typography>
                      <Typography variant="subtitle1">
                        Endereço: {gateway.endereco}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ marginTop: 2 }}>
                        <Button
                          startIcon={<EditIcon />}
                          onClick={() => openModal(gateway, "edit")}
                          color="primary"
                        >
                          Editar
                        </Button>
                        <Button
                          startIcon={<DeleteIcon />}
                          onClick={() => openModal(gateway, "delete")}
                          color="secondary"
                        >
                          Deletar
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "top",
            marginTop: "5%",
            alignItems: "center",
            backgroundColor: "background.default",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "600px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <img
              src="/emptystate1.png"
              alt="Empty State"
              style={{
                maxWidth: "50%",
                height: "auto",
                borderRadius: "5px",
              }}
            />
            <Typography variant="h4" color="text.primary" sx={{ mt: 2, mb: 1 }}>
              Pronto para começar?
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Adicione seu primeiro gateway para começar a monitorar sua rede
              IoT.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleOpenAddModal}
              sx={{ mt: 2 }}
            >
              Adicionar Gateway
            </Button>
            <Typography variant="body2" sx={{ mt: 2, color: "grey.600" }}>
              Precisa de ajuda? <a href="/docs">Consulte a documentação</a>
            </Typography>
          </Box>
        </Box>
      )}
      <EditEntityModal
        entityName="Gateway"
        entity={selectedGateway.gateway as GatewayDto}
        attributeConfig={{
          nome: {
            label: "Nome",
            render: true,
            editable: true,
          },
          descricao: {
            label: "Descrição",
            render: true,
            editable: true,
          },
          endereco: {
            label: "Endereço",
            render: true,
            editable: true,
          },
        }}
        open={isModalEditGatewayOpen}
        onClose={handleCloseModal}
        onSave={handleEditGateway}
      />
      <DeleteEntityModal
        entityName="Gateway"
        open={isModalDeleteGatewayOpen}
        onClose={handleCloseModal}
        onConfirm={() => handleDeleteGateway(selectedGateway.gateway?.id)}
      />
      <AddEntityModal
        entityName="Gateway"
        attributeConfig={{
          nome: {
            label: "Nome",
            render: true,
            editable: true,
          },
          descricao: {
            label: "Descrição",
            render: true,
            editable: true,
          },
          endereco: {
            label: "Endereço",
            render: true,
            editable: true,
          },
        }}
        open={isModalAddGatewayOpen}
        onClose={handleCloseModal}
        onSave={handleAddGateway}
      />
    </Box>
  );
}
