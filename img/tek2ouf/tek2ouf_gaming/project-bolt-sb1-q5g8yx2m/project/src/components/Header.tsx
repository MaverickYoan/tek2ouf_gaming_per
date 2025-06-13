import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Gamepad2, Zap } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Zap },
    { path: '/games', label: 'Jeux', icon: Gamepad2 },
    { path: '/add-game', label: 'Ajouter Jeu' },
    { path: '/add-user', label: 'Nouvel Utilisateur' },
    { path: '/games-list', label: 'Liste' },
    { path: '/login', label: 'Connexion' },
    { path: '/admin', label: 'Administration' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-green-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Gamepad2 className="h-8 w-8 text-green-400 group-hover:text-yellow-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-green-400/20 blur-lg group-hover:bg-yellow-400/20 transition-colors duration-300"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent animate-pulse">
              TeK2OuF
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 relative group ${
                    isActive(item.path)
                      ? 'bg-green-500/20 text-yellow-400 shadow-lg shadow-green-500/20'
                      : 'text-green-400 hover:text-yellow-400 hover:bg-green-500/10'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {Icon && <Icon className="h-4 w-4" />}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {isActive(item.path) && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-lg blur-sm"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-green-400 hover:text-yellow-400 hover:bg-green-500/10 transition-colors duration-300"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-500/30">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-green-500/20 text-yellow-400'
                        : 'text-green-400 hover:text-yellow-400 hover:bg-green-500/10'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;