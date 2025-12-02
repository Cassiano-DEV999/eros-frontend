import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowLeft, Heart, CreditCard, Smartphone, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { appointmentsApi } from '@/services/api';

export default function PaymentScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor, date, time } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'credit_card' | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPixDialog, setShowPixDialog] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const amount = 150.0; // Valor da consulta
  const pixCode = '00020126360014BR.GOV.BCB.PIX0114+55119888877770204000053039865802BR5925EROS SAUDE MATERNA LTDA6009SAO PAULO62070503***6304A1B2';
  
  // QR Code fictício gerado para demonstração
  const pixQrCode = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOSAyOSI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTEgMWg3djdoLTd6TTkgMWgxdjFoLTF6TTExIDFoMnYxaC0yem0zIDBoMXYxaC0xem0yIDBoMXYyaC0ydi0xaDF6bTIgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bS03IDFoMXYxaC0xem0yIDBoMXYxaC0xem0zIDBoMXYxaC0xem0xIDBoMXYxaC0xem0tMTAgMWgxdjFoLTF6bTIgMGgxdjFoLTF6bTQgMGgydjFoLTJ6bTMgMGgxdjFoLTF6bTIgMGgxdjJoLTF6bS0xNiAxaDJ2MWgtMnptNSAwaDJ2MWgtMnptMyAwaDJ2MWgtMnptMyAwaDJ2MWgtMnptNC0xaDF2MWgtMXptMSAxaDF2MWgtMXptLTEwIDBoMXYxaC0xem0yIDBoMXYxaC0xem0yIDBoMXYxaC0xem00IDBoMXYxaC0xem0xIDBoMXYxaC0xem0tMTUgMWgxdjFoLTF6bTMgMGgxdjFoLTF6bTUgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTItMWgxdjFoLTF6bS0xNyAxaDF2MWgtMXptMSAwaDN2MWgtM3ptNSAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptLTIwIDFoN3Y3aC03em0xMSAwaDJ2MWgtMnptMyAwaDJ2MWgtMnptNSAwaDd2N2gtN3ptLTI1IDFoMXYxaC0xem0yIDBoMXYzaC0xem0yIDBoMXYxaC0xem0xMSAwaDJ2MWgtMnptMTAgMGgxdjFoLTF6bTIgMGgxdjNoLTF6bTIgMGgxdjFoLTF6bS0yNyAxaDF2MWgtMXptMiAwaDJ2MWgtMnptMTQgMGgxdjFoLTF6bTEwIDBoMnYxaC0yem0tMjUgMWgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTEwIDBoMXYxaC0xem0yIDBoMXYxaC0xem0xIDBoMXYxaC0xem0xIDBoMXYxaC0xem0xIDBoMXYxaC0xem0yIDBoMXYxaC0xem0yIDBoMXYxaC0xem0tMjYgMWgxdjFoLTF6bTIgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bS0yNSAxaDJ2MWgtMnptMyAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptLTI1IDFoMXYxaC0xem0xIDBoMXYyaC0xem0yLTFoMXYxaC0xem0yIDBoMXYxaC0xem0yIDBoMXYxaC0xem0yIDBoMXYxaC0xem0yIDBoMXYxaC0xem0yIDBoMXYxaC0xem0yIDBoMXYxaC0xem0yIDBoMXYxaC0xem0yIDBoMXYxaC0xem0yIDBoMXYyaC0xem0yLTFoMXYxaC0xem0tMjYgMWgxdjFoLTF6bTQgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTQgMGgxdjFoLTF6bS0yMCAxaDJ2MWgtMnptMyAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptMiAwaDJ2MWgtMnptLTI1IDFoN3Y3aC03em0xMSAwaDJ2MWgtMnptMyAwaDJ2MWgtMnptNSAwaDd2N2gtN3ptLTI1IDFoMXYxaC0xem0yIDBoMXYzaC0xem0yIDBoMXYxaC0xem0xMSAwaDJ2MWgtMnptMTAgMGgxdjFoLTF6bTIgMGgxdjNoLTF6bTIgMGgxdjFoLTF6bS0yNyAxaDF2MWgtMXptMiAwaDJ2MWgtMnptMTQgMGgxdjFoLTF6bTEwIDBoMnYxaC0yem0tMjUgMWgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTEwIDBoMXYxaC0xem0yIDBoMXYxaC0xem0xIDBoMXYxaC0xem0xIDBoMXYxaC0xem0xIDBoMXYxaC0xem0yIDBoMXYxaC0xem0yIDBoMXYxaC0xem0tMjYgMWgxdjFoLTF6bTIgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTIgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6bTEgMGgxdjFoLTF6Ii8+PC9zdmc+';

  const handlePayment = async () => {
    if (!selectedMethod) return;

    if (selectedMethod === 'pix') {
      setShowPixDialog(true);
      return;
    }

    // Cartão de crédito - processar diretamente
    setLoading(true);
    try {
      // Simular processamento do pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Criar agendamento no backend
      await appointmentsApi.create({
        doctorId: doctor.id,
        date,
        time,
        notes: 'Agendamento via Cartão',
      });
      
      setPaymentSuccess(true);
      toast.success('Pagamento aprovado e consulta agendada!');
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      toast.error('Erro ao processar pagamento');
    } finally {
      setLoading(false);
    }
  };

  const handlePixPayment = async () => {
    setLoading(true);
    try {
      // Simular confirmação do pagamento PIX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mostrar check verde
      setPixCopied(true);
      toast.success('Pagamento PIX confirmado!');
      
      // Criar agendamento no backend
      await appointmentsApi.create({
        doctorId: doctor.id,
        date,
        time,
        notes: 'Agendamento via PIX',
      });
      
      // Aguardar 2 segundos mostrando o check verde antes de fechar
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowPixDialog(false);
      setPaymentSuccess(true);
    } catch (error) {
      console.error('Erro ao confirmar pagamento:', error);
      toast.error('Erro ao confirmar pagamento');
      setPixCopied(false);
    } finally {
      setLoading(false);
    }
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setPixCopied(true);
    toast.success('Código PIX copiado!');
    setTimeout(() => setPixCopied(false), 2000);
  };

  const generateTransactionId = () => {
    return `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  if (paymentSuccess) {
    const transactionId = generateTransactionId();
    const paymentDate = new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/home')}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">Comprovante</h1>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-md mx-auto">
            {/* Ícone de sucesso */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center mb-2">Pagamento Aprovado!</h2>
            <p className="text-center text-muted-foreground mb-8">
              Sua consulta foi agendada com sucesso
            </p>

            {/* Comprovante */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="pb-4 border-b">
                    <p className="text-sm text-muted-foreground">ID da transação</p>
                    <p className="font-mono text-sm">{transactionId}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Profissional</p>
                    <p className="font-medium">{doctor?.name || 'Profissional'}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Data e Hora</p>
                    <p className="font-medium">{date} às {time}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Forma de pagamento</p>
                    <p className="font-medium">
                      {selectedMethod === 'pix' ? 'PIX' : 'Cartão de Crédito'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Data do pagamento</p>
                    <p className="font-medium">{paymentDate}</p>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Valor pago</p>
                    <p className="text-2xl font-bold text-green-600">R$ {amount.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações adicionais */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>📅 Lembrete:</strong> Sua consulta está agendada para {date} às {time}. 
                Você receberá uma notificação 24 horas antes.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-white space-y-2">
          <Button
            className="w-full"
            onClick={() => navigate('/agenda')}
          >
            Ver minha agenda
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

      {/* Dialog do PIX */}
      <Dialog open={showPixDialog} onOpenChange={setShowPixDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Pagamento via PIX</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* QR Code fictício ou Check de sucesso */}
            <div className="flex justify-center py-4">
              {!loading && !pixCopied ? (
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                  <img 
                    src={pixQrCode} 
                    alt="QR Code PIX" 
                    className="w-48 h-48"
                  />
                  <p className="text-xs text-center text-gray-500 mt-2">
                    Escaneie com seu app de banco
                  </p>
                </div>
              ) : (
                <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300 w-64 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-20 h-20 text-white stroke-[3]" />
                    </div>
                    <p className="text-lg font-bold text-green-700">
                      Pagamento Confirmado!
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      Aguarde o redirecionamento...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Código PIX */}
            <div>
              <Label>Código PIX Copia e Cola</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  value={pixCode}
                  readOnly
                  className="font-mono text-xs"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={copyPixCode}
                  className="shrink-0"
                >
                  {pixCopied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Valor */}
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Valor a pagar</p>
              <p className="text-2xl font-bold text-green-600">R$ {amount.toFixed(2)}</p>
            </div>

            {/* Instruções */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Como pagar:</strong>
              </p>
              <ol className="text-sm text-blue-900 mt-2 space-y-1 list-decimal list-inside">
                <li>Abra o app do seu banco</li>
                <li>Escolha pagar via PIX</li>
                <li>Escaneie o QR Code ou cole o código</li>
                <li>Confirme o pagamento</li>
              </ol>
            </div>

            {/* Botão de confirmação */}
            {!loading && !pixCopied && (
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handlePixPayment}
              >
                Confirmar Pagamento PIX
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
