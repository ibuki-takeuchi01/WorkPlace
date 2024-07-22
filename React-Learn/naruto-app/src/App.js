import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async (page) => {
    const apiUrl = "https://narutodb.xyz/api/character";
    setIsLoading(true);
    const result = await axios.get(apiUrl, { params: { page: page } });
    setCharacters(result.data.characters);
    setIsLoading(false);
  };

  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  }

  const handlePrev = async () => {
    const prevPage = page - 1;
    await fetchCharacters(prevPage);
    setPage(prevPage);
  }

  return (
    <div className="container">
      {isLoading ? (<div>Now Loading...</div>
      ) : (
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
          <div className='pager'>
            <button className='prev' onClick={handlePrev}>Previous</button>
            <span className='page-number'>{page}</span>
            <button className='next' onClick={handleNext}>Next</button>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
