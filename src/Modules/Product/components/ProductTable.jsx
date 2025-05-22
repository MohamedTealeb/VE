import React from 'react';
import {
  Table, TableContainer, TableBody, TablePagination
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
  colorsArray 
}) {
  // Ensure products is an array
  const productsArray = Array.isArray(products) ? products : [];

  return (
    <>
      <TableContainer sx={{ 
        maxHeight: 600,
        overflowX: 'auto',
        bgcolor: 'white',
        borderRadius: '8px'
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