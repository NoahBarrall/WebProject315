import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import BasicTextFields from './basicTest.js'; // Import the BasicTextFields component

export default function FloatingActionButtons() {
  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);

  const toggleTextFieldVisibility = () => {
    setIsTextFieldVisible(!isTextFieldVisible);
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add" onClick={toggleTextFieldVisibility}>
        <AddIcon />
      </Fab>
      
      {isTextFieldVisible && <BasicTextFields />}
    </Box>
  );
}
