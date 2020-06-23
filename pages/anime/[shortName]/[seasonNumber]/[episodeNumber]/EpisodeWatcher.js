import { makeStyles, Typography } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import { NextSeo } from 'next-seo';
import Error from 'next/error';
import React from 'react';
import ReactPlayer from 'react-player';
import { getEpisodeAPI } from '../../../../../src/Routes';


const useStyles = makeStyles({
    header: {
        textAlign: 'center',
        marginBottom: '3vmin',
    },
    player: {
        textAlign: 'center',
    },
});

export default function EpisodeWatcher({ errorCode, anime, episode }) {
    const classes = useStyles();

    if (errorCode) {
        return <Error statusCode={errorCode} />;
    }

    return (
        <>
            <NextSeo title={`Episode ${episode.number} - ${anime.displayName} - Mediaserver`}/>
            <div className="Episode">
                <div className={classes.header}>
                    <Typography variant="h1">{anime.displayName}</Typography>
                    <Typography variant="h2">{episode.displayName}</Typography>
                </div>
                <ReactPlayer
                    className={classes.player}
                    url={episode.resourceUrl}
                    controls={true}
                    muted={false}
                    width="auto"
                    height="auto"
                />
            </div>
        </>
    );
}

export async function getServerSideProps({ params }) {
    try {
        const res = await fetch(getEpisodeAPI(params.shortName, params.seasonNumber, params.episodeNumber));
        if (!res.ok) {
            return { props: { errorCode: res.status } };
        }
        const data = await res.json();
        return { props: data };
    } catch (error) {
        return { props: { errorCode: 500 } };
    }
}
