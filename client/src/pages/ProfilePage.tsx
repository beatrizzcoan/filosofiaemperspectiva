import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { Edit2 } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <h2 className="text-4xl font-serif mb-8 text-gray-800">Meu Perfil</h2>

      <Card className="bg-white p-6 md:p-8 mb-10 shadow-xl border-0">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="w-28 h-28 border-4 border-gray-200">
            <AvatarImage src="/ana.png" alt="Ana (Persona)" />
            <AvatarFallback className="text-4xl bg-gray-200">A</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-serif text-gray-900">Ana (Persona)</h3>
            <p className="text-gray-600 text-lg font-sans">ana.persona@email.com</p>
          </div>
          <Button variant="outline" className="border-gray-300 shadow-sm font-sans">
            <Edit2 className="mr-2 h-4 w-4" />
            Editar Perfil
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-white text-center p-4 shadow-lg border-0">
          <CardHeader className="p-2">
            <CardTitle className="text-base font-sans font-semibold text-gray-500 uppercase tracking-wider">Escola Favorita</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-2xl font-serif text-rosa font-bold">Existencialismo</p>
          </CardContent>
        </Card>
        <Card className="bg-white text-center p-4 shadow-lg border-0">
          <CardHeader className="p-2">
            <CardTitle className="text-base font-sans font-semibold text-gray-500 uppercase tracking-wider">Quem te inspira</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-2xl font-serif text-azul font-bold">Simone de Beauvoir</p>
          </CardContent>
        </Card>
        <Card className="bg-white text-center p-4 shadow-lg border-0">
          <CardHeader className="p-2">
            <CardTitle className="text-base font-sans font-semibold text-gray-500 uppercase tracking-wider">Tema Central</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <p className="text-2xl font-serif text-verde font-bold">Busca por Propósito</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white p-6 md:p-8 mb-10 shadow-xl border-0">
        <CardHeader className="p-0 mb-6 flex flex-row justify-between items-center">
          <CardTitle className="text-3xl font-serif text-gray-800">Histórias Salvas</CardTitle>
          <Button variant="link" className="text-verde text-lg p-0 h-auto hover:text-verde/80 font-sans">[Ver Todas]</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-3 gap-6">
            <Link to="/leitura/1" className="border rounded-lg overflow-hidden block group shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-32 bg-rosa/70 flex items-center justify-center text-white text-3xl font-serif group-hover:opacity-90 transition-opacity">
                [#1]
              </div>
              <p className="p-4 font-serif text-lg text-gray-700">Sobre a arte de recomeçar</p>
            </Link>
            <Link to="/leitura/2" className="border rounded-lg overflow-hidden block group shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-32 bg-azul/70 flex items-center justify-center text-white text-3xl font-serif group-hover:opacity-90 transition-opacity">
                [#2]
              </div>
              <p className="p-4 font-serif text-lg text-gray-700">Encontrando calma...</p>
            </Link>
            <Link to="/leitura/3" className="border rounded-lg overflow-hidden block group shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-32 bg-verde/70 flex items-center justify-center text-white text-3xl font-serif group-hover:opacity-90 transition-opacity">
                [#3]
              </div>
              <p className="p-4 font-serif text-lg text-gray-700">O que é 'dar conta'?</p>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white p-6 md:p-8 shadow-xl border-0">
        <CardHeader className="p-0 mb-6 flex flex-row justify-between items-center">
          <CardTitle className="text-3xl font-serif text-gray-800">Histórico de Leitura</CardTitle>
          <Button variant="link" className="text-gray-500 text-lg p-0 h-auto hover:text-gray-700 font-sans">[Limpar]</Button>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="space-y-4">
            <li className="flex items-center gap-6 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <img src="https://placehold.co/100x100/8fccda/f5f2ec?text=História" alt="História 4" className="w-20 h-20 rounded-md flex-shrink-0 object-cover" />
              <p className="font-serif text-xl flex-1 text-gray-700">A coragem de ser imperfeito</p>
              <Button variant="outline" size="sm" className="font-sans">Ler de novo</Button>
            </li>
            <Separator />
            <li className="flex items-center gap-6 p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <img src="https://placehold.co/100x100/a3ccb3/f5f2ec?text=História" alt="História 5" className="w-20 h-20 rounded-md flex-shrink-0 object-cover" />
              <p className="font-serif text-xl flex-1 text-gray-700">O sentido da solidão</p>
              <Button variant="outline" size="sm" className="font-sans">Ler de novo</Button>
            </li>
          </ul>
        </CardContent>
      </Card>

    </div>
  );
};

export default ProfilePage;