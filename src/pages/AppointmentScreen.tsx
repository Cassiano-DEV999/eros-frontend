import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, MapPin } from 'lucide-react';
import { doctorsApi } from '@/services/api';
import type { Doctor } from '@/types';

export default function AppointmentScreen() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      // Tentar carregar da API
      const data = await doctorsApi.getAll();
      setDoctors(data);
    } catch (err: any) {
      // Se falhar, usar dados mockados para desenvolvimento
      console.warn('API não disponível, usando dados mockados');
      const mockDoctors: Doctor[] = [
        {
          id: '1',
          name: 'Kellen Vittorazzi',
          specialty: 'Farmacêutico Clínico',
          avatar: 'https://avatar.iran.liara.run/public/girl?username=kellen',
          rating: 4.8,
        },
        {
          id: '2',
          name: 'Igor Barbosa',
          specialty: 'Farmacêutico Clínico',
          avatar: 'https://avatar.iran.liara.run/public/boy?username=igor',
          rating: 4.9,
        },
        {
          id: '3',
          name: 'Bianca Balbino',
          specialty: 'Nutricionista',
          avatar: 'https://avatar.iran.liara.run/public/girl?username=bianca',
          rating: 4.7,
        },
      ];
      setDoctors(mockDoctors);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    // Carregar slots disponíveis para esse médico
  };

  const handleBooking = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      navigate('/pagamento', {
        state: {
          doctorId: selectedDoctor.id,
          doctor: selectedDoctor,
          date: selectedDate,
          time: selectedTime,
        },
      });
    }
  };

  const availableDates = [
    { date: '12/11', day: 'Quarta-feira' },
    { date: '13/11', day: 'Quinta-feira' },
    { date: '14/11', day: 'Sexta-feira' },
  ];

  const timeSlots = ['8:00', '8:30', '9:00', '9:30', '10:00', '11:00'];

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!selectedDoctor) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
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
            <h1 className="text-xl font-semibold">Agendar consulta</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1 ml-12">Farmacêutico Clínico</p>
        </div>

        {/* Lista de médicos */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {doctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleDoctorSelect(doctor)}
            >
              <CardContent className="p-5">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-20 h-20 rounded-2xl">
                    <AvatarImage src={doctor.avatar} alt={doctor.name} />
                    <AvatarFallback className="rounded-2xl bg-primary/10 text-primary text-lg">
                      {doctor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    {doctor.rating && (
                      <p className="text-sm text-yellow-600 mt-1">★ {doctor.rating}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {doctors.length === 0 && !error && (
            <div className="text-center py-12 text-muted-foreground">
              <p>Nenhum médico disponível no momento</p>
            </div>
          )}
        </div>

        {/* Bottom Navigation Placeholder */}
        <div className="h-16 border-t bg-white" />
      </div>
    );
  }

  // Tela de seleção de horário
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedDoctor(null)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Agendar consulta</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1 ml-12">{selectedDoctor.specialty}</p>
      </div>

      {/* Perfil do médico selecionado */}
      <div className="p-6">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start space-x-4">
              <Avatar className="w-24 h-24 rounded-2xl">
                <AvatarImage src={selectedDoctor.avatar} alt={selectedDoctor.name} />
                <AvatarFallback className="rounded-2xl bg-primary/10 text-primary text-xl">
                  {selectedDoctor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{selectedDoctor.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedDoctor.specialty}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>USR Palmares</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seleção de data e horário */}
      <div className="flex-1 px-6 overflow-y-auto">
        <h2 className="font-semibold mb-3">Agende um dia</h2>

        {availableDates.map((dateInfo) => (
          <div key={dateInfo.date} className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              {dateInfo.date} - {dateInfo.day}
            </p>
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedDate === dateInfo.date && selectedTime === time ? 'default' : 'outline'}
                  className={`rounded-full px-4 py-2 text-sm ${selectedDate === dateInfo.date && selectedTime === time
                    ? 'bg-primary text-white'
                    : ''
                    }`}
                  onClick={() => {
                    setSelectedDate(dateInfo.date);
                    setSelectedTime(time);
                  }}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botão de confirmação */}
      <div className="p-6 border-t bg-white">
        <Button
          className="w-full bg-gradient-to-r from-primary to-secondary text-white"
          disabled={!selectedDate || !selectedTime}
          onClick={handleBooking}
        >
          Prosseguir
        </Button>
      </div>
    </div>
  );
}
