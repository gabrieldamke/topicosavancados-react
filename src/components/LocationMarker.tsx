import React, { useState } from "react";
import { useMapEvents } from "react-leaflet";
import L, { Marker } from "leaflet";
import "leaflet/dist/leaflet.css";

interface LocationMarkerProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

const markerIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationMarker: React.FC<LocationMarkerProps> = ({
  onLocationSelect,
}) => {
  const [marker, setMarker] = useState<L.Marker | null>(null);
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      if (marker) {
        marker.remove();
      }
      const newMarker = L.marker([lat, lng], { icon: markerIcon }).addTo(
        e.target
      );
      setMarker(newMarker);

      onLocationSelect({ lat, lng });
    },
  });

  return null;
};

export default LocationMarker;
