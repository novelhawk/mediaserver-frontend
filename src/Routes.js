export function getAnimeRoute(shortName) {
    return `/anime/${shortName}`;
}

export function getSeasonRoute(shortName, seasonNumber) {
    return `/anime/${shortName}/${seasonNumber}`;
}

export function getEpisodeRoute(shortName, seasonNumber, episodeNumber) {
    return `/anime/${shortName}/${seasonNumber}/${episodeNumber}`;
}

export function getAnimesAPI() {
    return 'http://localhost:8000/anime';
}

export function getAnimeAPI(shortName) {
    return `http://localhost:8000/anime/${shortName}`;
}

export function getSeasonsAPI(shortName) {
    return `http://localhost:8000/anime/${shortName}/season`;
}

export function getSeasonAPI(shortName, seasonNumber) {
    return `http://localhost:8000/anime/${shortName}/season/${seasonNumber}`;
}

export function getEpisodesAPI(shortName, seasonNumber) {
    return `http://localhost:8000/anime/${shortName}/season/${seasonNumber}/episode`;
}

export function getEpisodeAPI(shortName, seasonNumber, episodeNumber) {
    return `http://localhost:8000/anime/${shortName}/season/${seasonNumber}/episode/${episodeNumber}`;
}
