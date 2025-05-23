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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Edit Category' : 'Add Category'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={onFormChange}
        />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Image
          <input type="file" hidden onChange={onImageChange} accept="image/*" />
        </Button>
        {imagePreview && (
          <Box
            component="img"
            src={imagePreview}
            alt="Preview"
            sx={{ width: 150, height: 150, mt: 2, objectFit: 'cover', borderRadius: 1 }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 