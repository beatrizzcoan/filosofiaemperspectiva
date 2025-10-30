interface WireframeNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function WireframeNav({ currentScreen, onNavigate }: WireframeNavProps) {
  return (
    <div className="border-b-2 border-gray-400 bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo/Brand Area */}
        <div className="w-32 h-8 border-2 border-gray-400 bg-white flex items-center justify-center">
          <span className="text-gray-500">LOGO</span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <button
            onClick={() => onNavigate('home')}
            className={`px-4 py-2 border-2 ${
              currentScreen === 'home' ? 'border-gray-600 bg-gray-300' : 'border-gray-400 bg-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('explore')}
            className={`px-4 py-2 border-2 ${
              currentScreen === 'explore' ? 'border-gray-600 bg-gray-300' : 'border-gray-400 bg-white'
            }`}
          >
            Explorar
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`px-4 py-2 border-2 ${
              currentScreen === 'profile' ? 'border-gray-600 bg-gray-300' : 'border-gray-400 bg-white'
            }`}
          >
            Perfil
          </button>
        </div>
      </div>
    </div>
  );
}
