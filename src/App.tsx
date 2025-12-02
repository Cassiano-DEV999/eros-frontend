import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import './index.css';

// Pages
import OnboardingScreen from './pages/OnboardingScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import RegisterSupportScreen from './pages/RegisterSupportScreen';
import UserTypeScreen from './pages/UserTypeScreen';
import HomeScreen from './pages/HomeScreen';
import AppointmentScreen from './pages/AppointmentScreen';
import AgendaScreen from './pages/AgendaScreen';
import PaymentScreen from './pages/PaymentScreen';
import TreatmentsScreen from './pages/TreatmentsScreen';
import BemEstarScreen from './pages/BemEstarScreen';
import RelatoriosScreen from './pages/RelatoriosScreen';
import PerfilScreen from './pages/PerfilScreen';
import ConfiguracoesScreen from './pages/ConfiguracoesScreen';
import PrivacidadeScreen from './pages/PrivacidadeScreen';

function App() {
  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem('eros_token');
  };

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<OnboardingScreen />} />
        <Route path="/user-type" element={<UserTypeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/register/support" element={<RegisterSupportScreen />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={isAuthenticated() ? <HomeScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/agendamento"
          element={isAuthenticated() ? <AppointmentScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/agenda"
          element={isAuthenticated() ? <AgendaScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/pagamento"
          element={isAuthenticated() ? <PaymentScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/tratamentos"
          element={isAuthenticated() ? <TreatmentsScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/bem-estar"
          element={isAuthenticated() ? <BemEstarScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/relatorios"
          element={isAuthenticated() ? <RelatoriosScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/perfil"
          element={isAuthenticated() ? <PerfilScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/configuracoes"
          element={isAuthenticated() ? <ConfiguracoesScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/privacidade"
          element={isAuthenticated() ? <PrivacidadeScreen /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
