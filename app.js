const express = require('express');
const data = require('./geo.js');
const weather = require('./darksky.js');
const app = express();
// const request = require('superagent');

app.get('/', (request, respond) => respond.send('Jello World!'));

app.get('/location', (request, respond) => {
    const cityData = data.results[0];

    respond.json({
        formatted_query: cityData.formatted_address,
        latitude: cityData.geometry.location.lat,
        longitude: cityData.geometry.location.lng, 
    });
});

const getWeatherData = (lat, lng) => {
    return weather.daily.data.map(forecast => {
        return {
            forecast: forecast.summary,
            time: new Date(forecast.time),
        };
    })
} ;
app.get('/weather', (req, res) => {
    // use the lat and lng from earlier to get weather data for the selected area
    const portlandWeather = getWeatherData(/*lat*lng*/);
    
    // res.json that weather data in the appropriate form
    res.json(portlandWeather);
});

app.get('*', (req, res) => res.send('404!!!!!!'))

module.exports = {
    app: app,
};

/*
console.log(data)
// do not modify this URL!
const URL = 'https://rickandmortyapi.com/api/episode';

// use filter and .map to create an array of strings of episode names for episodes that have jerry (character id 5) in them)

const getEpisodesNamesWithSomeChar = async (someId) => {
  const data = await request.get(URL);

  console.log(data.body.results)
  return data.body.results
    .filter(episode => episode.characters.includes(`https://rickandmortyapi.com/api/character/${someId}`))
    .map(filteredEpisode => filteredEpisode.name)
}
app.get('/about', (request, respond) => respond.json({
    name: 'About me!!!!',
    time: Date.now(),
    number: Math.random()
}));

app.get('/get-episodes/:latitude/:longitude/', async (request, respond) => {
    const episodes = await getEpisodesNamesWithSomeChar(Number(request.params.characterId));

    respond.json({
        name: 'About me!!!!',
        time: Date.now(),
        number: Number(request.params.someNumber),
        params: request.params,
        episodes: episodes,
    });
});
*/