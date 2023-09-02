// GifList.js
import { useState, useEffect } from 'react';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';


const GifList = ({ gifs }) => {
  const [favorites, setFavorites] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  // State to manage selected gifs for removal and the button state
  const [selectedGifsForRemoval, setSelectedGifsForRemoval] = useState([]);
  const [isAnyGifSelected, setIsAnyGifSelected] = useState(false);

  // Function to toggle the favorite status of a gif and store it in local storage
  const toggleFavorite = (gifId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = {
        ...prevFavorites,
        [gifId]: !prevFavorites[gifId],
      };
      // Store updated favorites in local storage
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  // Function to get an array of favorite gifs
  const getFavoriteGifs = () => {
    return gifs.filter((gif) => favorites[gif.id]);
  };
  
    // Retrieve favorites from local storage when the component mounts
    useEffect(() => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
      setFavorites(storedFavorites);
    }, []);
  
   

  // Function to remove selected gifs
  const removeSelectedGifs = () => {
    const updatedFavorites = { ...favorites };
    selectedGifsForRemoval.forEach((gifId) => {
      delete updatedFavorites[gifId];
    });
    setFavorites(updatedFavorites);
    setSelectedGifsForRemoval([]);
    // Reset (No selected Gifs button in favorites) when gifs are removed
    setIsAnyGifSelected(false);
  };

  return (
    <div className='gif-list-wrapper'>
    <div className="gif-list">
      {/*  Loop through all Gifs */}
      {gifs.map((gif) => (
        <div key={gif.id} className="gif-container">
          {/* Display the Gif */}
          <img src={gif.images.fixed_height.url} alt={gif.title} />
          <div
          // Toggle favorite button
            className={`heart ${favorites[gif.id] ? 'solid' : 'faded'}`}
            onClick={() => toggleFavorite(gif.id)}
          >
            ❤
          </div>
        </div>
      ))}
      </div>
      {/* Button to show favorite Gifs */}
      <button onClick={() => setShowFavorites(true)}>Show Favorites</button>

        {/* Favorites popup box  */}
      {showFavorites && (
        <div className="favorites-popup">
        <h2>Your Favorites</h2>

        {/* Display favorite Gifs */}
        {getFavoriteGifs().map((gif) => (
          <div key={gif.id} className="favorites-item">
            <img src={gif.images.fixed_height.url} alt={`Favorite GIF`} />
            
            {/* Checkbox to select Gifs for removal */}
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

          <FacebookShareButton
          className='share-button'
           url={getFavoriteGifs().map((gif) => gif.images.fixed_height.url).join(' ')}>
            <span className='share-icon facebook'>Share All on Facebook</span>
          </FacebookShareButton>

          <TwitterShareButton
          className='share-button' 
          url={getFavoriteGifs().map((gif) => gif.images.fixed_height.url).join(' ')}>
            <span className='share-icon twitter'>Share All on Twitter</span>
          </TwitterShareButton>

          <EmailShareButton
            className='share-button'
            subject="Check out these GIFs!"
            body={`Check out these cool GIFs:\n${getFavoriteGifs().map((gif) => gif.images.fixed_height.url).join('\n')}`}
          >
            <span className='share-icon email'>Share All via Email</span>
          </EmailShareButton>
        </div>

        {/* button to remove selected Gifs */}
      <button onClick={removeSelectedGifs}>
        {isAnyGifSelected ? "Remove Selected GIFs" : "Select GIFs to remove"}
      </button>

        {/* Button to close favorites popup */}
        <button onClick={() => setShowFavorites(false)}>Close</button>
      </div>
      
      )}
    </div>
  );
};

export default GifList;
