import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      });

      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      setSubmitMessage('Erreur lors de l\'envoi du message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: '000tek2ouf000@gmail.com',
      description: 'Réponse sous 24h'
    },
    {
      icon: MapPin,
      title: 'Localisation',
      value: 'Département 58, France',
      description: 'Siège social'
    },
    {
      icon: Clock,
      title: 'Horaires',
      value: '24/7 Online',
      description: 'Communauté active'
    },
    {
      icon: Globe,
      title: 'Marque Déposée',
      value: 'INPI 2021-2031',
      description: 'Marque protégée'
    }
  ];

  const contactTypes = [
    { value: 'general', label: 'Question Générale' },
    { value: 'collaboration', label: 'Collaboration Artistique' },
    { value: 'technical', label: 'Support Technique' },
    { value: 'business', label: 'Partenariat Commercial' },
    { value: 'legal', label: 'Questions Légales' }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-green-400 bg-clip-text text-transparent mb-4">
          Contact
        </h1>
        <p className="text-lg text-green-300/80 max-w-2xl mx-auto">
          Une question ? Un projet de collaboration ? Contactez l'équipe TeK2OuF. 
          Nous sommes toujours ouverts aux échanges créatifs et aux partenariats innovants.
        </p>
      </div>

      {/* Contact Info Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <div
              key={index}
              className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 text-center hover:border-yellow-500/50 transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mb-4 group-hover:bg-yellow-500/20 transition-colors duration-300">
                <Icon className="h-6 w-6 text-green-400 group-hover:text-yellow-400 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-green-400 group-hover:text-yellow-400 transition-colors duration-300 mb-2">
                {info.title}
              </h3>
              <p className="text-green-300 font-medium mb-1">{info.value}</p>
              <p className="text-green-300/60 text-sm">{info.description}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center space-x-2">
            <MessageCircle className="h-6 w-6" />
            <span>Envoyez-nous un Message</span>
          </h2>

          {/* Success Message */}
          {submitMessage && (
            <div className={`p-4 rounded-lg mb-6 text-center font-medium ${
              submitMessage.includes('succès') 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-green-400 font-medium mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-green-400 font-medium mb-2">
                  Email *
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
            </div>

            {/* Type and Subject */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-green-400 font-medium mb-2">
                  Type de Demande
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300 appearance-none"
                >
                  {contactTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-green-400 font-medium mb-2">
                  Sujet *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300"
                  placeholder="Sujet de votre message"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-green-400 font-medium mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg text-green-400 placeholder-green-400/50 focus:border-yellow-500/50 focus:outline-none transition-colors duration-300 resize-none"
                placeholder="Décrivez votre demande, votre projet, ou posez votre question..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-green-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer le Message'}</span>
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="space-y-8">
          {/* About TeK2OuF */}
          <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-green-400 mb-4">À Propos de TeK2OuF</h3>
            <div className="space-y-4 text-green-300/80">
              <p>
                <strong className="text-green-400">TeK2OuF</strong> est une marque déposée (INPI 2021-2031) 
                qui incarne l'esprit créatif, urbain et décalé de la culture gaming underground.
              </p>
              <p>
                Nous recherchons des artistes et créateurs souhaitant commercialiser leurs œuvres 
                à travers notre marque, dans le cadre d'échanges créatifs et de collaborations innovantes.
              </p>
              <p>
                <strong className="text-yellow-400">Notre devise :</strong> "Trop libre pour rentrer dans une case"
              </p>
            </div>
          </div>

          {/* Collaboration */}
          <div className="bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-green-500/10 border border-green-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-green-400 mb-4">Collaboration Artistique</h3>
            <div className="space-y-3 text-green-300/80">
              <p>
                <strong className="text-green-400">Domaines couverts :</strong>
              </p>
              <ul className="space-y-2 ml-4">
                <li>• Produits d'imprimerie (livres, affiches, albums)</li>
                <li>• Matériel artistique (pinceaux, papiers, patrons)</li>
                <li>• Vêtements et accessoires</li>
                <li>• Chaussures et maroquinerie</li>
                <li>• Créations gaming et tech</li>
              </ul>
              <p className="text-yellow-400 font-medium mt-4">
                Contactez-nous pour discuter de votre projet créatif !
              </p>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 text-center">
            <Clock className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-green-400 mb-2">Temps de Réponse</h4>
            <p className="text-green-300/80">
              Nous nous engageons à répondre à tous les messages dans les <strong className="text-yellow-400">24 heures</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;