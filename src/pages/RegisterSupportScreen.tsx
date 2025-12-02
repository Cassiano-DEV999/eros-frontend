import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { authApi } from '@/services/api';
import { ArrowLeft, Users } from 'lucide-react';

export default function RegisterSupportScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'SUPPORT_NETWORK';
  
  const [step, setStep] = useState<'code' | 'form'>('code');
  const [shareCode, setShareCode] = useState('');
  const [relationship, setRelationship] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const relationships = [
    'Mãe',
    'Pai',
    'Companheiro(a)',
    'Irmã',
    'Irmão',
    'Amiga',
    'Amigo',
    'Avó',
    'Avô',
    'Tia',
    'Tio',
    'Outro',
  ];

  const handleCodeNext = () => {
    if (!shareCode) {
      setError('Insira o código da gestante');
      return;
    }
    if (!relationship) {
      setError('Selecione sua relação com a gestante');
      return;
    }
    setError('');
    setStep('form');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.register({
        name,
        email,
        password,
        phone: phone || undefined,
        userType,
        shareCode,
        relationship,
      });
      
      localStorage.setItem('eros_token', response.token);
      localStorage.setItem('eros_user', JSON.stringify(response.user));
      
      // Redirecionar e recarregar para garantir que o estado seja atualizado
      window.location.href = '/home';
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Erro ao cadastrar';
      setError(errorMsg);
      
      // Se o código for inválido, volta para a tela de código
      if (errorMsg.includes('Código') || errorMsg.includes('código')) {
        setStep('code');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => step === 'form' ? setStep('code') : navigate('/user-type')}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <CardTitle className="text-2xl text-center">
                {step === 'code' ? 'Vincular com Gestante' : 'Seus Dados'}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                {step === 'code' 
                  ? 'Insira o código fornecido pela gestante'
                  : 'Complete seu cadastro para começar'
                }
              </p>
            </CardHeader>
            <CardContent>
              {step === 'code' ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shareCode">Código de Vinculação</Label>
                    <Input
                      id="shareCode"
                      type="text"
                      placeholder="XXXX-XXXX"
                      value={shareCode}
                      onChange={(e) => setShareCode(e.target.value.toUpperCase())}
                      required
                      maxLength={9}
                      className="focus-visible:ring-primary text-center text-lg tracking-widest"
                    />
                    <p className="text-xs text-muted-foreground">
                      Digite o código que a gestante compartilhou com você
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relationship">Sua Relação</Label>
                    <Select value={relationship} onValueChange={setRelationship}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione sua relação" />
                      </SelectTrigger>
                      <SelectContent>
                        {relationships.map((rel) => (
                          <SelectItem key={rel} value={rel}>
                            {rel}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <Button
                    onClick={handleCodeNext}
                    className="w-full"
                  >
                    Continuar
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.email@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone (opcional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha (mínimo 6 caracteres)</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirme sua senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="focus-visible:ring-primary"
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
                  </Button>
                </form>
              )}

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-sm text-primary hover:underline"
                >
                  Já tem conta? Faça login
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
