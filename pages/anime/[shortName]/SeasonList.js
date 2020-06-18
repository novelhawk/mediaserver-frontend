import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect } from 'react';
import { getAnimeAPI, getSeasonRoute } from '../../../src/Routes';

const useStyles = makeStyles({
    header: {
        marginTop: '5px',
        textAlign: 'center',
    },
    grid: {
        width: '90%',
        margin: 'auto',
    },
    card: {
        width: '30vh',
    },
    image: {
        paddingTop: '131%',
    },
});

export default function SeasonList({ errorCode, anime }) {
    const classes = useStyles();

    if (errorCode) {
        return <Error statusCode={errorCode} />;
    }

    let seasons;
    if (anime.seasons.lenth === 0) {
        // No seasons available
        seasons = <Typography variant="h3">No seasons available</Typography>;
    } else if (anime.seasons.length === 1) {
        // Redirect to season if only one is available
        useEffect(() => {
            const season = anime.seasons[0];
            Router.push(getSeasonRoute(anime.shortName, season.number));
        });
        return null;
    } else {
        // Render the season selector if there are multiple seasons available
        seasons = anime.seasons.map((season) => {
            return (
                <Grid key={season.number} item>
                    <Card className={classes.card}>
                        <Link href={getSeasonRoute(anime.shortName, season.number)}>
                            <CardActionArea>
                                {season.coverResourceUrl && (
                                    <CardMedia image={season.coverResourceUrl} className={classes.image} />
                                )}
                                <CardContent>
                                    <Typography variant="h5">{season.displayName}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Link>
                    </Card>
                </Grid>
            );
        });
    }

    return (
        <div className="SeasonSelector">
            <div className={classes.header}>
                <Typography variant="h1">{anime.displayName}</Typography>
                <Typography variant="h2" gutterBottom>
                    Select the season you want to watch
                </Typography>
            </div>
            <Grid container direction="row" justify="center" spacing={2} className={classes.grid}>
                {seasons}
            </Grid>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    try {
        const res = await fetch(getAnimeAPI(params.shortName));
        if (!res.ok) {
            return { props: { errorCode: res.status } };
        }
        const json = await res.json();
        return { props: { anime: json } };
    } catch (error) {
        return { props: { errorCode: 500 } };
    }
}
