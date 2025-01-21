import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Accueil() {
  const [consommations, setConsommations] = useState([]);
  const [comparaison, setComparaison] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsommations = async () => {
      const response = await fetch('/accueil/consommations');
      const data = await response.json();
      setConsommations(data);
    };

    const fetchComparaison = async () => {
      const response = await fetch('/accueil/comparaison');
      const data = await response.json();
      setComparaison(data);
    };

    fetchConsommations();
    fetchComparaison();
  }, []);

  return (
    <main>
      <section>
        <h2>Mes consommations</h2>
        <ul>
          {consommations.map((item) => (
            <li key={item.id}>
              {item.type}: {item.consommation} kWh
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Comparaison</h2>
        <table>
          <thead>
            <tr>
              <th>Mois</th>
              <th>Consommation</th>
              <th>Moyenne</th>
            </tr>
          </thead>
          <tbody>
            {comparaison.map((item, index) => (
              <tr key={index}>
                <td>{item.mois}</td>
                <td>{item.consommation}</td>
                <td>{item.moyenne}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Nouveau bouton pour accéder au formulaire */}
      <section>
        <button
          style={{
            backgroundColor: '#00704A',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/formulaire')}
        >
          Aller au Formulaire
        </button>
      </section>
    </main>
  );
}

export default Accueil;
