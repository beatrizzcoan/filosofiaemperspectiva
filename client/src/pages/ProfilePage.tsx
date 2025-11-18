import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthService } from '../api/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Edit2, Loader2, Save, Lock, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(user?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  React.useEffect(() => {
    if (isEditing && user) {
      setName(user.name);
      setAvatarUrl(user.avatarUrl || '');
      setOldPassword('');
      setNewPassword('');
    }
  }, [isEditing, user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedUser = await AuthService.updateProfile({ name, avatarUrl });
      updateUser(updatedUser);
      setIsEditing(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao atualizar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await AuthService.changePassword(oldPassword, newPassword);
      setIsEditing(false);
      toast.success("Senha alterada com sucesso!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao alterar senha");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-8 max-w-5xl min-h-screen">
      <h2 className="text-4xl font-serif mb-8 text-gray-800">Meu Perfil</h2>

      <Card className="bg-white p-6 md:p-8 mb-10 shadow-xl border-0">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-28 h-28 border-4 border-gray-200 shadow-sm">
            <AvatarImage src={user.avatarUrl || ''} alt={user.name} className="object-cover" />
            <AvatarFallback className="text-4xl bg-gray-200 text-gray-500">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left space-y-1">
            <h3 className="text-3xl font-serif text-gray-900 font-bold">{user.name}</h3>
            <p className="text-gray-500 text-lg font-sans">{user.email}</p>
            <div className="pt-2">
               <span className="inline-block bg-verde/20 text-verde-dark text-xs px-2 py-1 rounded-full font-bold">
                 Membro Explorador
               </span>
            </div>
          </div>

          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-gray-300 shadow-sm font-sans hover:border-verde hover:text-verde gap-2">
                <Edit2 className="h-4 w-4" />
                Editar Perfil
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">Editar Perfil</DialogTitle>
                <DialogDescription>
                  Faça alterações no seu perfil ou segurança aqui.
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="general">Geral</TabsTrigger>
                  <TabsTrigger value="security">Segurança</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general">
                  <form onSubmit={handleUpdateProfile} className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input 
                          id="name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          className="pl-9"
                          placeholder="Seu nome"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar">URL do Avatar (Imagem)</Label>
                      <Input 
                        id="avatar" 
                        value={avatarUrl} 
                        onChange={(e) => setAvatarUrl(e.target.value)} 
                        placeholder="https://exemplo.com/foto.jpg"
                      />
                      <p className="text-xs text-gray-500">
                        Cole um link direto de uma imagem (ex: Imgur, LinkedIn).
                      </p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button type="submit" className="bg-verde text-gray-900 hover:bg-verde/90" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" /> Salvar Alterações
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="security">
                  <form onSubmit={handleChangePassword} className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="oldPass">Senha Atual</Label>
                      <div className="relative">
                         <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                         <Input 
                           id="oldPass" 
                           type="password" 
                           value={oldPassword} 
                           onChange={(e) => setOldPassword(e.target.value)} 
                           className="pl-9"
                           required
                         />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPass">Nova Senha</Label>
                      <div className="relative">
                         <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                         <Input 
                           id="newPass" 
                           type="password" 
                           value={newPassword} 
                           onChange={(e) => setNewPassword(e.target.value)} 
                           className="pl-9"
                           minLength={6}
                           required
                         />
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button type="submit" variant="destructive" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Alterar Senha
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>

            </DialogContent>
          </Dialog>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-white text-center p-4 shadow-lg border-0 hover:scale-105 transition-transform duration-300">
          <CardHeader className="p-2">
            <CardTitle className="text-base font-sans font-semibold text-gray-500 uppercase tracking-wider">Escola Favorita</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-2xl font-serif text-rosa font-bold">Estoicismo</p>
          </CardContent>
        </Card>
        <Card className="bg-white text-center p-4 shadow-lg border-0 hover:scale-105 transition-transform duration-300">
          <CardHeader className="p-2">
            <CardTitle className="text-base font-sans font-semibold text-gray-500 uppercase tracking-wider">Quem te inspira</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-2xl font-serif text-azul font-bold">Sêneca</p>
          </CardContent>
        </Card>
        <Card className="bg-white text-center p-4 shadow-lg border-0 hover:scale-105 transition-transform duration-300">
          <CardHeader className="p-2">
            <CardTitle className="text-base font-sans font-semibold text-gray-500 uppercase tracking-wider">Tema Central</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-2xl font-serif text-verde font-bold">Resiliência</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white p-6 md:p-8 mb-10 shadow-xl border-0">
        <CardHeader className="p-0 mb-6 flex flex-row justify-between items-center">
          <CardTitle className="text-3xl font-serif text-gray-800">Histórias Salvas</CardTitle>
          <Button variant="link" className="text-verde text-lg p-0 h-auto hover:text-verde/80 font-sans">[Ver Todas]</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/leitura/1" className="border rounded-lg overflow-hidden block group shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-32 bg-rosa/70 flex items-center justify-center text-white text-3xl font-serif group-hover:opacity-90 transition-opacity">
                <span className="font-serif font-bold italic">"O Deserto"</span>
              </div>
              <p className="p-4 font-serif text-lg text-gray-700">O Deserto de Si Mesmo</p>
            </Link>
            <Link to="/leitura/2" className="border rounded-lg overflow-hidden block group shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-32 bg-azul/70 flex items-center justify-center text-white text-3xl font-serif group-hover:opacity-90 transition-opacity">
                 <span className="font-serif font-bold italic">"Cyber"</span>
              </div>
              <p className="p-4 font-serif text-lg text-gray-700">O Fantasma na Máquina</p>
            </Link>
            <div className="border rounded-lg border-dashed border-gray-300 flex items-center justify-center h-full min-h-[150px] text-gray-400 font-sans">
              Espaço vazio para novas ideias
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default ProfilePage;
