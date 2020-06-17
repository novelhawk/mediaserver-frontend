import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import { getAnimeUrl, getAnimeListAPI } from '../Common';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/Cardcontent';
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

let styles = {
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
};

class AnimeListing extends React.Component {
    componentDidMount() {
        let api = getAnimeListAPI('animeGeneric');

        fetch(api)
            .then(res => res.json())
            .then(data => this.setState(data))
            .catch(error => {
                // Request error or malformed json
                this.setState({
                    fetchError: error
                })
            })
    }
    
    render() {
        if (!this.state) {
            return <Loading />;
        }

        let { successful, data, error, fetchError } = this.state;
        let { classes } = this.props;

        if (fetchError) {
            return <h1>Failed to connect to remote endpoint</h1>;
        }

        if (!successful) {
            return <Typography variant="h4">{error}</Typography>;
        }

        return (
            <div className="AnimeListing">
                <Typography variant="h3" className={classes.title} gutterBottom>
                    Available animes
                </Typography>
                <Grid container direction="row" justify="center" spacing={2} className={classes.grid}>
                    {data.animes.map((anime, index) => {
                        return (
                            <Grid key={index} item>
                                <Card className={classes.card}>
                                    <CardActionArea component={Link} to={getAnimeUrl(anime.id)}>
                                        {anime.cover && <CardMedia image={anime.cover} className={classes.image} />}
                                        <CardContent>
                                            <Typography variant="h5">
                                                {anime.displayName}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </div>
        );
    }
}

AnimeListing.propTypes = {
    classes: PropTypes.object.isRequired
};
 
export default withStyles(styles)(AnimeListing);
