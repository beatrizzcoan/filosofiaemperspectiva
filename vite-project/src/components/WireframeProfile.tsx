interface WireframeProfileProps {
  onNavigate: (screen: string, storyId?: number) => void;
}

export function WireframeProfile({
  onNavigate,
}: WireframeProfileProps) {
  const savedStories = [1, 2, 3];
  const readHistory = [4, 5, 6, 7];

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Page Title */}
      <div className="mb-8">
        <div className="h-12 w-64 border-2 border-gray-400 bg-white flex items-center px-4">
          <span className="text-gray-600">[Meu Perfil]</span>
        </div>
      </div>

      {/* User Info Section */}
      <div className="border-2 border-gray-400 bg-gray-50 p-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 border-2 border-gray-400 bg-white flex items-center justify-center">
            <span className="text-gray-400">👤</span>
          </div>
          <div className="flex-1">
            <div className="h-8 w-48 border-2 border-gray-400 bg-white mb-2"></div>
            <div className="h-6 w-64 border-2 border-gray-400 bg-white"></div>
          </div>
          <button className="px-4 py-2 border-2 border-gray-400 bg-white hover:bg-gray-100 transition-colors">
            [Editar]
          </button>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* CARD 1: Escola Favorita */}
        <div className="border-2 border-gray-400 bg-gray-50 p-6 text-center">
          <div className="h-12 w-12 border-2 border-gray-400 bg-white mx-auto mb-3 flex items-center justify-center">
            <span className="text-gray-500">N</span>{" "}
            {/* Ícone/Imagem da Escola */}
          </div>
          {/* Título mais curto e direto */}
          <div className="h-6 font-bold text-sm border-2 border-gray-400 bg-white mb-2">
            Escola Favorita
          </div>
          {/* Conteúdo específico que cabe no espaço */}
          <div className="h-4 text-xs border-2 border-gray-400 bg-white">
            Existencialismo
          </div>
        </div>

        {/* CARD 2: Filósofo Favorito */}
        <div className="border-2 border-gray-400 bg-gray-50 p-6 text-center">
          <div className="h-12 w-12 border-2 border-gray-400 bg-white mx-auto mb-3 flex items-center justify-center">
            <span className="text-gray-500">N</span>{" "}
            {/* Ícone/Foto do Filósofo */}
          </div>
          {/* Título mais curto e direto */}
          <div className="h-6 font-bold text-sm border-2 border-gray-400 bg-white mb-2">
            Quem te inspira
          </div>
          {/* Conteúdo específico que cabe no espaço */}
          <div className="h-4 text-xs border-2 border-gray-400 bg-white">
            Friedrich Nietzsche
          </div>
        </div>

        {/* CARD 3: Tema Central */}
        <div className="border-2 border-gray-400 bg-gray-50 p-6 text-center">
          <div className="h-12 w-12 border-2 border-gray-400 bg-white mx-auto mb-3 flex items-center justify-center">
            <span className="text-gray-500">N</span>{" "}
            {/* Ícone/Imagem do Tema */}
          </div>
          {/* Título mais curto e direto */}
          <div className="h-6 font-bold text-sm border-2 border-gray-400 bg-white mb-2">
            Tema Central
          </div>
          {/* Conteúdo específico que cabe no espaço */}
          <div className="h-4 text-xs border-2 border-gray-400 bg-white">
            Filosofia Política
          </div>
        </div>
      </div>

      {/* Saved Stories Section */}
      <div className="border-2 border-gray-400 bg-gray-50 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-48 border-2 border-gray-400 bg-white flex items-center px-4">
            <span className="text-gray-600">
              [Histórias Salvas]
            </span>
          </div>
          <button className="px-4 py-2 border-2 border-gray-400 bg-white hover:bg-gray-100 transition-colors">
            [Ver Todas]
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {savedStories.map((id) => (
            <button
              key={id}
              onClick={() => onNavigate("reading", id)}
              className="border-2 border-gray-400 bg-white p-4 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="w-full h-24 border-2 border-gray-400 bg-gray-100 mb-3 flex items-center justify-center">
                <span className="text-gray-400">[#{id}]</span>
              </div>
              <div className="h-6 border-2 border-gray-400 bg-gray-100 mb-2"></div>
              <div className="h-4 border-2 border-gray-400 bg-gray-100"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Reading History Section */}
      <div className="border-2 border-gray-400 bg-gray-50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 w-48 border-2 border-gray-400 bg-white flex items-center px-4">
            <span className="text-gray-600 text-sm">
              [Histórico de Leitura]
            </span>
          </div>
          <button className="px-4 py-2 border-2 border-gray-400 bg-white hover:bg-gray-100 transition-colors">
            [Limpar]
          </button>
        </div>

        <div className="space-y-3">
          {readHistory.map((id) => (
            <button
              key={id}
              onClick={() => onNavigate("reading", id)}
              className="w-full border-2 border-gray-400 bg-white p-4 hover:bg-gray-100 transition-colors flex items-center gap-4"
            >
              <div className="w-16 h-16 border-2 border-gray-400 bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="text-gray-400">[{id}]</span>
              </div>
              <div className="flex-1 text-left">
                <div className="h-6 border-2 border-gray-400 bg-gray-100 mb-2"></div>
                <div className="h-4 w-3/4 border-2 border-gray-400 bg-gray-100"></div>
              </div>
              <div className="w-24 h-4 border-2 border-gray-400 bg-gray-100"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Flow Indicator */}
      <div className="text-center py-4 mt-8">
        <div className="inline-block px-6 py-2 border-2 border-gray-400 bg-gray-200">
          <span className="text-gray-600">
            FLUXO: Perfil ↔ Leitura / Home
          </span>
        </div>
      </div>
    </div>
  );
}