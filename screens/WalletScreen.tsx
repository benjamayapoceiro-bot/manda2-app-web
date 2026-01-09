import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const WalletScreen: React.FC = () => {
  const { type } = useParams<{ type: string }>(); // 'rider' or 'merchant'
  const { transactions, formatPrice } = useApp();

  const userRole = type === 'rider' ? 'rider' : 'merchant';
  const roleTitle = type === 'rider' ? 'Billetera Rider' : 'Finanzas Comercio';
  
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
        
        <div className="w-full grid grid-cols-2 gap-4 mb-8">
            <button className="bg-[#f46325] hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-all active:scale-95">
                <span className="material-symbols-outlined">payments</span>
                Solicitar Retiro
            </button>
            <button className="bg-[#27272a] hover:bg-[#3f3f46] text-white py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                <span className="material-symbols-outlined">account_balance</span>
                Datos CBU
            </button>
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
                            <span className={`font-bold ${t.type === 'credit' ? 'text-green-500' : 'text-white'}`}>
                                {t.type === 'credit' ? '+' : '-'}{formatPrice(t.amount)}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
        
        <p className="mt-8 text-xs text-center text-gray-600 max-w-xs mx-auto">
            Los retiros solicitados antes del Lunes 23:59 se procesan automáticamente el Martes.
        </p>
      </div>
    </div>
  );
};

export default WalletScreen;