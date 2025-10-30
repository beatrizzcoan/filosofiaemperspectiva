import { useState } from 'react';
import { WireframeNav } from './components/WireframeNav';
import { WireframeLanding } from './components/WireframeLanding';
import { WireframeExplore } from './components/WireframeExplore';
import { WireframeReading } from './components/WireframeReading';
import { WireframeProfile } from './components/WireframeProfile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedStoryId, setSelectedStoryId] = useState<number>(1);

  const handleNavigate = (screen: string, storyId?: number) => {
    setCurrentScreen(screen);
    if (storyId) {
      setSelectedStoryId(storyId);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Screen Indicator */}
      <div className="bg-gray-800 text-white py-2 px-4 text-center">
        <span className="text-sm">WIREFRAME DE BAIXA RESOLUÇÃO - Website Filosófico/Autoajuda</span>
      </div>

      {/* Navigation */}
      <WireframeNav currentScreen={currentScreen} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="min-h-[calc(100vh-120px)]">
        {currentScreen === 'home' && <WireframeLanding onNavigate={handleNavigate} />}
        {currentScreen === 'explore' && <WireframeExplore onNavigate={handleNavigate} />}
        {currentScreen === 'reading' && (
          <WireframeReading onNavigate={handleNavigate} storyId={selectedStoryId} />
        )}
        {currentScreen === 'profile' && <WireframeProfile onNavigate={handleNavigate} />}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-gray-400 bg-gray-100 p-6 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <div className="h-6 w-32 border-2 border-gray-400 bg-white mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 border-2 border-gray-400 bg-white"></div>
                <div className="h-4 border-2 border-gray-400 bg-white"></div>
                <div className="h-4 border-2 border-gray-400 bg-white"></div>
              </div>
            </div>
            <div>
              <div className="h-6 w-32 border-2 border-gray-400 bg-white mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 border-2 border-gray-400 bg-white"></div>
                <div className="h-4 border-2 border-gray-400 bg-white"></div>
              </div>
            </div>
            <div>
              <div className="h-6 w-32 border-2 border-gray-400 bg-white mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 border-2 border-gray-400 bg-white"></div>
                <div className="h-4 border-2 border-gray-400 bg-white"></div>
              </div>
            </div>
            <div>
              <div className="h-6 w-32 border-2 border-gray-400 bg-white mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 border-2 border-gray-400 bg-white"></div>
                <div className="h-4 border-2 border-gray-400 bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Wireflow Legend */}
      <div className="fixed bottom-4 right-4 border-2 border-gray-600 bg-white p-4 shadow-lg">
        <div className="mb-2 border-b-2 border-gray-400 pb-2">
          <span className="text-gray-700">Fluxo de Navegação:</span>
        </div>
        <div className="space-y-1 text-sm text-gray-600">
          <div>1. Home → Explorar</div>
          <div>2. Explorar → Leitura</div>
          <div>3. Leitura ↔ Perfil</div>
          <div>4. Qualquer tela → Nav</div>
        </div>
      </div>
    </div>
  );
}
