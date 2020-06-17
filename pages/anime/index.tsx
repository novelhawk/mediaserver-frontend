import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';

const useStyles = makeStyles({
    grid: {
        width: '90%',
        margin: 'auto'
    },
    title: {
        marginTop: '5px',
        textAlign: 'center'
    },
    card: {
        minWidth: '220px',
        maxWidth: '300px'
    },
    image: {
        paddingTop: '131%'
    }
});

export default function Test() {
    const classes = useStyles();

    return (
        <a></a>
    );
}

export async function getServerSideProps() {
    
    return { props: {} }
}
