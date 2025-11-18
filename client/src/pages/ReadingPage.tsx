import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Send, Bookmark, Share2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

const ReadingPage: React.FC = () => {
  const { storyId } = useParams();
  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <Button
        asChild
        variant="outline"
        className="mb-8 bg-white shadow-sm border-gray-300 font-sans text-gray-600"
      >
        <Link to="/explorar">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Exploração
        </Link>
      </Button>

      <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl border-0">
        <h1 className="font-serif text-4xl font-bold mb-4 text-gray-900">
          [Título da História #{storyId}]
        </h1>
        <p className="font-sans text-lg text-gray-600 leading-relaxed mb-6">
          Isto é o início do corpo do texto. A filosofia vai além do pensamento
          abstrato - ela nos ajuda a compreender o sofrimento, buscar sentido e
          transformar dificuldades em aprendizado.
        </p>
        <p className="font-sans text-lg text-gray-600 leading-relaxed mb-6">
          Inspirados por Viktor Frankl e Simone de Beauvoir, usamos a filosofia
          como um caminho para o autoconhecimento e o equilíbrio emocional no
          cotidiano.
        </p>

        <img
          src={`https://placehold.co/800x400/a3ccb3/f5f2ec?text=Sabedoria`}
          alt="Conceito filosófico"
          className="w-full h-auto rounded-lg my-8"
        />

        <div className="bg-bege/60 p-6 rounded-lg my-8 border border-verde/50">
          <h3 className="font-serif text-2xl text-verde mb-3">
            [Conceito Filosófico]
          </h3>
          <p className="font-sans text-gray-700 leading-relaxed">
            "Compreender o mundo começa por compreender a si mesmo." - Mario
            Sergio Cortella
          </p>
          <p className="font-sans text-gray-700 leading-relaxed mt-4">
            [Aqui entraria a explicação do conceito filosófico, por exemplo, de
            Viktor Frankl, aplicado a esta história.]
          </p>
        </div>

        <p className="font-sans text-lg text-gray-600 leading-relaxed mb-8">
          [Conclusão e reflexão final da história, com a linguagem humanizada e
          de acolhimento, convidando o usuário à reflexão.]
        </p>

        <Separator className="my-8" />

        <div className="flex justify-between items-center">
          <p className="font-sans text-gray-500">Gostou desta reflexão?</p>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="border-gray-300">
              <Bookmark className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="outline" size="icon" className="border-gray-300">
              <Share2 className="h-5 w-5 text-gray-600" />
            </Button>
            <Button className="bg-verde text-gray-800 hover:bg-verde/90 font-sans">
              <Send className="mr-2 h-4 w-4" />
              Comentar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingPage;
