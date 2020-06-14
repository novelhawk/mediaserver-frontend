import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Components/Home';
import EpisodeWatcher from './Components/EpisodeWatcher';
import SeasonSelector from './Components/SeasonSelector';
import EpisodeSelector from './Components/EpisodeSelector';
import AnimeListing from './Components/AnimeListing';

class App extends React.Component {
    render() {
        return (
            <Switch>
                
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

export default App;
