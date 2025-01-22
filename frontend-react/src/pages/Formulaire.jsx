import React, { useState } from 'react';

function Formulaire() {
  const [formData, setFormData] = useState({
    Sex: '',
    Âge: '',
    Pays: '',
    Consommation_KWh: '',
    Moyen_de_transport: '',
    Nombre_de_KM: '',
    Classe_énergétique: '',
    Surface_maison_M2: '',
  });

  const [result, setResult] = useState(''); // Pour stocker le message de résultat

  // Gère la mise à jour du state à chaque changement dans un input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gère la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      const response = await fetch(
        'https://testapp102-fhbjbvhwg3bcc5ap.francecentral-01.azurewebsites.net/predict',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      
      // Si l'API renvoie une clé "error", on l'affiche
      if (data.error) {
        setResult(`Erreur : ${data.error}`);
      } else {
        // Sinon, on considère que "data.prediction" est la valeur renvoyée
        setResult(`Résultat de la prédiction : ${data.prediction.toFixed(2)} kg de CO2`);
      }
    } catch (error) {
      console.error('Erreur lors de la prédiction:', error);
      setResult(`Erreur : ${error.message}`);
    }
  };

  return (
    <main>
      <h2>Formulaire de Prédiction</h2>
      <form onSubmit={handleSubmit}>
        {/* Sexe */}
        <label>Sexe :</label>
        <select
          name="Sex"
          value={formData.Sex}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Âge */}
        <label>Âge :</label>
        <input
          type="number"
          name="Âge"
          value={formData.Âge}
          onChange={handleChange}
          required
        />

        {/* Pays */}
        <label>Pays :</label>
        <select
          name="Pays"
          value={formData.Pays}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez</option>
          {[
            'France',
            'Germany',
            'South Africa',
            'Brazil',
            'Canada',
            'India',
            'United Kingdom',
            'Australia',
            'United States',
            'China',
          ].map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        {/* Consommation (KWh) */}
        <label>Consommation (KWh) :</label>
        <input
          type="number"
          name="Consommation_KWh"
          value={formData.Consommation_KWh}
          onChange={handleChange}
          required
        />

        {/* Moyen de transport */}
        <label>Moyen de transport :</label>
        <select
          name="Moyen_de_transport"
          value={formData.Moyen_de_transport}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez</option>
          {[
            'Bus',
            'Voiture (diesel)',
            'Train (intercités)',
            'Moto',
            'Métro',
            'Train (diesel)',
            'Train (électrique)',
            'Tramway',
            'Voiture (électrique)',
            'TGV',
            'Voiture (essence)',
          ].map((transport) => (
            <option key={transport} value={transport}>
              {transport}
            </option>
          ))}
        </select>

        {/* Nombre de KM */}
        <label>Nombre de KM :</label>
        <input
          type="number"
          name="Nombre_de_KM"
          value={formData.Nombre_de_KM}
          onChange={handleChange}
          required
        />

        {/* Classe énergétique */}
        <label>Classe énergétique :</label>
        <select
          name="Classe_énergétique"
          value={formData.Classe_énergétique}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez</option>
          {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((classe) => (
            <option key={classe} value={classe}>
              {classe}
            </option>
          ))}
        </select>

        {/* Surface maison (m²) */}
        <label>Surface maison (m²) :</label>
        <input
          type="number"
          name="Surface_maison_M2"
          value={formData.Surface_maison_M2}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          style={{
            backgroundColor: '#00704A',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Predict
        </button>
      </form>

      {/* Affichage du résultat */}
      {result && (
        <p id="result" style={{ marginTop: '20px', fontWeight: 'bold' }}>
          {result}
        </p>
      )}
    </main>
  );
}

export default Formulaire;
