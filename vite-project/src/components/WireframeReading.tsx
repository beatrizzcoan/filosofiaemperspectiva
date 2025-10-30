interface WireframeReadingProps {
  onNavigate: (screen: string) => void;
  storyId?: number;
}

export function WireframeReading({ onNavigate, storyId = 1 }: WireframeReadingProps) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('explore')}
        className="mb-6 px-4 py-2 border-2 border-gray-400 bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        ← [Voltar]
      </button>

      {/* Story Content */}
      <div className="border-2 border-gray-400 bg-gray-50 p-8 mb-6">
        {/* Story Title */}
        <div className="mb-6">
          <div className="h-12 border-2 border-gray-400 bg-white flex items-center px-4">
            <span className="text-gray-600">[Título da História #{storyId}]</span>
          </div>
        </div>

        {/* Story Category */}
        <div className="mb-6">
          <div className="inline-block px-4 py-2 border-2 border-gray-400 bg-white">
            <span className="text-gray-500">[Categoria]</span>
          </div>
        </div>

        {/* Story Body */}
        <div className="space-y-4 mb-8">
          <div className="h-4 border-2 border-gray-400 bg-white"></div>
          <div className="h-4 border-2 border-gray-400 bg-white"></div>
          <div className="h-4 border-2 border-gray-400 bg-white"></div>
          <div className="h-4 w-5/6 border-2 border-gray-400 bg-white"></div>
          <div className="h-8 border-2 border-gray-400 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">[Corpo da História - Situação Cotidiana]</span>
          </div>
          <div className="h-4 border-2 border-gray-400 bg-white"></div>
          <div className="h-4 border-2 border-gray-400 bg-white"></div>
          <div className="h-4 border-2 border-gray-400 bg-white"></div>
          <div className="h-4 w-4/5 border-2 border-gray-400 bg-white"></div>
          <div className="h-4 border-2 border-gray-400 bg-white"></div>
          <div className="h-4 w-3/4 border-2 border-gray-400 bg-white"></div>
        </div>

        {/* Philosophical Concept Section */}
        <div className="border-4 border-gray-500 bg-gray-100 p-6 mb-6">
          <div className="h-8 w-64 border-2 border-gray-400 bg-white flex items-center px-4 mb-4">
            <span className="text-gray-600">[Conceito Filosófico]</span>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="h-4 border-2 border-gray-400 bg-white"></div>
            <div className="h-4 border-2 border-gray-400 bg-white"></div>
            <div className="h-4 w-5/6 border-2 border-gray-400 bg-white"></div>
          </div>

          <div className="border-2 border-gray-400 bg-white p-4">
            <div className="h-6 w-48 border-2 border-gray-400 bg-gray-100 mb-2 flex items-center px-2">
              <span className="text-gray-600">[Autor/Filósofo]</span>
            </div>
            <div className="h-4 border-2 border-gray-400 bg-gray-100"></div>
          </div>
        </div>

        {/* Call to Reflection */}
        <div className="border-2 border-gray-400 bg-white p-6 mb-6">
          <div className="h-8 w-56 border-2 border-gray-400 bg-gray-100 flex items-center px-4 mb-4">
            <span className="text-gray-600 text-sm">[Chamada para Reflexão]</span>
          </div>
          <div className="space-y-2">
            <div className="h-4 border-2 border-gray-400 bg-gray-50"></div>
            <div className="h-4 border-2 border-gray-400 bg-gray-50"></div>
            <div className="h-4 w-4/5 border-2 border-gray-400 bg-gray-50"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 border-4 border-gray-600 bg-gray-300 hover:bg-gray-400 transition-colors">
            [Aprofundar Conceito]
          </button>
          <button className="px-6 py-3 border-2 border-gray-400 bg-white hover:bg-gray-100 transition-colors">
            [Salvar]
          </button>
          <button className="px-6 py-3 border-2 border-gray-400 bg-white hover:bg-gray-100 transition-colors">
            [Compartilhar]
          </button>
        </div>
      </div>

      {/* Related Stories */}
      <div className="border-2 border-gray-400 bg-gray-50 p-6">
        <div className="h-8 w-48 border-2 border-gray-400 bg-white flex items-center px-4 mb-4">
          <span className="text-gray-600 text-xs">[Histórias Relacionadas]</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="border-2 border-gray-400 bg-white p-4">
            <div className="h-20 border-2 border-gray-400 bg-gray-100 mb-2"></div>
            <div className="h-4 border-2 border-gray-400 bg-gray-100"></div>
          </div>
          <div className="border-2 border-gray-400 bg-white p-4">
            <div className="h-20 border-2 border-gray-400 bg-gray-100 mb-2"></div>
            <div className="h-4 border-2 border-gray-400 bg-gray-100"></div>
          </div>
          <div className="border-2 border-gray-400 bg-white p-4">
            <div className="h-20 border-2 border-gray-400 bg-gray-100 mb-2"></div>
            <div className="h-4 border-2 border-gray-400 bg-gray-100"></div>
          </div>
        </div>
      </div>

      {/* Flow Indicator */}
      <div className="text-center py-4 mt-8">
        <div className="inline-block px-6 py-2 border-2 border-gray-400 bg-gray-200">
          <span className="text-gray-600">FLUXO: Leitura ↔ Perfil / Explorar</span>
        </div>
      </div>
    </div>
  );
}
