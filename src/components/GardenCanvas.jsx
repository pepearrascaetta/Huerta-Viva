import React, { useState } from 'react';
import { ShieldCheck, AlertOctagon, Grid, Info } from 'lucide-react';

export default function GardenCanvas({ plants }) {
  // Simulamos un terreno de 4 sectores/bancales predeterminados
  const [sectors, setSectors] = useState([
    { id: 1, name: 'Bancal Norte', plantIds: [1, 2], type: 'Suelo Directo' },
    { id: 2, name: 'Macetas Balcón', plantIds: [], type: 'Macetas' },
  ]);

  const [selectedSector, setSelectedSector] = useState(sectors[0]);

  // Lógica simple de verificación de alianzas
  const checkAlliances = (sectorPlants) => {
    const names = sectorPlants.map(p => p.name.toLowerCase());
    if (names.some(n => n.includes('tomate')) && names.some(n => n.includes('albahaca'))) {
      return { status: 'optimal', msg: '🟢 Alianza Perfecta: Tomate y Albahaca se protegen mutuamente.' };
    }
    if (sectorPlants.length < 2) {
      return { status: 'neutral', msg: 'ℹ️ Espacio disponible para sumar una planta aliada.' };
    }
    return { status: 'warning', msg: '⚠️ Sin conflictos críticos detectados entre vecinos.' };
  };

  const currentSectorPlants = plants.filter(p => selectedSector.plantIds.includes(p.id));
  const allianceReport = checkAlliances(currentSectorPlants);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700">
        <div>
          <h1 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            <Grid size={20} /> Mapa Espacial del Terreno
          </h1>
          <p className="text-xs text-slate-400">Distribución física y alianzas botánicas</p>
        </div>
      </div>

      {/* Selector de Sectores / Bancales */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sectors.map(sec => (
          <button
            key={sec.id}
            onClick={() => setSelectedSector(sec)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
              selectedSector.id === sec.id
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {sec.name} ({sec.type})
          </button>
        ))}
      </div>

      {/* Visor de Grilla del Bancal Seleccionado */}
      <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-slate-200">Cultivos en {selectedSector.name}</h2>
          <span className="text-xs text-slate-400">{currentSectorPlants.length} plantas ubicadas</span>
        </div>

        {/* Cuadrícula visual 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((slotIndex) => {
            const plantInSlot = currentSectorPlants[slotIndex];
            return (
              <div
                key={slotIndex}
                className={`h-24 rounded-xl border flex flex-col justify-center items-center p-2 text-center transition ${
                  plantInSlot
                    ? 'bg-slate-700/60 border-emerald-500/50 text-slate-100 shadow-sm'
                    : 'bg-slate-900/40 border-slate-700 border-dashed text-slate-500'
                }`}
              >
                {plantInSlot ? (
                  <>
                    <span className="text-xs font-bold text-emerald-400">{plantInSlot.name}</span>
                    <span className="text-[10px] text-slate-300">"{plantInSlot.alias}"</span>
                    <span className="mt-1 text-[9px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                      Humedad: {plantInSlot.moisture}%
                    </span>
                  </>
                ) : (
                  <span className="text-xs">Celda Libre [ + ]</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Widget de Alianzas y Sinergia */}
      <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
        allianceReport.status === 'optimal' 
          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
          : 'bg-slate-800 border-slate-700 text-slate-200'
      }`}>
        <div className="mt-0.5">
          {allianceReport.status === 'optimal' ? <ShieldCheck size={20} className="text-emerald-400" /> : <Info size={20} className="text-blue-400" />}
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-0.5">Análisis de Vecindario</h3>
          <p className="text-xs leading-relaxed">{allianceReport.msg}</p>
        </div>
      </div>
    </div>
  );
}
