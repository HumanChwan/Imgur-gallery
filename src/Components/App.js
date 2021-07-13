import React from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom'
import NavBar from './NavBar'
import '../SCSS/style.scss'
import Home from './Home/Home'
import Gallery from './Gallery/Gallery'

export default function App() {
    return (
        <>
            <Router>
                <NavBar />
                <Switch>
                    <Route path='/home' exact component={Home} />
                    <Route path='/gallery' exact component={Gallery} />
                    <Redirect to='/home' />
                </Switch>
            </Router>
        </>
    )
}
