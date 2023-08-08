// GifSearch.js
import { useState } from 'react';
import axios from 'axios';

// API KEY & URL
const apikey = 'PCWbZtP6Jc2hY2TsPujrO9alK4xWo8HW'
const url = 'http://api.giphy.com/v1/gifs/search'

const GifSearch = ({setGifs}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (event) =>{
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    // make a fetch call to the api
    axios({
        url: url,
        method: "GET",
        dataResponse: "json",
        params: {
          api_key: apikey,
          q: searchQuery
        }
      }).then((res) => {
        const data = res.data.data;
     // Store the Data in State   
        setGifs(data);
      })
    }

    return(
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search GIFs..."
          required
        />
        <button type="submit">Search</button>
      </form>
    );
}

export default GifSearch;