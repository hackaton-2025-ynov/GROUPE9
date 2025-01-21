import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mot_de_passe: motDePasse }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('isAuthenticated', 'true'); // Marque l'utilisateur comme connecté
        setMessage('Connexion réussie');
        navigate('/accueil'); // Redirige vers /accueil après connexion réussie
      } else {
        localStorage.setItem('isAuthenticated', 'false');
        setMessage(data.error || 'Erreur lors de la connexion');
      }
    } catch (err) {
      console.error('Erreur réseau :', err);
      setMessage('Erreur réseau ou serveur.');
    }
  };

  return (
    <main>
      <div className="container login-container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Connexion</h2>
            {message && <p style={{ color: message.includes('réussie') ? 'green' : 'red' }}>{message}</p>}
            <form onSubmit={handleSubmit}>
              <label>Email :</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Mot de passe :</label>
              <input
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
              />
              <button type="submit" className="btn w-100 mt-3" style={{ backgroundColor: '#00704A', color: 'white' }}>
                Se connecter
              </button>
            </form>

            {/* Section "Première fois ?" */}
            <div className="text-center mt-4">
              <p>Première fois ?</p>
              <button
                className="btn btn-outline-primary"
                style={{ backgroundColor: '#00704A', color: 'white', border: 'none' }}
                onClick={() => navigate('/register')}
              >
                Inscrivez-vous !
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
