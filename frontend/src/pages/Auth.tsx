import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Detectar si viene con parámetro de registro
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('mode') === 'register') {
      setIsLogin(false);
    }
  }, [location]);
  const [apiError, setApiError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Detectar si viene con parámetro de registro
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('mode') === 'register') {
      setIsLogin(false);
    }
  }, [location]);

  // Estados para Login
  const [loginData, setLoginData] = useState<LoginForm>({
    email: '',
    password: ''
  });
  const [loginErrors, setLoginErrors] = useState<Partial<LoginForm>>({});

  // Estados para Register
  const [registerData, setRegisterData] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [registerErrors, setRegisterErrors] = useState<Partial<RegisterForm>>({});

  const validateLoginForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {};

    if (!loginData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!loginData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (loginData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setLoginErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = (): boolean => {
    const newErrors: Partial<RegisterForm> = {};

    if (!registerData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (registerData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!registerData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!registerData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (registerData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(registerData.password)) {
      newErrors.password = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
    }

    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setRegisterErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) {
      return;
    }

    setIsLoading(true);
    setApiError('');
    setSuccessMessage('');

    try {
      await login(loginData.email, loginData.password);
      setSuccessMessage('¡Inicio de sesión exitoso!');

      // Redirigir a / después de un breve delay
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error: any) {
      setApiError(error.message || 'Error al iniciar sesión');
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRegisterForm()) {
      return;
    }

    setIsLoading(true);
    setApiError('');
    setSuccessMessage('');

    try {
      await register(registerData.name, registerData.email, registerData.password);
      setSuccessMessage('¡Registro exitoso! Redirigiendo...');

      // Redirigir a / después de un breve delay
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error: any) {
      setApiError(error.message || 'Error al registrarse');
      setIsLoading(false);
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (loginErrors[name as keyof LoginForm]) {
      setLoginErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (registerErrors[name as keyof RegisterForm]) {
      setRegisterErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    // Limpiar errores al cambiar de modo
    setLoginErrors({});
    setRegisterErrors({});
    setApiError('');
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 "
      style={{backgroundColor:'linear-gradient(135deg, #D1BA7B, #A89663, #7F724B)',}}>
      <div className="max-w-md w-full space-y-8 rounded-xl p-8 shadow-2xl"
        style={{
          backgroundColor: "#7F724B",
          backdropFilter: "blur(8px)",
          border: "1px solid #A89663",
        }}>
        <div>

          <h2 className="mt-6 text-center text-3xl font-extrabold" style= {{color:"#F5DA91"}}>
            {isLogin ? 'Iniciar Sesión' : 'Crear cuenta'}
          </h2>
          <p className="mt-2 text-center text-sm" style = {{color:"#D1BA7B"}}>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
            <button
              onClick={switchMode}
              className="font-medium transition-colors rounded"
              style={{color:"#52442D"}}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor= "#F5DA91")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor= "transparent")}
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
            </button>
          </p>
        </div>

        {/* Mensajes de error y éxito */}
        {apiError && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{apiError}</p>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="rounded-md bg-green-50 p-4 border border-green-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {isLogin ? (
          // Formulario de Login
          <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
            <div className="rounded-md shadow-sm space-y-px">
              <div>
                <label htmlFor="login-email" className="sr-only">
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={"w-full px-3 py-2 my-2 rounded-md focus:outline-none focus:ring-2 sm:text-sm placeholder-red-900"}
                  style={{
                    backgroundColor:"#F5DA91",
                    color:"#574D33",
                    borderColor:"#52442D",
                    border: `1px solid ${loginErrors.email ?"#ff6b6b": "#b9929f" }`,
                  }}
                  placeholder="Dirección de email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                />
                {loginErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{loginErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="login-password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={"w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 sm:text-sm placeholder-red-900"}
                  style={{
                    backgroundColor:"#F5DA91",
                    color:"#574D33",
                    borderColor:"#52442D",
                    border: `1px solid ${loginErrors.email ?"#ff6b6b": "#b9929f" }`,
                  }}
                  placeholder="Contraseña"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
                {loginErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{loginErrors.password}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm" style={{color:"#D1BA7B"}}>
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <button type="button" className="font-medium transition-colors rounded"  
                style={{color:"#F5DA91"}}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor= "#A89663")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor= "transparent")}>
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border transition-colors rounded-md"
                style={{color:"#574D33" , backgroundColor:"#F5DA91", borderColor:"#52442D"}}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor= "#D1BA7B")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor= "#F5DA91")}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </div>
          </form>
        ) : (
          // Formulario de Registro
          <form className="mt-8 space-y-6" onSubmit={handleRegisterSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="register-name" className="block text-sm font-medium" style={{color:"#b9929f"}}>
                  Nombre completo
                </label>
                <input
                  id="register-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className={"w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 sm:text-sm placeholder-red-900"}
                  style={{
                    backgroundColor:"#F5DA91",
                    color:"#574D33",
                    borderColor:"#52442D",
                    border: `1px solid ${registerErrors.name ?"#ff6b6b": "#b9929f" }`,
                  }}
                  placeholder="Tu nombre completo"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                />
                {registerErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{registerErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="register-email" className="block text-sm font-medium" style={{color:"#b9929f"}}>
                  Dirección de email
                </label>
                <input
                  id="register-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={"w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 sm:text-sm placeholder-red-900"}
                  style={{
                    backgroundColor:"#F5DA91",
                    color:"#574D33",
                    borderColor:"#52442D",
                    border: `1px solid ${registerErrors.email ?"#ff6b6b": "#b9929f" }`,
                  }}
                  placeholder="tu@email.com"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                />
                {registerErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{registerErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="register-password" className="block text-sm font-medium" style={{color:"#b9929f"}}>
                  Contraseña
                </label>
                <input
                  id="register-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={"w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 sm:text-sm placeholder-red-900"}
                  style={{
                    backgroundColor:"#F5DA91",
                    color:"#574D33",
                    borderColor:"#52442D",
                    border: `1px solid ${registerErrors.password ?"#ff6b6b": "#b9929f" }`,
                  }}
                  placeholder="Mínimo 6 caracteres"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                />
                {registerErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{registerErrors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="register-confirmPassword" className="block text-sm font-medium" style={{color:"#b9929f"}}>
                  Confirmar contraseña
                </label>
                <input
                  id="register-confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={"w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 sm:text-sm placeholder-red-900"}
                  style={{
                    backgroundColor:"#F5DA91",
                    color:"#574D33",
                    borderColor:"#52442D",
                    border: `1px solid ${registerErrors.confirmPassword ?"#ff6b6b": "#b9929f" }`,
                  }}
                  placeholder="Repite tu contraseña"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                />
                {registerErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{registerErrors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm" style={{color:"#f5da91"}}>
                Acepto los{' '}
                <button type="button" className="transition-colors" style={{color:"#D1BA7B"}}
                onMouseEnter={(e) => (e.currentTarget.style.color= "#D1BA7B")}
                onMouseLeave={(e) => (e.currentTarget.style.color= "#52442D")}
                >
                  términos y condiciones
                </button>{' '}
                y la{' '}
                <button type="button" className="transition-colors" style={{color:"#D1BA7B"}}
                onMouseEnter={(e) => (e.currentTarget.style.color= "#D1BA7B")}
                onMouseLeave={(e) => (e.currentTarget.style.color= "#52442D")}
                >
                  política de privacidad
                </button>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{color:"#52442D" , backgroundColor:"#F5DA91", borderColor:"#52442D",}}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor= "#D1BA7B")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor= "#F5DA91")}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creando cuenta...
                  </div>
                ) : (
                  'Crear cuenta'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
