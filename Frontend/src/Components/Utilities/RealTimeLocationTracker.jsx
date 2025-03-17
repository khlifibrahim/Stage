import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configuration des icônes pour Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RealTimeLocationTracker = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Utilisation de l'API Geolocation pour obtenir la position en temps réel
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    // Nettoyage de l'effet
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!position) {
    return <div>Chargement de la position...</div>;
  }

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Vous êtes ici !</Popup>
      </Marker>
      <UpdateMapCenter position={position} />
    </MapContainer>
  );
};

// Composant pour mettre à jour le centre de la carte
const UpdateMapCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

export default RealTimeLocationTracker;