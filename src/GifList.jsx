import { useState } from 'react';

const GifList = ({ gifs }) => {
  const [favorites, setFavorites] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedGifsForRemoval, setSelectedGifsForRemoval] = useState([]);
  const [selectedGifForSharing, setSelectedGifForSharing] = useState(null);

  const toggleFavorite = (gifId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [gifId]: !prevFavorites[gifId],
    }));
  };

  const getFavoriteGifs = () => {
    return gifs.filter((gif) => favorites[gif.id]);
  };

  const removeSelectedGifs = () => {
    const updatedFavorites = { ...favorites };
    selectedGifsForRemoval.forEach((gifId) => {
      delete updatedFavorites[gifId];
    });
    setFavorites(updatedFavorites);
    setSelectedGifsForRemoval([]);
  };

  const shareSelectedGif = (gif) => {
    setSelectedGifForSharing(gif);
    
    if (navigator.share) {
      navigator.share({
        title: 'Shared GIF',
        text: 'Check out this GIF!',
        url: gif.images.fixed_height.url,
      })
      .then(() => {
        console.log('GIF shared successfully.');
      })
      .catch((error) => {
        console.error('Error sharing GIF:', error);
      });
    } else {
      console.log('Sharing not supported in this browser.');
    }
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
      <button onClick={() => setShowFavorites(true)}>Show Favorites</button>

      {showFavorites && (
        <div className="favorites-popup">
          <h2>Your Favorites</h2>
          {getFavoriteGifs().map((gif) => (
            <div key={gif.id} className="favorites-item">
              <img src={gif.images.fixed_height.url} alt={`Favorite GIF`} />
              <button onClick={() => shareSelectedGif(gif)}>Share</button>
              <input
                type="checkbox"
                checked={selectedGifsForRemoval.includes(gif.id)}
                onChange={() => {
                  if (selectedGifsForRemoval.includes(gif.id)) {
                    setSelectedGifsForRemoval((prevSelected) =>
                      prevSelected.filter((id) => id !== gif.id)
                    );
                  } else {
                    setSelectedGifsForRemoval((prevSelected) => [...prevSelected, gif.id]);
                  }
                }}
              />
            </div>
          ))}
          <button onClick={removeSelectedGifs}>Remove Selected GIFs</button>
          <button onClick={() => setShowFavorites(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default GifList;
