import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Search } from 'lucide-react';

const mockStories = [
  { id: 1, title: "Sobre a arte de recomeçar", tag: "Propósito", img: "a3ccb3/f5f2ec?text=Reflexão", tagColor: "bg-verde text-gray-800" },
  { id: 2, title: "Encontrando calma na ansiedade", tag: "Ansiedade", img: "8fccda/f5f2ec?text=Acolhimento", tagColor: "bg-azul text-white" },
  { id: 3, title: "O que é 'dar conta de tudo'?", tag: "Sobrecarga", img: "f4b6a0/f5f2ec?text=Equilíbrio", tagColor: "bg-rosa text-gray-800" },
  { id: 4, title: "A coragem de ser imperfeito", tag: "Insegurança", img: "8fccda/f5f2ec?text=Jornada", tagColor: "bg-azul text-white" },
  { id: 5, title: "Construindo hábitos com paciência", tag: "Hábitos", img: "a3ccb3/f5f2ec?text=Constância", tagColor: "bg-verde text-gray-800" },
  { id: 6, title: "O sentido da solidão", tag: "Propósito", img: "f4b6a0/f5f2ec?text=Perspectiva", tagColor: "bg-rosa text-gray-800" },
];

const ExplorePage: React.FC = () => {
  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <h2 className="text-4xl font-serif text-center mb-6 text-gray-800">Explore Histórias e Perspectivas</h2>
      
      <div className="mb-8 max-w-2xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="search"
          placeholder="O que você busca hoje? (ex: ansiedade, propósito...)"
          className="bg-white text-base p-6 pl-12 rounded-full shadow-md border-gray-300 focus-visible:ring-verde"
        />
      </div>

      <div className="flex justify-center gap-3 md:gap-4 mb-12">
        <Button variant="outline" className="bg-white shadow-sm rounded-full text-gray-700 hover:bg-gray-100 border-gray-300 focus:bg-gray-100 focus:ring-1 focus:ring-verde">
          Insegurança/Ansiedade
        </Button>
        <Button variant="outline" className="bg-white shadow-sm rounded-full text-gray-700 hover:bg-gray-100 border-gray-300 focus:bg-gray-100 focus:ring-1 focus:ring-verde">
          Falta de Propósito
        </Button>
        <Button variant="outline" className="bg-white shadow-sm rounded-full text-gray-700 hover:bg-gray-100 border-gray-300 focus:bg-gray-100 focus:ring-1 focus:ring-verde">
          Manter Hábitos
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockStories.map((story) => (
          <Card key={story.id} className="bg-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-0 group">
            <Link to={`/leitura/${story.id}`} className="block">
              <div className="w-full h-56 bg-gray-200 overflow-hidden">
                <img 
                  src={`https://placehold.co/600x400/${story.img}`} 
                  alt={story.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-serif text-2xl leading-snug h-16">{story.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={`font-sans text-sm px-4 py-1 rounded-full ${story.tagColor}`}>{story.tag}</Badge>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;