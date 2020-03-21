import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker, registration successful');
      await subscribeToPushNotifications();
    } catch (err) {
      console.log('Service Worker, registration failed: ', err);
    }
  });
} else {
  console.log(`ServiceWorker is unsupported by ${window.navigator.userAgent}`);
}

const subscribeToPushNotifications = async () => {
  const registration = await navigator.serviceWorker.ready;
  const existexistingSubscription = await registration.pushManager.getSubscription();

  if (existexistingSubscription) {
    // Subscription is exists, update DB
    console.log('Push notifications subscription already exists: ', JSON.stringify(existexistingSubscription));
  } else {
    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY
      });
      
      console.log('New push notifications subscription: ', JSON.stringify(subscription));
    } catch (err) {
      console.log('Fail push notifications subscription: ', err);
    }
  }
}