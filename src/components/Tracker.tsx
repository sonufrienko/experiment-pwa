import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { LocationContext, ICoordinate } from '../contexts/LocationContext';
import usePosition from './usePosition';
const locationWorker = new Worker('/locationWorker.js');

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoic29udWZyaWVua28iLCJhIjoiY2s4YTBiaDVpMDAwNjNubXgyOHh2c2l2cyJ9.XIp8Ea2LPRGxGJF9Ftc4eg'
});

export default () => {
  const { coordinates, updateCoordinates, pushCoordinate } = useContext(LocationContext);
  const { position, error } = usePosition();
  const [workerMessage, setWorkerMessage] = useState<string>('');

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

  useEffect(() => {
    if (position) {
      pushCoordinate(position);
    }

    /**
     * Send location for CPU-intensive computation
     */
    locationWorker.postMessage({
      action: 'coordinates',
      coordinates: position
    });
  }, [position]);

  const sendRoute = () => {
    const url = 'https://<URL>/locations';
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coordinates
      })
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {});
  };

  const clearRoute = () => {
    updateCoordinates([]);
  };

  const centerPosition: [number, number] | undefined = position ? [position.longitude, position.latitude] : undefined;
  const mappedRoute = coordinates.map(c => [c.longitude, c.latitude]);

  const lineLayout = {
    'line-cap': 'round' as 'round',
    'line-join': 'round' as 'round'
  };

  const linePaint = {
    'line-color': '#d95036',
    'line-width': 6
  };

  return (
    <>
      <Paper>
        <Map
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: '500px',
            width: '100%'
          }}
          center={centerPosition}
          zoom={[18]}
        >
          <Layer type="line" layout={lineLayout} paint={linePaint}>
            <Feature coordinates={mappedRoute} />
          </Layer>
        </Map>
      </Paper>
      <Paper>
        <div style={{ padding: 20, margin: '30px 0', display: 'flex', alignItems: 'center' }}>
          <Button onClick={sendRoute} variant="contained" color="primary">
            Send to cloud
          </Button>
          <Button style={{ margin: '0 20px' }} onClick={clearRoute} variant="contained" color="secondary">
            Clear route
          </Button>
          <div>{workerMessage}</div>
        </div>
      </Paper>
    </>
  );
};
