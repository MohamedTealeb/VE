import React from 'react';
import { TableRow, TableCell, IconButton, Chip, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const imageBaseUrl = import.meta.env.VITE_IMAGEURL;

export default function ProductTableRow({ 
  product, 
  onEdit, 
  onDelete, 
  colorsArray,
  sizesArray,
  categoriesArray
}) {
  const getImageUrl = (image) => {
    if (!image) return '';
    if (typeof image === 'string') {
      const cleanPath = image.startsWith('/') ? image.substring(1) : image;
      return image.startsWith('http') ? image : `${imageBaseUrl}${cleanPath}`;
    }
    if (image instanceof File) return URL.createObjectURL(image);
    if (image.url) return image.url;
    return '';
  };

  const getCategoryName = (categoryId) => {
    const category = categoriesArray.find(c => c.id === categoryId);
    return category ? category.name : 'N/A';
  };

  const getColorChip = (colorObj) => {
    if (!colorObj?.color) return null;
    return (
      <Chip
        key={colorObj.color.id}
        label={colorObj.color.name}
        sx={{
          backgroundColor: colorObj.color.hex,
          color: '#fff',
          '& .MuiChip-label': {
            textShadow: '0 0 2px rgba(0,0,0,0.5)'
          },
          borderRadius: '6px',
          m: 0.5
        }}
        size="small"
      />
    );
  };

  const getSizeChip = (sizeObj) => {
    if (!sizeObj?.size) return null;
    return (
      <Chip
        key={sizeObj.size.id}
        label={sizeObj.size.label}
        size="small"
        sx={{ m: 0.5 }}
      />
    );
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
      <TableCell>{product.Material || 'N/A'}</TableCell>
      <TableCell>
        <Typography
          sx={{
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {product.discreption}
        </Typography>
      </TableCell>
      <TableCell>
        {product.cover_Image ? (
          <Box
            component="img"
            src={getImageUrl(product.cover_Image)}
            alt={product.name}
            sx={{
              width: 50,
              height: 50,
              objectFit: 'cover',
              borderRadius: 1,
              border: '1px solid #ddd'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/default-image.png';
            }}
          />
        ) : (
          <Box
            component="img"
            src="/default-image.png"
            alt="No image"
            sx={{
              width: 50,
              height: 50,
              objectFit: 'cover',
              borderRadius: 1,
              border: '1px solid #ddd'
            }}
          />
        )}
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {product.colors?.map(colorObj => getColorChip(colorObj))}
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {product.sizes?.map(sizeObj => getSizeChip(sizeObj))}
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