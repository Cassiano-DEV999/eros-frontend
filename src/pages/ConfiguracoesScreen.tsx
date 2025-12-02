import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, User, Mail, Phone, Calendar, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { User as UserType } from '@/types';

export default function ConfiguracoesScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pregnantWeeks: '',
  });
  const [notifications, setNotifications] = useState({
    appointments: true,
    medications: true,
    wellbeing: false,
    supportNetwork: true,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('eros_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        pregnantWeeks: userData.pregnantWeeks?.toString() || '',
      });
    }
  }, []);

  const handleSave = () => {
    try {
      // Atualizar localStorage (em produção, fazer chamada à API)
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('eros_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Configurações salvas com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar configurações');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/perfil')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Configurações</h1>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Informações Pessoais */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Informações Pessoais
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                      disabled
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    O e-mail não pode ser alterado
                  </p>
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(00) 00000-0000"
                      className="flex-1"
                    />
                  </div>
                </div>
                {user?.userType === 'PREGNANT' && (
                  <div>
                    <Label htmlFor="weeks">Semanas de gestação</Label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <Input
                        id="weeks"
                        type="number"
                        min="1"
                        max="42"
                        value={formData.pregnantWeeks}
                        onChange={(e) => setFormData({ ...formData, pregnantWeeks: e.target.value })}
                        placeholder="Ex: 12"
                        className="flex-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Notificações</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Consultas</p>
                    <p className="text-sm text-muted-foreground">
                      Lembretes de consultas agendadas
                    </p>
                  </div>
                  <Switch
                    checked={notifications.appointments}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, appointments: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Medicamentos</p>
                    <p className="text-sm text-muted-foreground">
                      Lembretes de horário de medicação
                    </p>
                  </div>
                  <Switch
                    checked={notifications.medications}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, medications: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Bem-estar</p>
                    <p className="text-sm text-muted-foreground">
                      Lembretes para registrar bem-estar
                    </p>
                  </div>
                  <Switch
                    checked={notifications.wellbeing}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, wellbeing: checked })
                    }
                  />
                </div>
                {user?.userType === 'PREGNANT' && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Rede de apoio</p>
                      <p className="text-sm text-muted-foreground">
                        Notificações sobre sua rede de apoio
                      </p>
                    </div>
                    <Switch
                      checked={notifications.supportNetwork}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, supportNetwork: checked })
                      }
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Aparência */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Aparência</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tema escuro</p>
                    <p className="text-sm text-muted-foreground">
                      Ativar modo escuro (em breve)
                    </p>
                  </div>
                  <Switch disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Botão de salvar */}
      <div className="p-6 border-t bg-white">
        <Button onClick={handleSave} className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Salvar alterações
        </Button>
      </div>
    </div>
  );
}
