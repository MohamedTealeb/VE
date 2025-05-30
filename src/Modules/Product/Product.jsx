import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Box, useMediaQuery, useTheme, Button, Typography } from '@mui/material';
import { fetchColors, addColor, editColor, removeColor } from '../../redux/slice/ColorsSlice/Colors';
import { fetchSizes, addSize, editSize, removeSize } from '../../redux/slice/SizesSlice/Sizes';
import { fetchProducts, addProduct, editProduct, removeProduct } from '../../redux/slice/ProductsSlice/Products';
import { fetchCategories } from '../../redux/slice/CategoriesSlice/Categories';
import ProductTable from './components/ProductTable';
import ColorTable from './components/ColorTable';
import SizeTable from './components/SizeTable';
import ColorDialog from './components/ColorDialog';
import SizeDialog from './components/SizeDialog';
import ProductDialog from './components/ProductDialog';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Product() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const { colors = [], loading: colorsLoading, error: colorsError } = useSelector((state) => state.colors);
  const { sizes = [], loading: sizesLoading, error: sizesError } = useSelector((state) => state.sizes);
  const { products = [], loading: productsLoading, error: productsError } = useSelector((state) => state.products);
  const { categories = [], loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.categories);

  // Debug logs
  console.log('Colors from Redux:', colors);
  console.log('Colors Loading:', colorsLoading);
  console.log('Colors Error:', colorsError);

  const [colorDialogOpen, setColorDialogOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [sizeDialogOpen, setSizeDialogOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching all data...');
        await Promise.all([
          dispatch(fetchProducts()),
          dispatch(fetchColors()),
          dispatch(fetchSizes()),
          dispatch(fetchCategories())
        ]);
        console.log('Data fetching completed');
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data');
      }
    };
    fetchData();
  }, [dispatch]);

  // Log colors data only when it changes
  useEffect(() => {
    if (colors.length > 0) {
      console.log('Colors data updated:', {
        count: colors.length,
        colors: colors.map(c => ({ id: c.id, name: c.name, hex: c.hex }))
      });
    }
  }, [colors]);

  // Log loading and error states only when they change
  useEffect(() => {
    if (colorsLoading) {
      console.log('Colors loading state changed:', colorsLoading);
    }
  }, [colorsLoading]);

  useEffect(() => {
    if (colorsError) {
      console.error('Colors error state changed:', colorsError);
    }
  }, [colorsError]);

  const handleAddColor = () => {
    setSelectedColor(null);
    setColorDialogOpen(true);
  };

  const handleEditColor = (color) => {
    setSelectedColor(color);
    setColorDialogOpen(true);
  };

  const handleDeleteColor = async (color) => {
    if (window.confirm('Are you sure you want to delete this color?')) {
      try {
        await dispatch(removeColor(color.id)).unwrap();
        toast.success('Color deleted successfully');
        dispatch(fetchColors());
      } catch (err) {
        toast.error(err?.message || 'Failed to delete color');
      }
    }
  };

  const handleSaveColor = async (formData) => {
    try {
      if (selectedColor) {
        await dispatch(editColor({ id: selectedColor.id, ...formData })).unwrap();
        toast.success('Color updated successfully');
      } else {
        await dispatch(addColor(formData)).unwrap();
        toast.success('Color added successfully');
      }
      setColorDialogOpen(false);
      dispatch(fetchColors());
    } catch (err) {
      toast.error(err?.message || 'Failed to save color');
    }
  };

  const handleAddSize = () => {
    setSelectedSize(null);
    setSizeDialogOpen(true);
  };

  const handleEditSize = (size) => {
    setSelectedSize(size);
    setSizeDialogOpen(true);
  };

  const handleDeleteSize = async (size) => {
    if (window.confirm('Are you sure you want to delete this size?')) {
      try {
        await dispatch(removeSize(size.id)).unwrap();
        toast.success('Size deleted successfully');
        dispatch(fetchSizes());
      } catch (err) {
        toast.error(err?.message || 'Failed to delete size');
      }
    }
  };

  const handleSaveSize = async (formData) => {
    try {
      if (selectedSize) {
        await dispatch(editSize({ id: selectedSize.id, ...formData })).unwrap();
        toast.success('Size updated successfully');
      } else {
        await dispatch(addSize(formData)).unwrap();
        toast.success('Size added successfully');
      }
      setSizeDialogOpen(false);
      dispatch(fetchSizes());
    } catch (err) {
      toast.error(err?.message || 'Failed to save size');
    }
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductDialogOpen(true);
  };

  const handleDeleteProduct = async (product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(removeProduct(product.id)).unwrap();
        toast.success('Product deleted successfully');
        dispatch(fetchProducts());
      } catch (err) {
        toast.error(err?.message || 'Failed to delete product');
      }
    }
  };

  const handleSaveProduct = async (formData) => {
    try {
      // Validate formData
      if (!formData || typeof formData !== 'object') {
        throw new Error('Product data is required and must be an object');
      }

      // Validate required fields
      const requiredFields = ['name', 'categoryId', 'description', 'price', 'stock', 'colors', 'sizes'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate field types
      if (typeof formData.name !== 'string') {
        throw new Error('Product name must be a string');
      }
      if (typeof formData.description !== 'string') {
        throw new Error('Product description must be a string');
      }
      if (!Array.isArray(formData.colors)) {
        throw new Error('Colors must be an array');
      }
      if (!Array.isArray(formData.sizes)) {
        throw new Error('Sizes must be an array');
      }
      if (isNaN(Number(formData.price))) {
        throw new Error('Price must be a number');
      }
      if (isNaN(Number(formData.stock))) {
        throw new Error('Stock must be a number');
      }
      if (isNaN(Number(formData.categoryId))) {
        throw new Error('Category ID must be a number');
      }

      // Prepare the data for API
      const productData = {
        ...formData,
        description: formData.description || '',
        material: formData.material || '',
        // Remove any undefined values but keep empty strings
        ...Object.fromEntries(
          Object.entries(formData).filter(([_, value]) => value !== undefined)
        )
      };

      // Log the data being sent
      console.log('Saving product with data:', {
        ...productData,
        colors: productData.colors?.length || 0,
        sizes: productData.sizes?.length || 0
      });

      // Only add new product, no editing
      await dispatch(addProduct(productData)).unwrap();
      toast.success('Product added successfully');
      
      setProductDialogOpen(false);
      dispatch(fetchProducts());
    } catch (err) {
      console.error('Error saving product:', err);
      console.error('Error details:', {
        message: err.message,
        formData,
        selectedProduct,
        stack: err.stack
      });
      toast.error(err?.message || 'Failed to save product');
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (colorsLoading || sizesLoading || productsLoading || categoriesLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (colorsError || sizesError || productsError || categoriesError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'error.main' }}>
        <Typography>Error: {colorsError || sizesError || productsError || categoriesError}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      bgcolor: 'white', 
      minHeight: '100vh', 
      p: { xs: 1, sm: 2, md: 3 },
      position: 'relative'
    }}>
      <Toaster />
      <Paper
        sx={{
          p: { xs: 1, sm: 2, md: 3 },
          bgcolor: 'white',
          borderRadius: '8px',
          marginTop: { xs: '60px', sm: '50px' },
          width: '100%'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 3,
          gap: 2
        }}>
          <Typography variant="h5" component="h2">
            Products
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: 1,
            width: { xs: '100%', sm: 'auto' }
          }}>
            <Button
              variant="contained"
              fullWidth={isMobile}
              sx={{ 
                backgroundColor: 'black',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
              }}
              startIcon={<AddIcon />}
              onClick={handleAddColor}
            >
              Add Color
            </Button>
            <Button
              variant="contained"
              fullWidth={isMobile}
              sx={{ 
                backgroundColor: 'black',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
              }}
              startIcon={<AddIcon />}
              onClick={handleAddSize}
            >
              Add Size
            </Button>
            <Button
              variant="contained"
              fullWidth={isMobile}
              sx={{ 
                backgroundColor: 'black',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)'
                }
              }}
              startIcon={<AddIcon />}
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
            <Button
              variant="contained"
              fullWidth={isMobile}
              color="error"
              sx={{ 
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: 'rgba(211, 47, 47, 0.8)'
                }
              }}
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>

        <ProductTable 
          products={products}
          colors={colors}
          sizes={sizes}
          categories={categories}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onDelete={handleDeleteProduct}
          isMobile={isMobile}
          isTablet={isTablet}
        />

        <ColorDialog
          open={colorDialogOpen}
          onClose={() => setColorDialogOpen(false)}
          onSave={handleSaveColor}
          color={selectedColor}
          loading={colorsLoading}
          isMobile={isMobile}
        />

        <SizeDialog
          open={sizeDialogOpen}
          onClose={() => setSizeDialogOpen(false)}
          onSave={handleSaveSize}
          size={selectedSize}
          loading={sizesLoading}
          isMobile={isMobile}
          sizes={sizes}
        />

        <ProductDialog
          open={productDialogOpen}
          onClose={() => setProductDialogOpen(false)}
          onSave={handleSaveProduct}
          product={null}
          colors={colors}
          sizes={sizes}
          categories={categories}
          loading={productsLoading}
          isMobile={isMobile}
        />
      </Paper>
    </Box>
  );
}
