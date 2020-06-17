import React from 'react';
import Loading from './Loading';
import { getSeasonUrl, getAnimeInfoAPI } from '../Common';
import { withRouter, Redirect, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/Cardcontent';
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

let style = {
    header: {
        marginTop: '5px',
        textAlign: 'center'
    },
    grid: {
        width: '90%',
        margin: 'auto'
    },
    card: {
        minWidth: '220px',
        maxWidth: '300px'
    },
    image: {
        paddingTop: '131%',
        backgroundSize: 'cover'
        // backgroundPosition: 'center'
    }
}

class SeasonSelector extends React.Component {
    componentDidMount() {
        let { anime } = this.props.match.params;
        let api = getAnimeInfoAPI(anime);

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

        // No seasons available => Don't render the page
        if (!data.seasons || data.seasons.length === 0) {
            return <h1>No season available</h1>
        }

        // Only one season available => Select that one
        if (data.seasons.length === 1) {
            return <Redirect to={getSeasonUrl(1)} />
        }

        return (
            <div className="SeasonSelector">
                <div className={classes.header}>
                    <Typography variant="h3">
                        {data.displayName}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Select the season you want to watch
                    </Typography>
                </div>
                <Grid container direction="row" justify="center" spacing={2} className={classes.grid}>
                    {data.seasons.map((season, index) => {
                        return (
                            <Grid key={index} item>
                                <Card className={classes.card}>
                                    <CardActionArea component={Link} to={getSeasonUrl(data.id, index + 1)}>
                                        {season.cover && <CardMedia image={season.cover} className={classes.image} />}
                                        <CardContent>
                                            <Typography variant="h5">
                                                {season.displayName}
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
 
export default withStyles(style)(withRouter(SeasonSelector));
