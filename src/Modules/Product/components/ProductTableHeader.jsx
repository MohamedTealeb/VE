import React from 'react';
import { TableHead, TableRow, TableCell } from '@mui/material';

const productColumns = [
  { id: 'name', label: 'Product Name', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'price', label: 'Price', minWidth: 100 },
  { id: 'colors', label: 'Colors', minWidth: 200 },
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
            sx={{ bgcolor: 'white' }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
} 