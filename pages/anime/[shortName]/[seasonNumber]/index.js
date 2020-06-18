import React from 'react';
import Link from 'next/link';
import Error from 'next/error';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { getEpisodeRoute, getSeasonAPI } from '../../../../src/Routes';
import fetch from 'isomorphic-unfetch';

const useStyles = makeStyles((theme) => ({
    header: {
        textAlign: 'center',
        marginBottom: '3vmin',
    },
    root: {
        textAlign: 'center',
        width: '40%',
        margin: 'auto',
    },
    link: {
        cursor: 'pointer',
    },
    unavailable: {
        color: theme.palette.grey.A700,
        display: 'inline-block',
    },
}));

export default function EpisodeList({ errorCode, anime, season }) {
    const classes = useStyles();

    if (errorCode) {
        return <Error statusCode={errorCode} />;
    }

    return (
        <div className="EpisodeSelector">
            <div className={classes.header}>
                <Typography variant="h1">{season.displayName}</Typography>
                <Typography variant="h3">Select the episode you want to watch</Typography>
            </div>
            <div className={classes.root}>
                {season.episodes.map((episode) => {
                    return (
                        <div key={episode.number}>
                            {episode.available !== false ? (
                                <Link href={getEpisodeRoute(anime.shortName, season.number, episode.number)}>
                                    <Typography variant="body1" className={classes.link}>
                                        {episode.displayName}
                                    </Typography>
                                </Link>
                            ) : (
                                <Tooltip
                                    title="Not available"
                                    placement="right"
                                    TransitionComponent={Zoom}
                                    enterDelay={50}
                                    leaveDelay={100}
                                >
                                    <Typography variant="body1" className={classes.unavailable}>
                                        {episode.displayName}
                                    </Typography>
                                </Tooltip>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    try {
        const res = await fetch(getSeasonAPI(params.shortName, params.seasonNumber));
        if (!res.ok) {
            return { props: { errorCode: res.status } };
        }
        const data = await res.json();
        return { props: data };
    } catch (error) {
        return { props: { errorCode: 500 } };
    }
}
