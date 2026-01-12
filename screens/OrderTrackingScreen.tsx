import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const OrderTrackingScreen: React.FC = () => {
  const { activeOrder } = useApp();

  const statusInfo = useMemo(() => {
    switch (activeOrder?.status) {
      case 'pending': return { text: 'Esperando confirmación', step: 1, color: 'bg-yellow-500' };
      case 'preparing': return { text: 'Preparando tu pedido', step: 2, color: 'bg-blue-500' };
      case 'ready': return { text: 'Listo para recolección', step: 2, color: 'bg-blue-600' };
      case 'on_way': return { text: 'Repartidor en camino', step: 3, color: 'bg-[#f46325]' };
      case 'delivered': return { text: '¡Pedido Entregado!', step: 4, color: 'bg-green-500' };
      default: return { text: 'Procesando...', step: 1, color: 'bg-gray-500' };
    }
  }, [activeOrder]);

  if (!activeOrder) {
    return (
      <div className="bg-[#f8f6f5] dark:bg-[#120a07] min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-[#f46325] mb-4">shopping_bag</span>
          <h2 className="text-2xl font-bold dark:text-white mb-2">No tienes pedidos activos</h2>
          <Link to="/home" className="text-[#f46325] font-bold underline">Ir a comprar</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f6f5] dark:bg-[#120a07] min-h-screen text-slate-900 dark:text-white">
      <div className="sticky top-0 z-50 bg-[#f8f6f5]/80 dark:bg-[#120a07]/80 backdrop-blur-md">
        <div className="flex items-center p-4 pb-2 justify-between">
          <Link to="/home" className="text-[#f46325] flex size-12 shrink-0 items-center justify-start cursor-pointer">
            <span className="material-symbols-outlined text-3xl">chevron_left</span>
          </Link>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center font-display">
            {activeOrder.id}
          </h2>
          <div className="flex w-12 items-center justify-end">
            <button className="flex size-10 items-center justify-center rounded-full bg-[#f46325]/10 text-[#f46325]">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between items-end">
          <div>
            <p className="text-[#f46325] text-xs font-bold uppercase tracking-wider">Estado Actual</p>
            <p className="text-slate-900 dark:text-white text-xl font-bold leading-tight animate-pulse transition-all">
              {statusInfo.text}
            </p>
          </div>
          <p className="text-slate-600 dark:text-[#baa59c] text-sm font-medium">Paso {Math.min(statusInfo.step, 3)} de 3</p>
        </div>
        <div className="flex gap-2 h-2.5 w-full">
          <div className={`flex-1 rounded-full transition-colors duration-500 ${statusInfo.step >= 1 ? statusInfo.color : 'bg-slate-200 dark:bg-[#392d28]'}`}></div>
          <div className={`flex-1 rounded-full transition-colors duration-500 ${statusInfo.step >= 2 ? statusInfo.color : 'bg-slate-200 dark:bg-[#392d28]'}`}></div>
          <div className={`flex-1 rounded-full transition-colors duration-500 ${statusInfo.step >= 3 ? statusInfo.color : 'bg-slate-200 dark:bg-[#392d28]'}`}></div>
        </div>
      </div>
      
      <div className="px-4 py-2">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-white/5">
          <div className="absolute inset-0 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAFYFAcCfWh2rghEL6fgCdTWUeStm_A2teFzExQbPGJ5u3tkgcydSNogQYrsTihSvxcUTb-lRdmnaP9b0LEqEavyY2CohopTxtNwoEN4URhFTEtIdbzJm8zFhdugT8DAOGpkk1TfL87s3fuU2O2kfGcL3D9gM4BoSARwGdfHf5s3Pec8jfXVqlCAJsSzvmSFzwGs1Qvtm1foBaV1792ZJ3tVUZaHhnRvp90Nl40dhPqzSZo_H1Ol1S4QuU-hRNwOcCbDx_5_yViJM4H')" }}></div>
          {statusInfo.step >= 3 && (
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full">
                <span className="material-symbols-outlined text-white text-4xl animate-bounce">two_wheeler</span>
             </div>
          )}
        </div>
      </div>
      
      <h2 className="text-slate-900 dark:text-white text-[20px] font-bold leading-tight tracking-tight px-4 pb-2 pt-4">Repartidor Asignado</h2>
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between gap-4 rounded-xl bg-white dark:bg-[#1e130f] p-5 shadow-sm border border-slate-100 dark:border-white/5">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-[#f46325]/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#f46325] text-2xl">two_wheeler</span>
            </div>
            <div>
              {activeOrder.status === 'on_way' || activeOrder.status === 'delivered' ? (
                  <>
                    <p className="text-slate-900 dark:text-white text-base font-bold">Juan Pérez</p>
                    <p className="text-slate-500 dark:text-[#baa59c] text-sm">Moto • Yamaha FZ</p>
                  </>
              ) : (
                  <p className="text-slate-500 dark:text-[#baa59c] text-sm italic">Buscando repartidor...</p>
              )}
            </div>
          </div>
          {activeOrder.chatIdRider && (
            <Link to={`/chat/${activeOrder.chatIdRider}`} className="flex gap-2">
                <button className="flex size-12 items-center justify-center rounded-full bg-[#f46325] text-white shadow-lg shadow-[#f46325]/30">
                <span className="material-symbols-outlined text-2xl">chat</span>
                </button>
            </Link>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#1e130f] p-5 shadow-sm border border-slate-100 dark:border-white/5">
          <div className="flex flex-[2_2_0px] flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f46325] text-sm">storefront</span>
                <p className="text-slate-500 dark:text-[#baa59c] text-xs font-bold uppercase tracking-wide">Comercio</p>
              </div>
              <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight">{activeOrder.merchant}</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default OrderTrackingScreen;