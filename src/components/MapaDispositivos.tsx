import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapaDispositivos = ({ dispositivos }: any) => {
  return (
    <MapContainer
      center={[-25.300941, -54.114951]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {dispositivos.map((dispositivo: any, index: any) => (
        <Marker key={index} position={[dispositivo.lat, dispositivo.lng]} />
      ))}
    </MapContainer>
  );
};

export default MapaDispositivos;
