import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const BusinessDashboard: React.FC = () => {
  const { orders, updateOrderStatus, formatPrice } = useApp();
  const [showSettings, setShowSettings] = useState(false);
  
  // Filter orders relevant to business
  const activeOrders = orders.filter(o => ['pending', 'preparing'].includes(o.status));
  const completedOrders = orders.filter(o => o.status === 'delivered');
  const todaysTotal = completedOrders.reduce((sum, o) => sum + o.merchantEarnings, 0);

  return (
    <div className="bg-[#09090b] text-white min-h-screen font-manrope">
      <nav className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center p-4 justify-between max-w-md mx-auto">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#2b8cee]/20 text-[#2b8cee]">
            <span className="material-symbols-outlined">storefront</span>
          </div>
          <div className="flex-1 px-4">
            <h1 className="text-lg font-extrabold leading-tight tracking-tight text-white">Manda2 Business</h1>
            <p className="text-xs text-gray-400 font-medium">Restaurante El Patio</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="flex size-10 items-center justify-center rounded-full bg-[#27272a] text-gray-300 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">settings</span>
            </button>
            
            {showSettings && (
                <div className="absolute top-12 right-0 z-50 bg-[#18181b] rounded-xl shadow-xl w-48 border border-white/10 overflow-hidden" onClick={() => setShowSettings(false)}>
                  <Link to="/wallet/merchant" className="block px-4 py-3 text-sm hover:bg-white/5 border-b border-white/5 text-gray-200">
                    <div className="flex items-center gap-2">
                         <span className="material-symbols-outlined text-[#f46325]">account_balance_wallet</span>
                         Billetera
                    </div>
                  </Link>
                  <Link to="/legal/merchant-agreement" className="block px-4 py-3 text-sm hover:bg-white/5 border-b border-white/5 text-gray-200">
                    Acuerdo Comercial
                  </Link>
                  <button className="w-full text-left px-4 py-3 text-sm hover:bg-white/5 text-red-500 font-medium">
                    Cerrar Sesión
                  </button>
                </div>
            )}
          </div>
        </div>
      </nav>
      
      <main className="max-w-md mx-auto pb-24">
        <div className="p-4">
          <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#18181b] p-5 shadow-sm">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold uppercase tracking-wider text-gray-500">Estado del Local</p>
              <p className="text-base font-semibold text-emerald-400 flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Recibiendo pedidos
              </p>
            </div>
            <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full bg-[#27272a] p-0.5 transition-colors has-[:checked]:bg-[#2b8cee]">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="h-full w-[27px] rounded-full bg-white shadow-md transition-transform peer-checked:translate-x-[20px]"></div>
            </label>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 px-4">
          <Link to="/wallet/merchant" className="flex flex-col gap-2 rounded-xl p-5 bg-[#18181b] border border-white/10 shadow-sm hover:border-[#f46325]/50 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm font-medium">Ventas Hoy</p>
              <span className="material-symbols-outlined text-emerald-500 text-sm group-hover:scale-110 transition-transform">trending_up</span>
            </div>
            <p className="text-2xl font-bold leading-tight text-white">{formatPrice(todaysTotal)}</p>
          </Link>
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-[#18181b] border border-white/10 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm font-medium">Pendientes</p>
              <span className="material-symbols-outlined text-[#2b8cee] text-sm">pending_actions</span>
            </div>
            <p className="text-2xl font-bold leading-tight text-white">{activeOrders.length}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between px-4 pb-2 pt-8">
          <h2 className="text-xl font-bold tracking-tight text-white">Pedidos Activos</h2>
        </div>
        
        <div className="flex flex-col gap-3 px-4">
          {activeOrders.length === 0 ? (
             <div className="text-center py-10 opacity-50 text-gray-500">
               <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
               <p>Todo al día. No hay pedidos pendientes.</p>
             </div>
          ) : (
            activeOrders.map(order => (
              <div key={order.id} className="flex flex-col gap-4 rounded-xl bg-[#18181b] p-4 border border-white/10 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${order.status === 'pending' ? 'bg-orange-500/20 text-orange-500' : 'bg-[#2b8cee]/20 text-[#2b8cee]'}`}>
                        {order.status === 'pending' ? 'Nuevo' : 'En Cocina'}
                      </span>
                      <p className="text-gray-500 text-xs font-medium">Hace 2 min</p>
                    </div>
                    <p className="text-lg font-extrabold text-white">{order.id}</p>
                    <p className="text-gray-400 text-sm">{order.customer} • {order.items.length} artículos</p>
                    <p className="text-xs text-gray-500 mt-1">{order.items.map(i => i.name).join(', ')}</p>
                  </div>
                </div>
                
                {order.status === 'pending' ? (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg h-11 bg-[#2b8cee] text-white text-sm font-bold transition-transform active:scale-95 hover:bg-blue-600"
                    >
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      Aceptar
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 rounded-lg h-11 bg-[#27272a] text-white text-sm font-bold border border-white/10 transition-transform active:scale-95 hover:bg-[#3f3f46]">
                      Rechazar
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg h-11 bg-emerald-600 text-white text-sm font-bold transition-transform active:scale-95 hover:bg-emerald-500"
                    >
                      <span className="material-symbols-outlined text-[20px]">room_service</span>
                      Listo para Recoger
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#09090b]/90 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-md mx-auto flex justify-around items-center h-20 pb-4">
          <button className="flex flex-col items-center gap-1 text-[#2b8cee]">
            <span className="material-symbols-outlined text-[28px] fill-current">dashboard</span>
            <span className="text-[10px] font-bold">Inicio</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[28px]">history</span>
            <span className="text-[10px] font-medium">Historial</span>
          </button>
          <Link to="/menu" className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[28px]">restaurant_menu</span>
            <span className="text-[10px] font-medium">Menú</span>
          </Link>
          <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[28px]">settings</span>
            <span className="text-[10px] font-medium">Ajustes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;