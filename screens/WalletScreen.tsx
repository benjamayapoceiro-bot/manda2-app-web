import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const WalletScreen: React.FC = () => {
  const { type } = useParams<{ type: string }>(); // 'rider' or 'merchant'
  const { transactions, formatPrice, paymentAliases, updatePaymentAlias } = useApp();
  const [aliasInput, setAliasInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const userRole = type === 'rider' ? 'rider' : 'merchant';
  const roleTitle = type === 'rider' ? 'Billetera Rider' : 'Finanzas Comercio';
  
  // Set initial value
  useEffect(() => {
    if (type === 'rider') setAliasInput(paymentAliases.rider);
    if (type === 'merchant') setAliasInput(paymentAliases.merchant);
  }, [type, paymentAliases]);

  const handleSaveAlias = () => {
      if (type === 'rider') updatePaymentAlias('rider', aliasInput);
      if (type === 'merchant') updatePaymentAlias('merchant', aliasInput);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
  };
  
  // Filtrar transacciones para este usuario
  const myTransactions = transactions.filter(t => t.userRole === userRole);
  
  const balance = myTransactions.reduce((acc, t) => {
      return t.type === 'credit' ? acc + t.amount : acc - t.amount;
  }, 0);

  return (
    <div className="bg-[#09090b] min-h-screen text-white font-display">
      <div className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
            <Link to={type === 'rider' ? '/rider' : '/business'} className="flex items-center gap-2 text-gray-400 hover:text-white">
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="text-sm font-medium">Volver</span>
            </Link>
            <h1 className="text-sm font-bold uppercase tracking-wider text-[#f46325]">{roleTitle}</h1>
            <div className="w-8"></div>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center">
        <p className="text-gray-400 text-sm mb-1">Saldo Disponible</p>
        <h2 className="text-4xl font-extrabold text-white mb-6">{formatPrice(balance)}</h2>
        
        {/* Alias Configuration Card */}
        <div className="w-full bg-[#18181b] rounded-2xl border border-white/10 p-5 mb-6 shadow-lg">
             <div className="flex items-center gap-2 mb-3">
                 <span className="material-symbols-outlined text-[#009ee3]">account_balance_wallet</span>
                 <h3 className="font-bold text-sm text-white">Configuración de Cobro</h3>
             </div>
             <p className="text-xs text-gray-400 mb-3">
                 Ingresa tu Alias o CVU de Mercado Pago para recibir los pagos automáticamente (Split Payment).
             </p>
             <div className="flex gap-2">
                 <input 
                    type="text" 
                    value={aliasInput}
                    onChange={(e) => setAliasInput(e.target.value)}
                    placeholder="Ej: mi.alias.mp"
                    className="flex-1 bg-[#27272a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#009ee3]"
                 />
                 <button 
                    onClick={handleSaveAlias}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${isSaved ? 'bg-green-500 text-white' : 'bg-[#009ee3] text-white hover:bg-[#008bd1]'}`}
                 >
                    {isSaved ? 'Guardado' : 'Guardar'}
                 </button>
             </div>
             {isSaved && <p className="text-xs text-green-500 mt-2 font-medium">¡Cuenta vinculada con éxito!</p>}
        </div>

        <div className="w-full bg-[#18181b] rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-[#27272a]/50">
                <h3 className="font-bold text-gray-200">Actividad Reciente</h3>
            </div>
            <div className="divide-y divide-white/5">
                {myTransactions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">
                        No hay movimientos aún.
                    </div>
                ) : (
                    myTransactions.map(t => (
                        <div key={t.id} className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'credit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                    <span className="material-symbols-outlined">
                                        {t.type === 'credit' ? 'arrow_downward' : 'arrow_upward'}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-white">{t.description}</p>
                                    <p className="text-xs text-gray-500">{t.timestamp.toLocaleDateString()} • {t.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`block font-bold ${t.type === 'credit' ? 'text-green-500' : 'text-white'}`}>
                                    {t.type === 'credit' ? '+' : '-'}{formatPrice(t.amount)}
                                </span>
                                {t.targetAlias && (
                                    <span className="text-[10px] text-[#009ee3]">
                                        Destino: {t.targetAlias}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        
        <p className="mt-8 text-xs text-center text-gray-600 max-w-xs mx-auto">
            Los pagos se dispersan automáticamente al completar cada orden gracias a la tecnología Mercado Pago Split.
        </p>
      </div>
    </div>
  );
};

export default WalletScreen;