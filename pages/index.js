import React from 'react';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

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
        <div className={classes.root}>
            <Typography variant="h1">Welcome to media server</Typography>

            <Link href="/anime">
                <Typography variant="h3" className={classes.link}>
                    Press here to list the available animes
                </Typography>
            </Link>
        </div>
    );
}
