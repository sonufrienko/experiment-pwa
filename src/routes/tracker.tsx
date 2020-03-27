import React from 'react';
import Box from '@material-ui/core/Box';
import Tracker from '../components/Tracker';
import { LocationProvider } from '../contexts/LocationContext';

export default () => {
  return (
    <Box>
      <LocationProvider>
        <Tracker />
      </LocationProvider>
    </Box>
  );
};
