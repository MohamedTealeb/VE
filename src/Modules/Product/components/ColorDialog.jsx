import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
  Popover,
  Typography
} from '@mui/material';

// Color name to hex mapping
const colorNameToHex = {
  'red': '#FF0000',
  'blue': '#0000FF',
  'green': '#008000',
  'yellow': '#FFFF00',
  'black': '#000000',
  'white': '#FFFFFF',
  'purple': '#800080',
  'orange': '#FFA500',
  'pink': '#FFC0CB',
  'brown': '#A52A2A',
  'gray': '#808080',
  'grey': '#808080',
  'cyan': '#00FFFF',
  'magenta': '#FF00FF',
  'lime': '#00FF00',
  'maroon': '#800000',
  'navy': '#000080',
  'olive': '#808000',
  'teal': '#008080',
  'violet': '#EE82EE',
  'indigo': '#4B0082',
  'gold': '#FFD700',
  'silver': '#C0C0C0',
  'beige': '#F5F5DC',
  'coral': '#FF7F50',
  'crimson': '#DC143C',
  'khaki': '#F0E68C',
  'lavender': '#E6E6FA',
  'plum': '#DDA0DD',
  'salmon': '#FA8072',
  'tan': '#D2B48C',
  'turquoise': '#40E0D0'
};

// Predefined color options with their names
const predefinedColors = [
  { hex: '#FF0000', name: 'Red' },
  { hex: '#00FF00', name: 'Green' },
  { hex: '#0000FF', name: 'Blue' },
  { hex: '#FFFF00', name: 'Yellow' },
  { hex: '#FF00FF', name: 'Magenta' },
  { hex: '#00FFFF', name: 'Cyan' },
  { hex: '#FFA500', name: 'Orange' },
  { hex: '#800080', name: 'Purple' },
  { hex: '#008000', name: 'Green' },
  { hex: '#000080', name: 'Navy' },
  { hex: '#800000', name: 'Maroon' },
  { hex: '#808000', name: 'Olive' },
  { hex: '#FFC0CB', name: 'Pink' },
  { hex: '#A52A2A', name: 'Brown' },
  { hex: '#808080', name: 'Gray' },
  { hex: '#FFFFFF', name: 'White' },
  { hex: '#000000', name: 'Black' },
  { hex: '#FFD700', name: 'Gold' }
];

export default function ColorDialog({
  open,
  onClose,
  onSave,
  color,
  loading,
  isMobile
}) {
  const [formData, setFormData] = useState({
    name: '',
    hexCode: '#000000'
  });

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (color) {
      console.log('Received color data:', color);
      setFormData({
        name: color.name || '',
        hexCode: color.hexCode || '#000000'
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
    
    if (name === 'name') {
      // Convert to lowercase for case-insensitive matching
      const colorName = value.toLowerCase();
      const hexCode = colorNameToHex[colorName] || formData.hexCode;
      
      setFormData(prev => ({
        ...prev,
        name: value,
        hexCode: hexCode
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleColorClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleColorClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (selectedColor) => {
    console.log('Selected color:', selectedColor);
    setFormData(prev => ({
      ...prev,
      hexCode: selectedColor.hex,
      name: selectedColor.name
    }));
    handleColorClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Only send name and hexCode to the API
    const colorData = {
      name: formData.name,
      hexCode: formData.hexCode
    };
    console.log('Submitting color data to API:', colorData);
    onSave(colorData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ 
        p: { xs: 2, sm: 3 },
        pb: { xs: 1, sm: 2 }
      }}>
        {color ? 'Edit Color' : 'Add New Color'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ 
          p: { xs: 2, sm: 3 },
          pt: { xs: 1, sm: 2 }
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Color Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              size={isMobile ? "small" : "medium"}
              placeholder="e.g., Red, Blue, Green"
              helperText="Type a color name or select from the color picker"
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <TextField
                fullWidth
                label="Color Code"
                name="hexCode"
                value={formData.hexCode}
                onChange={handleChange}
                required
                size={isMobile ? "small" : "medium"}
              />
              <Box
                onClick={handleColorClick}
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: formData.hexCode,
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Click the color box to select from predefined colors
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: { xs: 2, sm: 3 },
          pt: { xs: 1, sm: 2 }
        }}>
          <Button 
            onClick={onClose}
            size={isMobile ? "small" : "medium"}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            size={isMobile ? "small" : "medium"}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              color ? 'Update' : 'Add'
            )}
          </Button>
        </DialogActions>
      </form>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleColorClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1 }}>
          {predefinedColors.map((color) => (
            <Box
              key={color.hex}
              onClick={() => handleColorSelect(color)}
              sx={{
                width: 30,
                height: 30,
                backgroundColor: color.hex,
                border: '1px solid #ccc',
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                  transform: 'scale(1.1)'
                }
              }}
            />
          ))}
        </Box>
      </Popover>
    </Dialog>
  );
} 