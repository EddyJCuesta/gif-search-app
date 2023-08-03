import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const apikey = 'PCWbZtP6Jc2hY2TsPujrO9alK4xWo8HW'
  const url = 'http://api.giphy.com/v1/gifs/search'

// Create a new React app using the command line
// install Axios
// Create a App.js app that will hold the main component
// Create a useEffect for the API Call (API GIPHY Developers) // use Axios to perform the API call
useEffect(() => {
  axios({
    url: url,
    method: "GET",
    dataResponse: "json",
    params: {
      api_key: apikey,
      q: 'word'

    }
  }).then((res) => {
    console.log(res)
  })
})
// Store the Data in State
// Create a New Component called GifSearch, that is a functional component that renders an input field for the user to search for Gifs
// Create a handleSearch function which maps through the API data and fetches selected Gifs based on user input, from the API
// Create a function that handles the GIFs update returned from the API handleSearch // Create a Gif list Component that Holds the new list of GIFs
// Render the updated GIFs on to the page
  return (
    <>
     <h1>Gif Search</h1> 
    </>
  )
}

export default App
