import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

export default () => {
  const [ messageText, setMessageText ] = useState<string>('');
  const [ permissionStatus, setPermissionStatus ] = useState<string>('default');
  const notificationAllowed = permissionStatus === "granted";

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', event => {
        console.log(event.data);
      })
    }
  }, []);

  const enableNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
    } else {
      console.log('Notification not supported.')
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  }

  const showNotification = () => {
    if (notificationAllowed) {
      new Notification('This is a title!', {
        body: 'Some details you can show here.',
      });
    }
  }

  const sendMessage = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(messageText);
    }
  }

  return (
    <Paper>
      <div style={{ padding: 20, margin: '30px 0' }}>
        <Typography gutterBottom>
          Notifications API
        </Typography>
        <Typography gutterBottom>Permission: <b>{permissionStatus}</b></Typography>
        <Button onClick={enableNotifications} variant="contained" color="primary">Enable notifications</Button>
        <Button style={{ marginLeft: 20 }} onClick={showNotification} variant="contained" color="primary" disabled={!notificationAllowed}>Show notification</Button>
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
