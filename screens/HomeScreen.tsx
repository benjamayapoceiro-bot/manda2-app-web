import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const HomeScreen: React.FC = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = async () => {
      await logout();
      navigate('/auth');
  }

  return (
    <div className="bg-[#f8f6f5] dark:bg-[#221510] font-display text-[#181311] dark:text-white transition-colors duration-200 antialiased pb-28 min-h-screen">
      <div className="sticky top-0 z-40 bg-[#f8f6f5]/95 dark:bg-[#221510]/95 backdrop-blur-md border-b border-black/5 dark:border-white/5 pb-2">
        <div className="flex items-center justify-between px-4 pt-12 pb-2">
          <div className="flex flex-col flex-1 min-w-0 mr-4">
            <span className="text-xs font-medium text-[#f46325] uppercase tracking-wider mb-0.5">
                {user ? `Hola, ${user.email?.split('@')[0]}` : 'Entregar en'}
            </span>
            <button className="group flex items-center gap-1.5 text-left max-w-full">
              <span className="material-symbols-outlined text-[#f46325] text-[20px] filled">location_on</span>
              <span className="font-bold text-lg truncate text-[#181311] dark:text-white">Av. Principal 123</span>
              <span className="material-symbols-outlined text-[#181311] dark:text-white text-[20px]">expand_more</span>
            </button>
          </div>
          {user ? (
             <button onClick={handleLogout} className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-[#181311] dark:text-white text-[24px]">logout</span>
             </button>
          ) : (
             <Link to="/auth" className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
               <span className="material-symbols-outlined text-[#181311] dark:text-white text-[24px]">login</span>
             </Link>
          )}
        </div>
        <div className="px-4 py-2">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400 group-focus-within:text-[#f46325] transition-colors">search</span>
            </div>
            <input type="text" className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#2f221d] border-none rounded-full text-sm shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-[#f46325]/20 dark:text-white" placeholder="¿Qué se te antoja hoy?" />
          </div>
        </div>
      </div>
      
      <main className="flex flex-col gap-8 pt-6">
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-4">
            <h3 className="font-bold text-lg text-[#181311] dark:text-white">Explorar Categorías</h3>
            <a href="#" className="text-[#f46325] text-sm font-semibold">Ver todas</a>
          </div>
          <div className="flex overflow-x-auto no-scrollbar px-4 pb-2 gap-4">
            <button className="flex flex-col items-center gap-2 min-w-[80px] group">
              <div className="w-[72px] h-[72px] rounded-2xl bg-orange-100 dark:bg-orange-900/30 shadow-sm flex items-center justify-center group-active:scale-95 transition-transform border border-orange-200/50 dark:border-orange-500/20">
                <span className="material-symbols-outlined text-[#f46325] text-[32px] filled">restaurant</span>
              </div>
              <span className="text-xs font-bold text-center">Restaurantes</span>
            </button>
            <button className="flex flex-col items-center gap-2 min-w-[80px] group">
              <div className="w-[72px] h-[72px] rounded-2xl bg-blue-100 dark:bg-blue-900/30 shadow-sm flex items-center justify-center group-active:scale-95 transition-transform border border-blue-200/50 dark:border-blue-500/20">
                <span className="material-symbols-outlined text-blue-600 text-[32px] filled">medical_services</span>
              </div>
              <span className="text-xs font-bold text-center">Farmacias</span>
            </button>
            <button className="flex flex-col items-center gap-2 min-w-[80px] group">
              <div className="w-[72px] h-[72px] rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 shadow-sm flex items-center justify-center group-active:scale-95 transition-transform border border-yellow-200/50 dark:border-yellow-500/20">
                <span className="material-symbols-outlined text-yellow-600 text-[32px] filled">storefront</span>
              </div>
              <span className="text-xs font-bold text-center">Quioscos</span>
            </button>
            <button className="flex flex-col items-center gap-2 min-w-[80px] group">
              <div className="w-[72px] h-[72px] rounded-2xl bg-green-100 dark:bg-green-900/30 shadow-sm flex items-center justify-center group-active:scale-95 transition-transform border border-green-200/50 dark:border-green-500/20">
                <span className="material-symbols-outlined text-green-600 text-[32px] filled">shopping_cart</span>
              </div>
              <span className="text-xs font-bold text-center">Supermercados</span>
            </button>
            <button className="flex flex-col items-center gap-2 min-w-[80px] group">
              <div className="w-[72px] h-[72px] rounded-2xl bg-purple-100 dark:bg-purple-900/30 shadow-sm flex items-center justify-center group-active:scale-95 transition-transform border border-purple-200/50 dark:border-purple-500/20">
                <span className="material-symbols-outlined text-purple-600 text-[32px] filled">local_mall</span>
              </div>
              <span className="text-xs font-bold text-center">Tiendas</span>
            </button>
          </div>
        </section>
        
        <section className="overflow-x-auto no-scrollbar px-4 pb-2">
          <div className="flex gap-4">
            <div className="min-w-[300px] h-[160px] rounded-xl relative overflow-hidden flex-shrink-0 bg-[#FFF5F1]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center opacity-20"></div>
              <div className="relative z-10 p-5 h-full flex flex-col justify-center items-start">
                <span className="bg-[#f46325] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2">Oferta Limitada</span>
                <h2 className="text-2xl font-extrabold text-[#181311] leading-tight">50% DTO<br/>Primer Pedido</h2>
                <p className="text-sm text-gray-600 font-medium mt-1">Usa el código: HOLA50</p>
              </div>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWVmC7pjXV1-EkxISY3-rfGINIL951MDnaUoUNWlVgAwG_UG0jWtdqci3nU6u3K2C4S6n5x06kqWLWtU0zmN39tNqpsWXssAUmJ48lVZfSn0TzviSAd_1gPmSj6Ck4OVj4V-o8-a1dpJUVKa4zZ4AWjm_w72IXbWIdarOcH0GLYXrzm5Kf0TaUXREr-3UWsufMGU3PRBBxm0hf9Ws9CmkVQ_VDS8Bl6DfXIHcChCGPtPwyXB1DUt5MLe4znfnkQYWaVbCmUB2ituyU" alt="Promo hamburguesa" className="absolute -right-8 -bottom-8 w-40 h-40 object-cover rounded-full border-4 border-white dark:border-[#2f221d] shadow-lg" />
            </div>
            <div className="min-w-[300px] h-[160px] rounded-xl relative overflow-hidden flex-shrink-0 bg-[#E8F5E9]">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center opacity-20"></div>
              <div className="relative z-10 p-5 h-full flex flex-col justify-center items-start">
                <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2">Envío Gratis</span>
                <h2 className="text-2xl font-extrabold text-[#181311] leading-tight">Opciones<br/>Saludables</h2>
                <p className="text-sm text-gray-600 font-medium mt-1">En ensaladas seleccionadas</p>
              </div>
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCz5gVZ4crxVgcDew0t9wfNT5Io0hQcGQqA5cPY8rZ-LAep_II4pGGAcFLqPaX832rNRIE5qxhYKgyUobAtChLEYiOM0fA460HBufG9jWr2UFov5shgS9lGTfqYonIrSDd-vBYsi5XZDVKzQ9Puc2_0x56qyof-4S8D7-FuY_sC-s1F-ixdyFW93rrH0FLnQjgdCn_D33qm8DwnKnqC6ouwbF2yoR8oapU8A685Qf8kKyO_xGSbHPy1V9j2jltEsdhGKZZYcS3tQNd" alt="Ensalada saludable" className="absolute -right-8 -bottom-8 w-40 h-40 object-cover rounded-full border-4 border-white dark:border-[#2f221d] shadow-lg" />
            </div>
          </div>
        </section>
        
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-4">
            <h3 className="font-bold text-lg text-[#181311] dark:text-white">Favoritos Cercanos</h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-white dark:bg-[#2f221d] shadow-sm flex items-center justify-center text-gray-400 hover:text-[#f46325] transition-colors">
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <button className="w-8 h-8 rounded-full bg-white dark:bg-[#2f221d] shadow-sm flex items-center justify-center text-gray-400 hover:text-[#f46325] transition-colors">
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
          <div className="flex overflow-x-auto no-scrollbar px-4 gap-4 pb-2">
            <Link to="/merchant" className="min-w-[240px] bg-white dark:bg-[#2f221d] rounded-xl shadow-sm overflow-hidden flex flex-col group cursor-pointer">
              <div className="relative h-32 w-full overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCY0FUkmE8zMTjld2rtHmfEEeWzaEZgNU6XYG273w_vp8593RhJUReCax6bjEHddH5RIBE6yPskX7_zIqDJnd7KXQPzGlX3--1kLk1xvI8fbv_YqTDB08xlQOplpW2lJ6Xd2-sTLDznLaahx7EUwqXu9TOxNQzHGNChgi3AmUDJhhA5bMwt8sh0kNbh6uvLVvj3cvqZ3voHBm7cAE8pFVtoUXFZ3skU8DRMdz_SyD4GkkXvuhmc6B3eTHM4OwQFVUB0qezersJ3FQyM')" }}></div>
                <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#f46325] text-[14px] filled">star</span>
                  <span className="text-xs font-bold">4.8</span>
                </div>
                <div className="absolute -bottom-6 left-4">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSTaLQLX46l99qeu5ePmjiNmVtgOjiiANBsRofOcZ1YGt9zcHuvlFrDWqUpmH2O1FM2qDk5b11PNq6K1SEZgMtC8WO9uK1yAsid_TTRTN8kfQCenRkny13lL1Hpxkywe2yloFXPna28neaRFEwjCNYU81faK0KVtP28CTvoqJSoofElyjjyicEsjclee6huvlSuazLyeTSvVWlHa6l_U_0vUnHfNIfd60pVNpSaw6B9pT5a_ACBCV2GKjsdTeeR13vzyuf2iV_Wyju" alt="Logo sushi" className="w-12 h-12 rounded-full border-2 border-white dark:border-[#2f221d] shadow-md object-cover" />
                </div>
              </div>
              <div className="pt-8 pb-4 px-4">
                <h4 className="font-bold text-base mb-1 truncate">Sushi Master</h4>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 30-45 min</span>
                  <span className="flex items-center gap-1 text-[#f46325] font-medium">Envío Gratis</span>
                </div>
              </div>
            </Link>
            <div className="min-w-[240px] bg-white dark:bg-[#2f221d] rounded-xl shadow-sm overflow-hidden flex flex-col group cursor-pointer">
              <div className="relative h-32 w-full overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAo-HVnqS4xoZuz2FBMlok1em1HU4ne5K1qHN1A4nlb1kze4dg6sgKkAyZ0foLTC3A7Anbrlys99qekF0BkVlXpRCLhj8eZjETlayn9VVvi2HqpqBahzb-J4S7U-2snzCa0iQ4y2WDKpOZ4H0hCMySEbjyrh55HcM14cXeBd8TtO7JA_VhN-wsYTfNpuH-u0stHKcv6aE3Bgb8XvEa0_lUOEYtr3E_wOti6eOF-5sTZzfDyUbxTu5NMdVhe4l3PpwjMhkp8G46EuBFq')" }}></div>
                <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#f46325] text-[14px] filled">star</span>
                  <span className="text-xs font-bold">4.5</span>
                </div>
                <div className="absolute -bottom-6 left-4">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvqjDiS6GFRrt4zmB3HqHOiC_o0aytXfSivA7ZhzqWYA-vr4lTovplIwd2AMNEcA2onts1odhCqKgWtK-RmlpBIwwgADg9hcFWlYbbaErmFSivBEENzyD1OlL7pwCxd1EzaF4SGvjtyYgSNgkSCuZcuUNVQ3f0cNWKnwH7u2Iuu3bttdNtDA1DAYlIqqzIUy-n4Q268fyxCmudT4NunoXeEQq9owvWaH3M43vnOHxB468DVzH6RuJSfjt6u1Y47df5kp_8efV-2pl0" alt="Logo hamburguesas" className="w-12 h-12 rounded-full border-2 border-white dark:border-[#2f221d] shadow-md object-cover" />
                </div>
              </div>
              <div className="pt-8 pb-4 px-4">
                <h4 className="font-bold text-base mb-1 truncate">Burger Town</h4>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 15-25 min</span>
                  <span className="flex items-center gap-1">$1.50 Envío</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="flex flex-col gap-4 px-4">
          <h3 className="font-bold text-lg text-[#181311] dark:text-white">Todos los Comercios</h3>
          <div className="w-full bg-white dark:bg-[#2f221d] rounded-2xl p-3 shadow-sm flex gap-4 items-center">
            <div className="w-24 h-24 flex-shrink-0 rounded-xl bg-gray-100 dark:bg-gray-800 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAmYPzPhL2qzpqwtNtm3Mk3rKOug9wpK9hZbWeCGHvast3OZX25XIQd4WcOgrCv1NngShTOaNcdx8ljRH_p37kVNuXrX9UwHJ13-SCjIhIVYsf_HWUohVjhiYpK09-Z3HWG9oWwFbQvlIACbn3wbZWWrOeiS4f-DBvJtc79RTZnOsnpvkKxRAiMFSdJ_L27OeR5RTz0GiGsqVXBf8y0iq1MIWgxVjmleBCgd9YS7txGEjRX2ZhyZ3URnKCkg9Rcax03jnV7vNtpAmle')" }}></div>
            <div className="flex flex-col flex-1 gap-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-base">La Trattoria</h4>
                <div className="flex items-center gap-1 text-[#f46325] text-sm font-bold bg-[#f46325]/10 px-1.5 py-0.5 rounded-md">
                  <span className="material-symbols-outlined text-[14px] filled">star</span> 4.7
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Italiana • Pastas • Pizza</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 40 min</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">local_shipping</span> $3.00</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-white dark:bg-[#2f221d] rounded-2xl p-3 shadow-sm flex gap-4 items-center">
            <div className="w-24 h-24 flex-shrink-0 rounded-xl bg-gray-100 dark:bg-gray-800 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVQAnic0ccusmBtyNZZMbCYA15ssaWy-UyIodx5uis9dYchPqh4nNKclKI5GjExhvL6m7KXp2E_LaT_GPj-LXxjYnbbrZhUIjplpyu_Xo_QisgcdFiH3xtwbzAFV8mS0xs3yDyFL4F7oHKs9uDjkGiEIg385Hn_igTqgqe7Zwi-ggpIQu7GCG3foUThTH4uMI_d7xBYaiCAYDEYKJSGWYDmeLntzK1qeENNgpLz2pToTUmEMzsW0t9Z7_tQe1mXzZ6iatP0V6j369A')" }}></div>
            <div className="flex flex-col flex-1 gap-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-base">Pasta Palace</h4>
                <div className="flex items-center gap-1 text-[#f46325] text-sm font-bold bg-[#f46325]/10 px-1.5 py-0.5 rounded-md">
                  <span className="material-symbols-outlined text-[14px] filled">star</span> 4.9
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Italiana • Gourmet</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 50 min</span>
                <span className="flex items-center gap-1 text-green-600"><span className="material-symbols-outlined text-[16px]">local_shipping</span> Gratis</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <div className="fixed bottom-0 left-0 w-full p-4 z-50">
        <div className="bg-white dark:bg-[#2f221d]/95 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/5 dark:border-white/5 flex justify-between items-center px-6 py-4">
          <button className="flex flex-col items-center gap-1 text-[#f46325]">
            <span className="material-symbols-outlined text-[26px] filled">home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#f46325] transition-colors">
            <span className="material-symbols-outlined text-[26px]">search</span>
          </button>
          <button className="flex flex-col items-center justify-center -mt-10 bg-[#f46325] text-white w-14 h-14 rounded-full shadow-lg shadow-[#f46325]/40 border-4 border-[#f8f6f5] dark:border-[#221510]">
            <span className="material-symbols-outlined text-[28px]">shopping_bag</span>
          </button>
          <Link to="/tracking" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#f46325] transition-colors">
            <span className="material-symbols-outlined text-[26px]">receipt_long</span>
          </Link>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#f46325] transition-colors">
            <span className="material-symbols-outlined text-[26px]">person</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;