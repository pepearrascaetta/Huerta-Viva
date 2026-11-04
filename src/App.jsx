import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import PlantList from './components/PlantList';
import AddPlantModal from './components/AddPlantModal';
import GardenCanvas from './components/GardenCanvas';
import IoTPanel from './components/IoTPanel';
import Navbar from './components/Navbar';
import { getStoredPlants, savePlants } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [plants, setPlants] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Cargar plantas al iniciar (Offline-first desde almacenamiento local)
  useEffect(() => {
    const loadedPlants = getStoredPlants();
    if (loadedPlants.length === 0) {
      // Datos de ejemplo iniciales si está vacío
      const initial = [
        { id: 1, name: 'Tomate Cherry', alias: 'Lolo', type: 'Sol Pleno', sensorId: 'esp32_01', moisture: 38, alliance: 'Albahaca' },
        { id: 2, name: 'Albahaca Genovesa', alias: 'Verde Rama', type: 'Semisombra', sensorId: null, moisture: 65, alliance: 'Tomate' }
      ];
      setPlants(initial);
      savePlants(initial);
    } else {
      setPlants(loadedPlants);
    }
  }, []);

  const handleAddPlant = (newPlant) => {
    const updated = [...plants, { id: Date.now(), ...newPlant }];
    setPlants(updated);
    savePlants(updated);
    setIsAddOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans pb-20">
      {/* Contenedor dinámico según la pestaña activa */}
      <main className="flex-1 max-w-md w-full mx-auto p-4">
        {activeTab === 'inicio' && <Dashboard plants={plants} onNavigate={setActiveTab} />}
        {activeTab === 'plantas' && <PlantList plants={plants} onOpenAdd={() => setIsAddOpen(true)} />}
        {activeTab === 'mapa' && <GardenCanvas plants={plants} />}
        {activeTab === 'iot' && <IoTPanel plants={plants} />}
      </main>

      {/* Modal de adición rápida (Manual o Foto) */}
      {isAddOpen && <AddPlantModal onClose={() => setIsAddOpen(false)} onAdd={handleAddPlant} />}

      {/* Barra de navegación inferior estilo app nativa */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onOpenAdd={() => setIsAddOpen(true)} />
    </div>
  );
}
