import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, FormControl, InputLabel,
  Select, MenuItem, Chip, Grid, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const ImagePreview = styled('img')({
  width: '100%',
  maxHeight: '200px',
  objectFit: 'contain',
  marginTop: '8px',
  borderRadius: '4px',
});

export default function ProductDialog({
  open,
  onClose,
  onSave,
  product,
  colors = [],
  sizes = [],
  loading,
  isMobile
}) {
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    price: '',
    color: '',
    size: '',
    image: null,
    stock: ''
  });

  const [imagePreview, setImagePreview] = React.useState(null);

  React.useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        color: product.color || '',
        size: product.size || '',
        stock: product.stock || '',
        image: null
      });
      setImagePreview(product.image || null);
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        color: '',
        size: '',
        image: null,
        stock: ''
      });
      setImagePreview(null);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Ensure colors and sizes are arrays
  const colorsArray = Array.isArray(colors) ? colors : [];
  const sizesArray = Array.isArray(sizes) ? sizes : [];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ 
        p: { xs: 2, sm: 3 },
        pb: { xs: 1, sm: 2 }
      }}>
        {product ? 'Edit T-Shirt' : 'Add New T-Shirt'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ 
          p: { xs: 2, sm: 3 },
          pt: { xs: 1, sm: 2 }
        }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="T-Shirt Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={3}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                }}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                <InputLabel>Color</InputLabel>
                <Select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                  label="Color"
                  disabled={loading}
                >
                  {colorsArray.map((color) => (
                    <MenuItem key={color.id} value={color.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: color.code,
                            borderRadius: '50%',
                            border: '1px solid #ccc'
                          }}
                        />
                        {color.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                <InputLabel>Size</InputLabel>
                <Select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                  label="Size"
                  disabled={loading}
                >
                  {sizesArray.map((size) => (
                    <MenuItem key={size.id} value={size.id}>
                      {size.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mt: 2 }}>
                <label htmlFor="image-upload">
                  <Input
                    accept="image/*"
                    id="image-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    size={isMobile ? "small" : "medium"}
                  >
                    Upload T-Shirt Image
                  </Button>
                </label>
                {imagePreview && (
                  <ImagePreview src={imagePreview} alt="T-shirt preview" />
                )}
              </Box>
            </Grid>
          </Grid>
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
            {loading ? 'Saving...' : (product ? 'Update' : 'Add')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 