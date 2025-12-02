import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function OnboardingScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/user-type');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-secondary to-primary flex flex-col items-center justify-center px-6">
      {/* Logo EROS */}
      <div className="mb-16 text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Silhueta de gestante estilizada */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 40C110 40 120 48 120 60C120 72 110 80 100 80C90 80 80 72 80 60C80 48 90 40 100 40ZM70 90C70 85 73 82 78 82H122C127 82 130 85 130 90L135 140C135 145 140 155 140 160C140 175 128 185 115 185C110 185 105 183 100 180C95 183 90 185 85 185C72 185 60 175 60 160C60 155 65 145 65 140L70 90Z"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-5xl font-bold text-white tracking-wider">EROS</h1>
      </div>

      {/* Descrição */}
      <div className="w-full max-w-md">

        <div className="text-center text-white/90 mb-6">
          <p className="text-lg mb-2">
            Seu companheiro de cuidados durante a gestação
          </p>
          <ul className="text-sm space-y-2">
            <li>✨ Agende consultas com especialistas</li>
            <li>💊 Controle medicamentos e suplementos</li>
            <li>👥 Compartilhe com sua rede de apoio</li>
            <li>📊 Acompanhe todo o histórico</li>
          </ul>
        </div>

        {/* Botões de ação */}
        <div className="space-y-3">
          <Button
            className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
            size="lg"
            onClick={handleStart}
          >
            Começar
          </Button>

          <Button
            variant="outline"
            className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
            onClick={() => navigate('/login')}
          >
            Já tenho uma conta
          </Button>
        </div>
      </div>
    </div>
  );
}
