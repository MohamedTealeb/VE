import React from 'react';
import {
  Table, TableContainer, TableBody, TablePagination,
  Box, Typography
} from '@mui/material';
import ProductTableHeader from './ProductTableHeader';
import ProductTableRow from './ProductTableRow';

export default function ProductTable({ 
  products = [], 
  page, 
  rowsPerPage, 
  onPageChange, 
  onRowsPerPageChange,
  onEdit,
  onDelete,
  colors = [],
  sizes = [],
  categories = []
}) {
  // Debug logs
  console.log('ProductTable - Products:', products);
  console.log('ProductTable - Colors:', colors);
  console.log('ProductTable - Sizes:', sizes);
  console.log('ProductTable - Categories:', categories);

  // Ensure arrays are valid
  const productsArray = Array.isArray(products) ? products : [];
  const colorsArray = Array.isArray(colors) ? colors : [];
  const sizesArray = Array.isArray(sizes) ? sizes : [];
  const categoriesArray = Array.isArray(categories) ? categories : [];

  if (productsArray.length === 0) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        p: 3,
        bgcolor: 'white',
        borderRadius: '8px'
      }}>
        <Typography>No products found</Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer sx={{ 
        maxHeight: 600,
        overflow: 'hidden',
        bgcolor: 'white',
        borderRadius: '8px',
        width: '100%'
      }}>
        <Table stickyHeader size="small" aria-label="sticky table">
          <ProductTableHeader />
          <TableBody>
            {productsArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
                colorsArray={colorsArray}
                sizesArray={sizesArray}
                categoriesArray={categoriesArray}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={productsArray.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        sx={{ bgcolor: 'white' }}
      />
    </>
  );
} 