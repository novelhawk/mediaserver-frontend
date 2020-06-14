import React from 'react';
import Loading from './Loading';
import { Fetch } from 'react-request';
import { withRouter, Redirect, Link } from 'react-router-dom';
import '../StyleSheets/SeasonSelector.scss'

class SeasonSelector extends React.Component {
    getSeasonUrl(season) {
        return `/anime/${this.state.anime}/${season}`;
    }

    componentDidMount() {
        let params = this.props.match.params;
        this.setState({
            anime: params.anime
        });
    }

    render() {
        // Wait for componentDidMount
        if (!this.state) return null;

        const api = 'http://192.168.1.111/api/v1/anime/{anime}'.format(this.state);

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
                        let animeInfo = data.data;

                        // No seasons available => Don't render the page
                        if (!animeInfo.seasons || animeInfo.seasons.length === 0) {
                            return <h1>No season available</h1>
                        }

                        // Only one season available => Select that one
                        if (animeInfo.seasons.length === 1) {
                            return <Redirect to={this.getSeasonUrl(1)} />
                        }

                        return (
                            <div className="SeasonSelector">
                                <div className="SeasonSelector-Header">
                                    <h1>{animeInfo.displayName}</h1>
                                    <h3>Select the season you want to watch</h3>
                                </div>
                                <div className="SeasonSelector-Selector">
                                    {animeInfo.seasons.map((season, index) => {
                                        return (
                                            <div className="SeasonSelector-SeasonPanel">
                                                <Link key={index} to={this.getSeasonUrl(index + 1)}>
                                                    {season.displayName}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }

                    return null;
                }}
            </Fetch>
        );
    }
}
 
export default withRouter(SeasonSelector);
