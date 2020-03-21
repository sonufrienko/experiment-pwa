import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from './components/Header';

import HomeRoute from './routes/home';
import CountriesRoute from './routes/countries';
import MoviesRoute from './routes/movies';
import MovieDetailsRoute from './routes/movieDetails';
import TrackerRoute from './routes/tracker';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: pink
  },
  overrides: {
    MuiListItem: {
      gutters: {
        paddingLeft: 25
      }
    },
    MuiContainer: {
      root: {
        marginTop: 20
      }
    },
    MuiTypography: {
      h6: {
        fontWeight: 400
      }
    }
  }
});

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <Header />
          <Toolbar />
          <Container maxWidth="md">
            <Switch>
              <Route exact path="/" component={HomeRoute} />
              <Route exact path="/countries" component={CountriesRoute} />
              <Route exact path="/movies" component={MoviesRoute} />
              <Route exact path="/movies/:movieId" component={MovieDetailsRoute} />
              <Route exact path="/tracker" component={TrackerRoute} />
            </Switch>
          </Container>
        </StylesProvider>
      </ThemeProvider>
    </Router>
  );
}
