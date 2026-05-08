import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Central point for the map view (e.g. SV University approx coords)
const MAP_CENTER = [13.6302, 79.3986];
const DEFAULT_ZOOM = 16;

// Dictionary mapping location strings to GPS coordinates
const LOCATION_COORDINATES = {
    "Main Entrance (Camera 1)": [13.6315, 79.4005], // SVU Main Checkpost area
    "Library": [13.6302, 79.3980],                  // Central Library area
    "North Gate": [13.6335, 79.3986],               // North bounds
    "Hostel A": [13.6265, 79.3983],                 // South Men's Hostel area
    "Canteen": [13.6306, 79.3995],                  // Canteen / Common area
    "Forest Border": [13.6240, 79.3900]             // towards the reserved forest hills
};

const HeatMarker = ({ location, count }) => {
    // Look up coordinates. If not found, add a small deterministic offset from center
    let coords = LOCATION_COORDINATES[location];
    if (!coords) {
         const offsetLat = ((location.length * 3) % 10) * 0.0005;
         const offsetLng = ((location.length * 7) % 10) * 0.0005;
         coords = [MAP_CENTER[0] + offsetLat, MAP_CENTER[1] - offsetLng];
    }

    // Scale radius by incident count (max cap to avoid giant circles)
    const radius = Math.min(20 + (count * 5), 60);

    // Color based on incident count
    const color = count >= 5 ? '#ef4444' : count >= 3 ? '#f97316' : '#eab308'; // red, orange, yellow

    return (
        <CircleMarker
            center={coords}
            pathOptions={{ color: color, fillColor: color, fillOpacity: 0.5, weight: 2 }}
            radius={radius}
        >
            <Popup>
                <div className="text-sm">
                    <strong className="block text-gray-900">{location}</strong>
                    <span className="text-gray-600">Incidents: </span>
                    <strong className="text-red-600 font-bold">{count}</strong>
                </div>
            </Popup>
        </CircleMarker>
    );
};

const CampusMap = ({ hotzones }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 relative z-0">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center relative z-10">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    Campus Heatmap
                </h3>
                <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                     <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                     LIVE TRACKING
                </span>
            </div>
            <div className="h-[250px] sm:h-[350px] w-full isolate">
                {/* 
                  Leaflet map requires its own stacking context and dimensions.
                  Using isolated context to prevent z-index issues with floating navbars 
                */}
                <MapContainer 
                    center={MAP_CENTER} 
                    zoom={DEFAULT_ZOOM} 
                    scrollWheelZoom={false} 
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {hotzones && hotzones.map((zone, idx) => (
                        <HeatMarker key={idx} location={zone.location} count={zone.incident_count} />
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default CampusMap;
