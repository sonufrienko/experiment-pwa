import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import ServiceWorkerMonitor from '../components/ServiceWorkerMonitor';
import Notifications from '../components/Notifications';
import Weather from '../components/Weather';
import WebAuthn from '../components/WebAuthn';

const Logo = styled.img`
  max-height: 48px;
  display: block;
  margin-bottom: 16px;
`;

export default () => {
  return (
    <Box my={2}>
      <Logo src="/pwalogo.svg" alt="pwa" />
      Wellcome to experiments on PWA.
      <ServiceWorkerMonitor />
      <WebAuthn />
      <Notifications />
      <Weather cityName="lisboa" />
    </Box>
  );
};
