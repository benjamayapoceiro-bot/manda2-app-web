import React, { useState } from 'react';
import { useApp, VehicleType } from '../context/AppContext';
import { Link } from 'react-router-dom';

const RiderScreen: React.FC = () => {
  const { orders, updateOrderStatus, riderVehicle, setRiderVehicle, formatPrice } = useApp();
  const [showVehicleMenu, setShowVehicleMenu] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  
  const availableOrders = orders.filter(o => o.status === 'ready');
  const activeDelivery = orders.find(o => o.status === 'on_way');

  const getMultiplier = (type: VehicleType) => {
      if (type === 'bici') return 0.8;
      if (type === 'moto') return 1.0;
      if (type === 'auto') return 1.3;
      return 1;
  };

  const calculateEarnings = (baseFee: number) => {
      return baseFee * getMultiplier(riderVehicle);
  };

  return (
    <div className="bg-[#09090b] text-white h-screen overflow-hidden relative font-display">
      <div className="relative flex h-full w-full flex-col max-w-md mx-auto shadow-2xl bg-[#09090b]">
        {/* Header */}
        <header className="z-20 bg-[#18181b]/90 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center p-4 justify-between">
            <div className="flex items-center gap-2">
                <div className="flex size-10 shrink-0 items-center overflow-hidden rounded-full border-2 border-[#f46325]">
                <div className="bg-center bg-no-repeat aspect-square bg-cover size-full" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYiDCzRe8D1xyjqWVLdZ_K1nWtNRaUWGeLRZMx9s_e9BKOSXX4loQYd9wsq5kHaygwa_3lWzlSo-n8zP9whq6U4rRlhyE_GAgxOYZFNCyCjajgrcEOq6hbRPdpQ673RnTfxlXiw3KvAuRiLMOk8S2P5Cl6WHLNEq5B437IE8XQqFd4MCg32ndif706eip_mO-ZbhCOe5vbLZe1Ax9bTO3GbXTjaocjCzJdT-saPEiWAsil65Gi3B1l3281E0EAGIccdIIc2uPNVAKL')" }}></div>
                </div>
                <Link to="/wallet/rider" className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Mi Saldo</span>
                    <span className="text-sm font-bold text-green-500 flex items-center gap-1">
                        Ver Billetera <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </span>
                </Link>
            </div>
            
            <button onClick={() => setShowVehicleMenu(!showVehicleMenu)} className="flex flex-col items-center bg-white/5 px-4 py-1 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
              <span className="text-[10px] uppercase tracking-widest text-[#f46325] font-bold">Vehículo</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-gray-300">
                    {riderVehicle === 'bici' ? 'pedal_bike' : riderVehicle === 'moto' ? 'two_wheeler' : 'directions_car'}
                </span>
                <span className="font-bold text-sm capitalize text-white">{riderVehicle}</span>
                <span className="material-symbols-outlined text-xs text-gray-400">expand_more</span>
              </div>
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowHelpMenu(!showHelpMenu)}
                className="flex size-10 items-center justify-center hover:bg-white/10 rounded-full text-white"
              >
                <span className="material-symbols-outlined">more_vert</span>
              </button>
              
              {showHelpMenu && (
                <div className="absolute top-12 right-0 z-50 bg-[#27272a] rounded-xl shadow-xl w-48 border border-white/10 overflow-hidden" onClick={() => setShowHelpMenu(false)}>
                  <Link to="/legal/rider-contract" className="block px-4 py-3 text-sm hover:bg-white/5 border-b border-white/5 text-gray-200">
                    Ver Contrato
                  </Link>
                  <Link to="/legal/rider-rates" className="block px-4 py-3 text-sm hover:bg-white/5 text-gray-200">
                    Ver Tarifas
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Vehicle Dropdown */}
          {showVehicleMenu && (
              <div className="absolute top-[70px] left-0 right-0 z-50 p-2 flex justify-center bg-black/80 backdrop-blur-sm h-full" onClick={() => setShowVehicleMenu(false)}>
                  <div className="bg-[#18181b] rounded-xl p-2 w-48 shadow-2xl h-fit border border-white/10" onClick={e => e.stopPropagation()}>
                      <p className="text-center text-xs font-bold mb-2 uppercase text-gray-500">Seleccionar Vehículo</p>
                      <button onClick={() => { setRiderVehicle('bici'); setShowVehicleMenu(false); }} className={`w-full p-3 rounded-lg flex items-center gap-3 ${riderVehicle === 'bici' ? 'bg-[#f46325] text-white' : 'hover:bg-white/5 text-gray-300'}`}>
                          <span className="material-symbols-outlined">pedal_bike</span> Bicicleta (80%)
                      </button>
                      <button onClick={() => { setRiderVehicle('moto'); setShowVehicleMenu(false); }} className={`w-full p-3 rounded-lg flex items-center gap-3 ${riderVehicle === 'moto' ? 'bg-[#f46325] text-white' : 'hover:bg-white/5 text-gray-300'}`}>
                          <span className="material-symbols-outlined">two_wheeler</span> Moto (100%)
                      </button>
                      <button onClick={() => { setRiderVehicle('auto'); setShowVehicleMenu(false); }} className={`w-full p-3 rounded-lg flex items-center gap-3 ${riderVehicle === 'auto' ? 'bg-[#f46325] text-white' : 'hover:bg-white/5 text-gray-300'}`}>
                          <span className="material-symbols-outlined">directions_car</span> Auto (130%)
                      </button>
                  </div>
              </div>
          )}
        </header>
        
        {/* Status Bar */}
        <div className="p-4 z-20 bg-[#09090b]/80 backdrop-blur-md">
          <div className="flex flex-1 items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#18181b] p-4 shadow-sm">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-[#f46325] animate-pulse"></div>
                <p className="text-white text-base font-bold leading-tight">Estado: En línea</p>
              </div>
              <p className="text-gray-400 text-sm font-normal">
                {activeDelivery ? "Entregando pedido en curso" : "Buscando pedidos..."}
              </p>
            </div>
            <label className="relative flex h-[32px] w-[56px] cursor-pointer items-center rounded-full border-none bg-[#27272a] p-1 has-[:checked]:bg-[#f46325] transition-colors duration-300">
              <input type="checkbox" className="invisible absolute peer" defaultChecked />
              <div className="h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 peer-checked:translate-x-[24px]"></div>
            </label>
          </div>
        </div>
        
        {/* Map Background */}
        <main className="absolute inset-0 z-0 top-[180px] bottom-0">
          <div className="h-full w-full bg-cover bg-center grayscale opacity-60" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuADnCxdVErFoluKIfHRLnyc-EZ8IXnOJ8gGDQ4U2SoWyvsNU-oN0JFsz-ItKojf3KutASCmYty8ZvrO54s2JvPUi0S140JTPn05kk1OPl3dZglbTni0ZHM-5O3MaRl6RboP3WvERGAwNwv8tEfau91MVuDIb-ItlSgSZC-JD0ySuADbhzy8QcWMMu8bxYfOCxQ6NFP0YxfEK7IibG1kWI_MzatvuoJEVYgI47F0YNj_a7UW0b1lbynSFyFxaYP1S0nxcSqLsNm2fat8')" }}>
             {/* Map markers */}
             {availableOrders.length > 0 && !activeDelivery && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
                    <div className="bg-[#f46325] p-3 rounded-full animate-bounce shadow-xl shadow-orange-500/30">
                        <span className="material-symbols-outlined text-white text-2xl">storefront</span>
                    </div>
                    <div className="bg-[#18181b] text-white px-3 py-1.5 rounded-lg text-xs font-bold mt-1 shadow-md border border-white/10">
                        {availableOrders[0].merchant}
                    </div>
                </div>
             )}
          </div>
        </main>
        
        {/* ACTIVE DELIVERY CARD */}
        {activeDelivery && (
            <div className="mt-auto p-4 z-20 pb-8 bg-gradient-to-t from-black to-transparent absolute bottom-0 w-full">
            <div className="flex flex-col items-stretch overflow-hidden rounded-3xl shadow-2xl bg-[#18181b] border-2 border-[#f46325]">
                <div className="p-5">
                    <div className="flex justify-between items-center mb-4">
                        <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs font-bold uppercase border border-green-500/20">En Curso</span>
                        <span className="text-xl font-bold text-white">{activeDelivery.id}</span>
                        {activeDelivery.chatIdRider && (
                            <Link to={`/chat/${activeDelivery.chatIdRider}`} className="bg-[#f46325] text-white p-2 rounded-full shadow-lg animate-pulse hover:bg-orange-600 transition-colors">
                                <span className="material-symbols-outlined">chat</span>
                            </Link>
                        )}
                    </div>
                    <p className="text-lg font-bold mb-1 text-white">Entregar a: {activeDelivery.customer}</p>
                    <p className="text-sm text-gray-400 mb-4">Av. Principal 123</p>
                    
                    <button 
                        onClick={() => updateOrderStatus(activeDelivery.id, 'delivered')}
                        className="w-full h-14 flex items-center justify-center rounded-2xl bg-[#f46325] text-white text-lg font-bold shadow-lg shadow-[#f46325]/30 hover:brightness-110 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined mr-2">check_circle</span>
                        Marcar como Entregado
                    </button>
                </div>
            </div>
            </div>
        )}

        {/* NEW ORDER CARD */}
        {!activeDelivery && availableOrders.length > 0 && (
            <div className="mt-auto p-4 z-20 pb-8 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 w-full">
            <div className="flex flex-col items-stretch overflow-hidden rounded-3xl shadow-2xl bg-[#18181b] border border-white/10">
                <div className="relative h-32 w-full overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbQCebnYZy6pYMdQ4GSq67TZX7eYTZAAad5qmVDY86RMJAycictipHrL20Cr1XSvqGbZHdyQGAlW-VM20BF1gyxSQZOsztU3SXbH1qWQIcrEFjEeExM1tz3itCRrxYR_457AjMqNmTF7bnqAq-NITIIEOWc4Cw6MuZD4FGeefegsd3sKDpPCJWUKdR8HKANWiXzhoWQQfOMJ-alfCRd8Ry2RukWLsp2qtQ8UAMc4oPK4ONNJA_kje2hvTztyue6TeQMnKhw1qrvzLn')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] to-transparent"></div>
                <div className="absolute bottom-3 left-4">
                    <span className="bg-[#f46325] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-lg">Nuevo Pedido</span>
                    <h3 className="text-white text-lg font-bold mt-1">{availableOrders[0].merchant}</h3>
                </div>
                </div>
                <div className="flex flex-col gap-4 p-5 pt-2">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-gray-400">
                        <span className="material-symbols-outlined text-sm text-[#f46325]">location_on</span>
                        <p className="text-sm font-normal">Entrega: {availableOrders[0].customer}</p>
                    </div>
                    </div>
                    <div className="text-right">
                    <p className="text-[#f46325] text-xl font-bold leading-none">{formatPrice(calculateEarnings(availableOrders[0].riderFee))}</p>
                    <p className="text-gray-500 text-[10px] font-medium uppercase">Tarifa ({riderVehicle})</p>
                    </div>
                </div>
                <div className="flex gap-3 mt-2">
                    <button className="flex-1 h-12 flex items-center justify-center rounded-2xl bg-[#27272a] text-white text-sm font-bold hover:bg-[#3f3f46] transition-colors border border-white/5">
                    Rechazar
                    </button>
                    <button 
                        onClick={() => updateOrderStatus(availableOrders[0].id, 'on_way')}
                        className="flex-[2] h-12 flex items-center justify-center rounded-2xl bg-[#f46325] text-white text-sm font-bold shadow-lg shadow-[#f46325]/30 hover:bg-orange-600 active:scale-95 transition-all"
                    >
                    Aceptar Pedido
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        
        <div className="h-6 bg-[#18181b]"></div>
      </div>
    </div>
  );
};

export default RiderScreen;