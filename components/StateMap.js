// components/StateMap.js

import React, { useState } from 'react';
import USAMapData from '../lib/USAMapData'; // This data will hold all SVG paths

const AlaskaHawaiiData = {
  // Alaska and Hawaii are scaled and translated to fit cleanly on the side
  Alaska: USAMapData.paths.find(p => p.id === 'AK'),
  Hawaii: USAMapData.paths.find(p => p.id === 'HI'),
};

const continentalPaths = USAMapData.paths.filter(p => p.id !== 'AK' && p.id !== 'HI');

const StateMap = () => {
  const [selectedState, setSelectedState] = useState(null);

  const handleStateClick = (stateId, stateName) => {
    setSelectedState(stateName);
    // In a real application, you would navigate or fetch data here
    console.log(`State clicked: ${stateName} (${stateId})`);
  };

  const MapPath = ({ state }) => (
    <path
      d={state.d}
      id={state.id}
      title={state.name}
      onClick={() => handleStateClick(state.id, state.name)}
      className={`
        cursor-pointer transition-all duration-200 ease-in-out
        ${selectedState === state.name 
          ? 'fill-indigo-600 stroke-2 stroke-white shadow-lg' 
          : 'fill-gray-300 hover:fill-indigo-400 stroke-1 stroke-gray-500'}
      `}
      style={{ 
        transformOrigin: 'center',
        // Optional: Add a slight scale effect on hover if needed for smaller states
        // transform: selectedState === state.name ? 'scale(1.02)' : 'scale(1)',
      }}
    />
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Select Your State</h2>
      {selectedState && (
        <p className="mb-4 text-center text-lg font-medium text-indigo-600">
          Currently Selected: **{selectedState}**
        </p>
      )}

      {/* Main SVG Container */}
      <div className="flex justify-center items-end relative">
        <svg
          viewBox="0 0 960 600"
          className="w-full max-w-4xl"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Continental US */}
          <g className="continental-us">
            {continentalPaths.map(state => (
              <MapPath key={state.id} state={state} />
            ))}
          </g>
          
          {/* Alaska (Translated and scaled to fit on the side) */}
          <g transform="translate(-100, 480) scale(0.35)" className="alaska">
            {AlaskaHawaiiData.Alaska && (
              <MapPath state={AlaskaHawaiiData.Alaska} />
            )}
          </g>
          
          {/* Hawaii (Translated and scaled to fit on the side) */}
          <g transform="translate(680, 520) scale(0.7)" className="hawaii">
            {AlaskaHawaiiData.Hawaii && (
              <MapPath state={AlaskaHawaiiData.Hawaii} />
            )}
          </g>
        </svg>
      </div>

      <p className="mt-4 text-sm text-gray-500 text-center">
        (Click a state to select it. Alaska and Hawaii are positioned below for accessibility.)
      </p>
    </div>
  );
};

export default StateMap;