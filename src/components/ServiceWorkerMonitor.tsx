import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default () => {
  const [ log, setLog ] = useState<string>('');

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        registration?.addEventListener('updatefound', event => {
          const swInstalling = registration.installing;
          swInstalling?.addEventListener('statechange', event => {
            if (swInstalling.state === 'installed') {
              setLog('A new SW installed and waiting...');
            } else {
              setLog('A new SW is now controlling the page');
            }
          });
        });
      });
    }
  }, []);

  const updateServiceWorker = () => {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        registration.update();
      }
    });
  };

  return (
    <Paper>
      <div style={{ padding: 20, margin: '30px 0' }}>
        <Button style={{ marginRight: 20 }} onClick={updateServiceWorker} variant="contained" color="primary">Update service worker</Button>
        <Typography variant="overline" gutterBottom>
          {log && `>>> ${log}`}
        </Typography>
      </div>
    </Paper>
  );
};
