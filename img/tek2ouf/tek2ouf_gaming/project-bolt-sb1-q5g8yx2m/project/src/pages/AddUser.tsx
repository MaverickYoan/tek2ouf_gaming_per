import React, { useState } from 'react';
import { UserPlus, Mail, User, Lock, Shield } from 'lucide-react';

const AddUser = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'user'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setSubmitMessage('Les mots de passe ne correspondent pas');
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 6) {
      setSubmitMessage('Le mot de passe doit contenir au moins 6 caractères');
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage('Utilisateur créé avec succès ! Bienvenue dans la communauté TeK2OuF !');
      
      // Reset form
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        role: 'user'
      });

      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      setSubmitMessage('Erreur lors de la création de l\'utilisateur');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent mb-4">
          Rejoindre TeK2OuF
        </h1>
        <p className="text-lg text-green-300/80">
          Créez votre compte et rejoignez notre communauté underground
        </p>
      </div>

      {/* Success/Error Message */}
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
        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-green-400 font-medium mb-2">
              Prénom *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
              placeholder="Votre prénom"
            />
          </div>

          <div>
            <label className="block text-green-400 font-medium mb-2">
              Nom *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
              placeholder="Votre nom"
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-green-400 font-medium mb-2 flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Nom d'utilisateur *</span>
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
            placeholder="Votre pseudo unique"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-green-400 font-medium mb-2 flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Email *</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
            placeholder="votre@email.com"
          />
        </div>

        {/* Password */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-green-400 font-medium mb-2 flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Mot de passe *</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
              placeholder="Minimum 6 caractères"
            />
          </div>

          <div>
            <label className="block text-green-400 font-medium mb-2 flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Confirmer le mot de passe *</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
              placeholder="Répétez le mot de passe"
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block text-green-400 font-medium mb-2 flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Type de compte</span>
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300 appearance-none"
          >
            <option value="user">Utilisateur Standard</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>

        {/* Terms */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 h-4 w-4 text-green-400 bg-black border-green-500/30 rounded focus:ring-green-500 focus:ring-2"
            />
            <label htmlFor="terms" className="text-sm text-green-300/80">
              J'accepte les conditions d'utilisation de TeK2OuF et je comprends que cette plateforme 
              est dédiée à la communauté gaming underground. Je m'engage à respecter l'esprit créatif 
              et décalé de la marque.
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <UserPlus className="h-5 w-5" />
            <span>{isSubmitting ? 'Création en cours...' : 'Créer mon Compte'}</span>
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center pt-4 border-t border-green-500/30">
          <p className="text-green-300/80">
            Déjà membre de la communauté ?{' '}
            <a href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-300">
              Se connecter
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AddUser;