import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box
} from '@mui/material';

export default function CategoryForm({
  open,
  onClose,
  formData,
  onFormChange,
  onImageChange,
  onSave,
  loading,
  imagePreview,
  isEdit
}) {
  React.useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      disableEnforceFocus
      disableAutoFocus
      keepMounted
    >
      <DialogTitle>{isEdit ? 'Edit Category' : 'Add Category'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={onFormChange}
          autoFocus
        />
        <Button 
          variant="contained" 
          component="label" 
          sx={{ mt: 2 }}
          tabIndex={0}
        >
          Upload Image
          <input 
            type="file" 
            hidden 
            onChange={onImageChange} 
            accept="image/*"
            aria-label="Upload category image"
          />
        </Button>
        {imagePreview && (
          <Box
            component="img"
            src={imagePreview}
            alt="Preview"
            sx={{ 
              width: 150, 
              height: 150, 
              mt: 2, 
              objectFit: 'cover', 
              borderRadius: 1,
              display: 'block'
            }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={onSave} 
          variant="contained" 
          disabled={loading}
          tabIndex={0}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 