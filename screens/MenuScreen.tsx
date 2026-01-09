import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp, Product } from '../context/AppContext';

const MenuScreen: React.FC = () => {
  const { products, addProduct, deleteProduct, toggleProductStatus, formatPrice } = useApp();
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addProduct({
          name: newName,
          price: Number(newPrice),
          description: newDesc,
          category: 'General',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHtDKBsPQBzE7Q-z3fnHo-cJO8rp1LzDFmO6G6R1tH3mYzvmm6wv-OVLhd2LY0vF5OtxyaP-a06BiHxLX6jUlUE1ycz31gUQjrsUurAfys6AeGgvYlGltcdF_kNI2knL1ZZuV0lWiiGyaXRbDEzJi71Ubht4vlz5g6s9Q91OAdSbof-u6WzGwoCMys6xXpUPqsPtezOV2F0aqotZHAgTI8CPsgIKmB6Nb3Obi2ImWxudpFdXAjAnxvg68R8NMiXh4zGFQ2RgcBFZ7G', // Placeholder
          active: true
      });
      setShowModal(false);
      setNewName('');
      setNewPrice('');
      setNewDesc('');
  };

  return (
    <div className="bg-[#f8f6f5] dark:bg-[#221510] min-h-screen text-slate-900 dark:text-white pb-24 font-display">
      <header className="sticky top-0 z-50 bg-[#f8f6f5]/80 dark:bg-[#221510]/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-3">
          <Link to="/business" className="flex items-center justify-center size-10 rounded-full bg-slate-200 dark:bg-white/10">
            <span className="material-symbols-outlined text-slate-700 dark:text-white">arrow_back</span>
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Gestión de Menú</h1>
            <p className="text-xs text-slate-500 dark:text-[#baa59c]">Panel de Administrador</p>
          </div>
        </div>
      </header>
      
      <main className="max-w-md mx-auto pt-4">
        <div className="px-4 space-y-3">
          {products.map(product => (
            <div key={product.id} className={`flex items-center gap-4 bg-white dark:bg-[#2e211b] p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 ${!product.active ? 'opacity-60 grayscale' : ''}`}>
                <div className="relative shrink-0">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-20 shadow-inner" style={{ backgroundImage: `url('${product.image}')` }}></div>
                {!product.active && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                        <span className="text-[10px] font-bold text-white uppercase px-2 py-1 bg-red-500 rounded-full">Inactivo</span>
                    </div>
                )}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h3 className="text-slate-900 dark:text-white font-bold text-base truncate">{product.name}</h3>
                    <button onClick={() => deleteProduct(product.id)} className="text-red-400 p-1 hover:bg-red-500/10 rounded">
                        <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                </div>
                <p className="text-[#f46325] font-bold text-lg leading-tight">{formatPrice(product.price)}</p>
                <p className="text-slate-500 dark:text-[#baa59c] text-xs line-clamp-1 mt-1">{product.description}</p>
                </div>
                <div className="shrink-0 flex flex-col items-center gap-2">
                <label className="relative flex h-[28px] w-[48px] cursor-pointer items-center rounded-full border-none bg-slate-200 dark:bg-[#392d28] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-[#f46325] transition-all duration-300">
                    <div className="h-full w-[24px] rounded-full bg-white shadow-md"></div>
                    <input 
                        type="checkbox" 
                        className="invisible absolute" 
                        checked={product.active}
                        onChange={() => toggleProductStatus(product.id)} 
                    />
                </label>
                </div>
            </div>
          ))}
        </div>
      </main>
      
      <div className="fixed bottom-6 right-6 z-40">
        <button onClick={() => setShowModal(true)} className="flex items-center justify-center size-16 bg-[#f46325] text-white rounded-full shadow-2xl shadow-[#f46325]/40 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>

      {/* Add Product Modal */}
      {showModal && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#221510] rounded-2xl w-full max-w-sm p-6 shadow-2xl">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Nuevo Producto</h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase">Nombre</label>
                          <input type="text" required value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-gray-100 dark:bg-white/5 rounded-lg border-none p-3 mt-1 dark:text-white" placeholder="Ej. Pizza Muzza" />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase">Precio (ARS)</label>
                          <input type="number" required value={newPrice} onChange={e => setNewPrice(e.target.value)} className="w-full bg-gray-100 dark:bg-white/5 rounded-lg border-none p-3 mt-1 dark:text-white" placeholder="Ej. 4500" />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-gray-500 uppercase">Descripción</label>
                          <input type="text" value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full bg-gray-100 dark:bg-white/5 rounded-lg border-none p-3 mt-1 dark:text-white" placeholder="Ingredientes..." />
                      </div>
                      <div className="flex gap-3 mt-2">
                          <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 font-bold text-gray-500 dark:text-gray-300">Cancelar</button>
                          <button type="submit" className="flex-1 py-3 bg-[#f46325] text-white rounded-xl font-bold shadow-lg shadow-[#f46325]/30">Guardar</button>
                      </div>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default MenuScreen;