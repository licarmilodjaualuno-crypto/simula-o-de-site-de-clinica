import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import AppLayout from '@/components/layout/AppLayout';
import Home from '@/pages/Home';
import LinhaDoTempo from '@/pages/LinhaDoTempo';
import EraDetalhe from '@/pages/EraDetalhe';
import EventoDetalhe from '@/pages/EventoDetalhe';
import Temas from '@/pages/Temas';
import TemaDetalhe from '@/pages/TemaDetalhe';
import Questionarios from '@/pages/Questionarios';
import Questionario from '@/pages/Questionario';
import Etnias from '@/pages/Etnias';
import EtniaDetalhe from '@/pages/EtniaDetalhe';
import Monumentos from '@/pages/Monumentos';
import MonumentoDetalhe from '@/pages/MonumentoDetalhe';
import Animais from '@/pages/Animais';
import GrupoAnimais from '@/pages/GrupoAnimais';
import AnimalDetalhe from '@/pages/AnimalDetalhe';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  if (isLoadingPublicSettings || isLoadingAuth) {
    return <div className="fixed inset-0 flex items-center justify-center"><div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div></div>;
  }
  if (authError) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    if (authError.type === 'auth_required') { navigateToLogin(); return null; }
  }
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} /><Route path="/linha-do-tempo" element={<LinhaDoTempo />} /><Route path="/era/:id" element={<EraDetalhe />} /><Route path="/evento/:id" element={<EventoDetalhe />} /><Route path="/temas" element={<Temas />} /><Route path="/tema/:id" element={<TemaDetalhe />} /><Route path="/questionarios" element={<Questionarios />} /><Route path="/questionario/:categoria" element={<Questionario />} /><Route path="/etnias" element={<Etnias />} /><Route path="/etnia/:id" element={<EtniaDetalhe />} /><Route path="/monumentos" element={<Monumentos />} /><Route path="/monumento/:id" element={<MonumentoDetalhe />} /><Route path="/animais" element={<Animais />} /><Route path="/animais/:slug" element={<GrupoAnimais />} /><Route path="/animal/:id" element={<AnimalDetalhe />} />
      </Route>
      <Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} /><Route path="/forgot-password" element={<ForgotPassword />} /><Route path="/reset-password" element={<ResetPassword />} /><Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
function App() { return <AuthProvider><QueryClientProvider client={queryClientInstance}><Router basename={import.meta.env.BASE_URL}><ScrollToTop /><AuthenticatedApp /></Router><Toaster /></QueryClientProvider></AuthProvider> }
export default App