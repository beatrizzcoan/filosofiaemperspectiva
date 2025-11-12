import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '@/components/Header'; 
import HomePage from '@/pages/HomePage';  
import ExplorePage from '@/pages/ExplorePage'; 
import ProfilePage from '@/pages/ProfilePage'; 
function App() {
  return (
    <div className="min-h-screen bg-bege">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explorar" element={<ExplorePage />} />
          <Route path="/perfil" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;