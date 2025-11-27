import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthService } from "../api/auth";
import { StoryService, Story } from "../api/stories";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Edit2, Loader2, Save, Lock, User as UserIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savedStories, setSavedStories] = useState<Story[]>([]);

  useEffect(() => {
    if (user) {
      const fetchSavedStories = async () => {
        try {
          const stories = await StoryService.getSavedStories(user.id);
          setSavedStories(stories);
        } catch (error) {
          console.error("Erro ao buscar histórias salvas:", error);
          toast.error("Não foi possível carregar as histórias salvas.");
        }
      };
      fetchSavedStories();
    }
  }, [user]);

  useEffect(() => {
    if (isEditing && user) {
      setName(user.name);
      setAvatarFile(null);
      setOldPassword("");
      setNewPassword("");
    }
  }, [isEditing, user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    if (avatarFile) {
      formData.append("profile_picture", avatarFile);
    }

    try {
      const updatedUser = await AuthService.updateProfile(formData);
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

  const handleRemoveAvatar = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("avatarUrl", ""); // Signal to remove avatar

    try {
      const updatedUser = await AuthService.updateProfile(formData);
      updateUser(updatedUser);
      setIsEditing(false);
      toast.success("Foto de perfil removida com sucesso!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao remover a foto de perfil");
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

  const handleRemoveStory = async (storyId: number) => {
    if (!user) return;
    try {
      await StoryService.removeSavedStory(user.id, storyId);
      setSavedStories(savedStories.filter(story => story.id !== storyId));
      toast.success("História removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover história:", error);
      toast.error("Erro ao remover história.");
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-8 max-w-5xl min-h-screen">
      <h2 className="text-4xl font-serif mb-8 text-gray-800">Meu Perfil</h2>

      <Card className="bg-white p-6 md:p-8 mb-10 shadow-xl border-0">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-28 h-28 border-4 border-gray-200 shadow-sm">
            <AvatarImage src={user.avatarUrl ? `http://localhost:8000/${user.avatarUrl}` : ""} alt={user.name} className="object-cover" />
            <AvatarFallback className="text-4xl bg-gray-200 text-gray-500">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left space-y-1">
            <h3 className="text-3xl font-serif text-gray-900 font-bold">{user.name}</h3>
            <p className="text-gray-500 text-lg font-sans">{user.email}</p>
            <div className="pt-2">
              <span className="inline-block bg-verde/20 text-verde-dark text-xs px-2 py-1 rounded-full font-bold">Membro Explorador</span>
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
                <DialogDescription>Faça alterações no seu perfil ou segurança aqui.</DialogDescription>
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
                        <Input id="name" value={name} onChange={e => setName(e.target.value)} className="pl-9" placeholder="Seu nome" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar">Foto de Perfil</Label>
                      <Input
                        id="avatar"
                        type="file"
                        onChange={e => setAvatarFile(e.target.files ? e.target.files[0] : null)}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-verde/20 file:text-verde-dark hover:file:bg-verde/30 file:leading-none"
                      />
                      <p className="text-xs text-gray-500">Selecione uma imagem para seu novo avatar.</p>
                      {user.avatarUrl && (
                        <Button type="button" variant="link" className="text-red-500 p-0 h-auto" onClick={handleRemoveAvatar} disabled={isLoading}>
                          Remover foto
                        </Button>
                      )}
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
                          onChange={e => setOldPassword(e.target.value)}
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
                          onChange={e => setNewPassword(e.target.value)}
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
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-3xl font-serif text-gray-800">Histórias Salvas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {savedStories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedStories.map(story => (
                <Card
                  key={story.id}
                  className="bg-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-0 group h-full flex flex-col">
                  <Link to={`/leitura/${story.id}`} className="block flex-1 flex flex-col">
                    <div className="w-full h-40 bg-gray-200 overflow-hidden relative">
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-serif text-xl leading-snug">{story.title}</CardTitle>
                    </CardHeader>
                  </Link>
                  <CardContent className="mt-auto flex justify-between items-center">
                    <Badge className={`font-sans text-xs px-3 py-1 rounded-full shadow-sm ${story.tagColor}`}>{story.tag}</Badge>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveStory(story.id)} title="Remover história">
                      <Trash2 className="h-5 w-5 text-gray-400 hover:text-red-500 transition-colors" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
              <p className="text-lg font-serif">Você ainda não salvou nenhuma história.</p>
              <Button asChild variant="link" className="mt-2 text-verde text-lg">
                <Link to="/explorar">Explore e encontre novas perspectivas</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
