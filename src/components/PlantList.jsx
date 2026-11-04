import React, { useState } from 'react';
import { Sprout, Search, Droplets, Calendar, ChevronRight, ArrowLeft, Plus } from 'lucide-react';

export default function PlantList({ plants, onOpenAdd }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([
    { id: 1, date: '2026-11-01', text: 'Trasplantado a maceta definitiva con compost orgánico.' }
  ]);

  // Filtrado por buscador (nombre real o fantasía)
  const filteredPlants = plants.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.alias.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([...notes, { id: Date.now(), date: new Date().toISOString().split('T')[0], text: newNote }]);
    setNewNote('');
  };

  // Si hay una planta seleccionada, mostramos su detalle y bitácora
  if (selectedPlant) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedPlant(null)}
          className="text-xs text-emerald-400 flex items-center gap-1 hover:underline"
        >
          <ArrowLeft size={16} /> Volver al listado
        </button>

        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-lg font-bold text-slate-100">{selectedPlant.name}</h1>
              <p className="text-xs text-emerald-400 font-medium">"{selectedPlant.alias}"</p>
            </div>
            <span className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg">
              {selectedPlant.type}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700">
            <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-700/50 flex items-center gap-2">
              <Droplets size={18} className="text-blue-400" />
              <div>
                <p className="text-[10px] text-slate-400">Humedad Suelo</p>
                <p className="text-xs font-bold text-slate-100">{selectedPlant.moisture}% (OK)</p>
              </div>
            </div>
            <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-700/50 flex items-center gap-2">
              <Calendar size={18} className="text-amber-400" />
              <div>
                <p className="text-[10px] text-slate-400">Sensor IoT</p>
                <p className="text-xs font-bold text-slate-100">{selectedPlant.sensorId || 'Ninguno'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bitácora de Crecimiento */}
        <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-3">
          <h2 className="text-sm font-semibold text-slate-200">Bitácora y Notas de Evolución</h2>
          
          <form onSubmit={handleAddNote} className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Ej. Primeros brotes visibles, aplicar abono..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs transition shadow"
            >
              Añadir
            </button>
          </form>

          <div className="space-y-2 pt-1">
            {notes.map(note => (
              <div key={note.id} className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60 text-xs space-y-1">
                <span className="text-[10px] text-emerald-400 font-medium">{note.date}</span>
                <p className="text-slate-300">{note.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Vista principal del listado
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700">
        <div>
          <h1 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            <Sprout size={20} /> Mis Cultivos
          </h1>
          <p className="text-xs text-slate-400">Administración detallada de plantas</p>
        </div>
        <button
          onClick={onOpenAdd}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-2 rounded-xl transition shadow flex items-center justify-center"
          title="Añadir planta"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-3 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre real o apodo..."
          className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Lista de Plantas */}
      <div className="space-y-2.5">
        {filteredPlants.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-700/50">
            <p className="text-xs text-slate-400">No se encontraron cultivos registrados.</p>
          </div>
        ) : (
          filteredPlants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => setSelectedPlant(plant)}
              className="bg-slate-800 hover:bg-slate-750 p-3.5 rounded-xl border border-slate-700 flex justify-between items-center cursor-pointer transition shadow-sm"
            >
              <div>
                <h3 className="font-medium text-sm text-slate-100">{plant.name}</h3>
                <p className="text-xs text-emerald-400">"{plant.alias}" • {plant.type}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg">
                  {plant.moisture}% 💧
                </span>
                <ChevronRight size={16} className="text-slate-500" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
