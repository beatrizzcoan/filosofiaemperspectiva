import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { User, LogOut } from 'lucide-react';

const Logo = () => (
  <NavLink to="/" className="flex items-center gap-3 text-2xl font-serif font-bold text-gray-800">
    <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
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
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => window.removeEventListener('scroll', controlNavbar);
    }
  }, [lastScrollY]);

  return (
    <header
      className={`flex justify-between items-center p-5 px-10 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border border-gray-200">
                  <AvatarImage src="/avatar-placeholder.png" alt={user?.name} />
                  <AvatarFallback className="bg-verde/20 text-verde-dark font-bold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/perfil')}>
                <User className="mr-2 h-4 w-4" />
                <span>Meu Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <nav className="flex items-center gap-2">
             <NavLink to="/login">
               <Button className="font-sans text-lg bg-verde text-white px-6 hover:bg-verde/90">
                 Login
               </Button>
             </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
