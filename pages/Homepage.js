import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        top: '30%',
        left: 0,
        right: 0,
        width: 'auto',
        textAlign: 'center',
    },
    link: {
        textDecoration: 'none',
        cursor: 'pointer',
    },
});

export default function Home() {
    const classes = useStyles();

    return (
        <>
            <NextSeo title="Homepage - Mediaserver"/>
            <div className={classes.root}>
                <Typography variant="h1">Welcome to media server</Typography>

                <Link href="/anime">
                    <Typography variant="h2" className={classes.link}>
                        Press here to list the available animes
                    </Typography>
                </Link>
            </div>
        </>
    );
}
