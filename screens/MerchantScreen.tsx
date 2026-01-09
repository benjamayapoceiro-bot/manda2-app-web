import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const MerchantScreen: React.FC = () => {
  const { products, formatPrice } = useApp();

  return (
    <div className="font-display bg-[#f8f6f5] dark:bg-[#221510] text-[#181311] dark:text-white antialiased min-h-screen">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden pb-24">
        {/* Banner */}
        <div className="relative w-full h-[240px]">
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 pt-6 bg-gradient-to-b from-black/50 to-transparent">
            <Link to="/home" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors">
              <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
            </Link>
          </div>
          <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBHy3Z7nm3UbLZRDVbHAXiwBT6sqtfCf4_4VLwM_KsM8Z_qEcyRpsCbl2lSZLdXn9PVYkTkRrcp-aRnVnzhSe8H-zchF4Gez9Zqt8KPUfp3vlRwe1gBoUsJotJ3L1Rey06yJzThOMcfM6DGaGk6JgHc-eVhkR28IPmH4FiHGyD8N1Lu00siwSUztKPveyZzCewVNOE6tirYJ0XmlDFvDzXUKsIyc_2clCwpm_epHynUPoJ5Y91sBPjsNmkr22aIhM0e841GbKVIdqHH')" }}></div>
          <div className="absolute -bottom-6 left-4">
            <div className="w-20 h-20 rounded-2xl border-4 border-[#f8f6f5] dark:border-[#221510] overflow-hidden bg-white shadow-xl">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAey4OqOvsyxhAQ5ThJO6EuTHNCH8JJ2YAi-7uPesbKBdpNOw-E9ZIHKNmMnwtY7TXBbSbT-ccfnrMYApROSPIIR7OzMEoeJj2sGiYAylmHd-iWoWs7HIq0QeLGMSQ0CLpxOtTVXss_gpQ2uaAPPAHC9dqpDgxe7BLfmxXyT24KqnQEq098WaGE7CyBIRWytl-aa1mXLqLoWcpAY4g0Eh3j9C2hpY_EavToXAjw_oAmLGCJaoUbdYHNdBLO4P_7ak_n6TdJPhkWXe0" alt="Logotipo del comercio" />
            </div>
          </div>
        </div>
        
        {/* Info */}
        <div className="px-4 pt-8 pb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-[#181311] dark:text-white">Mi Negocio Online</h1>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
              <span className="material-symbols-outlined filled text-[16px] text-green-600">star</span>
              <span className="text-green-600 font-bold text-sm">4.8</span>
            </div>
            <div className="flex items-center gap-1 text-[#8a6d60] dark:text-gray-400 text-sm font-medium">
              <span>•</span>
              <span>Comida Rápida</span>
              <span>•</span>
              <span>$$$</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 text-sm text-[#5f4c43] dark:text-gray-300">
            <span className="material-symbols-outlined text-[18px] text-[#f46325]">location_on</span>
            <span className="truncate">Buenos Aires, CABA • 1.2 km</span>
          </div>
        </div>

        {/* Categories */}
        <div className="sticky top-0 z-20 bg-[#f8f6f5]/95 dark:bg-[#221510]/95 backdrop-blur-md py-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar">
            <button className="flex h-10 shrink-0 items-center justify-center px-6 rounded-full bg-[#f46325] text-white shadow-lg shadow-[#f46325]/20">
              <span className="text-sm font-bold">Todo</span>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center px-6 rounded-full bg-white dark:bg-[#2f2521] text-[#181311] dark:text-white border border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium">Comida</span>
            </button>
            <button className="flex h-10 shrink-0 items-center justify-center px-6 rounded-full bg-white dark:bg-[#2f2521] text-[#181311] dark:text-white border border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium">Bebidas</span>
            </button>
          </div>
        </div>
        
        {/* Products List (Dynamic) */}
        <div className="px-4 pb-4 mt-4">
          <h2 className="text-xl font-extrabold text-[#181311] dark:text-white mb-4">Menú</h2>
          <div className="flex flex-col gap-4">
            {products.filter(p => p.active).map((product) => (
                <div key={product.id} className="flex gap-4 p-4 bg-white dark:bg-[#2f2521] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <div className="w-full h-full bg-center bg-cover" style={{ backgroundImage: `url('${product.image}')` }}></div>
                </div>
                <div className="flex flex-col flex-1 justify-between">
                    <div>
                    <h3 className="font-bold text-[#181311] dark:text-white text-base">{product.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-[#181311] dark:text-white">{formatPrice(product.price)}</span>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f46325] text-white text-xs font-bold shadow-md shadow-[#f46325]/30 active:scale-90 transition-transform">
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        <span>Agregar</span>
                    </button>
                    </div>
                </div>
                </div>
            ))}
            
            {products.filter(p => p.active).length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    No hay productos disponibles en este momento.
                </div>
            )}
          </div>
        </div>
        
        {/* Cart Button */}
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <Link to="/cart" className="w-full flex items-center justify-between bg-[#f46325] text-white p-4 rounded-2xl shadow-xl shadow-[#f46325]/30 active:scale-[0.98] transition-all">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full font-bold text-sm">2</div>
              <div className="flex flex-col items-start text-xs">
                <span className="font-medium opacity-90 uppercase tracking-tighter">Tu Pedido</span>
                <span className="font-bold text-lg leading-none">Ver Carrito</span>
              </div>
            </div>
            <div className="flex items-center gap-2 font-bold bg-white/10 px-4 py-2 rounded-xl">
              <span>Ir a pagar</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MerchantScreen;