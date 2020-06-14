import React from 'react';
import Loading from './Loading';
import { Fetch } from 'react-request';
import { Link } from 'react-router-dom';
import '../StyleSheets/AnimeListing.scss';

class AnimeListing extends React.Component {
    getAnimeUrl(animeId) {
        return `/anime/${animeId}`;
    }

    render() {
        let api = 'http://192.168.1.111/api/v1/anime/list?part=animeGeneric';

        return (
            <Fetch method="GET" url={api}>
                {({ fetching, failed, data }) => {
                    if (fetching) {
                        return <Loading />
                    }

                    if (failed) {
                        return <h1>{data?.error ?? "Failed to connect to remote API"}</h1>
                    }

                    if (data) {
                        return (
                            <div className="AnimeListing">
                                <h1 className="AnimeListing-Header">Listing animes</h1>
                                {data.animes.map(anime => {
                                    return (
                                        <div className="AnimeListing-AnimePanel">
                                            <Link to={this.getAnimeUrl(anime.id)}>{anime.displayName}</Link>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }

                    return null;
                }}
            </Fetch>
        );
    }
}
 
export default AnimeListing;
