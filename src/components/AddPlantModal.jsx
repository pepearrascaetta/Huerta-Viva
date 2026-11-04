import React, { useState } from 'react';
import { X, Camera, Edit3, Sparkles, Sprout } from 'lucide-react';

export default function AddPlantModal({ onClose, onAdd }) {
  const [mode, setMode] = useState('manual'); // 'manual' o 'foto'
  const [name, setName] = useState('');
  const [alias, setAlias] = useState('');
  const [type, setType] = useState('Sol Pleno');
  const [sensorId, setSensorId] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name,
      alias: alias.trim() || name,
      type,
      sensorId: sensorId.trim() || null,
      moisture: Math.floor(Math.random() * (70 - 30 + 1)) + 30, // Humedad inicial simulada
      alliance: 'General'
    });
  };

  // Simulación del procesamiento de foto con IA (Gemini Client-side / Vision)
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsAnalyzing(true);
        
        // Simulamos la respuesta analítica de la IA tras 1.5 segundos
        setTimeout(() => {
          setName('Tomate Platense');
          setAlias('El Patriarca');
          setType('Sol Pleno');
          setIsAnalyzing(false);
          setMode('manual'); // Pasa al formulario con los datos prellenados por la IA
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-xl">
        
        {/* Header del Modal */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2">
            <Sprout size={18} /> Añadir Nuevo Cultivo
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-100 transition">
            <X size={20} />
          </button>
        </div>

        {/* Selector de Modo (Manual vs Foto IA) */}
        <div className="grid grid-cols-2 gap-2 bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setMode('manual')}
            className={`py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
              mode === 'manual' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-300 hover:text-slate-100'
            }`}
          >
            <Edit3 size={14} /> Manual
          </button>
          <button
            onClick={() => setMode('foto')}
            className={`py-2 text-xs font-semibold rounded-lg transition flex items-center justify-center gap-1.5 ${
              mode === 'foto' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-300 hover:text-slate-100'
            }`}
          >
            <Camera size={14} /> Por Foto (IA)
          </button>
        </div>

        {/* Contenido según el modo */}
        {mode === 'foto' && !isAnalyzing ? (
          <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center space-y-3 bg-slate-800/40">
            <div className="mx-auto w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">Sube una foto de la planta o semilla</p>
              <p className="text-xs text-slate-400 mt-1">La IA detectará automáticamente la especie y ciclos de riego.</p>
            </div>
            <label className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition shadow">
              Seleccionar Imagen
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          </div>
        ) : isAnalyzing ? (
          <div className="py-12 text-center space-y-3">
            <div className="animate-spin mx-auto w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full" />
            <p className="text-xs text-emerald-300 font-medium">Analizando rasgos botánicos con IA...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {imagePreview && (
              <div className="flex items-center gap-3 bg-slate-800 p-2 rounded-xl border border-slate-700">
                <img src={imagePreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                <span className="text-xs text-emerald-400 font-medium">✓ Imagen procesada con éxito</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nombre Real / Especie</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Tomate Cherry, Lechuga Mantecosa"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nombre de Fantasía (Apodo)</label>
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Ej. Lolo, El Abuelo Verde"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tipo de Exposición</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Sol Pleno">Sol Pleno</option>
                  <option value="Semisombra">Semisombra</option>
                  <option value="Sombra">Sombra</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Sensor IoT (Opcional)</label>
                <input
                  type="text"
                  value={sensorId}
                  onChange={(e) => setSensorId(e.target.value)}
                  placeholder="Ej. esp32_02"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm py-2.5 rounded-xl transition shadow"
              >
                Guardar Cultivo
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
