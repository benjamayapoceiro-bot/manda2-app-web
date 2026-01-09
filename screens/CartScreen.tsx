import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const CartScreen: React.FC = () => {
  const { placeOrder, formatPrice, products } = useApp();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Para la demo, el carrito es estático basado en los primeros 2 productos
  const cartItems = products.slice(0, 2);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal + 3500; // + delivery fee

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // SIMULACIÓN DE MERCADO PAGO
    // En una app real, aquí redirigiríamos a MP o abriríamos el Brick de pagos
    // La "magia" del split ocurre en el backend cuando MP confirma el pago.
    // Aquí simulamos ese éxito tras 2 segundos.
    setTimeout(async () => {
        await placeOrder(cartItems, 'mercadopago');
        setIsProcessing(false);
        navigate('/tracking');
    }, 2000);
  };

  if (isProcessing) {
      return (
          <div className="bg-[#f8f6f5] dark:bg-[#221510] min-h-screen flex flex-col items-center justify-center font-display">
              <div className="w-20 h-20 bg-[#009ee3] rounded-full flex items-center justify-center animate-pulse mb-4">
                  <span className="material-symbols-outlined text-white text-4xl">handshake</span>
              </div>
              <h2 className="text-xl font-bold text-[#181311] dark:text-white mb-2">Procesando pago...</h2>
              <p className="text-gray-500 text-sm">Conectando con Mercado Pago</p>
          </div>
      )
  }

  return (
    <div className="bg-[#f8f6f5] dark:bg-[#221510] min-h-screen font-display text-[#181311] dark:text-white">
      <header className="sticky top-0 z-50 bg-white dark:bg-[#2c1d17] border-b border-[#e6dedb] dark:border-[#3d2b24] px-4 py-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <Link to="/merchant" className="flex items-center justify-center size-10 rounded-full hover:bg-[#f5f1f0] dark:hover:bg-[#3d2b24] transition-colors">
            <span className="material-symbols-outlined text-[#181311] dark:text-white">arrow_back_ios_new</span>
          </Link>
          <h1 className="text-lg font-bold leading-tight tracking-tight">Mi Carrito</h1>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors">
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </header>
      
      <main className="max-w-lg mx-auto pb-48">
        <div className="p-4 mt-2">
          <div className="flex items-center gap-3 bg-white dark:bg-[#2c1d17] p-4 rounded-xl border border-[#e6dedb] dark:border-[#3d2b24]">
            <div className="bg-[#f46325]/10 p-2 rounded-full">
              <span className="material-symbols-outlined text-[#f46325]">location_on</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#8a6d60] font-medium uppercase tracking-wider">Entrega en</p>
              <p className="text-sm font-semibold truncate">Av. Principal 123, Sector Norte</p>
            </div>
            <button className="text-[#f46325] text-sm font-bold">Cambiar</button>
          </div>
        </div>
        
        <div className="px-4 space-y-3">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4 bg-white dark:bg-[#2c1d17] p-3 rounded-xl shadow-sm border border-[#e6dedb] dark:border-[#3d2b24]">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-20 shrink-0" style={{ backgroundImage: `url('${item.image}')` }}></div>
                <div className="flex flex-col flex-1 gap-1">
                <div className="flex justify-between items-start">
                    <p className="text-[#181311] dark:text-white text-base font-bold leading-tight">{item.name}</p>
                    <p className="text-[#f46325] font-bold">{formatPrice(item.price)}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-[#f5f1f0] dark:bg-[#3d2b24] px-3 py-1.5 rounded-full">
                    <button className="text-lg font-bold leading-none flex items-center justify-center hover:text-[#f46325] transition-colors">-</button>
                    <span className="text-sm font-bold w-4 text-center">1</span>
                    <button className="text-lg font-bold leading-none flex items-center justify-center hover:text-[#f46325] transition-colors">+</button>
                    </div>
                </div>
                </div>
            </div>
          ))}
        </div>
        
        <div className="px-4 space-y-4 mt-4">
          <h3 className="text-[#181311] dark:text-white text-lg font-bold">Resumen de costos</h3>
          <div className="bg-white dark:bg-[#2c1d17] rounded-xl p-5 space-y-3 border border-[#e6dedb] dark:border-[#3d2b24]">
            <div className="flex justify-between text-base">
              <span className="text-[#8a6d60]">Subtotal Productos</span>
              <span className="text-[#181311] dark:text-white font-medium">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-base">
              <span className="text-[#8a6d60]">Costo de envío</span>
              <span className="text-[#181311] dark:text-white font-medium">{formatPrice(3500)}</span>
            </div>
            <div className="h-px bg-[#e6dedb] dark:bg-[#3d2b24] my-2"></div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-[#181311] dark:text-white text-lg font-bold">Total a Pagar</span>
              <span className="text-[#f46325] text-xl font-extrabold">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
        
        <div className="px-4 mt-6">
            <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-green-600">verified_user</span>
                <span className="text-xs font-bold uppercase text-gray-500">Pago Seguro</span>
            </div>
            <div className="bg-[#009ee3]/10 border border-[#009ee3]/30 p-3 rounded-lg flex gap-3 items-start">
                <span className="material-symbols-outlined text-[#009ee3]">info</span>
                <p className="text-xs text-[#009ee3] font-medium leading-relaxed">
                    Al pagar, el dinero se divide automáticamente: 
                    <br/>• <strong>{formatPrice(subtotal)}</strong> al Comercio.
                    <br/>• <strong>{formatPrice(2000)}</strong> al Repartidor.
                    <br/>• <strong>{formatPrice(1500)}</strong> a Manda2.
                </p>
            </div>
        </div>
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#2c1d17] border-t border-[#e6dedb] dark:border-[#3d2b24] p-4 pb-8 safe-area-bottom shadow-lg z-40">
        <div className="max-w-lg mx-auto flex flex-col gap-3">
          <button 
            onClick={handleCheckout}
            className="w-full bg-[#009ee3] hover:bg-[#008bd1] text-white py-3.5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-[#009ee3]/20"
          >
            <span>Pagar con Mercado Pago</span>
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </button>
          <button className="w-full bg-gray-100 dark:bg-white/5 text-gray-500 py-3 rounded-full font-bold text-sm">
             Pagar en Efectivo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;