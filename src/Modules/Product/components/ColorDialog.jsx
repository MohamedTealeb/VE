import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';

export default function ColorDialog({ 
  open, 
  onClose, 
  onSave, 
  color = null 
}) {
  const [formData, setFormData] = useState({
    name: '',
    hexCode: '#000000'
  });

  useEffect(() => {
    if (color) {
      setFormData({
        name: color.name,
        hexCode: color.hexCode
      });
    } else {
      setFormData({
        name: '',
        hexCode: '#000000'
      });
    }
  }, [color]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {color ? 'Edit Color' : 'Add New Color'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              name="name"
              label="Color Name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              name="hexCode"
              label="Color"
              type="color"
              value={formData.hexCode}
              onChange={handleChange}
              fullWidth
              required
              sx={{
                '& input': {
                  height: '50px'
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            style={{ 
              backgroundColor: 'black',
              borderRadius: '8px'
            }}
          >
            {color ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 