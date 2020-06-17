import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

let style = {
    root: {
        position: 'absolute',
        top: '30%',
        left: 0,
        right: 0,
        width: 'auto',
        textAlign: 'center'
    },
    text: {
        color: '#f0f0f0',
        textDecoration: 'none'
    }
};

class Home extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h3" className={classes.text}>
                    Welcome to media server
                </Typography>

                <Typography variant="h5" component={Link} to="/anime" className={classes.text}>
                    Press here to list the available animes
                </Typography>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(Home);
