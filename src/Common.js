import urljoin from 'url-join';

const apiServer = 'http://192.168.1.111';

// Get API urls

export function getAnimeListAPI(part) {
    return `${apiServer}/api/v1/anime/list?part=${part}`;
}

export function getAnimeInfoAPI(animeId) {
    return `${apiServer}/api/v1/anime/${animeId}`;
}

// Get react routes url

export function getAnimeUrl(animeId) {
    return `/anime/${animeId}`;
}

export function getSeasonUrl(animeId, seasonId) {
    return urljoin(
        getAnimeUrl(animeId), 
        seasonId.toString()
    );
}

export function getEpisodeUrl(animeId, seasonId, episodeId) {
    return urljoin(
        getSeasonUrl(animeId, seasonId),
        episodeId.toString()
    );
}
