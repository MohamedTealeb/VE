import React from 'react';
import { TableRow, TableCell, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductTableRow({ 
  product, 
  onEdit, 
  onDelete, 
  colorsArray 
}) {
  return (
    <TableRow hover tabIndex={-1} key={product.id}>
      <TableCell>{product.name}</TableCell>
      <TableCell>
        <div className="max-w-[200px] truncate">
          {product.description}
        </div>
      </TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {product.colors?.map((colorId) => {
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
                  },
                  borderRadius: '6px'
                }}
                size="small"
              />
            ) : null;
          })}
        </div>
      </TableCell>
      <TableCell>
        <IconButton
          color="primary"
          onClick={() => onEdit(product)}
          size="small"
          sx={{ borderRadius: '6px' }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => onDelete(product)}
          size="small"
          sx={{ borderRadius: '6px' }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
} 