import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  return (
    <div className="bg-[#f8f6f5] dark:bg-[#221510] font-display text-[#181311] dark:text-[#ececec] min-h-screen transition-colors duration-200">
      <div className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden max-w-md mx-auto shadow-2xl bg-white dark:bg-[#1a120f]">
        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[60%] rounded-full bg-[#f46325]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[40%] rounded-full bg-orange-200/20 dark:bg-orange-900/10 blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col h-full z-10 p-6 pt-12 flex-grow">
          <div className="flex-grow flex flex-col items-center justify-center gap-8 mt-10">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#f46325]/20 rounded-full animate-pulse"></div>
              <div className="relative w-40 h-40 bg-white dark:bg-[#2d1e17] rounded-full shadow-lg flex items-center justify-center overflow-hidden border-4 border-white dark:border-[#2d1e17]">
                <div className="text-[#f46325] text-6xl">
                  <span className="material-symbols-outlined !text-[80px]">rocket_launch</span>
                </div>
              </div>
              <div className="absolute -right-2 -bottom-2 bg-[#f46325] text-white p-3 rounded-full shadow-lg border-4 border-white dark:border-[#2d1e17]">
                <span className="material-symbols-outlined text-xl">electric_moped</span>
              </div>
            </div>
            <div className="text-center space-y-2 max-w-xs">
              <h1 className="text-[#181311] dark:text-[#ececec] tracking-tight text-4xl font-extrabold leading-tight">Manda2</h1>
              <p className="text-[#888280] dark:text-[#a8a2a0] text-lg font-medium leading-snug">
                Lo que pidas, a donde vayas.<br/>
                <span className="text-[#f46325] font-semibold">Tus favoritos en minutos.</span>
              </p>
            </div>
          </div>
          
          <div className="w-full h-40 rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-[#2d1e17] dark:to-[#221510] flex items-center justify-center relative overflow-hidden mb-8 shadow-inner border border-white/50 dark:border-white/5">
            <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')] bg-cover bg-center"></div>
            <div className="relative z-10 bg-white dark:bg-[#382821] p-4 rounded-2xl shadow-lg flex items-center gap-3 transform -rotate-2 scale-90">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <div>
                <div className="text-xs text-[#888280] dark:text-[#a8a2a0] font-medium">Estado del pedido</div>
                <div className="text-sm font-bold text-[#181311] dark:text-[#ececec]">¡Entregado con éxito!</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 w-full pb-8">
            <Link to="/auth" className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-6 bg-[#f46325] hover:bg-[#d64e15] transition-all shadow-lg hover:shadow-[#f46325]/30 active:scale-[0.98]">
              <span className="material-symbols-outlined absolute left-6 text-white/80 group-hover:text-white transition-colors">person_add</span>
              <span className="truncate text-white text-lg font-bold tracking-wide">Registrarme</span>
            </Link>
            <Link to="/auth" className="group flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-6 bg-gray-100 dark:bg-[#2d1e17] border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all active:scale-[0.98]">
              <span className="truncate text-[#181311] dark:text-[#ececec] text-lg font-bold tracking-wide group-hover:text-[#f46325] transition-colors">Iniciar sesión</span>
            </Link>
            
            <div className="flex items-center justify-center gap-4 mt-2">
              <button aria-label="Iniciar sesión con Apple" className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1e17] flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5 fill-current text-black dark:text-white" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.29-.93 3.93-.93.62 0 1.88.2 2.58.75-.92.77-2.18 2.37-1.22 4.72 1.95 4.3 1.55 5.57-.37 7.69zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.16 2.29-1.66 4.38-3.74 4.25z"></path></svg>
              </button>
              <button aria-label="Iniciar sesión con Google" className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1e17] flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
              </button>
            </div>
          </div>
          
          <div className="text-center pb-4 px-6">
            <p className="text-xs text-[#888280] dark:text-[#a8a2a0] leading-relaxed">
              Al continuar, aceptas nuestros 
              <Link to="/legal/terms" className="font-bold hover:underline hover:text-[#f46325] transition-colors ml-1">Términos de Servicio</Link> y 
              <Link to="/legal/terms" className="font-bold hover:underline hover:text-[#f46325] transition-colors ml-1">Política de Privacidad</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;