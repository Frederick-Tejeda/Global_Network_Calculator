import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: iconUrl,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapLeaflet({ locations, selectedLocation }) {
  const mapRef = useRef(null); 
  const mapInstanceRef = useRef(null); 

  useEffect(() => {
    if (!mapRef.current) return;

    
    if (!mapInstanceRef.current) {
        const map = L.map(mapRef.current, {
            zoomControl: false 
        }).setView([18.4861, -69.9312], 13);
        
        
        L.control.zoom({ position: 'topright' }).addTo(map);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    
    
    locations.forEach((loc) => {
        L.marker(loc.coords)
         .addTo(map)
         .bindPopup(`<b>${loc.name}</b><br>${loc.desc}`);
    });

    
    setTimeout(() => {
        map.invalidateSize();
    }, 100);

  }, [locations]); 

 
  useEffect(() => {
    if (selectedLocation && mapInstanceRef.current) {
        const map = mapInstanceRef.current;
        
        map.flyTo(selectedLocation.coords, 16, {
            duration: 1.5 
        });
        
        L.popup()
         .setLatLng(selectedLocation.coords)
         .setContent(`<b>${selectedLocation.name}</b>`)
         .openOn(map);
    }
  }, [selectedLocation]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%", outline: "none" }} />;
}