interface WireframeLandingProps {
  onNavigate: (screen: string) => void;
}

export function WireframeLanding({ onNavigate }: WireframeLandingProps) {
  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Hero Section */}
      <div className="border-2 border-gray-400 p-12 bg-gray-50 text-center mb-8">
        {/* Title */}
        <div className="w-full max-w-2xl mx-auto mb-4">
          <div className="h-12 border-2 border-gray-400 bg-white mb-4 flex items-center justify-center">
            <span className="text-gray-600">[TÍTULO PRINCIPAL]</span>
          </div>
        </div>

        {/* Subtitle */}
        <div className="w-full max-w-3xl mx-auto mb-6">
          <div className="h-8 border-2 border-gray-400 bg-white mb-2 flex items-center justify-center">
            <span className="text-gray-500">[Subtítulo - Proposta de Valor]</span>
          </div>
        </div>

        {/* Impact Phrase */}
        <div className="w-full max-w-2xl mx-auto mb-8">
          <div className="h-20 border-2 border-gray-400 bg-white flex items-center justify-center p-4">
            <span className="text-gray-500 text-center">
              [Frase de impacto que motiva o usuário a explorar histórias que conectam situações cotidianas com sabedoria filosófica]
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onNavigate('explore')}
          className="px-12 py-4 border-4 border-gray-600 bg-gray-300 hover:bg-gray-400 transition-colors"
        >
          [COMEÇAR A EXPLORAR] →
        </button>
      </div>

      {/* Value Propositions */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="border-2 border-gray-400 p-6 bg-gray-50">
          <div className="w-16 h-16 border-2 border-gray-400 bg-white mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-500">□</span>
          </div>
          <div className="h-6 border-2 border-gray-400 bg-white mb-3">Em destque hoje</div>
          <div className="h-16 border-2 border-gray-400 bg-white"></div>
        </div>
        <div className="border-2 border-gray-400 p-6 bg-gray-50">
          <div className="w-16 h-16 border-2 border-gray-400 bg-white mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-500">○</span>
          </div>
          <div className="h-6 border-2 border-gray-400 bg-white mb-3">[Tema]</div>
          <div className="h-16 border-2 border-gray-400 bg-white"></div>
        </div>
        <div className="border-2 border-gray-400 p-6 bg-gray-50">
          <div className="w-16 h-16 border-2 border-gray-400 bg-white mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-500">△</span>
          </div>
          <div className="h-6 border-2 border-gray-400 bg-white mb-3">[Tema]</div>
          <div className="h-16 border-2 border-gray-400 bg-white"></div>
        </div>
      </div>

      {/* Flow Indicator */}
      <div className="text-center py-4">
        <div className="inline-block px-6 py-2 border-2 border-gray-400 bg-gray-200">
          <span className="text-gray-600">FLUXO: Home → Explorar →</span>
        </div>
      </div>
    </div>
  );
}
