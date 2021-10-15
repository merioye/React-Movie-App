import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Trending from './pages/Trending/Trending';
import Movies from './pages/Movies/Movies';
import TVSeries from './pages/TVSeries/TVSeries';
import Search from './pages/Search/Search';

const App = ()=>{
    return(
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Trending} />
                    <Route path='/movies' component={Movies} />
                    <Route path='/tv' component={TVSeries} />
                    <Route path='/search' component={Search} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default App;