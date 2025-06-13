import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const success = await login(formData.username, formData.password);
      if (success) {
        navigate('/');
      } else {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      }
    } catch (error) {
      setError('Erreur de connexion');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-3xl font-bold text-green-400 mb-4">Déjà Connecté</h2>
        <p className="text-green-300/80 mb-8">
          Vous êtes déjà connecté à TeK2OuF
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105"
        >
          Retour à l'Accueil
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent mb-4">
          Connexion
        </h1>
        <p className="text-lg text-green-300/80">
          Accédez à votre espace TeK2OuF
        </p>
      </div>

      {/* Demo Credentials */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
        <h3 className="text-green-400 font-medium mb-2">Comptes de démonstration :</h3>
        <div className="space-y-1 text-sm text-green-300/80">
          <div>👤 <strong>Admin:</strong> admin / tek2ouf</div>
          <div>👤 <strong>Utilisateur:</strong> user / user</div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg p-4 text-center">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-8 space-y-6">
        {/* Username */}
        <div>
          <label className="block text-green-400 font-medium mb-2 flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Nom d'utilisateur</span>
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
            placeholder="Votre nom d'utilisateur"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-green-400 font-medium mb-2 flex items-center space-x-2">
            <Lock className="h-4 w-4" />
            <span>Mot de passe</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 pr-12 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
              placeholder="Votre mot de passe"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-yellow-400 transition-colors duration-300"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-green-400 bg-black border-green-500/30 rounded focus:ring-green-500 focus:ring-2"
            />
            <label htmlFor="remember" className="text-green-300/80 text-sm">
              Se souvenir de moi
            </label>
          </div>
          <a href="#" className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors duration-300">
            Mot de passe oublié ?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <LogIn className="h-5 w-5" />
          <span>{isSubmitting ? 'Connexion...' : 'Se Connecter'}</span>
        </button>

        {/* Register Link */}
        <div className="text-center pt-4 border-t border-green-500/30">
          <p className="text-green-300/80">
            Pas encore membre ?{' '}
            <a href="/add-user" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-300">
              Rejoindre TeK2OuF
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;