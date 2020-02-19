require('dotenv').config();
const express = require('express');
const weather = require('./darksky.js');
const request = require('superagent');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (request, respond) => respond.send('Jello World!'));

// initialize the global state of lat and lng so it is accessbile in other routes
let lat;
let lng; 

app.get('/location', async(req, res, next) => {
    try {
        // ins www.cool-api.com?search=portland, `location` will be portland
        const location = req.query.search;
        // TODO: HIDE KEY
        const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${location}&format=json`;

        const cityData = await request.get(URL);     

        const firstResult = cityData.body[0];

        // update the global state of lat and lng so it is accessbile in other routes
        lat = firstResult.lat;
        lng = firstResult.lon;
        
        res.json({
            formatted_query: firstResult.display_name,
            latitude: lat,
            longitude: lng, 
        });
    } catch (err) {
        next(err);
    }
});

const getWeatherData = (lat, lng) => {
    return weather.daily.data.map(forecast => {
        return {
            forecast: forecast.summary,
            time: new Date(forecast.time * 1000),
        };
    })
} ;
app.get('/weather', (req, res) => {
    // use the lat and lng from earlier to get weather data for the selected area
    const portlandWeather = getWeatherData(lat, lng);
    
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