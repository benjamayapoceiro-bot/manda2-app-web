import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const AdminDashboardScreen: React.FC = () => {
  const { orders, formatPrice, paymentAliases, updatePaymentAlias } = useApp();
  const [platformAlias, setPlatformAlias] = useState(paymentAliases.platform);
  const [isSaved, setIsSaved] = useState(false);

  // Cálculo de totales para liquidación (Solo órdenes entregadas)
  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  
  const totalRiderDebt = deliveredOrders.reduce((sum, o) => sum + (o.riderFee || 0), 0);
  const totalMerchantDebt = deliveredOrders.reduce((sum, o) => sum + (o.merchantEarnings || 0), 0);
  const totalPlatformRevenue = deliveredOrders.reduce((sum, o) => sum + (o.platformFee || 0), 0);

  const handleSaveConfig = () => {
      updatePaymentAlias('platform', platformAlias);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="bg-[#f6f7f8] dark:bg-[#101822] text-slate-900 dark:text-white min-h-screen font-inter">
      <header className="sticky top-0 z-50 bg-[#f6f7f8]/80 dark:bg-[#101822]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="size-10 overflow-hidden rounded-full border-2 border-[#136dec]">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdd71qcofcTdNyuUU0zTmwY_Gh1zQt65KAGXzxk0yUL5KA3r8YiRvKcCoFZbNyvvTBPSfU1GPRa5rMtzwdqgA_JXJsKfB1clom0q1XRU3WqBYnA4OCpXnABOqfqA2BTG5u5jg1PuyTKSL1tPOoSGJFEuOjfdXR8sRF_YaszGwMEGBZqtaKBYn6vXeI1GeAccyc4FS-T_RNFKWkgHWqLRd8StGoGJHvAf0ke9L19U1at1pnvmHUNYhoemLX0GHrv44Ly4OGN4XHtcwR" alt="User profile avatar" />
            </div>
            <div>
              <h1 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Manda2 Admin</h1>
              <p className="text-sm font-bold">Panel de Control</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-md mx-auto pb-24">
        
        {/* CONFIGURACIÓN DE PLATAFORMA */}
        <section className="p-4 pb-0">
            <div className="bg-white dark:bg-[#1a232e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
                 <h2 className="text-sm font-bold mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-500">settings</span>
                    Configuración de Cuenta Principal
                </h2>
                <p className="text-xs text-gray-500 mb-3">
                    Define el Alias donde se acreditarán las comisiones de la plataforma (Fees) automáticamente.
                </p>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={platformAlias} 
                        onChange={(e) => setPlatformAlias(e.target.value)}
                        className="flex-1 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm"
                        placeholder="alias.plataforma.mp"
                    />
                    <button 
                        onClick={handleSaveConfig}
                        className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${isSaved ? 'bg-green-500 text-white' : 'bg-[#136dec] text-white'}`}
                    >
                        {isSaved ? 'OK' : 'Guardar'}
                    </button>
                </div>
            </div>
        </section>

        {/* SECCIÓN DE LIQUIDACIONES (AUTOMÁTICAS) */}
        <section className="p-4">
            <div className="bg-white dark:bg-[#1a232e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#136dec]">account_balance_wallet</span>
                    Balance y Splits
                </h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold">Dispersado a Riders</p>
                            <p className="text-[10px] text-green-500">Automático vía Split MP</p>
                        </div>
                        <p className="text-lg font-bold text-slate-700 dark:text-gray-300">{formatPrice(totalRiderDebt)}</p>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold">Dispersado a Comercios</p>
                            <p className="text-[10px] text-green-500">Automático vía Split MP</p>
                        </div>
                        <p className="text-lg font-bold text-slate-700 dark:text-gray-300">{formatPrice(totalMerchantDebt)}</p>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2 pt-2 flex justify-between items-center">
                        <p className="text-sm font-bold text-slate-700 dark:text-white">Revenue Plataforma</p>
                        <p className="text-xl font-bold text-green-500">+{formatPrice(totalPlatformRevenue)}</p>
                    </div>
                    <div className="bg-[#136dec]/10 p-3 rounded-lg flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#136dec] text-sm mt-0.5">info</span>
                        <p className="text-[10px] text-[#136dec] leading-snug">
                            El dinero ingresa por Mercado Pago y se divide automáticamente hacia las cuentas configuradas (Riders y Comercios) al entregarse el pedido.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section className="px-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-[#1a232e] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="material-symbols-outlined text-[#136dec]">payments</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Volumen Total</p>
            <p className="text-xl font-bold tracking-tight">{formatPrice(totalRiderDebt + totalMerchantDebt + totalPlatformRevenue)}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-[#1a232e] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="material-symbols-outlined text-orange-500">shopping_cart</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Pedidos Totales</p>
            <p className="text-xl font-bold tracking-tight">{orders.length}</p>
          </div>
        </section>
        
        <section className="mt-8 px-4">
          <h2 className="text-lg font-bold tracking-tight mb-4">Últimos Pedidos</h2>
          <div className="space-y-3">
             {orders.map(order => (
                 <div key={order.id} className="flex justify-between items-center p-4 bg-white dark:bg-[#1a232e] rounded-xl border border-slate-200 dark:border-slate-800">
                     <div>
                         <p className="font-bold text-sm">{order.id}</p>
                         <p className="text-xs text-gray-500">{order.status}</p>
                     </div>
                     <div className="text-right">
                         <p className="font-bold text-sm">{formatPrice(order.total)}</p>
                         <p className="text-[10px] text-green-500 font-bold">+ {formatPrice(order.platformFee)}</p>
                     </div>
                 </div>
             ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default AdminDashboardScreen;