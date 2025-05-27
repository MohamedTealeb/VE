import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, FormControl, InputLabel,
  Select, MenuItem, Chip, Grid, Typography, OutlinedInput,
  Paper, Divider
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

const ColorBox = styled(Box)(({ color }) => ({
  width: 24,
  height: 24,
  backgroundColor: color,
  border: '1px solid #ccc',
  borderRadius: 4,
  marginRight: 8,
}));

const SizeChip = styled(Chip)({
  margin: 4,
});

export default function ProductDialog({
  open,
  onClose,
  onSave,
  product,
  colors = [],
  sizes = [],
  categories = [],
  loading,
  isMobile
}) {
  const [formData, setFormData] = React.useState({
    name: '',
    categoryId: '',
    description: '',
    price: '',
    stock: '',
    target_gender: '',
    material: '',
    cover_Image: null,
    colors: [],
    sizes: [],
    images: []
  });

  const [coverImagePreview, setCoverImagePreview] = React.useState(null);
  const [additionalImagesPreview, setAdditionalImagesPreview] = React.useState([]);

  React.useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        categoryId: product.categoryId || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        target_gender: product.target_gender || '',
        material: product.material || '',
        colors: product.colors || [],
        sizes: product.sizes || [],
        cover_Image: null,
        images: []
      });
      setCoverImagePreview(product.cover_Image || null);
      setAdditionalImagesPreview(product.images || []);
    } else {
      setFormData({
        name: '',
        categoryId: '',
        description: '',
        price: '',
        stock: '',
        target_gender: '',
        material: '',
        cover_Image: null,
        colors: [],
        sizes: [],
        images: []
      });
      setCoverImagePreview(null);
      setAdditionalImagesPreview([]);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        cover_Image: file
      }));
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setAdditionalImagesPreview(prev => [...prev, ...newPreviews]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Format colors and sizes as comma-separated strings
    const formattedData = {
      ...formData,
      colors: formData.colors.join(','),
      sizes: formData.sizes.join(',')
    };
    console.log('Submitting product data:', formattedData);
    onSave(formattedData);
  };

  // Ensure arrays are valid
  const colorsArray = Array.isArray(colors) ? colors : [];
  const sizesArray = Array.isArray(sizes) ? sizes : [];
  const categoriesArray = Array.isArray(categories) ? categories : [];

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
        {product ? 'Edit Product' : 'Add New Product'}
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
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                size={isMobile ? "small" : "medium"}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                <InputLabel>Category</InputLabel>
                <Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  label="Category"
                >
                  {categoriesArray.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                <InputLabel>Target Gender</InputLabel>
                <Select
                  name="target_gender"
                  value={formData.target_gender}
                  onChange={handleChange}
                  label="Target Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Material"
                name="material"
                value={formData.material}
                onChange={handleChange}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Available Colors
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {colorsArray.map((color) => (
                    <Box
                      key={color.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1,
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        cursor: 'pointer',
                        bgcolor: formData.colors.includes(color.id) ? 'action.selected' : 'background.paper',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          colors: prev.colors.includes(color.id)
                            ? prev.colors.filter(id => id !== color.id)
                            : [...prev.colors, color.id]
                        }));
                      }}
                    >
                      <ColorBox color={color.hex} />
                      <Typography variant="body2">{color.name}</Typography>
                    </Box>
                  ))}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Selected Colors: {formData.colors.length}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Available Sizes
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {sizesArray.map((size) => (
                    <SizeChip
                      key={size.id}
                      label={size.label}
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          sizes: prev.sizes.includes(size.id)
                            ? prev.sizes.filter(id => id !== size.id)
                            : [...prev.sizes, size.id]
                        }));
                      }}
                      color={formData.sizes.includes(size.id) ? "primary" : "default"}
                      variant={formData.sizes.includes(size.id) ? "filled" : "outlined"}
                    />
                  ))}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Selected Sizes: {formData.sizes.length}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Cover Image
                </Typography>
                <label htmlFor="cover-image">
                  <Input
                    accept="image/*"
                    id="cover-image"
                    type="file"
                    onChange={handleCoverImageChange}
                  />
                  <Button
                    variant="outlined"
                    component="span"
                    size={isMobile ? "small" : "medium"}
                  >
                    Upload Cover Image
                  </Button>
                </label>
                {coverImagePreview && (
                  <ImagePreview src={coverImagePreview} alt="Cover Preview" />
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Additional Images
                </Typography>
                <label htmlFor="additional-images">
                  <Input
                    accept="image/*"
                    id="additional-images"
                    type="file"
                    multiple
                    onChange={handleAdditionalImagesChange}
                  />
                  <Button
                    variant="outlined"
                    component="span"
                    size={isMobile ? "small" : "medium"}
                  >
                    Upload Additional Images
                  </Button>
                </label>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {additionalImagesPreview.map((preview, index) => (
                    <ImagePreview
                      key={index}
                      src={preview}
                      alt={`Additional Preview ${index + 1}`}
                      sx={{ width: '100px', height: '100px' }}
                    />
                  ))}
                </Box>
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
            {product ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 