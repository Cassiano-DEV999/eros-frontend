import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { ArrowLeft, Plus, Pill, Tablets } from 'lucide-react';
import { toast } from 'sonner';
import { treatmentsApi } from '@/services/api';
import type { Treatment } from '@/types';

export default function TreatmentsScreen() {
  const navigate = useNavigate();
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState('');
  const [showMedicationDialog, setShowMedicationDialog] = useState(false);
  const [showSupplementDialog, setShowSupplementDialog] = useState(false);
  const [medicationForm, setMedicationForm] = useState({
    name: '',
    dosage: '',
    frequency: '',
    instructions: '',
  });
  const [supplementForm, setSupplementForm] = useState({
    name: '',
    dosage: '',
    frequency: '',
    purpose: '',
  });

  useEffect(() => {
    loadTreatments();
  }, []);

  const loadTreatments = async () => {
    try {
      const data = await treatmentsApi.getAll();
      setTreatment(data);
    } catch (err: any) {
      console.error('Erro ao carregar tratamentos:', err);
      // Inicializar com estrutura vazia
      setTreatment({ medications: [], supplements: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedication = async () => {
    try {
      await treatmentsApi.addMedication({
        ...medicationForm,
        startDate: new Date().toISOString(),
      });
      setShowMedicationDialog(false);
      setMedicationForm({ name: '', dosage: '', frequency: '', instructions: '' });
      toast.success('Medicamento adicionado com sucesso!');
      loadTreatments();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Erro ao adicionar medicamento');
    }
  };

  const handleAddSupplement = async () => {
    try {
      await treatmentsApi.addSupplement(supplementForm);
      setShowSupplementDialog(false);
      setSupplementForm({ name: '', dosage: '', frequency: '', purpose: '' });
      toast.success('Suplemento adicionado com sucesso!');
      loadTreatments();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Erro ao adicionar suplemento');
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
      <div className="p-6 border-t bg-white space-y-2">
        <Button
          onClick={() => setShowMedicationDialog(true)}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar medicamento
        </Button>
        <Button
          onClick={() => setShowSupplementDialog(true)}
          variant="outline"
          className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar suplemento
        </Button>
      </div>

      {/* Dialog para adicionar medicamento */}
      <Dialog open={showMedicationDialog} onOpenChange={setShowMedicationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Medicamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="med-name">Nome do medicamento</Label>
              <Input
                id="med-name"
                value={medicationForm.name}
                onChange={(e) => setMedicationForm({ ...medicationForm, name: e.target.value })}
                placeholder="Ex: Ácido Fólico"
              />
            </div>
            <div>
              <Label htmlFor="med-dosage">Dosagem</Label>
              <Input
                id="med-dosage"
                value={medicationForm.dosage}
                onChange={(e) => setMedicationForm({ ...medicationForm, dosage: e.target.value })}
                placeholder="Ex: 400mcg"
              />
            </div>
            <div>
              <Label htmlFor="med-frequency">Frequência</Label>
              <Input
                id="med-frequency"
                value={medicationForm.frequency}
                onChange={(e) => setMedicationForm({ ...medicationForm, frequency: e.target.value })}
                placeholder="Ex: 1x ao dia"
              />
            </div>
            <div>
              <Label htmlFor="med-instructions">Instruções</Label>
              <Input
                id="med-instructions"
                value={medicationForm.instructions}
                onChange={(e) => setMedicationForm({ ...medicationForm, instructions: e.target.value })}
                placeholder="Ex: Tomar pela manhã com água"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMedicationDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleAddMedication}
              disabled={!medicationForm.name || !medicationForm.dosage}
            >
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para adicionar suplemento */}
      <Dialog open={showSupplementDialog} onOpenChange={setShowSupplementDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Suplemento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="sup-name">Nome do suplemento</Label>
              <Input
                id="sup-name"
                value={supplementForm.name}
                onChange={(e) => setSupplementForm({ ...supplementForm, name: e.target.value })}
                placeholder="Ex: Vitamina D"
              />
            </div>
            <div>
              <Label htmlFor="sup-dosage">Dosagem</Label>
              <Input
                id="sup-dosage"
                value={supplementForm.dosage}
                onChange={(e) => setSupplementForm({ ...supplementForm, dosage: e.target.value })}
                placeholder="Ex: 2000 UI"
              />
            </div>
            <div>
              <Label htmlFor="sup-frequency">Frequência</Label>
              <Input
                id="sup-frequency"
                value={supplementForm.frequency}
                onChange={(e) => setSupplementForm({ ...supplementForm, frequency: e.target.value })}
                placeholder="Ex: 1x ao dia"
              />
            </div>
            <div>
              <Label htmlFor="sup-purpose">Finalidade</Label>
              <Input
                id="sup-purpose"
                value={supplementForm.purpose}
                onChange={(e) => setSupplementForm({ ...supplementForm, purpose: e.target.value })}
                placeholder="Ex: Fortalecimento ósseo"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSupplementDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleAddSupplement}
              disabled={!supplementForm.name || !supplementForm.dosage}
            >
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
