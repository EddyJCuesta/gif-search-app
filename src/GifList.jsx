// Create a function that handles the GIFs update returned from the API handleSearch // Create a Gif list Component that Holds the new list of GIFs
import { useState } from 'react';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';


const GifList = ({ gifs }) => {
  const [favorites, setFavorites] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedGifsForRemoval, setSelectedGifsForRemoval] = useState([]);
  const [isAnyGifSelected, setIsAnyGifSelected] = useState(false);


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
    setIsAnyGifSelected(false);
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
              setIsAnyGifSelected(selectedGifsForRemoval.length >= 0);
            }}
          />
          </div>
        ))}
        
        {/* Share all button */}
        <div className="share-all-button">
          <FacebookShareButton url={getFavoriteGifs().map((gif) => gif.images.fixed_height.url).join(' ')}>
            Share All on Facebook
          </FacebookShareButton>
          <TwitterShareButton url={getFavoriteGifs().map((gif) => gif.images.fixed_height.url).join(' ')}>
            Share All on Twitter
          </TwitterShareButton>
          <EmailShareButton
            subject="Check out these GIFs!"
            body={`Check out these cool GIFs:\n${getFavoriteGifs().map((gif) => gif.images.fixed_height.url).join('\n')}`}
          >
            Share All via Email
          </EmailShareButton>
        </div>
        
      <button onClick={removeSelectedGifs}>
        {isAnyGifSelected ? "Remove Selected GIFs" : "No Gifs selected"}
      </button>


        <button onClick={() => setShowFavorites(false)}>Close</button>
      </div>
      
      )}
    </div>
  );
};

export default GifList;
