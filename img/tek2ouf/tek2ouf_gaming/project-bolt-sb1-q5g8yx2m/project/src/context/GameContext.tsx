import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Game {
  id: string;
  title: string;
  description: string;
  genre: string;
  platform: string;
  releaseDate: string;
  price: number;
  image: string;
  rating: number;
  developer: string;
  publisher: string;
  tags: string[];
}

interface GameContextType {
  games: Game[];
  addGame: (game: Omit<Game, 'id'>) => void;
  updateGame: (id: string, game: Partial<Game>) => void;
  deleteGame: (id: string) => void;
  getGameById: (id: string) => Game | undefined;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGames = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGames must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([
    {
      id: '1',
      title: 'Cyberpunk 2077',
      description: 'Un RPG futuriste dans un monde dystopique',
      genre: 'RPG',
      platform: 'PC, PS5, Xbox',
      releaseDate: '2020-12-10',
      price: 59.99,
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
      rating: 4.2,
      developer: 'CD Projekt RED',
      publisher: 'CD Projekt',
      tags: ['Futuriste', 'Open World', 'RPG']
    },
    {
      id: '2',
      title: 'The Matrix: Path of Neo',
      description: 'Incarnez Neo dans l\'univers de Matrix',
      genre: 'Action',
      platform: 'PC, PS2, Xbox',
      releaseDate: '2005-11-08',
      price: 29.99,
      image: 'https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg',
      rating: 3.8,
      developer: 'Shiny Entertainment',
      publisher: 'Atari',
      tags: ['Matrix', 'Action', 'Sci-Fi']
    },
    {
      id: '3',
      title: 'Deus Ex: Human Revolution',
      description: 'Un thriller cyberpunk avec des choix moraux complexes',
      genre: 'RPG/Action',
      platform: 'PC, PS3, Xbox 360',
      releaseDate: '2011-08-23',
      price: 19.99,
      image: 'https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg',
      rating: 4.5,
      developer: 'Eidos Montreal',
      publisher: 'Square Enix',
      tags: ['Cyberpunk', 'Stealth', 'RPG']
    }
  ]);

  const addGame = (gameData: Omit<Game, 'id'>) => {
    const newGame: Game = {
      ...gameData,
      id: Date.now().toString()
    };
    setGames(prev => [...prev, newGame]);
  };

  const updateGame = (id: string, gameData: Partial<Game>) => {
    setGames(prev => prev.map(game => 
      game.id === id ? { ...game, ...gameData } : game
    ));
  };

  const deleteGame = (id: string) => {
    setGames(prev => prev.filter(game => game.id !== id));
  };

  const getGameById = (id: string) => {
    return games.find(game => game.id === id);
  };

  const value = {
    games,
    addGame,
    updateGame,
    deleteGame,
    getGameById
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};