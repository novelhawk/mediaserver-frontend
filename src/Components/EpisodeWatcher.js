import React from 'react';
import ReactPlayer from 'react-player'
import Loading from './Loading';
import { Fetch } from 'react-request';
import { withRouter } from 'react-router-dom';
import '../StyleSheets/EpisodeWatcher.scss'

class EpisodeWatcher extends React.Component {
    componentDidMount() {
        let params = this.props.match.params;

        this.setState({
            anime: params.anime,
            season: params.season,
            episode: params.episode
        });
    }

    render() { 
        // Wait for componentDidMount
        if (!this.state) return null;

        const api = `http://192.168.1.111/api/v1/anime/{anime}/{season}/{episode}`.format(this.state);
        
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
                        let episodeInfo = data.data;

                        return (
                            <div className="Episode">
                                <div className="Episode-Header">
                                    <h1>{episodeInfo.displayName}</h1>
                                </div>
                                <ReactPlayer
                                    className="Episode-Player"
                                    url={episodeInfo.mediaUrl}
                                    controls={true}
                                    muted={false}
                                    width='auto'
                                    height='auto'
                                />
                            </div>
                        );
                    }

                    return null;
                }}
            </Fetch>
        );
    }
}

export default withRouter(EpisodeWatcher);
