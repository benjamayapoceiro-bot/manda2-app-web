import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'repartidores' | 'comercios' | 'clientes';

const NetworkScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('repartidores');

  const ridersData = [
      { id: 'R-101', name: 'Carlos Méndez', status: 'pending', vehicle: 'Moto G-310', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu1c0wWTv6I_i7XBQgW0gGWp8vcTADuZwbsDR9hZ4xwhox1W794Cr1NFG6XtjSaaBdu_yKPphbhWzc5bXwhHI2Ar8GmCfar7ClSWVdZA5o3PNmHK84x8HNwX9FuY5huKG-P3fLLFDCfGssXDqXa0NX2_jVsh-2QxqaHUKTuFuXsnjeRpmM7sUhaLURiagr_mTI9bzMcivhfz5ku6ZFqPphtOuY_WdYudc-2ol6vOW55-vJj7FD9UFWLvopT-TZsxXodmB90HaY2qdP' },
      { id: 'R-102', name: 'Ana Lopez', status: 'active', vehicle: 'Bicicleta', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: 'R-103', name: 'Pedro Ruiz', status: 'suspended', vehicle: 'Moto Yamaha', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { id: 'R-104', name: 'Jorge Silva', status: 'active', vehicle: 'Auto Chevrolet', img: 'https://randomuser.me/api/portraits/men/86.jpg' }
  ];

  return (
    <div className="bg-[#f8f6f5] dark:bg-[#121212] text-slate-900 dark:text-white font-display min-h-screen">
      <nav className="sticky top-0 z-50 bg-[#f8f6f5]/80 dark:bg-[#121212]/80 backdrop-blur-[20px] border-b border-gray-200 dark:border-[#2d2d2d] px-4 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/admin" className="material-symbols-outlined text-[#f46325] text-3xl">arrow_back_ios_new</Link>
            <h1 className="text-xl font-bold tracking-tight">Gestión de Red</h1>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">notifications</span>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#f46325] ring-2 ring-white dark:ring-[#121212]"></span>
          </div>
        </div>
      </nav>
      
      <main className="pb-24">
        <div className="px-4 py-4">
          <div className="flex h-11 items-center justify-center rounded-xl bg-gray-200/50 dark:bg-[#1e1e1e] p-1">
            <button 
                onClick={() => setActiveTab('repartidores')}
                className={`flex h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-semibold transition-all ${activeTab === 'repartidores' ? 'bg-white dark:bg-[#f46325] shadow-sm text-[#f46325] dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
              <span className="truncate">Repartidores</span>
            </button>
            <button 
                onClick={() => setActiveTab('comercios')}
                className={`flex h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-semibold transition-all ${activeTab === 'comercios' ? 'bg-white dark:bg-[#f46325] shadow-sm text-[#f46325] dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
              <span className="truncate">Comercios</span>
            </button>
            <button 
                onClick={() => setActiveTab('clientes')}
                className={`flex h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-semibold transition-all ${activeTab === 'clientes' ? 'bg-white dark:bg-[#f46325] shadow-sm text-[#f46325] dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
              <span className="truncate">Clientes</span>
            </button>
          </div>
        </div>
        
        {/* Render content based on Tab */}
        {activeTab === 'repartidores' && (
            <div className="space-y-3 px-4 animate-fade-in">
                 <div className="flex items-center justify-between pb-2">
                    <h3 className="text-lg font-bold tracking-tight">Lista de Repartidores</h3>
                    <button className="text-xs font-bold text-[#f46325]">Filtrar</button>
                 </div>
                 
                 {ridersData.map((rider) => (
                    <div key={rider.id} className="bg-white dark:bg-[#1e1e1e] p-4 rounded-2xl border border-gray-100 dark:border-[#2d2d2d] shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
                                <img className="w-full h-full object-cover" src={rider.img} alt={rider.name} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">{rider.name}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400">ID: #{rider.id} • {rider.vehicle}</p>
                            </div>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                            rider.status === 'pending' ? 'bg-orange-500/10 text-orange-600' :
                            rider.status === 'active' ? 'bg-green-500/10 text-green-600' :
                            'bg-red-500/10 text-red-600'
                        }`}>
                            {rider.status === 'pending' ? 'Pendiente' : rider.status === 'active' ? 'Activo' : 'Suspendido'}
                        </span>
                        </div>
                        <div className="flex gap-2">
                        <button className="flex-1 h-10 rounded-xl bg-gray-50 dark:bg-[#2d2d2d] text-slate-700 dark:text-slate-300 text-sm font-bold flex items-center justify-center gap-2 border border-gray-200 dark:border-transparent">
                            Ver Perfil
                        </button>
                        {rider.status === 'pending' && (
                             <button className="flex-1 h-10 rounded-xl bg-[#f46325] text-white text-sm font-bold flex items-center justify-center gap-2">
                                Validar
                            </button>
                        )}
                        </div>
                    </div>
                 ))}
            </div>
        )}

        {activeTab === 'comercios' && (
            <div className="text-center py-10 opacity-50">
                <span className="material-symbols-outlined text-4xl">storefront</span>
                <p className="mt-2">Gestión de Comercios</p>
            </div>
        )}
      </main>
      
      <div className="fixed bottom-6 right-6 z-40">
        <button className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f46325] text-white shadow-lg shadow-[#f46325]/30">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </div>
  );
};

export default NetworkScreen;