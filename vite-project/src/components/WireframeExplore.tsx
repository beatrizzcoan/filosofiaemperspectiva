interface WireframeExploreProps {
  onNavigate: (screen: string, storyId?: number) => void;
}

export function WireframeExplore({ onNavigate }: WireframeExploreProps) {
  const stories = [1, 2, 3, 4, 5, 6];

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Page Title */}
      <div className="mb-6">
        <div className="h-10 w-64 border-2 border-gray-400 bg-white flex items-center px-4">
          <span className="text-gray-600">[Explorar Histórias]</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="h-12 border-2 border-gray-400 bg-white flex items-center px-4">
          <span className="text-gray-500">🔍 [Barra de Pesquisa]</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-8">
        <div className="h-8 w-48 border-2 border-gray-400 bg-white flex items-center px-4 mb-4">
          <span className="text-gray-600">[Categorias/Filtros]</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button className="border-2 border-gray-400 bg-gray-100 p-4 hover:bg-gray-200 transition-colors text-left">
            <div className="h-6 border-2 border-gray-400 bg-white mb-2 flex items-center px-2">
              <span className="text-gray-600">Insegurança/Ansiedade</span>
            </div>
            <div className="h-4 border-2 border-gray-400 bg-white"></div>
          </button>
          <button className="border-2 border-gray-400 bg-gray-100 p-4 hover:bg-gray-200 transition-colors text-left">
            <div className="h-6 border-2 border-gray-400 bg-white mb-2 flex items-center px-2">
              <span className="text-gray-600">Falta de Propósito</span>
            </div>
            <div className="h-4 border-2 border-gray-400 bg-white"></div>
          </button>
          <button className="border-2 border-gray-400 bg-gray-100 p-4 hover:bg-gray-200 transition-colors text-left">
            <div className="h-6 border-2 border-gray-400 bg-white mb-2 flex items-center px-2">
              <span className="text-gray-600">Manter Hábitos</span>
            </div>
            <div className="h-4 border-2 border-gray-400 bg-white"></div>
          </button>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="mb-6">
        <div className="h-8 w-48 border-2 border-gray-400 bg-white flex items-center px-4 mb-4">
          <span className="text-gray-600">[Histórias]</span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {stories.map((id) => (
            <button
              key={id}
              onClick={() => onNavigate('reading', id)}
              className="border-2 border-gray-400 bg-gray-50 p-6 hover:bg-gray-100 transition-colors text-left"
            >
              {/* Story Thumbnail */}
              <div className="w-full h-32 border-2 border-gray-400 bg-white mb-4 flex items-center justify-center">
                <span className="text-gray-400">[THUMBNAIL #{id}]</span>
              </div>
              
              {/* Story Title */}
              <div className="h-8 border-2 border-gray-400 bg-white mb-3 flex items-center px-2">
                <span className="text-gray-600">[Título da História]</span>
              </div>
              
              {/* Story Excerpt */}
              <div className="space-y-2 mb-3">
                <div className="h-4 border-2 border-gray-400 bg-white"></div>
                <div className="h-4 border-2 border-gray-400 bg-white"></div>
                <div className="h-4 w-3/4 border-2 border-gray-400 bg-white"></div>
              </div>

              {/* Category Tag */}
              <div className="inline-block px-3 py-1 border-2 border-gray-400 bg-white">
                <span className="text-gray-500">[Tag]</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Flow Indicator */}
      <div className="text-center py-4 mt-8">
        <div className="inline-block px-6 py-2 border-2 border-gray-400 bg-gray-200">
          <span className="text-gray-600">FLUXO: Explorar → Leitura →</span>
        </div>
      </div>
    </div>
  );
}
