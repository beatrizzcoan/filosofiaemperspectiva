import { Routes, Route } from "react-router-dom";

import Header from "@/components/Header";
import HomePage from "@/pages/HomePage";
import ExplorePage from "@/pages/ExplorePage";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ReadingPage from "@/pages/ReadingPage";

function App() {
  return (
    <div className="min-h-screen bg-bege">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explorar" element={<ExplorePage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/leitura/:storyId" element={<ReadingPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
