import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileText, Calendar, Pill, Heart, Download } from 'lucide-react';
import type { User } from '@/types';

export default function RelatoriosScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('eros_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const reports = [
    {
      id: 1,
      title: 'Relatório de Consultas',
      description: 'Histórico de todas as suas consultas realizadas',
      icon: Calendar,
      color: 'bg-blue-100 text-blue-600',
      count: 12,
    },
    {
      id: 2,
      title: 'Relatório de Medicamentos',
      description: 'Lista de medicamentos e suplementos em uso',
      icon: Pill,
      color: 'bg-purple-100 text-purple-600',
      count: 5,
    },
    {
      id: 3,
      title: 'Relatório de Bem-estar',
      description: 'Acompanhamento do seu bem-estar ao longo do tempo',
      icon: Heart,
      color: 'bg-red-100 text-red-600',
      count: 28,
    },
  ];

  const recentReports = [
    {
      date: '2024-11-30',
      title: 'Consulta com Dra. Ana Silva',
      type: 'Consulta',
      status: 'completed',
    },
    {
      date: '2024-11-28',
      title: 'Exame de ultrassom',
      type: 'Exame',
      status: 'completed',
    },
    {
      date: '2024-11-25',
      title: 'Avaliação nutricional',
      type: 'Consulta',
      status: 'completed',
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
          <div>
            <h1 className="text-xl font-semibold">Relatórios</h1>
            <p className="text-sm text-muted-foreground">Acompanhe seu histórico médico</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="flex-1 flex flex-col">
        <div className="px-6 pt-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>
        </div>

        {/* Visão Geral */}
        <TabsContent value="overview" className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            {/* Informações da gestante */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Informações Pessoais</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nome:</span>
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">E-mail:</span>
                    <span className="font-medium">{user?.email}</span>
                  </div>
                  {user?.pregnantWeeks && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Semanas de gestação:</span>
                      <span className="font-medium">{user.pregnantWeeks} semanas</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Cards de relatórios */}
            <div className="space-y-3">
              <h3 className="font-semibold">Relatórios Disponíveis</h3>
              {reports.map((report) => (
                <Card key={report.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-xl ${report.color} flex items-center justify-center flex-shrink-0`}>
                        <report.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <p className="text-xs text-primary mt-1">{report.count} registro{report.count !== 1 ? 's' : ''}</p>
                      </div>
                      <Button size="icon" variant="ghost" className="flex-shrink-0">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Histórico */}
        <TabsContent value="history" className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-3">
            <h3 className="font-semibold mb-4">Atividades Recentes</h3>
            
            {recentReports.map((report, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{report.title}</h4>
                        <p className="text-xs text-muted-foreground">{report.type}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(report.date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      Ver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {recentReports.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum histórico encontrado</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
