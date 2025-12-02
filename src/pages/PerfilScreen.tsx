import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Share2, Users, LogOut, Settings, Bell, Lock, HelpCircle, Copy, Check, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import type { User } from '@/types';

export default function PerfilScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Primeiro, tentar do localStorage
      const storedUser = localStorage.getItem('eros_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // Depois, recarregar do backend para garantir dados atualizados
      const token = localStorage.getItem('eros_token');
      if (token) {
        const response = await fetch('http://localhost:9002/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setUser(data.data);
            localStorage.setItem('eros_user', JSON.stringify(data.data));
          }
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      toast.error('Erro ao carregar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    toast('Deseja realmente sair?', {
      action: {
        label: 'Sair',
        onClick: () => {
          localStorage.removeItem('eros_token');
          localStorage.removeItem('eros_user');
          toast.success('Até logo!');
          navigate('/login');
        },
      },
      cancel: {
        label: 'Cancelar',
        onClick: () => {},
      },
    });
  };

  const handleCopyCode = () => {
    if (user?.shareCode) {
      navigator.clipboard.writeText(user.shareCode);
      setCopied(true);
      toast.success('Código copiado para a área de transferência!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const menuItems = [
    {
      icon: Settings,
      label: 'Configurações',
      onClick: () => navigate('/configuracoes'),
    },
    {
      icon: Bell,
      label: 'Notificações',
      onClick: () => toast.info('Em breve você poderá gerenciar suas notificações'),
    },
    {
      icon: Lock,
      label: 'Privacidade e Segurança',
      onClick: () => navigate('/privacidade'),
    },
    {
      icon: HelpCircle,
      label: 'Ajuda e Suporte',
      onClick: () => toast.info('Entre em contato: suporte@eros.app'),
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/home')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Perfil</h1>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando perfil...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Perfil do usuário */}
            <div className="p-6 bg-gradient-to-b from-primary/5 to-transparent">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4 ring-4 ring-white shadow-lg">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-primary text-white text-2xl">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                {user?.pregnantWeeks && (
                  <div className="mt-3 px-4 py-2 bg-primary/10 rounded-full">
                    <p className="text-sm font-medium text-primary">
                      {user.pregnantWeeks} semanas de gestação
                    </p>
                  </div>
                )}
              </div>
            </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Código de compartilhamento - Somente para gestantes */}
          {user?.userType === 'PREGNANT' && (
            <Card className="bg-gradient-to-r from-primary to-secondary text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Share2 className="w-5 h-5" />
                  <h3 className="font-semibold">Código de Vinculação</h3>
                </div>
                <p className="text-sm text-white/90 mb-4">
                  Compartilhe este código com sua rede de apoio (família e amigos) para que possam acompanhar sua gestação
                </p>
                
                {user?.shareCode ? (
                  <>
                    <div className="bg-white/20 rounded-lg p-4 mb-3">
                      <div className="text-center">
                        <p className="text-xs text-white/70 mb-2">Seu código de vinculação</p>
                        <span className="text-3xl font-bold tracking-widest block">{user.shareCode}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="ghost"
                        className="text-white hover:bg-white/20 border border-white/30"
                        onClick={handleCopyCode}
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copiado!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copiar
                          </>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-white hover:bg-white/20 border border-white/30"
                        onClick={() => {
                          const message = `Olá! Você pode acompanhar minha gestação usando o código: ${user.shareCode} no app Eros 💕`;
                          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <p className="text-sm text-white/90">
                      Carregando código...
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Informação de rede de apoio - Para membros da rede */}
          {user?.userType === 'SUPPORT_NETWORK' && user?.supportingPregnant && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Acompanhando</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.supportingPregnant.pregnant.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.supportingPregnant.pregnant.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.supportingPregnant.pregnant.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {user.supportingPregnant.relationship}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Rede de apoio - Para gestantes */}
          {user?.userType === 'PREGNANT' && user?.supportNetwork && user.supportNetwork.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Minha Rede de Apoio</h3>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {user.supportNetwork.length} {user.supportNetwork.length === 1 ? 'pessoa' : 'pessoas'}
                  </span>
                </div>
                <div className="space-y-3">
                  {user.supportNetwork.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.support.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {member.support.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{member.support.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{member.relationship}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Menu de opções */}
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4" onClick={item.onClick}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Botão de logout */}
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair da conta
          </Button>

          {/* Versão */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Eros App v1.0.0
          </p>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
