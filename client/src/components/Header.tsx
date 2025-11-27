import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Logo = () => (
  <NavLink to="/" className="flex items-center gap-3 text-2xl font-serif font-bold text-gray-800">
    <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
    Filosofia em Perspectiva
  </NavLink>
);

const NavItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `font-sans text-lg transition-colors duration-200 px-4 py-2 rounded-lg
       ${isActive ? "bg-verde/10 text-verde font-semibold" : "text-gray-600 hover:text-verde"}`
    }>
    {label}
  </NavLink>
);

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      className={`flex justify-between items-center p-5 px-10 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}>
      <div className="flex-1">
        <Logo />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
        <nav className="flex gap-4 items-center">
          <NavItem to="/" label="Home" />
          <NavItem to="/explorar" label="Explorar" />
        </nav>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4">
        {isAuthenticated ? (
          <>
            <Button variant="ghost" className="relative rounded-full p-0" onClick={() => navigate("/perfil")}>
              <Avatar className="w-14 h-14 border-2 border-gray-200 shadow-sm">
                <AvatarImage src={user?.avatarUrl ? `http://localhost:8000/${user?.avatarUrl}` : ""} alt={user?.name} className="object-cover" />
                <AvatarFallback className="text-lg bg-gray-200 text-gray-500">{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
            <Button onClick={handleLogout} variant="outline" className="font-sans text-lg border-gray-300 shadow-sm hover:border-verde hover:text-verde">
              Sair
            </Button>
          </>
        ) : (
          <nav className="flex items-center gap-2">
            <NavLink to="/login">
              <Button className="font-sans text-lg bg-verde text-white px-6 hover:bg-verde/90">Login</Button>
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
