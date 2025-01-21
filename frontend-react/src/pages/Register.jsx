import React, { useState } from 'react';

function Register() {
  const [nomUtilisateur, setNomUtilisateur] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // On envoie les champs nécessaires
          nom_utilisateur: nomUtilisateur,
          email,
          mot_de_passe: motDePasse, 
          // Le backend se chargera de hasher motDePasse et de le stocker 
          // dans 'mot_de_passe_hache'.
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Inscription réussie :', data);
        // Faire une redirection ou afficher un message
      } else {
        alert(data.error || 'Erreur lors de l’inscription');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
        {/* Container Bootstrap + classe custom .register-container */}
        <div className="container register-container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              
              <h2 className="text-center mb-4">Inscription</h2>
              
              <form onSubmit={handleSubmit}>
                <label>Nom d’utilisateur :</label>
                <input
                  type="text"
                  value={nomUtilisateur}
                  onChange={(e) => setNomUtilisateur(e.target.value)}
                  required
                />

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

                <button type="submit" className="btn w-100 mt-3">
                  S’inscrire
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
  );
}

export default Register;
