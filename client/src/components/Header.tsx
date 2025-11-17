import React, { useState, useEffect } from 'react';
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
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          // if scroll down hide the navbar
          setVisible(false);
        } else {
          // if scroll up show the navbar
          setVisible(true);
        }
        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header
      className={`relative flex justify-between items-center p-5 px-10 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <div className="flex-1">
        <Logo />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">
        <nav className="flex gap-4 items-center">
          <NavItem to="/" label="Home" />
          <NavItem to="/explorar" label="Explorar" />
        </nav>
      </div>
      <div className="flex-1 flex justify-end">
        <nav className="flex items-center">
          <NavLink to="/login" className="font-sans text-lg bg-verde text-white px-6 py-2 rounded-lg hover:bg-verde/90 transition-colors duration-200">
            Login
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
