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
  Chip
} from '@mui/material';

// Standard size options
const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function SizeDialog({
  open,
  onClose,
  onSave,
  size,
  loading,
  isMobile,
  sizes = []
}) {
  const [formData, setFormData] = useState({
    label: ''
  });

  useEffect(() => {
    if (size) {
      setFormData({
        label: size.label || ''
      });
    } else {
      setFormData({
        label: ''
      });
    }
  }, [size]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChipClick = (label) => {
    setFormData(prev => ({
      ...prev,
      label
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const sizesArray = Array.isArray(sizes) ? sizes : [];

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
        {size ? 'Edit Size' : 'Add New Size'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ 
          p: { xs: 2, sm: 3 },
          pt: { xs: 1, sm: 2 }
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Size Label"
              name="label"
              value={formData.label}
              onChange={handleChange}
              required
              size={isMobile ? "small" : "medium"}
              placeholder="e.g., S, M, L, XL"
            />
            {/* Only show standard sizes when adding a new size */}
            {!size && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {STANDARD_SIZES.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    onClick={() => handleChipClick(s)}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            )}
            {sizesArray.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {sizesArray.map((s) => (
                  <Chip
                    key={s.id}
                    label={s.label}
                    onClick={() => handleChipClick(s.label)}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            )}
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
              size ? 'Update' : 'Add'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 