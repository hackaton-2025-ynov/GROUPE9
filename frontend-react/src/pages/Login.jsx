import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mot_de_passe: motDePasse })
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Connexion réussie', data);
        navigate('/accueil');
      } else {
        alert(data.error || 'Erreur lors de la connexion');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
        {/* Container Bootstrap + classe custom .login-container */}
        <div className="container login-container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              
              <h2 className="text-center mb-4">Connexion</h2>
              
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

                {/* Le bouton hérite déjà du style CSS + on peut ajouter 'btn' ou 'btn-block' de Bootstrap */}
                <button type="submit" className="btn w-100 mt-3">
                  Se connecter
                </button>
              </form>

              <div className="text-center mt-4">
                <p>Première connexion ?</p>
                <button
                  className="btn btn-outline-primary"
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
