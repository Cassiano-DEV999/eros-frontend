import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { ArrowLeft, Lock, Eye, EyeOff, Shield, Trash2, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function PrivacidadeScreen() {
  const navigate = useNavigate();
  const [privacy, setPrivacy] = useState({
    shareData: false,
    analytics: true,
    marketing: false,
  });
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChangePassword = () => {
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      toast.error('Preencha todos os campos');
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      toast.error('As senhas não coincidem');
      return;
    }
    if (passwordForm.new.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    // Aqui seria feita a chamada à API
    toast.success('Senha alterada com sucesso!');
    setShowPasswordDialog(false);
    setPasswordForm({ current: '', new: '', confirm: '' });
  };

  const handleExportData = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Gerando arquivo...',
        success: 'Dados exportados com sucesso!',
        error: 'Erro ao exportar dados',
      }
    );
  };

  const handleDeleteAccount = () => {
    // Aqui seria feita a chamada à API
    toast.success('Solicitação de exclusão enviada');
    setShowDeleteDialog(false);
    setTimeout(() => {
      localStorage.clear();
      navigate('/login');
    }, 1500);
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
          <h1 className="text-xl font-semibold">Privacidade e Segurança</h1>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Segurança */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-primary" />
                Segurança
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowPasswordDialog(true)}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Alterar senha
                </Button>
                <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium text-blue-900 mb-1">Dica de segurança</p>
                  <p>Use uma senha forte com no mínimo 8 caracteres, incluindo letras, números e símbolos.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacidade */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Privacidade dos Dados</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compartilhar dados anonimizados</p>
                    <p className="text-sm text-muted-foreground">
                      Ajude a melhorar o app compartilhando dados anônimos
                    </p>
                  </div>
                  <Switch
                    checked={privacy.shareData}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, shareData: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Análise de uso</p>
                    <p className="text-sm text-muted-foreground">
                      Permitir coleta de dados de uso do aplicativo
                    </p>
                  </div>
                  <Switch
                    checked={privacy.analytics}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, analytics: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Comunicações de marketing</p>
                    <p className="text-sm text-muted-foreground">
                      Receber novidades e ofertas por e-mail
                    </p>
                  </div>
                  <Switch
                    checked={privacy.marketing}
                    onCheckedChange={(checked) =>
                      setPrivacy({ ...privacy, marketing: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meus Dados */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Meus Dados</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleExportData}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar meus dados
                </Button>
                <p className="text-xs text-muted-foreground">
                  Baixe uma cópia de todos os seus dados em formato JSON
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Zona de Perigo */}
          <Card className="border-red-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 text-red-600">Zona de Perigo</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir minha conta
                </Button>
                <p className="text-xs text-muted-foreground">
                  Esta ação é irreversível. Todos os seus dados serão permanentemente apagados.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog de alterar senha */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>
              Digite sua senha atual e escolha uma nova senha
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password">Senha atual</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  placeholder="Digite sua senha atual"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="new-password">Nova senha</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                  placeholder="Digite a nova senha"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirmar nova senha</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  placeholder="Digite novamente a nova senha"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleChangePassword}>
              Alterar senha
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmar exclusão */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Excluir Conta</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">
              <strong>Atenção:</strong> Todos os seus dados, incluindo consultas, medicamentos,
              registros de bem-estar e sua rede de apoio serão permanentemente apagados.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
            >
              Sim, excluir minha conta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
