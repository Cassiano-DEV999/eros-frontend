import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users } from 'lucide-react';

export default function UserTypeScreen() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<'PREGNANT' | 'SUPPORT_NETWORK' | null>(null);

  const handleContinue = () => {
    if (selectedType === 'PREGNANT') {
      navigate('/register', { state: { userType: 'PREGNANT' } });
    } else if (selectedType === 'SUPPORT_NETWORK') {
      navigate('/register/support', { state: { userType: 'SUPPORT_NETWORK' } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bem-vinda ao EROS</h1>
          <p className="text-gray-600">Como você gostaria de usar a plataforma?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Opção Gestante */}
          <Card
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedType === 'PREGNANT'
                ? 'ring-2 ring-pink-500 shadow-lg'
                : 'hover:border-pink-200'
            }`}
            onClick={() => setSelectedType('PREGNANT')}
          >
            <CardHeader>
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-8 h-8 text-pink-500" />
              </div>
              <CardTitle className="text-center">Sou Gestante</CardTitle>
              <CardDescription className="text-center">
                Gerencie suas consultas, medicamentos e acompanhe sua jornada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2" />
                  Agende consultas com especialistas
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2" />
                  Controle medicamentos e suplementos
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2" />
                  Compartilhe com sua rede de apoio
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2" />
                  Receba código para compartilhar
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Opção Rede de Apoio */}
          <Card
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedType === 'SUPPORT_NETWORK'
                ? 'ring-2 ring-purple-500 shadow-lg'
                : 'hover:border-purple-200'
            }`}
            onClick={() => setSelectedType('SUPPORT_NETWORK')}
          >
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <CardTitle className="text-center">Sou da Rede de Apoio</CardTitle>
              <CardDescription className="text-center">
                Acompanhe e ajude uma gestante especial em sua vida
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                  Acompanhe consultas e tratamentos
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                  Ajude com lembretes de medicamentos
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                  Veja histórico de pagamentos
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                  Insira código da gestante para vincular
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            size="lg"
            className="w-full md:w-auto px-12"
            disabled={!selectedType}
            onClick={handleContinue}
          >
            Continuar
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigate('/login')}
            className="text-gray-600"
          >
            Já tenho uma conta
          </Button>
        </div>
      </div>
    </div>
  );
}
