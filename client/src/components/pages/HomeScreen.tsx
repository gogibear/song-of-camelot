import React from 'react';

const HomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-5xl font-bold mb-8 text-yellow-400">Song of Camelot</h1>
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-40 h-40 bg-gray-800 border-2 border-gray-700 rounded-lg flex items-center justify-center"
          >
            <span className="text-gray-500 text-lg">Tile {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;