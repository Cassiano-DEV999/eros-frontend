import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Pages
import OnboardingScreen from './pages/OnboardingScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import HomeScreen from './pages/HomeScreen';
import AppointmentScreen from './pages/AppointmentScreen';
import PaymentScreen from './pages/PaymentScreen';
import TreatmentsScreen from './pages/TreatmentsScreen';

function App() {
  // ⚠️ MODO DE DESENVOLVIMENTO - Autenticação desabilitada
  // Para habilitar autenticação novamente, mude DEV_MODE para false
  const DEV_MODE = true;

  // Check if user is authenticated
  const isAuthenticated = () => {
    if (DEV_MODE) return true; // Sempre autenticado em modo dev
    return !!localStorage.getItem('eros_token');
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<OnboardingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

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
          element={isAuthenticated() ? <AppointmentScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/pagamento"
          element={isAuthenticated() ? <PaymentScreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/tratamentos"
          element={isAuthenticated() ? <TreatmentsScreen /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
