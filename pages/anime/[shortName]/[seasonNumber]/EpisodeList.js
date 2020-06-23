import { makeStyles, Tooltip, Typography, Zoom } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import { NextSeo } from 'next-seo';
import Error from 'next/error';
import Link from 'next/link';
import React from 'react';
import { getEpisodeRoute, getSeasonAPI } from '../../../../src/Routes';

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
    tooltip: {
        fontSize: '1.3rem',
        backgroundColor: theme.palette.error.main,
        color: theme.palette.error.contrastText
    },
    link: {
        cursor: 'pointer',
        fontSize: '1.5rem',
    },
    unavailable: {
        color: theme.palette.grey.A700,
        fontSize: '1.5rem',
        display: 'inline-block',
    },
}));

export default function EpisodeList({ errorCode, anime, season }) {
    const classes = useStyles();

    if (errorCode) {
        return <Error statusCode={errorCode} />;
    }

    return (
        <>
            <NextSeo title={`${season.englishName} Episodes - Mediaserver`}/>
            <div className="EpisodeSelector">
                <div className={classes.header}>
                    <Typography variant="h1">{season.displayName}</Typography>
                    <Typography variant="h2">Select the episode you want to watch</Typography>
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
                                        classes={classes}
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
        </>
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
