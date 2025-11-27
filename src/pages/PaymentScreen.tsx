import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Heart, CreditCard, Smartphone } from 'lucide-react';

export default function PaymentScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor, date, time } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'credit_card' | null>(null);
  const [loading, setLoading] = useState(false);

  const amount = 40.0; // Valor fixo do exemplo

  const handlePayment = async () => {
    if (!selectedMethod) return;

    setLoading(true);
    try {
      // Aqui você faria a chamada real para criar o pagamento
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulação
      navigate('/pagamento-sucesso');
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Pagamento</h1>
        </div>
      </div>

      {/* Resumo da consulta */}
      <div className="p-6">
        <Card className="bg-gradient-to-br from-pink-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
            <h2 className="text-center text-xl font-semibold mb-2">
              Consulta de Pré-Natal
            </h2>
            {doctor && (
              <div className="text-center space-y-1">
                <p className="text-white/90 text-sm">Resumo do pedido</p>
                <p className="text-white/90 text-sm">
                  Serviço: Consulta de Pré-Natal com {doctor.name}
                </p>
                <p className="text-white/90 text-sm">
                  Data: {date} às {time}
                </p>
                <p className="text-2xl font-bold mt-3">R$ {amount.toFixed(2)}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Seleção de método de pagamento */}
      <div className="flex-1 px-6 overflow-y-auto">
        <h2 className="font-semibold mb-4">Selecione a forma de pagamento</h2>

        <div className="space-y-3">
          {/* PIX */}
          <Card
            className={`cursor-pointer transition-all ${selectedMethod === 'pix'
              ? 'ring-2 ring-primary bg-primary/5'
              : 'hover:bg-muted/50'
              }`}
            onClick={() => setSelectedMethod('pix')}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">PIX</h3>
                  <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'pix'
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground'
                    }`}
                >
                  {selectedMethod === 'pix' && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cartão de Crédito */}
          <Card
            className={`cursor-pointer transition-all ${selectedMethod === 'credit_card'
              ? 'ring-2 ring-primary bg-primary/5'
              : 'hover:bg-muted/50'
              }`}
            onClick={() => setSelectedMethod('credit_card')}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Cartão de Crédito</h3>
                  <p className="text-sm text-muted-foreground">Visa, Master, Elo...</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'credit_card'
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground'
                    }`}
                >
                  {selectedMethod === 'credit_card' && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Formulário de cartão (se selecionado) */}
        {selectedMethod === 'credit_card' && (
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="cardNumber">Número do cartão</Label>
              <Input
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                className="focus-visible:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Validade</Label>
                <Input
                  id="expiry"
                  placeholder="MM/AA"
                  className="focus-visible:ring-primary"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="000"
                  type="password"
                  maxLength={3}
                  className="focus-visible:ring-primary"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botão de confirmação */}
      <div className="p-6 border-t bg-white space-y-3">
        <Button
          className="w-full bg-gradient-to-r from-primary to-secondary text-white"
          disabled={!selectedMethod || loading}
          onClick={handlePayment}
        >
          {loading ? 'Processando...' : 'Confirmar pagamento'}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate('/home')}
        >
          Voltar ao início
        </Button>
      </div>
    </div>
  );
}
