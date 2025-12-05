import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Send, Bookmark, Share2, Clock, BookOpen, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import { StoryService, Story } from "../api/stories";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const ReadingPage: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const { user } = useAuth();

  const [story, setStory] = useState<Story | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReflectDialogOpen, setReflectDialogOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchStory = async () => {
      if (!storyId) {
        if (isMounted) setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const storyData = await StoryService.getById(storyId);
        if (isMounted) {
          setStory(storyData);
        }

        if (user && isMounted) {
          const savedStories = await StoryService.getSavedStories(user.id);
          if (savedStories.some(s => s.id === storyData.id)) {
            setIsSaved(true);
          }
        }
      } catch (err) {
        console.error("Erro ao buscar história:", err);
        if (isMounted) {
          setError("Não conseguimos encontrar essa reflexão. Talvez ela exista apenas na memória.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStory();

    return () => {
      isMounted = false;
    };
  }, [storyId, user]);

  const handleToggleSave = async () => {
    if (!user || !story) return;

    try {
      if (isSaved) {
        await StoryService.removeSavedStory(user.id, story.id);
        setIsSaved(false);
        toast.success("História removida das suas guardadas.", {
          position: "top-right",
        });
      } else {
        await StoryService.saveStory(user.id, story.id);
        setIsSaved(true);
        toast.success("História guardada para uma futura reflexão.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar o status da história:", error);
      toast.error("Ocorreu um erro ao guardar a história. Tente novamente.", {
        position: "top-right",
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link da reflexão copiado para a área de transferência!", {
      position: "top-right",
    });
  };
  // Estado de Carregamento (Feedback Visual)
  if (loading) {
    return (
      <div className="container mx-auto p-6 md:p-12 max-w-3xl min-h-screen animate-pulse">
        <div className="flex items-center gap-4 mb-10">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="space-y-6 text-center">
          <div className="flex justify-center gap-2 mb-6">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>
          <Skeleton className="h-12 w-3/4 mx-auto rounded-lg" />
          <Skeleton className="h-6 w-1/2 mx-auto rounded-lg opacity-60" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-2xl mt-10 shadow-sm" />
        <div className="space-y-4 mt-10">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  // Estado de Erro (Recuperação de Erro)
  if (error || !story) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[80vh] text-center max-w-lg">
        <div className="bg-red-50 p-6 rounded-full mb-6 animate-in zoom-in duration-300">
          <BookOpen className="h-12 w-12 text-red-300" />
        </div>
        <h2 className="text-3xl font-serif text-gray-800 mb-4">Página não encontrada</h2>
        <p className="text-gray-600 mb-8 font-sans text-lg leading-relaxed">
          {error || "Parece que você tentou acessar uma história que não existe ou o link está quebrado."}
        </p>
        <Button asChild size="lg" className="bg-verde hover:bg-verde/90 text-gray-900 font-semibold rounded-full px-8">
          <Link to="/explorar">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar para Exploração
          </Link>
        </Button>
      </div>
    );
  }

  // Estado de Sucesso (Leitura)
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {" "}
      {/* Cor de fundo 'Papel' para conforto visual */}
      <div className="container mx-auto p-6 md:p-12 max-w-4xl">
        {/* Navegação Superior */}
        <nav className="mb-8 sticky top-4 z-10">
          <Button
            asChild
            variant="ghost"
            className="group pl-0 hover:bg-white/80 hover:text-verde text-gray-600 font-sans transition-all backdrop-blur-sm pr-4 rounded-full">
            <Link to="/explorar" className="flex items-center gap-2">
              <div className="bg-white shadow-sm border border-gray-200 p-2 rounded-full group-hover:border-verde group-hover:text-verde transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span className="font-medium">Voltar</span>
            </Link>
          </Button>
        </nav>

        <main className="bg-white p-8 md:p-16 rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Cabeçalho Semântico */}
          <header className="mb-12 text-center">
            <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
              <Badge className="text-gray-500 bg-gray-50 font-sans text-sm px-4 py-1 rounded-full shadow-sm">{story.tag}</Badge>
              <span className="text-gray-300 text-sm">•</span>
              <div className="flex items-center gap-1.5 text-gray-500 font-sans text-sm font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                <Clock className="w-3.5 h-3.5" />
                <span>5 min de leitura</span>
              </div>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-[1.15] tracking-tight">{story.title}</h1>
          </header>

          {/* Imagem Imersiva */}
          <figure className="relative w-full h-[300px] md:h-[500px] mb-16 rounded-2xl overflow-hidden shadow-lg group">
            <img
              src={story.imageUrl}
              alt={`Ilustração sobre ${story.title}`}
              className="w-full h-full object-cover transform transition-transform duration-[1.5s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </figure>

          {/* Corpo do Texto (Tipografia Focada) */}
          {/* A classe .html-content deve estar definida no index.css */}
          <div
            className="html-content max-w-2xl mx-auto prose prose-lg prose-stone prose-headings:font-serif prose-headings:text-gray-900 prose-p:font-sans prose-p:text-gray-700 prose-p:leading-8 prose-blockquote:border-l-verde prose-blockquote:text-gray-600 prose-blockquote:font-serif prose-blockquote:italic"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />

          <Separator className="my-16 bg-stone-200" />

          {/* Footer Interativo */}
          <section className="bg-[#f8f7f4] p-8 rounded-2xl border border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <h3 className="font-serif text-xl text-gray-900 font-bold mb-1">Gostou dessa reflexão?</h3>
              <p className="text-gray-600 text-sm font-sans">Guarde este momento ou compartilhe com alguém.</p>
            </div>

            <div className="flex items-center gap-3">
              {user && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full border-gray-300 bg-white hover:border-verde hover:text-verde hover:bg-verde/5 transition-all shadow-sm"
                  title={isSaved ? "Remover História" : "Salvar História"}
                  onClick={handleToggleSave}>
                  <Bookmark className={`h-5 w-5 transition-colors ${isSaved ? "text-verde fill-current" : "text-gray-400"}`} />
                </Button>
              )}
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-gray-300 bg-white hover:border-azul hover:text-azul hover:bg-azul/5 transition-all shadow-sm"
                title="Compartilhar"
                onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
              <Dialog open={isReflectDialogOpen} onOpenChange={setReflectDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="h-12 bg-verde text-gray-900 hover:bg-verde/90 font-sans font-bold rounded-full px-8 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <Send className="mr-2 h-4 w-4" />
                    Refletir
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg bg-white rounded-2xl shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl text-gray-900">Qual a sua reflexão?</DialogTitle>
                    <DialogClose className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"></DialogClose>
                  </DialogHeader>
                  <div className="py-6">
                    <Textarea
                      placeholder="Escreva aqui os seus pensamentos, sentimentos ou uma pequena anotação sobre esta história..."
                      className="min-h-[180px] text-base font-sans p-4 rounded-lg"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      setReflectDialogOpen(false);
                      toast.success("Sua reflexão foi anotada em seu coração.", {
                        position: "top-right",
                      });
                    }}
                    className="w-full h-12 bg-verde text-gray-900 hover:bg-verde/90 font-sans font-bold rounded-full text-base">
                    Concluir Reflexão
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </main>

        <footer className="text-center mt-12 mb-8 text-gray-400 text-sm font-sans">
          <p>© 2025 Filosofia em Perspectiva. Ler é um ato de coragem.</p>
        </footer>
      </div>
    </div>
  );
};

export default ReadingPage;
