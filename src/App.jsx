// Create a App.js app that will hold the main component
import { useState } from 'react';
import GifSearch from './GifSearch';
import GifList from './GifList';
import './App.css';

function App() {

// State to hold the list of Gifs
const [gifs, setGifs] = useState([])

 // State to manage favorite gifs
const [favorites, setFavorites] = useState({});

return (
  <div className="app">
    <h1>Gif Search</h1>
    <GifSearch setGifs={setGifs} />
    <GifList gifs={gifs} favorites={favorites} setFavorites={setFavorites} />
    <p>Created at Juno College</p>
  </div>
);
}

export default App
