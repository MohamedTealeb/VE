import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

const productColumns = [
  { id: 'name', label: 'Product Name', minWidth: 150 },
  { id: 'category', label: 'Category', minWidth: 120 },
  { id: 'price', label: 'Price', minWidth: 100 },
  { id: 'stock', label: 'Stock', minWidth: 100 },
  { id: 'target_gender', label: 'Gender', minWidth: 100 },
  { id: 'material', label: 'Material', minWidth: 120 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'cover_Image', label: 'Cover Image', minWidth: 120 },
  { id: 'colors', label: 'Colors', minWidth: 150 },
  { id: 'sizes', label: 'Sizes', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function ProductTableHeader() {
  return (
    <TableHead>
      <TableRow>
        {productColumns.map((column) => (
          <TableCell 
            key={column.id} 
            style={{ minWidth: column.minWidth }}
            sx={{ 
              bgcolor: 'white',
              fontWeight: 'bold',
              whiteSpace: 'nowrap'
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
} 