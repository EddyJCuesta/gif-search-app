// Create a new React app using the command line
// install Axios
// Create a App.js app that will hold the main component
// Create a New Component called GifSearch, that fetches the API Call(API Giphy Developers) using Axios, that is a functional component that renders an input field for the user to search for Gifs
// Create a handleSearch function which maps through the API data and fetches selected Gifs based on user input, from the API
// Create a function that handles the GIFs update returned from the API handleSearch // Create a Gif list Component that Holds the new list of GIFs
// Render the updated GIFs on to the page
import { useState } from 'react';
import GifSearch from './GifSearch';
import GifList from './GifList';
import './App.css';

function App() {

// MY STATES
const [gifs, setGifs] = useState([])



return (
  <div className="app">
    <h1>Gif Search</h1>
    <GifSearch setGifs={setGifs} />
    <GifList gifs={gifs} />
  </div>
);
}

export default App
