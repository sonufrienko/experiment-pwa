import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Countries from '../components/Countries'

export default () => {
  return (
    <Box>
      <Typography variant="h4" component="h1">
        Country list
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Fetch data from REST API.
      </Typography>
      <Countries />
    </Box>
  );
};
