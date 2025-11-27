import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Plus, Pill, Tablets } from 'lucide-react';
import { treatmentsApi } from '@/services/api';
import type { Treatment } from '@/types';

export default function TreatmentsScreen() {
  const navigate = useNavigate();
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTreatments();
  }, []);

  const loadTreatments = async () => {
    try {
      // Tentar carregar da API
      const data = await treatmentsApi.getAll();
      setTreatment(data);
    } catch (err: any) {
      // Se falhar, usar dados mockados para desenvolvimento
      console.warn('API não disponível, usando dados mockados');
      const mockTreatment: Treatment = {
        medications: [
          {
            id: '1',
            name: 'Ácido Fólico',
            dosage: '400mcg',
            frequency: '1x ao dia',
            startDate: '2024-01-15',
            instructions: 'Tomar pela manhã com água',
          },
          {
            id: '2',
            name: 'Sulfato Ferroso',
            dosage: '40mg',
            frequency: '1x ao dia',
            startDate: '2024-02-01',
            instructions: 'Tomar após o almoço',
          },
        ],
        supplements: [
          {
            id: '1',
            name: 'Vitamina D',
            dosage: '2000 UI',
            frequency: '1x ao dia',
            purpose: 'Fortalecimento ósseo',
          },
          {
            id: '2',
            name: 'Ômega 3',
            dosage: '1000mg',
            frequency: '2x ao dia',
            purpose: 'Desenvolvimento cerebral do bebê',
          },
        ],
      };
      setTreatment(mockTreatment);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-12 w-full mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
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
            onClick={() => navigate('/home')}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">Tratamentos</h1>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="medications" className="flex-1 flex flex-col">
        <div className="px-6 pt-4">
          <TabsList className="w-full grid grid-cols-4 gap-2">
            <TabsTrigger value="vaccines" className="text-xs">
              Vacinas
            </TabsTrigger>
            <TabsTrigger value="therapy" className="text-xs">
              Terapia
            </TabsTrigger>
            <TabsTrigger value="exams" className="text-xs">
              Exames
            </TabsTrigger>
            <TabsTrigger value="others" className="text-xs">
              Outros
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="px-6 pt-6">
          <h2 className="font-semibold mb-1">Meus Remédios</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Acompanhe seus medicamentos e suplementos
          </p>
        </div>

        <TabsContent value="vaccines" className="flex-1 px-6 overflow-y-auto mt-0">
          <div className="space-y-3">
            {/* Exemplo de medicamentos */}
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Pill className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">IBSOS - Formulação X</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Tomar 1 comprimido a cada 8 horas
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {treatment?.medications.map((med) => (
              <Card key={med.id} className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Pill className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{med.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {med.dosage} - {med.frequency}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="therapy" className="flex-1 px-6 overflow-y-auto mt-0">
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhuma terapia registrada</p>
          </div>
        </TabsContent>

        <TabsContent value="exams" className="flex-1 px-6 overflow-y-auto mt-0">
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhum exame registrado</p>
          </div>
        </TabsContent>

        <TabsContent value="others" className="flex-1 px-6 overflow-y-auto mt-0">
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhum outro tratamento registrado</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Seção de Suplementos */}
      <div className="px-6 py-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Suplementos</h2>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Tablets className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">Suplemento Y</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tomar 1 cápsula ao dia
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {treatment?.supplements.map((sup) => (
            <Card key={sup.id} className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Tablets className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{sup.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {sup.dosage} - {sup.frequency}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Botão de adicionar */}
      <div className="p-6 border-t bg-white">
        <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar medicamento
        </Button>
      </div>
    </div>
  );
}
