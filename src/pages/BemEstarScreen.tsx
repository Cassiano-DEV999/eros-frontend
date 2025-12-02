import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Heart, Smile, Frown, Meh, Activity, Moon, Droplets } from 'lucide-react';
import { toast } from 'sonner';

export default function BemEstarScreen() {
  const navigate = useNavigate();
  const [mood, setMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [energy, setEnergy] = useState(5);
  const [sleep, setSleep] = useState('');
  const [water, setWater] = useState(0);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    // Aqui você pode salvar os dados no backend
    const wellbeingData = {
      mood,
      energy,
      sleep,
      water,
      notes,
      date: new Date().toISOString(),
    };
    console.log('Salvando dados de bem-estar:', wellbeingData);
    toast.success('Registro de bem-estar salvo com sucesso!');
    navigate('/home');
  };

  const moods = [
    { value: 'happy', icon: Smile, label: 'Feliz', color: 'text-green-500' },
    { value: 'neutral', icon: Meh, label: 'Normal', color: 'text-yellow-500' },
    { value: 'sad', icon: Frown, label: 'Triste', color: 'text-red-500' },
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
            <h1 className="text-xl font-semibold">Bem-estar da Mamãe</h1>
            <p className="text-sm text-muted-foreground">Como você está se sentindo hoje?</p>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Humor */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-5 h-5 text-primary" />
                <Label className="text-base font-semibold">Como está seu humor?</Label>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {moods.map(({ value, icon: Icon, label, color }) => (
                  <button
                    key={value}
                    onClick={() => setMood(value as any)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      mood === value
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className={`w-12 h-12 mx-auto mb-2 ${color}`} />
                    <p className="text-sm font-medium text-center">{label}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nível de Energia */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-5 h-5 text-primary" />
                <Label className="text-base font-semibold">Nível de energia</Label>
              </div>
              <div className="space-y-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Baixa</span>
                  <span className="font-semibold text-primary text-lg">{energy}</span>
                  <span>Alta</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sono */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Moon className="w-5 h-5 text-primary" />
                <Label htmlFor="sleep" className="text-base font-semibold">
                  Horas de sono
                </Label>
              </div>
              <Input
                id="sleep"
                type="number"
                min="0"
                max="24"
                step="0.5"
                value={sleep}
                onChange={(e) => setSleep(e.target.value)}
                placeholder="Ex: 8"
                className="text-lg"
              />
            </CardContent>
          </Card>

          {/* Hidratação */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Droplets className="w-5 h-5 text-primary" />
                <Label className="text-base font-semibold">Copos de água hoje</Label>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setWater(Math.max(0, water - 1))}
                  disabled={water === 0}
                >
                  -
                </Button>
                <div className="flex-1 text-center">
                  <p className="text-4xl font-bold text-primary">{water}</p>
                  <p className="text-sm text-muted-foreground">copos (250ml)</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setWater(water + 1)}
                >
                  +
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Meta recomendada: 8-10 copos por dia
              </p>
            </CardContent>
          </Card>

          {/* Observações */}
          <Card>
            <CardContent className="p-6">
              <Label htmlFor="notes" className="text-base font-semibold mb-4 block">
                Observações adicionais
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Como foi seu dia? Algum sintoma ou preocupação?"
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Botão de salvar */}
      <div className="p-6 border-t bg-white">
        <Button
          onClick={handleSave}
          disabled={!mood}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white"
        >
          Salvar registro
        </Button>
      </div>
    </div>
  );
}
