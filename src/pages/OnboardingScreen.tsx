import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Baby, Users } from 'lucide-react';

export default function OnboardingScreen() {
  const navigate = useNavigate();

  const handleUserTypeSelect = (role: 'gestante' | 'rede_apoio') => {
    localStorage.setItem('eros_user_role', role);
    navigate('/login');
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

      {/* Seleção de tipo de usuário */}
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold text-white text-center mb-3">
          Quem usará o EROS?
        </h2>
        <p className="text-white/90 text-center text-sm mb-8">
          Escolha seu perfil para começar
        </p>

        <div className="space-y-4">
          {/* Gestante */}
          <Card
            className="cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => handleUserTypeSelect('gestante')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <Baby className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Gestante</h3>
                  <p className="text-sm text-muted-foreground">
                    Acompanhe sua gestação
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rede de Apoio */}
          <Card
            className="cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => handleUserTypeSelect('rede_apoio')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Rede de Apoio</h3>
                  <p className="text-sm text-muted-foreground">
                    (do Gestante)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botão de prosseguir (alternativo) */}
        <Button
          variant="outline"
          className="w-full mt-8 bg-white/10 border-white/30 text-white hover:bg-white/20"
          onClick={() => navigate('/login')}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
