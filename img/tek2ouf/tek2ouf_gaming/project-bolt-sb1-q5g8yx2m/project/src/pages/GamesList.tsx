import React, { useState } from 'react';
import { useGames } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { List, Grid, Search, Trash2, Edit, Eye, Star, Calendar, DollarSign } from 'lucide-react';

const GamesList = () => {
  const { games, deleteGame } = useGames();
  const { isAdmin } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  const filteredGames = games
    .filter(game => 
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchTerm.toLowerCase())
    )
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

  const handleDelete = (gameId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce jeu ?')) {
      deleteGame(gameId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent mb-4">
          Liste Complète
        </h1>
        <p className="text-lg text-green-300/80">
          Tous les jeux de notre catalogue underground
        </p>
      </div>

      {/* Controls */}
      <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300 appearance-none"
          >
            <option value="title">Trier par nom</option>
            <option value="rating">Trier par note</option>
            <option value="price">Trier par prix</option>
            <option value="releaseDate">Trier par date</option>
          </select>

          {/* View Mode */}
          <div className="flex bg-black/50 border border-green-500/30 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors duration-300 ${
                viewMode === 'list' 
                  ? 'bg-green-500/20 text-yellow-400' 
                  : 'text-green-400 hover:text-yellow-400'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-green-500/20 text-yellow-400' 
                  : 'text-green-400 hover:text-yellow-400'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-green-500/30 text-center">
          <span className="text-green-400 font-medium">
            {filteredGames.length} jeu{filteredGames.length > 1 ? 's' : ''} trouvé{filteredGames.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Games Display */}
      {viewMode === 'list' ? (
        /* List View */
        <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-500/10 border-b border-green-500/30">
                <tr>
                  <th className="px-6 py-4 text-left text-green-400 font-medium">Jeu</th>
                  <th className="px-6 py-4 text-left text-green-400 font-medium">Genre</th>
                  <th className="px-6 py-4 text-left text-green-400 font-medium">Plateforme</th>
                  <th className="px-6 py-4 text-left text-green-400 font-medium">Note</th>
                  <th className="px-6 py-4 text-left text-green-400 font-medium">Prix</th>
                  <th className="px-6 py-4 text-left text-green-400 font-medium">Date</th>
                  {isAdmin && <th className="px-6 py-4 text-left text-green-400 font-medium">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredGames.map((game, index) => (
                  <tr 
                    key={game.id} 
                    className={`border-b border-green-500/20 hover:bg-green-500/5 transition-colors duration-300 ${
                      index % 2 === 0 ? 'bg-black/20' : 'bg-transparent'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={game.image}
                          alt={game.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <div className="text-green-400 font-medium">{game.title}</div>
                          <div className="text-green-300/60 text-sm">{game.developer}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-green-300">{game.genre}</td>
                    <td className="px-6 py-4 text-green-300">{game.platform}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400">{game.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-yellow-400 font-medium">{game.price.toFixed(2)}€</td>
                    <td className="px-6 py-4 text-green-300">
                      {new Date(game.releaseDate).toLocaleDateString('fr-FR')}
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-green-400 hover:text-yellow-400 transition-colors duration-300">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-blue-400 hover:text-blue-300 transition-colors duration-300">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(game.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors duration-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105 group"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded px-2 py-1 flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 text-sm">{game.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-green-400 group-hover:text-yellow-400 transition-colors duration-300 mb-1 truncate">
                  {game.title}
                </h3>
                <p className="text-green-300/60 text-sm mb-2">{game.developer}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-300">{game.genre}</span>
                  <span className="text-yellow-400 font-medium">{game.price.toFixed(2)}€</span>
                </div>

                {isAdmin && (
                  <div className="flex items-center justify-center space-x-2 mt-3 pt-3 border-t border-green-500/30">
                    <button className="p-1 text-green-400 hover:text-yellow-400 transition-colors duration-300">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors duration-300">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(game.id)}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors duration-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {filteredGames.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-2xl font-bold text-green-400 mb-2">Aucun jeu trouvé</h3>
          <p className="text-green-300/80">
            Essayez de modifier votre recherche ou vos critères de tri
          </p>
        </div>
      )}
    </div>
  );
};

export default GamesList;