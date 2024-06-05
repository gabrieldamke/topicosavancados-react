import React from "react";
import { Card, Grid, Typography, Button, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
interface Entity {
  id: number;
  [key: string]: any; // Aceita qualquer outro atributo como string ou número.
}

interface MapConfig {
  showMap?: boolean;
  lat?: number | null;
  lng?: number | null;
}

interface EntityCardProps {
  entity: Entity;
  attributes: string[]; // Lista de atributos a serem mostrados.
  openModal: (entity: Entity, mode: "edit" | "delete") => void;
  mapConfig?: MapConfig;
}

const EntityCard: React.FC<EntityCardProps> = ({
  entity,
  attributes,
  openModal,
  mapConfig = { showMap: false, lat: null, lng: null },
}) => {
  return (
    <Grid item key={entity.id} xs={12} sm={6} md={4}>
      <Card sx={{ display: "flex", flexDirection: "row", padding: 2 }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              ID: {entity.id}
            </Typography>
            {attributes.map((attr) => (
              <Typography key={attr} variant="subtitle1">
                {`${attr.charAt(0).toUpperCase() + attr.slice(1)}: ${
                  entity[attr]
                }`}
              </Typography>
            ))}
            <Stack direction="row" spacing={1} sx={{ marginTop: 2 }}>
              <Button
                startIcon={<EditIcon />}
                onClick={() => openModal(entity, "edit")}
                color="primary"
              >
                Editar
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                onClick={() => openModal(entity, "delete")}
                color="secondary"
              >
                Deletar
              </Button>
            </Stack>
          </Grid>
          {mapConfig.showMap &&
            mapConfig.lat != null &&
            mapConfig.lng != null && (
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
                      latLng: [mapConfig.lat, mapConfig.lng],
                      name:
                        entity.nome ||
                        `Localização do ${entity.constructor.name}`,
                    },
                  ]}
                />
              </Grid>
            )}
        </Grid>
      </Card>
    </Grid>
  );
};

export default EntityCard;
