import React, { useState } from 'react';
import { Cpu, Wifi, RefreshCw, Battery, Radio, CheckCircle2 } from 'lucide-react';

export default function IoTPanel({ plants }) {
  const [sensors, setSensors] = useState([
    { id: 'esp32_01', location: 'Bancal Norte (Tomates)', moisture: 38, battery: 88, status: 'Online', lastSync: 'Hace 2 min' },
    { id: 'esp32_02', location: 'Macetas Balcón', moisture: 65, battery: 92, status: 'Online', lastSync: 'Hace 5 min' }
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSensors(sensors.map(s => ({
        ...s,
        moisture: Math.floor(Math.random() * (75 - 30 + 1)) + 30,
        lastSync: 'Recién'
      })));
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-slate-800 p-4 rounded-2xl border border-slate-700">
        <div>
          <h1 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
            <Cpu size={20} /> Panel IoT & Estación DIY
          </h1>
          <p className="text-xs text-slate-400">Conectividad ESP32 / Sensores locales</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-2 rounded-xl transition flex items-center justify-center shadow"
          title="Sincronizar sensores"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin text-emerald-400' : ''} />
        </button>
      </div>

      {/* Estado del Bridge MQTT / Servidor Local */}
      <div className="bg-emerald-950/30 border border-emerald-500/30 p-3.5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Wifi size={18} />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-300">Broker MQTT Local Activo</p>
            <p className="text-[10px] text-slate-400">Escuchando en ws://localhost:9001/huerta</p>
          </div>
        </div>
        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full font-medium flex items-center gap-1">
          <CheckCircle2 size={12} /> Conectado
        </span>
      </div>

      {/* Lista de Sensores Vinculados */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-200">Dispositivos Vinculados</h2>
        
        {sensors.map(sensor => (
          <div key={sensor.id} className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-3 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] bg-slate-700 text-emerald-400 px-2 py-0.5 rounded font-mono font-semibold">
                  {sensor.id}
                </span>
                <h3 className="font-medium text-sm text-slate-100 mt-1">{sensor.location}</h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-700/50 px-2 py-1 rounded-lg">
                <Battery size={14} className="text-emerald-400" />
                <span>{sensor.battery}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/60 text-xs">
              <div className="flex items-center gap-2">
                <Radio size={14} className="text-blue-400" />
                <span className="text-slate-300">Humedad: <strong className="text-slate-100">{sensor.moisture}%</strong></span>
              </div>
              <div className="text-right text-slate-400 text-[11px]">
                Sync: {sensor.lastSync}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Guía Rápida para integrar un nuevo ESP32 */}
      <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2 text-xs">
        <h3 className="font-semibold text-slate-200">💡 Instrucciones para tu Estación DIY</h3>
        <p className="text-slate-400 leading-relaxed">
          Configura tu microcontrolador para enviar un payload JSON mediante un POST HTTP hacia tu IP local o publicar en el tópico MQTT con el formato: <code className="text-emerald-400 font-mono">{"{ \"sensorId\": \"esp32_XX\", \"moisture\": XX }"}</code>.
        </p>
      </div>
    </div>
  );
}
