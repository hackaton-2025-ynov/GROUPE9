import React, { useState, useEffect } from 'react';

function Profile() {
  const [nomUtilisateur, setNomUtilisateur] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchUserData = async () => {
    try {
      const response = await fetch('/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      console.log("response", response)
      setIsLoading(false);

      if (response.ok) {
        const data = await response.json();
        setNomUtilisateur(data.nom_utilisateur);
        setEmail(data.email);
      } else if (response.status === 401) {

        window.location.href = '/login';
      } else {
        console.error('Erreur lors de la récupération des données utilisateur.');
        setError('Erreur lors de la récupération des données utilisateur.');
      }
    } catch (error) {
      //console.error('Erreur réseau ou serveur :', error);
      //setError('Erreur réseau ou serveur.');
    } finally {
      setIsLoading(false);
    }
  };
  // Récupérer les informations utilisateur au chargement
  useEffect(async () => {
    await fetchUserData();
  }, []);

  // const fetchUserData = async () => {
  //   try {
  //     const response = await fetch('/profile', {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //       credentials: 'include',
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       setNomUtilisateur(data.nom_utilisateur);
  //       setEmail(data.email);
  //       localStorage.setItem('userData', JSON.stringify(data));
  //       setIsLoading(false);
  //     } else {
  //       setError('Erreur lors de la récupération des données utilisateur.');
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     setError('Erreur réseau ou serveur.');
  //     setIsLoading(false);
  //   }
  // };


  // Mettre à jour les informations utilisateur
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          nom_utilisateur: nomUtilisateur,
          email,
          mot_de_passe: motDePasse,
        }),
      });
      if (response.ok) {
        alert('Profil mis à jour avec succès !');
      } else {
        alert('Erreur lors de la mise à jour du profil.');
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  };


  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <div className="container">
        <h2 className="text-center mb-4">Mon Profil</h2>
        <form onSubmit={handleUpdate}>
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
          <label>Nouveau mot de passe :</label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
          />
          <button type="submit" className="btn w-100 mt-3">
            Modifier les changements
          </button>
        </form>
      </div>
    </main>
  );
}

export default Profile;
