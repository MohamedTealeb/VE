import React from 'react';
import {
  Table, TableContainer, TableBody, TablePagination,
  Box, Typography, useTheme, useMediaQuery
} from '@mui/material';
import ProductTableHeader from './ProductTableHeader';
import ProductTableRow from './ProductTableRow';

export default function ProductTable({ 
  products = [], 
  page, 
  rowsPerPage, 
  onPageChange, 
  onRowsPerPageChange,
  onDelete,
  colors = [],
  sizes = [],
  categories = []
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
      <Box sx={{ 
        width: '100%',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888',
          borderRadius: '4px',
          '&:hover': {
            background: '#555',
          },
        },
      }}>
        <TableContainer sx={{ 
          maxHeight: 600,
          overflow: 'auto',
          bgcolor: 'white',
          borderRadius: '8px',
          width: '100%',
          '& .MuiTable-root': {
            minWidth: isMobile ? 800 : isTablet ? 1000 : 1200,
            tableLayout: 'fixed'
          },
          '& .MuiTableCell-root': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '200px',
            px: isMobile ? 1 : 2,
            py: isMobile ? 1 : 2,
            fontSize: isMobile ? '0.75rem' : '0.875rem'
          }
        }}>
          <Table stickyHeader size="small" aria-label="sticky table">
            <ProductTableHeader />
            <TableBody>
              {productsArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  onDelete={onDelete}
                  colorsArray={colorsArray}
                  sizesArray={sizesArray}
                  categoriesArray={categoriesArray}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={productsArray.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        sx={{ 
          bgcolor: 'white',
          '& .MuiTablePagination-select': {
            fontSize: isMobile ? '0.75rem' : '0.875rem'
          },
          '& .MuiTablePagination-displayedRows': {
            fontSize: isMobile ? '0.75rem' : '0.875rem'
          }
        }}
      />
    </>
  );
} 