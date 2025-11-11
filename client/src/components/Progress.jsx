import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Progress() {
  return (
    <Box sx={{ display: 'flex' , justifyContent: 'center' , color:'black'}}>
      <CircularProgress  className='text-black'/>
    </Box>
  );
}
