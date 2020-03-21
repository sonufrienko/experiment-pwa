import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from './Drawer';

interface ScrollProps {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: ScrollProps) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

const drawerItems = [
  { url: '/', title: 'Home' },
  { url: '/tracker', title: 'Location tracker' },
  { url: '/encryption', title: 'Encryption' },
  { url: '/countries', title: 'Countries' },
  { url: '/movies', title: 'Movies' },
];

const pageTitles = new Map([
  ['/', 'Experiments on PWA'],
  ['/countries', 'Countries'],
  ['/movies', 'Movies'],
  ['/tracker', 'Location tracker'],
  ['/encryption', 'Encryption & Decryption'],
])

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default () => {
  const [drawerIsOpen, setDrawerState] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState<string>('');
  const classes = useStyles();
  const location = useLocation();
  
  useEffect(() => {
    const title = pageTitles.get(location.pathname) || '';
    setPageTitle(title);
  }, [location]);
  
  const toggleDrawer = () => setDrawerState(!drawerIsOpen);
  const hideDrawer = () => setDrawerState(false);

  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <IconButton
              onClick={toggleDrawer}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {pageTitle}
            </Typography>
            <Button color="inherit">Help</Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Drawer items={drawerItems} drawerIsOpen={drawerIsOpen} hideDrawer={hideDrawer} headerTitle="Experiments" />
    </>
  );
};
