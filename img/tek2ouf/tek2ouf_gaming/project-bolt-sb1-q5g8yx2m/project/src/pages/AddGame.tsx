import React, { useState } from 'react';
import { useGames } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { Plus, Upload, Tag, Calendar, DollarSign, Star } from 'lucide-react';

const AddGame = () => {
  const { addGame } = useGames();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    platform: '',
    releaseDate: '',
    price: '',
    image: '',
    rating: '',
    developer: '',
    publisher: '',
    tags: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const genres = [
    'Action', 'RPG', 'FPS', 'Strategy', 'Adventure', 'Simulation', 
    'Racing', 'Sports', 'Puzzle', 'Horror', 'Sci-Fi', 'Cyberpunk'
  ];

  const platforms = [
    'PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch', 
    'PlayStation 4', 'Xbox One', 'Mobile', 'VR'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const gameData = {
        title: formData.title,
        description: formData.description,
        genre: formData.genre,
        platform: formData.platform,
        releaseDate: formData.releaseDate,
        price: parseFloat(formData.price),
        image: formData.image || 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
        rating: parseFloat(formData.rating),
        developer: formData.developer,
        publisher: formData.publisher,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      addGame(gameData);
      setSubmitMessage('Jeu ajouté avec succès !');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        genre: '',
        platform: '',
        releaseDate: '',
        price: '',
        image: '',
        rating: '',
        developer: '',
        publisher: '',
        tags: ''
      });

      setTimeout(() => setSubmitMessage(''), 3000);
    } catch (error) {
      setSubmitMessage('Erreur lors de l\'ajout du jeu');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-3xl font-bold text-green-400 mb-4">Accès Restreint</h2>
        <p className="text-green-300/80 mb-8">
          Vous devez être connecté pour ajouter un jeu
        </p>
        <a
          href="/login"
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105"
        >
          Se Connecter
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent mb-4">
          Ajouter un Jeu
        </h1>
        <p className="text-lg text-green-300/80">
          Enrichissez notre catalogue avec un nouveau titre
        </p>
      </div>

      {/* Success Message */}
      {submitMessage && (
        <div className={`p-4 rounded-lg text-center font-medium ${
          submitMessage.includes('succès') 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {submitMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-8 space-y-6">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-green-400 font-medium mb-2">
              Titre du Jeu *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
              placeholder="Ex: Cyberpunk 2077"
            />
          </div>

          <div>
            <label className="block text-green-400 font-medium mb-2">
              Développeur *
            </label>
            <input
              type="text"
              name="developer"
              value={formData.developer}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
              placeholder="Ex: CD Projekt RED"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-green-400 font-medium mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300 resize-none"
            placeholder="Décrivez le jeu, son univers, son gameplay..."
          />
        </div>

        {/* Genre and Platform */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-green-400 font-medium mb-2">
              Genre *
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300 appearance-none"
            >
              <option value="">Sélectionner un genre</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-green-400 font-medium mb-2">
              Plateforme *
            </label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300 appearance-none"
            >
              <option value="">Sélectionner une plateforme</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Publisher and Release Date */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-green-400 font-medium mb-2">
              Éditeur
            </label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
              placeholder="Ex: CD Projekt"
            />
          </div>

          <div>
            <label className="block text-green-400 font-medium mb-2 flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Date de Sortie *</span>
            </label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
            />
          </div>
        </div>

        {/* Price and Rating */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-green-400 font-medium mb-2 flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Prix (€) *</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
              placeholder="59.99"
            />
          </div>

          <div>
            <label className="block text-green-400 font-medium mb-2 flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Note (1-5) *</span>
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              min="1"
              max="5"
              step="0.1"
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
              placeholder="4.2"
            />
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-green-400 font-medium mb-2 flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>URL de l'Image</span>
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
            placeholder="https://example.com/image.jpg (optionnel)"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-green-400 font-medium mb-2 flex items-center space-x-2">
            <Tag className="h-4 w-4" />
            <span>Tags (séparés par des virgules)</span>
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
            placeholder="Futuriste, Open World, RPG"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>{isSubmitting ? 'Ajout en cours...' : 'Ajouter le Jeu'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGame;