import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box, FormControl, InputLabel,
  Select, MenuItem, Chip, Grid, Typography, OutlinedInput,
  Paper, Divider, Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';

const imageBaseUrl = import.meta.env.VITE_IMAGEURL;

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
  selectedProduct = null,
  colors = [],
  sizes = [],
  categories = [],
  loading,
  isMobile
}) {
  console.log('🔍 ProductDialog: Component rendered with props:', {
    open,
    selectedProduct,
    selectedProductId: selectedProduct?.id,
    selectedProductName: selectedProduct?.name,
    colors: colors?.length,
    sizes: sizes?.length,
    categories: categories?.length
  });

  const [formData, setFormData] = React.useState({
    name: '',
    categoryId: '',
    description: '',
    price: '',
    stock: '',
    target_gender: '',
    material: '',
    cover_Image: '',
    colors: [],
    sizes: [],
    images: []
  });

  const [coverImagePreview, setCoverImagePreview] = React.useState(null);
  const [additionalImagesPreview, setAdditionalImagesPreview] = React.useState([]);

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    console.log('🔍 ProductDialog: useEffect triggered', { open, selectedProduct });
    console.log('🔍 ProductDialog: selectedProduct type:', typeof selectedProduct);
    console.log('🔍 ProductDialog: selectedProduct keys:', selectedProduct ? Object.keys(selectedProduct) : 'null');
    
    if (open) {
      if (selectedProduct && selectedProduct.id) {
        // تعبئة البيانات عند التعديل
        console.log('🔍 ProductDialog: Filling form with selected product:', selectedProduct);
        console.log('🔍 ProductDialog: Product details:', {
          name: selectedProduct.name,
          categoryId: selectedProduct.categoryId,
          description: selectedProduct.discreption || selectedProduct.description,
          price: selectedProduct.price,
          stock: selectedProduct.stock,
          target_gender: selectedProduct.target_gender,
          material: selectedProduct.Material || selectedProduct.material,
          cover_Image: selectedProduct.cover_Image,
          colors: selectedProduct.colors,
          sizes: selectedProduct.sizes,
          images: selectedProduct.images
        });
        
        // معالجة colors و sizes لاستخراج IDs فقط
        const colorIds = selectedProduct.colors ? selectedProduct.colors.map(c => c.colorId) : [];
        const sizeIds = selectedProduct.sizes ? selectedProduct.sizes.map(s => s.sizeId) : [];
        
        console.log('🔍 ProductDialog: Extracted colorIds:', colorIds);
        console.log('🔍 ProductDialog: Extracted sizeIds:', sizeIds);
        
        const formDataToSet = {
          name: selectedProduct.name || '',
          categoryId: selectedProduct.categoryId?.toString() || '',
          description: selectedProduct.discreption || selectedProduct.description || '',
          price: selectedProduct.price?.toString() || '',
          stock: selectedProduct.stock?.toString() || '',
          target_gender: selectedProduct.target_gender || '',
          material: selectedProduct.Material || selectedProduct.material || '',
          cover_Image: selectedProduct.cover_Image || '',
          colors: colorIds,
          sizes: sizeIds,
          images: selectedProduct.images || []
        };
        
        console.log('🔍 ProductDialog: Setting form data:', JSON.stringify(formDataToSet, null, 2));
        setFormData(formDataToSet);
        
        // تعيين صورة الغلاف
        if (selectedProduct.cover_Image) {
          const coverImageUrl = `${imageBaseUrl}${selectedProduct.cover_Image}`;
          console.log('🔍 ProductDialog: Setting cover image:', coverImageUrl);
          console.log('🔍 ProductDialog: imageBaseUrl:', imageBaseUrl);
          console.log('🔍 ProductDialog: selectedProduct.cover_Image:', selectedProduct.cover_Image);
          setCoverImagePreview(coverImageUrl);
        } else {
          console.log('🔍 ProductDialog: No cover image found');
          setCoverImagePreview(null);
        }
        
        // تعيين الصور الإضافية
        if (selectedProduct.images && selectedProduct.images.length > 0) {
          const additionalImagesUrls = selectedProduct.images.map(img => `${imageBaseUrl}${img.url}`);
          console.log('🔍 ProductDialog: Setting additional images:', additionalImagesUrls);
          console.log('🔍 ProductDialog: selectedProduct.images:', selectedProduct.images);
          setAdditionalImagesPreview(additionalImagesUrls);
        } else {
          console.log('🔍 ProductDialog: No additional images found');
          setAdditionalImagesPreview([]);
        }
      } else {
        // إعادة تعيين النموذج عند إضافة منتج جديد
        console.log('🔍 ProductDialog: Resetting form for new product');
        setFormData({
          name: '',
          categoryId: '',
          description: '',
          price: '',
          stock: '',
          target_gender: '',
          material: '',
          cover_Image: '',
          colors: [],
          sizes: [],
          images: []
        });
        setCoverImagePreview(null);
        setAdditionalImagesPreview([]);
      }
    }
  }, [open, selectedProduct, imageBaseUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('🔍 handleChange called:', { name, value });
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      console.log('🔍 Updated formData:', newData);
      return newData;
    });
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
    try {
      console.log('🔍 handleSubmit called with formData:', formData);
      console.log('🔍 selectedProduct:', selectedProduct);
      
      // Format the data before sending
      const formattedData = {
        ...formData,
        // Keep description and material fields
        description: formData.description || '',
        material: formData.material || '',
        // Ensure arrays are properly formatted
        colors: Array.isArray(formData.colors) ? formData.colors : [],
        sizes: Array.isArray(formData.sizes) ? formData.sizes : [],
        // Ensure numeric fields are numbers
        price: Number(formData.price),
        stock: Number(formData.stock),
        categoryId: Number(formData.categoryId)
      };

      // Remove only truly undefined values, keep empty strings
      Object.keys(formattedData).forEach(key => {
        if (formattedData[key] === undefined) {
          delete formattedData[key];
        }
      });

      // Log the formatted data for debugging
      console.log('🔍 Formatted data being sent:', formattedData);
      
      // Validate the formatted data
      if (!formattedData || typeof formattedData !== 'object') {
        throw new Error('Formatted data is invalid');
      }

      // Ensure onSave is a function
      if (typeof onSave !== 'function') {
        throw new Error('onSave is not a function');
      }
      
      // Call onSave with the formatted data
      onSave(formattedData);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      return;
    }
  };

  // Ensure arrays are valid
  const colorsArray = Array.isArray(colors) ? colors : [];
  const sizesArray = Array.isArray(sizes) ? sizes : [];
  const categoriesArray = Array.isArray(categories) ? categories : [];

  console.log('🔍 ProductDialog: Current formData state:', JSON.stringify(formData, null, 2));
  console.log('🔍 ProductDialog: Current coverImagePreview:', coverImagePreview);
  console.log('🔍 ProductDialog: Current additionalImagesPreview:', additionalImagesPreview);
  console.log('🔍 ProductDialog: selectedProduct prop:', selectedProduct);
  console.log('🔍 ProductDialog: open prop:', open);

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
        {selectedProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ 
          p: { xs: 2, sm: 3 },
          pt: { xs: 1, sm: 2 }
        }}>
          <Grid container spacing={2}>
            <Grid xs={12}>
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

            <Grid xs={12}>
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

            <Grid xs={12}>
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

            <Grid xs={12} md={6}>
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

            <Grid xs={12} md={6}>
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

            <Grid xs={12} md={6}>
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

            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Material"
                name="material"
                value={formData.material}
                onChange={handleChange}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>

            <Grid xs={12}>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Available Colors
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {colorsArray.map((color) => {
                    const isSelected = formData.colors.includes(color.id);
                    return (
                      <Box
                        key={color.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 1,
                          border: '1px solid #ccc',
                          borderRadius: 1,
                          cursor: 'pointer',
                          bgcolor: isSelected ? 'action.selected' : 'background.paper',
                          '&:hover': {
                            bgcolor: 'action.hover',
                          },
                        }}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            colors: isSelected
                              ? prev.colors.filter(id => id !== color.id)
                              : [...prev.colors, color.id]
                          }));
                        }}
                      >
                        <ColorBox color={color.hex} />
                        <Typography variant="body2">{color.name}</Typography>
                        {isSelected && (
                          <Chip
                            label="×"
                            size="small"
                            sx={{
                              ml: 1,
                              height: 20,
                              width: 20,
                              '& .MuiChip-label': {
                                px: 0.5,
                                fontSize: '1rem'
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData(prev => ({
                                ...prev,
                                colors: prev.colors.filter(id => id !== color.id)
                              }));
                            }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Selected Colors: {formData.colors.length}
                </Typography>
              </Paper>
            </Grid>

            <Grid xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Available Sizes
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {sizesArray.map((size) => {
                    const isSelected = formData.sizes.includes(size.id);
                    return (
                      <SizeChip
                        key={size.id}
                        label={size.label}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            sizes: isSelected
                              ? prev.sizes.filter(id => id !== size.id)
                              : [...prev.sizes, size.id]
                          }));
                        }}
                        color={isSelected ? "primary" : "default"}
                        variant={isSelected ? "filled" : "outlined"}
                        onDelete={isSelected ? (e) => {
                          e.stopPropagation();
                          setFormData(prev => ({
                            ...prev,
                            sizes: prev.sizes.filter(id => id !== size.id)
                          }));
                        } : undefined}
                      />
                    );
                  })}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Selected Sizes: {formData.sizes.length}
                </Typography>
              </Paper>
            </Grid>

            <Grid xs={12}>
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
                  <ImagePreview 
                    src={coverImagePreview.startsWith('blob:') 
                      ? coverImagePreview 
                      : coverImagePreview.startsWith('http') 
                        ? coverImagePreview 
                        : `${imageBaseUrl}${coverImagePreview}`} 
                    alt="Cover Preview" 
                  />
                )}
              </Box>
            </Grid>

            <Grid xs={12}>
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
                      src={preview.startsWith('blob:') 
                        ? preview 
                        : preview.startsWith('http') 
                          ? preview 
                          : `${imageBaseUrl}${preview}`}
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
            {loading ? 'جاري الحفظ...' : (selectedProduct ? 'تحديث المنتج' : 'إضافة المنتج')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 