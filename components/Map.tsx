import { MapContainer, TileLayer } from 'react-leaflet';
// Note: We don't need 'leaflet/dist/leaflet.css' here since it's in _app.tsx, 
// but it's often included here for robustness in isolation.

// Set a default center for the contiguous US
const US_CENTER: [number, number] = [39.8283, -98.5795];
const INITIAL_ZOOM: number = 4;

const StateMap = () => {
  return (
    // The wrapper div MUST have a defined height, or the map will collapse.
    <div style={{ height: '600px', width: '100%' }} className="rounded-lg shadow-xl border border-gray-200">
      <MapContainer 
        center={US_CENTER} 
        zoom={INITIAL_ZOOM} 
        scrollWheelZoom={true} // Enable zooming with the mouse wheel
        style={{ height: '100%', width: '100%' }}
      >
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* // FUTURE WORK: 
          // This is where you would use the <GeoJSON> component from react-leaflet
          // to render the state boundaries and add interactivity (popups/tooltips).
        */}
      </MapContainer>
    </div>
  );
};

export default StateMap;