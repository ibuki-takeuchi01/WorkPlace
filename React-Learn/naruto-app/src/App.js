import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const apiUrl = "https://narutodb.xyz/api/character";

    const result = await axios.get(apiUrl);
    setCharacters(result.data.characters);
  };

  return (
    <div className="container">
      <main>
        <div className='cards-container'>
          {characters.map((character) => {
            return <div className='card' key={character.id}>
              <img
                src={character.images[0] != null
                  ? character.images[0]
                  : 'dummy.png'
                }
                alt='character'
                className='card-image'
              />
              <div className='card-content'>
                <h3 className='card-title'>
                  {character.name}
                </h3>
                <p className='card-description'>
                  {character.debut?.appearsIn ?? 'なし'}
                </p>
                <div className='card-footer'>
                  <span className='affiliation'>
                    {character.personal?.affiliation ?? 'なし'}
                  </span>
                </div>
              </div>
            </div>;
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
