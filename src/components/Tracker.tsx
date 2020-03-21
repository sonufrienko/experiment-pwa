import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
const locationWorker = new Worker('/locationWorker.js');

export default () => {
  const [watchID, setWatchID] = useState<number>(0);
  const [workerMessage, setWorkerMessage] = useState<string>('');
  const watchInProgress = watchID !== 0;

  useEffect(() => {
    locationWorker.onmessage = event => {
      switch (event.data.action) {
        case 'result':
          const { distance } = event.data.result;
          const distanceFormatted = Number(distance).toFixed(4);
          setWorkerMessage(`Distance to your destination: ${distanceFormatted} km`);
          break;
        default:
          break;
      }
    };
  }, []);

  const onWatchSuccess = (position: Position) => {
    const { latitude, longitude } = position.coords;

    /**
     * Send location for CPU-intensive computation
     */
    locationWorker.postMessage({
      action: 'coordinates',
      coordinates: {
        latitude,
        longitude
      }
    });
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
        <p>{workerMessage}</p>
        <p>Mapbox</p>
      </div>
    </Paper>
  );
};
