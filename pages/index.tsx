import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        top: '30%',
        left: 0,
        right: 0,
        width: 'auto',
        textAlign: 'center'
    },
    link: {
        textDecoration: 'none',
        cursor: 'pointer'
    }
});

export default function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h3">
                Welcome to media server
            </Typography>

            <Link href='/anime'>
                <Typography variant="h5" className={classes.link}>
                    Press here to list the available animes
                </Typography>
            </Link>
        </div>
    );
}
