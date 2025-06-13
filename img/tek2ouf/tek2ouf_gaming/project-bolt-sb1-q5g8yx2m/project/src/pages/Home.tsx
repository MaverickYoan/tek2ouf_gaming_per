import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Users, Plus, List, Shield, Mail, Zap, Star } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Gamepad2,
      title: 'Catalogue de Jeux',
      description: 'Découvrez notre collection de jeux vidéo cyberpunk et futuristes',
      link: '/games',
      color: 'from-green-400 to-yellow-400'
    },
    {
      icon: Plus,
      title: 'Ajouter un Jeu',
      description: 'Enrichissez notre base de données avec de nouveaux titres',
      link: '/add-game',
      color: 'from-yellow-400 to-green-400'
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Rejoignez notre communauté de gamers passionnés',
      link: '/add-user',
      color: 'from-green-400 to-blue-400'
    },
    {
      icon: List,
      title: 'Liste Complète',
      description: 'Parcourez tous les jeux de notre catalogue',
      link: '/games-list',
      color: 'from-blue-400 to-green-400'
    }
  ];

  const stats = [
    { label: 'Jeux Référencés', value: '150+', icon: Gamepad2 },
    { label: 'Utilisateurs Actifs', value: '2.5K+', icon: Users },
    { label: 'Note Moyenne', value: '4.2/5', icon: Star },
    { label: 'Genres Couverts', value: '25+', icon: Zap }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-green-500/10 rounded-3xl blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent animate-pulse">
            TeK2OuF
          </h1>
          <p className="text-xl md:text-2xl text-green-300 mb-4 font-light">
            Trop libre pour rentrer dans une case
          </p>
          <p className="text-lg text-green-400/80 mb-8 max-w-2xl mx-auto">
            Découvrez l'univers gaming le plus underground. Catalogue de jeux, communauté engagée, 
            et expérience utilisateur révolutionnaire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/games"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
            >
              Explorer les Jeux
            </Link>
            <Link
              to="/add-user"
              className="px-8 py-4 border-2 border-green-500 text-green-400 font-bold rounded-lg hover:bg-green-500/10 transition-all duration-300 transform hover:scale-105"
            >
              Rejoindre la Communauté
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 text-center hover:border-yellow-500/50 transition-all duration-300 group"
            >
              <Icon className="h-8 w-8 text-green-400 mx-auto mb-3 group-hover:text-yellow-400 transition-colors duration-300" />
              <div className="text-2xl font-bold text-yellow-400 mb-1">{stat.value}</div>
              <div className="text-sm text-green-300">{stat.label}</div>
            </div>
          );
        })}
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Link
              key={index}
              to={feature.link}
              className="group bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-8 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} bg-opacity-20`}>
                  <Icon className="h-8 w-8 text-green-400 group-hover:text-yellow-400 transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-400 group-hover:text-yellow-400 transition-colors duration-300 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-green-300/80 group-hover:text-green-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-green-500/10 rounded-3xl border border-green-500/20">
        <h2 className="text-4xl font-bold text-green-400 mb-4">
          Prêt à rejoindre l'aventure ?
        </h2>
        <p className="text-lg text-green-300/80 mb-8 max-w-2xl mx-auto">
          TeK2OuF, c'est plus qu'un catalogue de jeux. C'est une communauté, un état d'esprit, 
          une révolution gaming.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
          >
            Se Connecter
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 border-2 border-green-500 text-green-400 font-bold rounded-lg hover:bg-green-500/10 transition-all duration-300 transform hover:scale-105"
          >
            Nous Contacter
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;