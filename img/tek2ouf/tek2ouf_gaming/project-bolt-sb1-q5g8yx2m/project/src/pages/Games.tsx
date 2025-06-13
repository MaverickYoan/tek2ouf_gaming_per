import React, { useState } from 'react';
import { useGames } from '../context/GameContext';
import { Search, Filter, Star, Calendar, DollarSign, Monitor } from 'lucide-react';

const Games = () => {
  const { games } = useGames();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');

  const genres = [...new Set(games.map(game => game.genre))];

  const filteredGames = games
    .filter(game => 
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(game => selectedGenre === '' || game.genre === selectedGenre)
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        case 'releaseDate':
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent mb-4">
          Catalogue de Jeux
        </h1>
        <p className="text-lg text-green-300/80 max-w-2xl mx-auto">
          Découvrez notre sélection de jeux vidéo cyberpunk, futuristes et underground
        </p>
      </div>

      {/* Filters */}
      <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
            <input
              type="text"
              placeholder="Rechercher un jeu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
            />
          </div>

          {/* Genre Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300 appearance-none"
            >
              <option value="">Tous les genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300 appearance-none"
            >
              <option value="title">Trier par nom</option>
              <option value="rating">Trier par note</option>
              <option value="price">Trier par prix</option>
              <option value="releaseDate">Trier par date</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-center bg-green-500/10 rounded-lg px-4 py-3">
            <span className="text-green-400 font-medium">
              {filteredGames.length} jeu{filteredGames.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105 group"
          >
            {/* Game Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-yellow-400 font-medium">{game.rating}</span>
              </div>
            </div>

            {/* Game Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-green-400 group-hover:text-yellow-400 transition-colors duration-300 mb-2">
                {game.title}
              </h3>
              <p className="text-green-300/80 text-sm mb-4 line-clamp-2">
                {game.description}
              </p>

              {/* Game Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-green-300/60">
                  <Monitor className="h-4 w-4" />
                  <span>{game.platform}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-300/60">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(game.releaseDate).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {game.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-5 w-5 text-yellow-400" />
                  <span className="text-xl font-bold text-yellow-400">
                    {game.price.toFixed(2)}€
                  </span>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-medium rounded-lg hover:from-yellow-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105">
                  Voir Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredGames.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-2xl font-bold text-green-400 mb-2">Aucun jeu trouvé</h3>
          <p className="text-green-300/80">
            Essayez de modifier vos critères de recherche ou de filtrage
          </p>
        </div>
      )}
    </div>
  );
};

export default Games;