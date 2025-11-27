import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Heart, Pill, BellRing, ChevronRight, Home, User as UserIcon, FileText, Menu } from 'lucide-react';
import type { User } from '@/types';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('eros_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bom dia');
    else if (hour < 18) setGreeting('Boa tarde');
    else setGreeting('Boa noite');
  }, []);

  const menuItems = [
    {
      icon: Calendar,
      title: 'Minha agenda',
      subtitle: 'Agendamento pré-natal',
      color: 'bg-pink-100',
      iconColor: 'text-pink-600',
      onClick: () => navigate('/agenda'),
    },
    {
      icon: Calendar,
      title: 'Agendar teleconsulta',
      subtitle: 'Agende uma consulta com um teleatende',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      onClick: () => navigate('/agendamento'),
    },
    {
      icon: Pill,
      title: 'Tratamentos',
      subtitle: 'Acompanhe seus medicamentos',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      onClick: () => navigate('/tratamentos'),
    },
    {
      icon: Heart,
      title: 'Bem-estar da mamãe',
      subtitle: 'Cuide como está sua mamãe',
      color: 'bg-red-100',
      iconColor: 'text-red-600',
      onClick: () => navigate('/bem-estar'),
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-b from-primary to-secondary rounded-b-[2rem] px-6 pt-12 pb-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" className="text-white">
            <Menu className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <BellRing className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 ring-2 ring-white/50">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-white/20 text-white text-lg">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-white/90 text-sm">{greeting},</p>
            <h1 className="text-2xl font-bold">{user?.name?.split(' ')[0] || 'Beatriz'}</h1>
            {user?.pregnantWeeks && (
              <p className="text-white/80 text-sm mt-1">Gestação • {user.pregnantWeeks} semanas</p>
            )}
          </div>
        </div>
      </div>

      {/* Menu de ações */}
      <div className="flex-1 px-6 py-6">
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={item.onClick}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base">{item.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{item.subtitle}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t bg-white">
        <div className="flex items-center justify-around py-3">
          <button className="flex flex-col items-center space-y-1 text-primary">
            <Home className="w-6 h-6" />
            <span className="text-xs font-medium">Início</span>
          </button>
          <button
            className="flex flex-col items-center space-y-1 text-muted-foreground"
            onClick={() => navigate('/agendamento')}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Agendamentos</span>
          </button>
          <button
            className="flex flex-col items-center space-y-1 text-muted-foreground"
            onClick={() => navigate('/tratamentos')}
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs">Relatórios</span>
          </button>
          <button
            className="flex flex-col items-center space-y-1 text-muted-foreground"
            onClick={() => navigate('/perfil')}
          >
            <UserIcon className="w-6 h-6" />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
