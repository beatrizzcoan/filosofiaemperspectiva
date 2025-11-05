import React from 'react';
import { NavLink } from 'react-router-dom';

const Logo = () => (
  <NavLink to="/" className="flex items-center gap-3 text-2xl font-serif font-bold text-gray-800">
    <img src="/logo.png" alt="Logo Filosofia em Perspectiva" className="h-10 w-auto" />
    Filosofia em Perspectiva
  </NavLink>
);

const NavItem = ({ to, label }: { to: string, label: string }) => (
  <NavLink
    to={to}
    end 
    className={({ isActive }) =>
      `font-sans text-lg transition-colors duration-200 px-4 py-2 rounded-lg
       ${isActive 
         ? 'bg-verde/10 text-verde font-semibold' 
         : 'text-gray-600 hover:text-verde'
       }`
    }
  >
    {label}
  </NavLink>
);

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-5 px-10 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <Logo />
      <nav className="flex gap-4 items-center">
        <NavItem to="/" label="Home" />
        <NavItem to="/explorar" label="Explorar" />
        <NavItem to="/perfil" label="Perfil" />
      </nav>
    </header>
  );
};

export default Header;