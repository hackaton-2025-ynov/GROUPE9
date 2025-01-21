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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.example.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Prédiction:', result);
      alert('Prédiction reçue, consultez la console pour les détails.');
    } catch (error) {
      console.error('Erreur lors de la prédiction:', error);
      alert('Une erreur est survenue.');
    }
  };

  return (
    <main>
      <h2>Formulaire de Prédiction</h2>
      <form onSubmit={handleSubmit}>
        <label>Sexe :</label>
        <select name="Sex" value={formData.Sex} onChange={handleChange} required>
          <option value="">Sélectionnez</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Âge :</label>
        <input
          type="number"
          name="Âge"
          value={formData.Âge}
          onChange={handleChange}
          required
        />

        <label>Pays :</label>
        <select name="Pays" value={formData.Pays} onChange={handleChange} required>
          <option value="">Sélectionnez</option>
          {['France', 'Germany', 'South Africa', 'Brazil', 'Canada', 'India', 'United Kingdom', 'Australia', 'United States', 'China'].map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <label>Consommation (KWh) :</label>
        <input
          type="number"
          name="Consommation_KWh"
          value={formData.Consommation_KWh}
          onChange={handleChange}
          required
        />

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

        <label>Nombre de KM :</label>
        <input
          type="number"
          name="Nombre_de_KM"
          value={formData.Nombre_de_KM}
          onChange={handleChange}
          required
        />

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
    </main>
  );
}

export default Formulaire;
