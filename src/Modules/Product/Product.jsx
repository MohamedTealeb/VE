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
import toast, { Toaster } from 'react-hot-toast';

export default function Product() {
  const dispatch = useDispatch();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching all data...');
        await Promise.all([
          dispatch(fetchColors()),
          dispatch(fetchSizes()),
          dispatch(fetchProducts()),
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

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
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
      if (selectedProduct) {
        await dispatch(editProduct({ id: selectedProduct.id, ...formData })).unwrap();
        toast.success('Product updated successfully');
      } else {
        await dispatch(addProduct(formData)).unwrap();
        toast.success('Product added successfully');
      }
      setProductDialogOpen(false);
      dispatch(fetchProducts());
    } catch (err) {
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
    <Box sx={{ bgcolor: 'white', minHeight: '100vh', p: { xs: 1, sm: 2, md: 3 }, overflow: 'hidden' }}>
      <Toaster />
      <Paper
        sx={{
          p: { xs: 1, sm: 2, md: 3 },
          bgcolor: 'white',
          borderRadius: '8px',
          marginTop: '20px',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h5" component="h2">
            Products
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
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
          onEdit={handleEditProduct}
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
        />

        <ProductDialog
          open={productDialogOpen}
          onClose={() => setProductDialogOpen(false)}
          onSave={handleSaveProduct}
          product={selectedProduct}
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
