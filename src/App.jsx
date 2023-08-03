import { useState } from 'react';

import GifSearch from './GifSearch';
import './App.css';

// Create a new React app using the command line
// install Axios
// Create a App.js app that will hold the main component
function App() {

// MY STATES
const [gifs, setGifs] = useState([])



// Create a useEffect for the API Call (API GIPHY Developers) 
// use Axios to perform the API call

// Create a New Component called GifSearch, that is a functional component that renders an input field for the user to search for Gifs
// Create a handleSearch function which maps through the API data and fetches selected Gifs based on user input, from the API
// Create a function that handles the GIFs update returned from the API handleSearch // Create a Gif list Component that Holds the new list of GIFs
// Render the updated GIFs on to the page
  return (
    <>
     <h1>Gif Search</h1> 
      <GifSearch setGifs={setGifs} />
      {/* <GifList gifs={gifs} /> */}
    </>
  )
}

export default App
