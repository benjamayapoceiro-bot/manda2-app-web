import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { AppProvider, useApp, UserRole } from './context/AppContext';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import MerchantScreen from './screens/MerchantScreen';
import CartScreen from './screens/CartScreen';
import OrderTrackingScreen from './screens/OrderTrackingScreen';
import RiderScreen from './screens/RiderScreen';
import BusinessDashboard from './screens/BusinessDashboard';
import MenuScreen from './screens/MenuScreen';
import NetworkScreen from './screens/NetworkScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import ChatScreen from './screens/ChatScreen';
import LegalScreen from './screens/LegalScreen';
import WalletScreen from './screens/WalletScreen';

// Componente para proteger rutas
const ProtectedRoute: React.FC<{ children: React.ReactNode, roles?: UserRole[] }> = ({ children, roles }) => {
  const { user, loadingAuth } = useApp();

  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f8f6f5] dark:bg-[#221510] text-[#f46325]">
      <span className="material-symbols-outlined animate-spin text-4xl">progress_activity</span>
    </div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (roles && user.role && !roles.includes(user.role)) {
    // Si tiene rol pero no el requerido, redirigir a home o dashboard correspondiente
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

// PWA Install Prompt Component
const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[90] bg-[#18181b] border border-[#f46325] p-4 rounded-xl shadow-2xl flex items-center justify-between animate-bounce-in">
      <div className="flex items-center gap-3">
        <div className="bg-[#f46325] p-2 rounded-lg text-white">
          <span className="material-symbols-outlined">download</span>
        </div>
        <div>
          <p className="text-white font-bold text-sm">Instalar App</p>
          <p className="text-gray-400 text-xs">Acceso rápido y notificaciones</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setShowPrompt(false)} className="text-gray-400 p-2">
          <span className="material-symbols-outlined">close</span>
        </button>
        <button onClick={handleInstall} className="bg-white text-black px-3 py-1.5 rounded-lg text-xs font-bold">
          Instalar
        </button>
      </div>
    </div>
  );
};

// Navigation Wrapper
const NavigationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Force Dark Mode Everywhere
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <>
      {children}
      <InstallPrompt />
      <div className="fixed bottom-4 right-4 z-[100]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#f46325] text-white p-3 rounded-full shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-colors"
        >
          <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[99] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#18181b] border border-white/10 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Menú de Desarrollo</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 text-white hover:text-orange-500">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Link to="/" onClick={() => setIsOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium text-white border border-white/5">1. Bienvenida</Link>
              <Link to="/auth" onClick={() => setIsOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium text-white border border-white/5">2. Autenticación</Link>
              <Link to="/home" onClick={() => setIsOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium text-white border border-white/5">3. Home / Explorar</Link>
              <Link to="/merchant" onClick={() => setIsOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium text-white border border-white/5">4. Comercio (Cliente)</Link>
              <Link to="/cart" onClick={() => setIsOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium text-white border border-white/5">5. Carrito</Link>
              <Link to="/tracking" onClick={() => setIsOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium text-white border border-white/5">6. Tracking Pedido</Link>
              <Link to="/business" onClick={() => setIsOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium text-white border border-white/5">7. Panel Comercio</Link>
              <Link to="/wallet/merchant" onClick={() => setIsOpen(false)} className="p-3 bg-[#f46325]/20 hover:bg-[#f46325]/30 text-[#f46325] rounded-lg font-bold border border-[#f46325]/30">7b. Billetera Comercio</Link>
              <Link to="/menu" onClick={() => setIsOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium text-white border border-white/5">8. Gestión Menú</Link>
              <Link to="/rider" onClick={() => setIsOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium text-white border border-white/5">9. App Repartidor</Link>
              <Link to="/wallet/rider" onClick={() => setIsOpen(false)} className="p-3 bg-[#f46325]/20 hover:bg-[#f46325]/30 text-[#f46325] rounded-lg font-bold border border-[#f46325]/30">9b. Billetera Rider</Link>
              <Link to="/admin" onClick={() => setIsOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium text-white border border-white/5">10. Panel Admin</Link>
              <Link to="/network" onClick={() => setIsOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-lg font-medium text-white border border-white/5">11. Red (Lista Riders)</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <NavigationWrapper>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/auth" element={<AuthScreen />} />

            {/* Rutas Públicas / Cliente */}
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/merchant" element={<MerchantScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/tracking" element={<ProtectedRoute><OrderTrackingScreen /></ProtectedRoute>} />
            <Route path="/chat/:id" element={<ProtectedRoute><ChatScreen /></ProtectedRoute>} />
            <Route path="/legal/:docId" element={<LegalScreen />} />

            {/* Rutas Repartidor */}
            <Route path="/rider" element={<ProtectedRoute roles={['rider', 'admin']}><RiderScreen /></ProtectedRoute>} />
            <Route path="/wallet/rider" element={<ProtectedRoute roles={['rider', 'admin']}><WalletScreen /></ProtectedRoute>} />

            {/* Rutas Comercio */}
            <Route path="/business" element={<ProtectedRoute roles={['merchant', 'admin']}><BusinessDashboard /></ProtectedRoute>} />
            <Route path="/menu" element={<ProtectedRoute roles={['merchant', 'admin']}><MenuScreen /></ProtectedRoute>} />
            <Route path="/wallet/merchant" element={<ProtectedRoute roles={['merchant', 'admin']}><WalletScreen /></ProtectedRoute>} />

            {/* Rutas Admin */}
            <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboardScreen /></ProtectedRoute>} />
            <Route path="/network" element={<ProtectedRoute roles={['admin']}><NetworkScreen /></ProtectedRoute>} />
          </Routes>
        </NavigationWrapper>
      </HashRouter>
    </AppProvider>
  );
};

export default App;