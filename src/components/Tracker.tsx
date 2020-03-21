import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

export default () => {
  const [watchID, setWatchID] = useState<number>(0);
  const watchInProgress = watchID !== 0;

  const onWatchSuccess = (position: Position) => {
    const { latitude, longitude } = position.coords;
    // save in IndexedDB
  };

  const onWatchError = (err: any) => {
    console.log('Geolocation', err);
  };

  const watchLocation = () => {
    const options = { enableHighAccuracy: true };
    const id = navigator.geolocation.watchPosition(onWatchSuccess, onWatchError, options);
    setWatchID(id);
  };

  const cancelWatchLocation = () => {
    navigator.geolocation.clearWatch(watchID);
    setWatchID(0);
  };

  return (
    <Paper>
      <div style={{ padding: 20, margin: '30px 0' }}>
        <Typography gutterBottom>Location tracker with Geolocation.watchPosition()</Typography>
        <Button
          style={{ marginRight: 20 }}
          onClick={watchLocation}
          variant="contained"
          color="primary"
          disabled={watchInProgress}
        >
          Start watch
        </Button>
        <Button onClick={cancelWatchLocation} variant="contained" color="primary" disabled={!watchInProgress}>
          Stop watch
        </Button>
        <Divider style={{ margin: '20px 0' }} />
        <p>Mapbox</p>
      </div>
    </Paper>
  );
};
