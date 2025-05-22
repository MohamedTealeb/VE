import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Box, useMediaQuery, useTheme, Button } from '@mui/material';
import { fetchColors, addColor, editColor, removeColor } from '../../redux/slice/ColorsSlice/Colors';
import { fetchSizes, addSize, editSize, removeSize } from '../../redux/slice/SizesSlice/Sizes';
import { fetchProducts, addProduct, editProduct, removeProduct } from '../../redux/slice/ProductsSlice/Products';
import ProductTable from './components/ProductTable';
import ColorTable from './components/ColorTable';
import SizeTable from './components/SizeTable';
import ColorDialog from './components/ColorDialog';
import SizeDialog from './components/SizeDialog';
import ProductDialog from './components/ProductDialog';
import AddIcon from '@mui/icons-material/Add';

export default function Product() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const { colors = [], loading: colorsLoading, error: colorsError } = useSelector((state) => state.colors);
  const { sizes = [], loading: sizesLoading, error: sizesError } = useSelector((state) => state.sizes);
  const { products = [], loading: productsLoading, error: productsError } = useSelector((state) => state.products);

  const [colorDialogOpen, setColorDialogOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [sizeDialogOpen, setSizeDialogOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchColors());
    dispatch(fetchSizes());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddColor = () => {
    setSelectedColor(null);
    setColorDialogOpen(true);
  };

  const handleEditColor = (color) => {
    setSelectedColor(color);
    setColorDialogOpen(true);
  };

  const handleDeleteColor = (color) => {
    if (window.confirm('Are you sure you want to delete this color?')) {
      dispatch(removeColor(color.id));
    }
  };

  const handleSaveColor = (formData) => {
    if (selectedColor) {
      dispatch(editColor({ id: selectedColor.id, ...formData }));
    } else {
      dispatch(addColor(formData));
    }
    setColorDialogOpen(false);
  };

  const handleAddSize = () => {
    setSelectedSize(null);
    setSizeDialogOpen(true);
  };

  const handleEditSize = (size) => {
    setSelectedSize(size);
    setSizeDialogOpen(true);
  };

  const handleDeleteSize = (size) => {
    if (window.confirm('Are you sure you want to delete this size?')) {
      dispatch(removeSize(size.id));
    }
  };

  const handleSaveSize = (formData) => {
    if (selectedSize) {
      dispatch(editSize({ id: selectedSize.id, ...formData }));
    } else {
      dispatch(addSize(formData));
    }
    setSizeDialogOpen(false);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };

  const handleDeleteProduct = (product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(removeProduct(product.id));
    }
  };

  const handleSaveProduct = (formData) => {
    if (selectedProduct) {
      dispatch(editProduct({ id: selectedProduct.id, ...formData }));
    } else {
      dispatch(addProduct(formData));
    }
    setProductDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (colorsLoading || sizesLoading || productsLoading) {
    return <div>Loading...</div>;
  }

  if (colorsError || sizesError || productsError) {
    return <div>Error: {colorsError || sizesError || productsError}</div>;
  }

  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh', p: 2 }}>
      <Paper sx={{ 
        p: { xs: 1, sm: 2, md: 3 },
        bgcolor: 'white',
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', marginRight: '30px' }}>
          <h2 className="text-2xl font-semibold">Products</h2>
          <Button
            variant="contained"
            style={{ 
              marginRight: '30px', 
              backgroundColor: 'black',
              borderRadius: '8px'
            }}
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </div>

        <ProductTable 
          products={products}
          colors={colors}
          sizes={sizes}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          colorsArray={colors}
        />

        <Box sx={{ mt: 4 }}>
          <ColorTable 
            colors={colors}
            onAdd={handleAddColor}
            onEdit={handleEditColor}
            onDelete={handleDeleteColor}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <SizeTable 
            sizes={sizes}
            onAdd={handleAddSize}
            onEdit={handleEditSize}
            onDelete={handleDeleteSize}
          />
        </Box>

        <ColorDialog
          open={colorDialogOpen}
          onClose={() => setColorDialogOpen(false)}
          onSave={handleSaveColor}
          color={selectedColor}
        />

        <SizeDialog
          open={sizeDialogOpen}
          onClose={() => setSizeDialogOpen(false)}
          onSave={handleSaveSize}
          size={selectedSize}
        />

        <ProductDialog
          open={productDialogOpen}
          onClose={() => setProductDialogOpen(false)}
          onSave={handleSaveProduct}
          product={selectedProduct}
          colors={colors}
          sizes={sizes}
        />
      </Paper>
    </Box>
  );
}
