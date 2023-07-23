import express from 'express';
import axios from 'axios';
import { config } from './config';
import { render } from './render';

const app = express();

app.use(express.static('dist'));

app.get('/galaxias', async (req, res) => {
  try {
    const { data } = await axios.get('https://images-api.nasa.gov/search?q=galaxies');
    const initialProps = { galaxies: data.collection.items };
    res.send(render(req.url, initialProps));
  } catch (error) {
    console.error('An error ocurred in /galaxies', error);
  }
});

app.get('*', (req, res) => {
  res.send(render(req.url));
});

app.listen(config.PORT, () => {
  console.log(`Listening in http://localhost:${config.PORT}`);
});
