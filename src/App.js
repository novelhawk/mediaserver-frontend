import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Home from './Components/Home';
import EpisodeWatcher from './Components/EpisodeWatcher';
import SeasonSelector from './Components/SeasonSelector';
import EpisodeSelector from './Components/EpisodeSelector';
import AnimeListing from './Components/AnimeListing';

import Test from './Components/Test'

let style = {
    body: {
        backgroundColor: '#232323',
        height: '100vh'
    }
}

class App extends React.Component {
    componentDidMount() {
        document.body.className = this.props.classes.body;
    }

    render() {
        return (
            <Switch>
                
                <Route path='/test'>
                    <Test />
                </Route>

                <Route path='/anime/:anime/:season/:episode'>
                    <EpisodeWatcher />
                </Route>

                <Route path='/anime/:anime/:season'>
                    <EpisodeSelector />
                </Route>
                
                <Route path='/anime/:anime'>
                    <SeasonSelector />
                </Route>

                <Redirect from='/anime' to='/animes' />
                <Route path='/animes'>
                    <AnimeListing />
                </Route>

                <Route path='/'>
                    <Home />
                </Route>
            </Switch>
        );
   }
}

export default withStyles(style)(App);
