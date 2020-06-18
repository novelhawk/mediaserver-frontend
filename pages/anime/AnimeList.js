import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Typography
} from '@material-ui/core/';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import Link from 'next/link';
import React from 'react';
import { getAnimesAPI } from '../../src/Routes';

const useStyles = makeStyles({
    grid: {
        width: '90%',
        margin: 'auto',
    },
    title: {
        marginTop: '5px',
        textAlign: 'center',
    },
    card: {
        minWidth: '220px',
        maxWidth: '300px',
    },
    image: {
        paddingTop: '131%',
    },
});

export default function AnimeList({ errorCode, animes }) {
    const classes = useStyles();

    if (errorCode) {
        return <Error statusCode={errorCode} />;
    }

    return (
        <div className="AnimeListing">
            <Typography variant="h1" className={classes.title} gutterBottom>
                Available animes
            </Typography>
            <Grid container direction="row" justify="center" spacing={2} className={classes.grid}>
                {animes.map((anime) => {
                    return (
                        <Grid key={anime.id} item>
                            <Card className={classes.card}>
                                <Link href={`/anime/${anime.shortName}`}>
                                    <CardActionArea>
                                        {anime.coverResourceUrl && (
                                            <CardMedia image={anime.coverResourceUrl} className={classes.image} />
                                        )}
                                        <CardContent>
                                            <Typography variant="h5">{anime.displayName}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const res = await fetch(getAnimesAPI());
        if (!res.ok) {
            return { props: { errorCode: res.status } };
        }
        const json = await res.json();
        return { props: { animes: json } };
    } catch (error) {
        return { props: { errorCode: 500 } };
    }
}
