import fetch from 'node-fetch';
import config from '../config/index.js';

class Movie {
  async getNowPlayingMovies() {
    const API_URL = `${config.api.url}/now_playing?&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.api.readAccessToken}`,
      },
    };
    const response = await fetch(API_URL, options);
    const data = await response.json();
    return data;
  }
}

export default new Movie();
