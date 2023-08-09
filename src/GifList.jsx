// GifList Component.js
import { useState } from 'react';

const GifList = ({ gifs }) => {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (gifId) => {
    setFavorites((preFavorites) => ({
      ...preFavorites,
      [gifId]: !preFavorites[gifId],
    }));
  };

  return (
    <div className="gif-list">
      {gifs.map((gif) => (
        <div key={gif.id} className="gif-container">
          <img src={gif.images.fixed_height.url} alt={gif.title} />
          <div
            className={`heart ${favorites[gif.id] ? 'solid' : 'faded'}`}
            onClick={() => toggleFavorite(gif.id)}
          >
            ❤
          </div>
        </div>
      ))}
    </div>
  );
 };

  export default GifList;