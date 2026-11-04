import React from 'react';
import { Home, Sprout, PlusCircle, Map, Cpu } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenAdd }) {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'plantas', label: 'Plantas', icon: Sprout },
    { id: 'scan', label: 'Añadir', icon: PlusCircle, isAction: true },
    { id: 'mapa', label: 'Mapa', icon: Map },
    { id: 'iot', label: 'Sensores', icon: Cpu },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur border-t border-slate-700 py-2 px-4 flex justify-around items-center max-w-md mx-auto z-40">
      {navItems.map((item) => {
        const Icon = item.icon;
        if (item.isAction) {
          return (
            <button
              key={item.id}
              onClick={onOpenAdd}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-3 rounded-full shadow-lg transform -translate-y-3 transition flex items-center justify-center"
              title="Añadir Planta"
            >
              <Icon size={26} />
            </button>
          );
        }
        
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center space-y-1 text-xs transition ${
              isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
