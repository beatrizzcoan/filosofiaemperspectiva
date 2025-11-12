import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { ArrowRight, Coffee, MapPin, Wind } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-8 py-16">
      
      <section className="text-center bg-white p-12 md:p-20 rounded-xl shadow-xl max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Encontre Perspectiva na Filosofia
        </h1>
        <h2 className="font-sans text-2xl text-gray-600 mb-8">
          Um guia de acolhimento para os desafios do dia a dia.
        </h2>
        <p className="font-sans text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Você não está sozinho(a) nessa busca. Explore histórias que conectam
          os desafios do dia a dia com a sabedoria filosófica.
        </p>
        <Button 
          asChild 
          size="lg" 
          className="bg-verde text-gray-800 hover:bg-verde/90 font-bold text-lg py-7 px-10 rounded-full shadow-lg transition-transform hover:scale-105"
        >
          <Link to="/explorar">
            Começar a Explorar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>

      <section className="mt-20">
        <h3 className="text-3xl font-serif text-center mb-10 text-gray-700">Reflexões para o seu cotidiano</h3>
        <div className="grid md:grid-cols-3 gap-8">
          
          <Card className="bg-white shadow-lg border-0 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <CardHeader className="items-center">
              <div className="w-20 h-20 rounded-full bg-rosa/20 flex items-center justify-center mb-4">
                <Coffee className="text-rosa" size={40} strokeWidth={1.5} />
              </div>
              <CardTitle className="font-serif text-2xl">Lidando com a Sobrecarga</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-sans text-gray-600 leading-relaxed">
                Uma reflexão sobre como encontrar paz e equilíbrio em meio ao caos diário.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg border-0 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <CardHeader className="items-center">
              <div className="w-20 h-20 rounded-full bg-azul/20 flex items-center justify-center mb-4">
                <MapPin className="text-azul" size={40} strokeWidth={1.5} />
              </div>
              <CardTitle className="font-serif text-2xl">Buscando Propósito</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-sans text-gray-600 leading-relaxed">
                Inspirado em Viktor Frankl, como buscar sentido nas pequenas coisas da vida.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <CardHeader className="items-center">
              <div className="w-20 h-20 rounded-full bg-verde/20 flex items-center justify-center mb-4">
                <Wind className="text-verde" size={40} strokeWidth={1.5} />
              </div>
              <CardTitle className="font-serif text-2xl">Navegando a Ansiedade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-sans text-gray-600 leading-relaxed">
                Uma perspectiva filosófica para abraçar a incerteza e encontrar calma.
              </p>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  );
};

export default HomePage;