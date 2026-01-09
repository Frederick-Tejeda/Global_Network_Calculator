import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapLeaflet({ locations, selectedLocation }) {
  const mapRef = useRef(null); // Referencia para guardar la instancia del mapa

  useEffect(() => {
    if (!mapRef.current) {
        mapRef.current = L.map("map").setView([18.4861, -69.9312], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapRef.current);
    }

    locations.forEach((loc) => {
        L.marker(loc.coords)
         .addTo(mapRef.current)
         .bindPopup(`<b>${loc.name}</b><br>${loc.desc}`);
    });

    
    return () => {
        
    };
  }, [locations]);

  
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
        mapRef.current.flyTo(selectedLocation.coords, 16, {
            duration: 1.5 
        });
      L.popup().setLatLng(selectedLocation.coords).setContent(selectedLocation.name).openOn(mapRef.current);
    }
  }, [selectedLocation]);

  return <div id="map" style={{ height: "100%", width: "100%" }} />;
}