import React from 'react';
import { Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

const Timer = ({ time }) => (
  <Box position="absolute" top="20px" left="20px">
    <CircularProgress
      value={100 - (time / 90) * 100} 
      color="green.400"
      size="60px"
      thickness="12px"
      trackColor="transparent"
      strokeLinecap="round"
    >
      <CircularProgressLabel fontSize="xl" fontWeight="bold">
        {time}s
      </CircularProgressLabel>
    </CircularProgress>
  </Box>
);

export default Timer;
