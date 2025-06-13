import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useGames } from '../context/GameContext';
import { Shield, Users, Gamepad2, BarChart3, Settings, Database, Activity, TrendingUp } from 'lucide-react';

const Admin = () => {
  const { user, isAdmin, logout } = useAuth();
  const { games } = useGames();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAdmin) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-3xl font-bold text-red-400 mb-4">Accès Refusé</h2>
        <p className="text-green-300/80 mb-8">
          Vous devez être administrateur pour accéder à cette page
        </p>
        <a
          href="/"
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105"
        >
          Retour à l'Accueil
        </a>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Jeux',
      value: games.length,
      icon: Gamepad2,
      color: 'from-green-400 to-yellow-400',
      change: '+12%'
    },
    {
      title: 'Utilisateurs Actifs',
      value: '2,547',
      icon: Users,
      color: 'from-blue-400 to-green-400',
      change: '+8%'
    },
    {
      title: 'Note Moyenne',
      value: (games.reduce((acc, game) => acc + game.rating, 0) / games.length).toFixed(1),
      icon: BarChart3,
      color: 'from-yellow-400 to-orange-400',
      change: '+0.2'
    },
    {
      title: 'Revenus',
      value: '€' + games.reduce((acc, game) => acc + game.price, 0).toFixed(0),
      icon: TrendingUp,
      color: 'from-purple-400 to-pink-400',
      change: '+15%'
    }
  ];

  const recentGames = games.slice(-5).reverse();

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: BarChart3 },
    { id: 'games', label: 'Gestion Jeux', icon: Gamepad2 },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'database', label: 'Base de Données', icon: Database },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent mb-2">
            Administration
          </h1>
          <p className="text-lg text-green-300/80">
            Bienvenue, {user?.username} - Panneau de contrôle TeK2OuF
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-lg border border-green-500/30">
            <Shield className="h-5 w-5 text-green-400" />
            <span className="text-green-400 font-medium">Admin</span>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-green-500/20 text-yellow-400 border border-green-500/30'
                    : 'text-green-400 hover:text-yellow-400 hover:bg-green-500/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 hover:border-yellow-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} bg-opacity-20`}>
                      <Icon className="h-6 w-6 text-green-400 group-hover:text-yellow-400 transition-colors duration-300" />
                    </div>
                    <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400 mb-1">{stat.value}</div>
                  <div className="text-green-300/80 text-sm">{stat.title}</div>
                </div>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Games */}
            <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center space-x-2">
                <Gamepad2 className="h-5 w-5" />
                <span>Jeux Récents</span>
              </h3>
              <div className="space-y-3">
                {recentGames.map((game) => (
                  <div key={game.id} className="flex items-center space-x-3 p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="text-green-400 font-medium">{game.title}</div>
                      <div className="text-green-300/60 text-sm">{game.genre} - {game.price.toFixed(2)}€</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>État du Système</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-green-300">Base de Données</span>
                  <span className="text-green-400 font-medium">✅ Opérationnelle</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-300">Serveur Web</span>
                  <span className="text-green-400 font-medium">✅ En ligne</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-300">API</span>
                  <span className="text-green-400 font-medium">✅ Fonctionnelle</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-300">Stockage</span>
                  <span className="text-yellow-400 font-medium">⚠️ 78% utilisé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'database' && (
        <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center space-x-2">
            <Database className="h-6 w-6" />
            <span>Configuration Base de Données</span>
          </h3>
          
          <div className="space-y-6">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <h4 className="text-lg font-bold text-green-400 mb-4">PostgreSQL + pgAdmin</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-green-400">Configuration Docker:</strong>
                  <ul className="mt-2 space-y-1 text-green-300/80">
                    <li>• PostgreSQL 15</li>
                    <li>• pgAdmin 4</li>
                    <li>• Port: 5432 (DB), 8080 (pgAdmin)</li>
                    <li>• Volume persistant</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-green-400">Tables:</strong>
                  <ul className="mt-2 space-y-1 text-green-300/80">
                    <li>• games (catalogue)</li>
                    <li>• users (utilisateurs)</li>
                    <li>• categories (genres)</li>
                    <li>• reviews (avis)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-400 font-medium">
                💡 Pour une implémentation complète avec Docker, PostgreSQL et pgAdmin, 
                consultez la documentation technique ou contactez l'équipe de développement.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs content would go here */}
      {activeTab !== 'dashboard' && activeTab !== 'database' && (
        <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h3 className="text-2xl font-bold text-green-400 mb-2">Section en Développement</h3>
          <p className="text-green-300/80">
            Cette section sera bientôt disponible dans une version future de TeK2OuF
          </p>
        </div>
      )}
    </div>
  );
};

export default Admin;