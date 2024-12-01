import { TMDB_API_KEY } from '@env'; // Importa a variável do .env

const tmdbApi = () => ({
    method: 'GET',
    headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_API_KEY}`,
    }
});

export default tmdbApi;
