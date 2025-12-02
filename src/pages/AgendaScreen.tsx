import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, Clock, MapPin, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { appointmentsApi } from '@/services/api';
import type { Appointment } from '@/types';

export default function AgendaScreen() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await appointmentsApi.getAll();
      setAppointments(data);
    } catch (err: any) {
      console.error('Erro ao carregar agendamentos:', err);
      setError(err.response?.data?.error || 'Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      SCHEDULED: 'bg-blue-100 text-blue-700',
      CONFIRMED: 'bg-green-100 text-green-700',
      CANCELLED: 'bg-red-100 text-red-700',
      COMPLETED: 'bg-gray-100 text-gray-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      SCHEDULED: 'Agendado',
      CONFIRMED: 'Confirmado',
      CANCELLED: 'Cancelado',
      COMPLETED: 'Realizado',
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-4 border-b">
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="p-6 space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/home')}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">Minha Agenda</h1>
          </div>
          <Button
            size="icon"
            onClick={() => navigate('/agendamento')}
            className="rounded-full bg-primary"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1 ml-12">
          {appointments.length} consulta{appointments.length !== 1 ? 's' : ''} agendada{appointments.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Lista de agendamentos */}
      <div className="flex-1 p-6 overflow-y-auto">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-4 rounded-lg mb-4 border border-red-200">
            {error}
          </div>
        )}

        {appointments.length === 0 && !error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Nenhuma consulta agendada</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Agende sua primeira consulta com um profissional
            </p>
            <Button
              onClick={() => navigate('/agendamento')}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agendar consulta
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Status Badge */}
                  <div className={`px-4 py-2 ${getStatusColor(appointment.status)}`}>
                    <span className="text-xs font-medium">{getStatusText(appointment.status)}</span>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-4">
                    {/* Médico */}
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={appointment.doctor.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {appointment.doctor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{appointment.doctor.name}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.doctor.specialty}</p>
                      </div>
                    </div>

                    {/* Informações */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>Teleconsulta</span>
                      </div>
                    </div>

                    {/* Ações */}
                    {(appointment.status === 'SCHEDULED' || appointment.status === 'PENDING' || appointment.status === 'CONFIRMED') && (
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            toast('Deseja cancelar esta consulta?', {
                              action: {
                                label: 'Sim, cancelar',
                                onClick: async () => {
                                  try {
                                    await appointmentsApi.cancel(appointment.id);
                                    toast.success('Consulta cancelada');
                                    loadAppointments();
                                  } catch (err) {
                                    toast.error('Erro ao cancelar consulta');
                                  }
                                },
                              },
                              cancel: {
                                label: 'Não',
                                onClick: () => {},
                              },
                            });
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button size="sm" className="flex-1">
                          Remarcar
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
