const express = require('express');
const app = express();
const request = require('superagent');

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

app.get('/', (request, respond) => respond.send('Jello World!'));

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

app.get('*', (req, res) => res.send('404!!!!!!'))

module.exports = {
    app: app,
};