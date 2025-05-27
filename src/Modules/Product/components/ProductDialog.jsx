import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, FormControl, InputLabel,
  Select, MenuItem, Chip, Grid, Typography, OutlinedInput
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
    onSave(formData);
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
                  <MenuItem value="unisex">Unisex</MenuItem>
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
              <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                <InputLabel>Colors</InputLabel>
                <Select
                  multiple
                  name="colors"
                  value={formData.colors}
                  onChange={handleChange}
                  input={<OutlinedInput label="Colors" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((colorId) => {
                        const color = colorsArray.find(c => c.id === colorId);
                        return color ? (
                          <Chip
                            key={color.id}
                            label={color.name}
                            sx={{
                              backgroundColor: color.hexCode,
                              color: '#fff',
                              '& .MuiChip-label': {
                                textShadow: '0 0 2px rgba(0,0,0,0.5)'
                              }
                            }}
                          />
                        ) : null;
                      })}
                    </Box>
                  )}
                >
                  {colorsArray.map((color) => (
                    <MenuItem key={color.id} value={color.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: color.hexCode,
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

            <Grid item xs={12}>
              <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                <InputLabel>Sizes</InputLabel>
                <Select
                  multiple
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleChange}
                  input={<OutlinedInput label="Sizes" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((sizeId) => {
                        const size = sizesArray.find(s => s.id === sizeId);
                        return size ? (
                          <Chip
                            key={size.id}
                            label={size.name}
                          />
                        ) : null;
                      })}
                    </Box>
                  )}
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
                <label htmlFor="cover-image-upload">
                  <Input
                    accept="image/*"
                    id="cover-image-upload"
                    type="file"
                    onChange={handleCoverImageChange}
                    required
                  />
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    size={isMobile ? "small" : "medium"}
                  >
                    Upload Cover Image
                  </Button>
                </label>
                {coverImagePreview && (
                  <ImagePreview src={coverImagePreview} alt="Cover preview" />
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mt: 2 }}>
                <label htmlFor="additional-images-upload">
                  <Input
                    accept="image/*"
                    id="additional-images-upload"
                    type="file"
                    multiple
                    onChange={handleAdditionalImagesChange}
                  />
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
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
                      alt={`Additional preview ${index + 1}`}
                      sx={{ width: '150px', height: '150px' }}
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
            {loading ? 'Saving...' : (product ? 'Update' : 'Add')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 