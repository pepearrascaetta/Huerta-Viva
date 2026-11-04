import React from 'react';
import { getLunarPhaseAndTask } from '../utils/lunarEngine';
import { CloudSun, AlertTriangle, Droplets, ArrowRight } from 'lucide-react';

export default function Dashboard({ plants, onNavigate }) {
  const lunarInfo = getLunarPhaseAndTask();

  return (
    <div className="space-y-4">
      {/* Header Clima & Luna */}
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-sm">
        <div>
          <h1 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            🌿 Huerta Viva
          </h1>
          <p className="text-xs text-slate-400">Mi Terreno • Online</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-700/50 px-3 py-1.5 rounded-xl border border-slate-600 text-sm">
          <span>{lunarInfo.icon}</span>
          <span className="flex items-center gap-1 text-amber-300">
            <CloudSun size={16} /> 24°C
          </span>
        </div>
      </div>

      {/* Widget Biodinámico & IoT Alert */}
      <div className="bg-gradient-to-br from-emerald-900/40 to-slate-800 p-4 rounded-2xl border border-emerald-500/30 shadow-md space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
            Labor del Día ({lunarInfo.phase})
          </span>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
            IoT Activo
          </span>
        </div>
        <p className="text-sm text-slate-200 leading-snug">
          "{lunarInfo.task}"
        </p>
      </div>

      {/* Resumen de Estado */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
            <Droplets size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Riego General</p>
            <p className="text-sm font-bold text-slate-100">Óptimo (OK)</p>
          </div>
        </div>
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-xs text-slate-400">Alertas</p>
            <p className="text-sm font-bold text-amber-400">1 Bancal</p>
          </div>
        </div>
      </div>

      {/* Vista Previa Plantas */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-slate-300">Cultivos Destacados</h2>
          <button 
            onClick={() => onNavigate('plantas')}
            className="text-xs text-emerald-400 flex items-center gap-1 hover:underline"
          >
            Ver todos <ArrowRight size={14} />
          </button>
        </div>

        {plants.slice(0, 2).map((plant) => (
          <div key={plant.id} className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-sm text-slate-100">{plant.name}</h3>
              <p className="text-xs text-emerald-400">"{plant.alias}" • {plant.type}</p>
            </div>
            <div className="text-right">
              <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-lg">
                Humedad: {plant.moisture}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
