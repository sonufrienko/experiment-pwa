import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

export default () => {
  const [ log, setLog ] = useState<string>('');
  const [ messageText, setMessageText ] = useState<string>('');

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

      navigator.serviceWorker.addEventListener('message', event => {
        alert(event.data);
      })
    }
  }, []);

  const updateServiceWorker = () => {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        registration.update();
      }
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  }

  const sendMessage = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(messageText);
    }
  }

  return (
    <Paper>
      <div style={{ padding: 20, margin: '30px 0' }}>
        <Button style={{ marginRight: 20 }} onClick={updateServiceWorker} variant="contained" color="primary">Update service worker</Button>
        <Typography variant="overline" gutterBottom>
          {log && `>>> ${log}`}
        </Typography>
        <Divider style={{ margin: '20px 0' }} />
        <TextField 
          id="messageText" 
          label="Message for Service Worker" 
          variant="outlined" 
          value={messageText} 
          onChange={handleChange} 
          margin="dense"
          style={{
            width: 300
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button style={{ margin: '10px 0 0 10px' }} onClick={sendMessage} variant="contained" color="primary">Send</Button>
      </div>
    </Paper>
  );
};
