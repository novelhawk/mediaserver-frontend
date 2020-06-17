import React from 'react';
import Error from 'next/error';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

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
            <Typography variant="h3" className={classes.title} gutterBottom>
                Available animes
            </Typography>
            <Grid container direction="row" justify="center" spacing={2} className={classes.grid}>
                {animes.map((anime) => {
                    return (
                        <Grid key={anime.id} item>
                            <Card className={classes.card}>
                                <Link href={`/anime/${anime.shortName}`}>
                                    <CardActionArea>
                                        {anime.cover && <CardMedia image={anime.cover} className={classes.image} />}
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
        const api = 'http://localhost:8000/anime';
        const res = await fetch(api);
        const json = await res.json();

        return { props: { animes: json } };
    } catch (error) {
        return { props: { errorCode: 500 } };
    }
}
