import React from 'react';
import { TableRow, TableCell, IconButton, Chip, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductTableRow({ 
  product, 
  onEdit, 
  onDelete, 
  colorsArray,
  sizesArray,
  categoriesArray
}) {
  const getCategoryName = (categoryId) => {
    const category = categoriesArray.find(c => c.id === categoryId);
    return category ? category.name : 'N/A';
  };

  const getColorChip = (colorId) => {
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
          borderRadius: '6px',
          m: 0.5
        }}
        size="small"
      />
    ) : null;
  };

  const getSizeChip = (sizeId) => {
    const size = sizesArray.find(s => s.id === sizeId);
    return size ? (
      <Chip
        key={size.id}
        label={size.name}
        size="small"
        sx={{ m: 0.5 }}
      />
    ) : null;
  };

  return (
    <TableRow hover tabIndex={-1} key={product.id}>
      <TableCell>{product.name}</TableCell>
      <TableCell>{getCategoryName(product.categoryId)}</TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell>
        {product.target_gender ? (
          <Chip
            label={product.target_gender}
            size="small"
            sx={{ 
              textTransform: 'capitalize',
              m: 0.5
            }}
          />
        ) : 'N/A'}
      </TableCell>
      <TableCell>{product.material || 'N/A'}</TableCell>
      <TableCell>
        <Typography
          sx={{
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {product.description}
        </Typography>
      </TableCell>
      <TableCell>
        {product.cover_Image ? (
          <Box
            component="img"
            src={product.cover_Image}
            alt={product.name}
            sx={{
              width: 50,
              height: 50,
              objectFit: 'cover',
              borderRadius: 1,
              border: '1px solid #ddd'
            }}
          />
        ) : 'N/A'}
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {product.colors?.map(colorId => getColorChip(colorId))}
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {product.sizes?.map(sizeId => getSizeChip(sizeId))}
        </Box>
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