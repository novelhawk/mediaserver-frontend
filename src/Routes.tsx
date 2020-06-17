export function getAnimeRoute(shortName: string): string {
    return `/anime/${shortName}`;
}

export function getSeasonRoute(shortName: string, seasonNumber: number): string {
    return `/anime/${shortName}/${seasonNumber}`;
}

export function getEpisodeRoute(shortName: string, seasonNumber: number, episodeNumber: number): string {
    return `/anime/${shortName}/${seasonNumber}/${episodeNumber}`;
}
