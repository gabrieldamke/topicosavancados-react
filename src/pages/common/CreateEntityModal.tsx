import React, { useState, useEffect } from "react";
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
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "../../components/LocationMarker";

interface CreateEntityModalProps<T> {
  open: boolean;
  onClose: () => void;
  onSave: (entity: T) => void;
  attributeConfig: {
    [key in keyof T]: {
      label: string;
      render: boolean;
      editable: boolean;
      required?: boolean;
    };
  };
  entityName?: string;
  locationMap?: boolean;
}

function CreateEntityModal<
  T extends { latitude?: number; longitude?: number }
>({
  open,
  onClose,
  onSave,
  attributeConfig,
  entityName,
  locationMap,
}: CreateEntityModalProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>({});

  useEffect(() => {
    if (open) {
      setFormData({});
    }
  }, [open]);

  const handleChange = (key: keyof T, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const checkRequiredFields = (): boolean => {
    return Object.keys(attributeConfig).every((key) => {
      const config = attributeConfig[key as keyof T];
      if (config.required) {
        return (
          formData[key as keyof T] !== undefined &&
          formData[key as keyof T] !== ""
        );
      }
      return true;
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Criar {entityName || "Entidade"}</DialogTitle>
      <DialogContent>
        {Object.keys(attributeConfig).map((key) => {
          const { label, render, editable } = attributeConfig[key as keyof T];
          if (!render) return null;
          return (
            <TextField
              key={key}
              margin="dense"
              label={`${label}${
                attributeConfig[key as keyof T].required ? " *" : ""
              }`}
              type="text"
              fullWidth
              variant="outlined"
              value={formData[key as keyof T] || ""}
              onChange={(e) => handleChange(key as keyof T, e.target.value)}
              disabled={!editable}
            />
          );
        })}
        {locationMap && (
          <div style={{ height: 300, width: "100%" }}>
            <MapContainer
              center={[-25.300941, -54.114951]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker
                onLocationSelect={({ lat, lng }) => {
                  handleChange("latitude" as keyof T, lat);
                  handleChange("longitude" as keyof T, lng);
                }}
              />
            </MapContainer>
          </div>
        )}
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
          onClick={() => onSave(formData as T)}
          color="primary"
          startIcon={<SaveIcon />}
          variant="contained"
          disabled={!checkRequiredFields()}
        >
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateEntityModal;
