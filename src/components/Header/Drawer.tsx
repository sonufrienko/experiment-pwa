import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    paddingLeft: '24px'
  }
}));

const ListItemLink = (props: { to: string; children: any }) => {
  return <ListItem button component={Link} {...props} />;
}

interface Props {
  items: Array<{ url: string; title: string }>;
  drawerIsOpen: boolean;
  hideDrawer: () => void;
  headerTitle: string;
}

export default ({ items, drawerIsOpen, hideDrawer, headerTitle }: Props) => {
  const classes = useStyles();

  return (
    <Drawer open={drawerIsOpen} onClose={hideDrawer}>
      <div className={classes.list} role="presentation" onClick={hideDrawer}>
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={hideDrawer}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="body1" className={classes.title}>
            {headerTitle}
          </Typography>
        </div>
        <Divider />
        <List>
          {items.map(({ url, title }) => (
            <ListItemLink key={url} to={url}>
              <ListItemText primary={title} />
            </ListItemLink>
          ))}
        </List>
      </div>
    </Drawer>
  );
};
