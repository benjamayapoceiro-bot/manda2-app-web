import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AuthScreen: React.FC = () => {
  const { login, register, loginWithGoogle, loadingAuth } = useApp();
  const navigate = useNavigate();

  const [authType, setAuthType] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/home');
    } catch (err: any) {
      console.error(err);
      setError('Error al iniciar con Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (authType === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate('/home');
    } catch (err: any) {
      console.error(err);
      // Mensajes de error amigables
      if (err.code === 'auth/invalid-credential') setError('Correo o contraseña incorrectos.');
      else if (err.code === 'auth/email-already-in-use') setError('Este correo ya está registrado.');
      else if (err.code === 'auth/weak-password') setError('La contraseña debe tener al menos 6 caracteres.');
      else setError('Ocurrió un error. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-display bg-[#f8f6f5] dark:bg-[#221510] text-[#181311] dark:text-white transition-colors duration-200 min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden items-center justify-center p-4 sm:p-6">
        <div className="flex flex-col items-center w-full max-w-md pb-6 pt-4">
          <div className="h-20 w-20 bg-[#f46325]/10 dark:bg-[#f46325]/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-[#f46325]/5 dark:ring-[#f46325]/10">
            <span className="material-symbols-outlined text-[#f46325] text-[40px]">rocket_launch</span>
          </div>
          <h1 className="text-[#181311] dark:text-white tracking-tight text-[32px] font-extrabold leading-tight text-center">
            Manda<span className="text-[#f46325]">2</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal text-center mt-1">
            Tu mundo, a domicilio
          </p>
        </div>

        <div className="w-full max-w-[400px] flex flex-col gap-5">
          <div className="flex p-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full shadow-sm">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="auth_type"
                value="login"
                checked={authType === 'login'}
                onChange={() => setAuthType('login')}
                className="peer sr-only"
              />
              <div className="flex items-center justify-center py-2.5 px-4 rounded-full text-sm font-bold text-gray-500 dark:text-gray-400 transition-all peer-checked:bg-[#f46325] peer-checked:text-white peer-checked:shadow-md">
                Entrar
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="auth_type"
                value="register"
                checked={authType === 'register'}
                onChange={() => setAuthType('register')}
                className="peer sr-only"
              />
              <div className="flex items-center justify-center py-2.5 px-4 rounded-full text-sm font-bold text-gray-500 dark:text-gray-400 transition-all peer-checked:bg-[#f46325] peer-checked:text-white peer-checked:shadow-md">
                Crear cuenta
              </div>
            </label>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <div className="group relative">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 ml-4 mb-1 uppercase tracking-wide">Correo electrónico</label>
              <div className="flex items-center bg-white dark:bg-white/5 rounded-[20px] border border-gray-200 dark:border-white/10 focus-within:border-[#f46325]/50 focus-within:ring-4 focus-within:ring-[#f46325]/10 transition-all overflow-hidden h-14">
                <div className="pl-4 pr-2 text-gray-400 dark:text-gray-500">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-transparent border-none text-[#181311] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-0 text-base font-medium h-full"
                />
              </div>
            </div>

            <div className="group relative">
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 ml-4 mb-1 uppercase tracking-wide">Contraseña</label>
              <div className="flex items-center bg-white dark:bg-white/5 rounded-[20px] border border-gray-200 dark:border-white/10 focus-within:border-[#f46325]/50 focus-within:ring-4 focus-within:ring-[#f46325]/10 transition-all overflow-hidden h-14">
                <div className="pl-4 pr-2 text-gray-400 dark:text-gray-500">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-transparent border-none text-[#181311] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:ring-0 text-base font-medium h-full"
                />
                <button type="button" className="pr-4 pl-2 text-[#f46325] focus:outline-none hover:text-[#d64b12] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium text-center">
                {error}
              </div>
            )}

            <div className="flex justify-end px-2">
              <a href="#" className="text-sm font-semibold text-[#f46325] hover:text-[#d64b12] transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f46325] hover:bg-[#d64b12] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg h-14 rounded-full shadow-lg shadow-[#f46325]/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
              ) : (
                <>
                  <span>{authType === 'login' ? 'Entrar' : 'Registrarse'}</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#f8f6f5] dark:bg-[#221510] px-4 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">O regístrate con</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button onClick={handleGoogleLogin} type="button" className="flex items-center justify-center h-12 rounded-[20px] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHKF6Seo4mXlrweEea4YarqLyoSwb2XThsfypfm9fb9RPhs3HW61v8TDCi1BmCJQmGOpY4jn9wcDjWwfcvHWB5LfmROm3_VnXgvK0AmTw65RNGjX5c4rnPbjFdqTt3TFyvE2xXXU3kuqynhJg8dNGXyw3qB6yTpXu0gaSV2wZgFWVNDj03rmDZPN9CDoEJkFtqrqbGV2jyPi7IadZXoIiV0pCoTOhvHzzde2Fc1NuIwn7Mx-HOSRlM8qLJb9HSogOv6PW7SkVSsA_G" alt="Google" className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center h-12 rounded-[20px] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-[24px] text-black dark:text-white">ios</span>
            </button>
            <button className="flex items-center justify-center h-12 rounded-[20px] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIaTiWzT8w7b70K0LAHztf6-8xog1JDxp2KJ1ZhVZoXf5QsoHUXeVRjVIQiBkwNmwNjm2XyeC00zHRSat1EXJ-Cduy3d91yMTcST-t2BMLa2mX4OTTEY-FtI4XkLa9z7zeh-TWbNug9wb-_jtkc2LYMzzeDeHizgL5BZe1mNlQEUY507jNRPS9raCOqI3hzmJCCL2VhW_Cy58QNww2KjFhVfTDu7bS3Xbxm5TbTk_VuSE8ZplGqXGO8WQE2L11oKXQ62RWV9lJg06X" alt="Facebook" className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 text-center space-y-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed px-4">
              Al continuar, aceptas nuestros
              <Link to="/legal/terms" className="text-[#181311] dark:text-white font-semibold underline decoration-[#f46325]/50 underline-offset-2 ml-1">Términos de Servicio</Link> y
              <Link to="/legal/terms" className="text-[#181311] dark:text-white font-semibold underline decoration-[#f46325]/50 underline-offset-2 ml-1">Política de Privacidad</Link>.
            </p>
            <div className="pt-2">
              <Link to="/rider" className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#f46325]/10 text-[#f46325] text-sm font-bold hover:bg-[#f46325]/20 transition-colors">
                <span className="material-symbols-outlined text-[18px] mr-2">two_wheeler</span>
                Quiero ser repartidor
              </Link>
            </div>
          </div>
        </div>
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default AuthScreen;