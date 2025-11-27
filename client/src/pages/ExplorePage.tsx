import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Bookmark, Search } from "lucide-react";
import { StoryService, Story } from "@/api/stories";
import { Skeleton } from "../components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";

const ExplorePage: React.FC = () => {
  const { user } = useAuth();
  const [tags, setTags] = useState<string[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [savedStories, setSavedStories] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [storiesData, savedStoriesData] = await Promise.all([
          StoryService.getAll(),
          user ? StoryService.getSavedStories(user.id) : Promise.resolve([]),
        ]);

        setStories(storiesData);
        setSavedStories(savedStoriesData.map(s => s.id));

        const uniqueTags = Array.from(new Set(storiesData.map(story => story.tag)));
        setTags(uniqueTags);
      } catch (error) {
        console.error("Erro ao carregar histórias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [user]);

  const handleSaveStory = async (storyId: number) => {
    if (!user) return;
    try {
      await StoryService.saveStory(user.id, storyId);
      setSavedStories([...savedStories, storyId]);
    } catch (error) {
      console.error("Erro ao salvar história:", error);
    }
  };

  const handleRemoveStory = async (storyId: number) => {
    if (!user) return;
    try {
      await StoryService.removeSavedStory(user.id, storyId);
      setSavedStories(savedStories.filter(id => id !== storyId));
    } catch (error) {
      console.error("Erro ao remover história:", error);
    }
  };

  const filteredStories = stories.filter(
    story => story.title.toLowerCase().includes(searchTerm.toLowerCase()) || story.tag.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto p-8 max-w-7xl min-h-screen">
      <h2 className="text-4xl font-serif text-center mb-6 text-gray-800">Explore Perspectivas</h2>

      <div className="mb-8 max-w-2xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="search"
          placeholder="Busque por título, tema ou sentimento..."
          className="bg-white text-base p-6 pl-12 rounded-full shadow-md border-gray-300 focus-visible:ring-verde"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
        {tags.map(tag => (
          <Button
            key={tag}
            variant="outline"
            onClick={() => setSearchTerm(tag)}
            className="bg-white shadow-sm rounded-full text-gray-700 hover:bg-gray-100 border-gray-300">
            {tag}
          </Button>
        ))}
        {searchTerm && (
          <Button variant="ghost" onClick={() => setSearchTerm("")} className="text-gray-500 hover:text-red-500">
            Limpar filtros
          </Button>
        )}
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-56 w-full rounded-xl" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map(story => (
            <Card
              key={story.id}
              className="bg-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-0 group h-full flex flex-col">
              <Link to={`/leitura/${story.id}`} className="block flex-1 flex flex-col">
                <div className="w-full h-56 bg-gray-200 overflow-hidden relative">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl leading-snug">{story.title}</CardTitle>
                </CardHeader>
              </Link>
              <CardContent className="mt-auto flex justify-between items-center">
                <Badge className="text-gray-500 bg-gray-50 font-sans text-sm px-4 py-1 rounded-full shadow-sm">{story.tag}</Badge>
                {user && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => (savedStories.includes(story.id) ? handleRemoveStory(story.id) : handleSaveStory(story.id))}>
                    <Bookmark className={savedStories.includes(story.id) ? "text-verde fill-current" : "text-gray-400"} />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

          {filteredStories.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p className="text-lg font-serif">Nenhuma história encontrada para sua busca.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
