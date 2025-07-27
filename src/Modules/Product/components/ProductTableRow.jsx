import React, { useState } from 'react';
import { TableRow, TableCell, IconButton, Chip, Box, Typography, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, useTheme, useMediaQuery } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const imageBaseUrl = import.meta.env.VITE_API_URL || 'https://api.ryo-egypt.com';

export default function ProductTableRow({ 
  product, 
  onDelete,
  onEdit,
  colorsArray,
  sizesArray,
  categoriesArray
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [descriptionDialogOpen, setDescriptionDialogOpen] = useState(false);

  const handleOpenDescription = () => {
    setDescriptionDialogOpen(true);
  };

  const handleCloseDescription = () => {
    setDescriptionDialogOpen(false);
  };

  const getImageUrl = (image) => {
    if (!image) return '';
    if (typeof image === 'string') {
      return image.startsWith('http') ? image : `${imageBaseUrl}${image}`;
    }
    if (image instanceof File) return URL.createObjectURL(image);
    if (image.url) return image.url;
    return '';
  };

  // Debug log for image URL
  console.log('Product:', product);
  console.log('Image URL:', getImageUrl(product.cover_Image));
  console.log('Base URL:', imageBaseUrl);
  console.log('Original Image:', product.cover_Image);

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
            textShadow: '0 0 2px rgba(0,0,0,0.5)',
            fontSize: isMobile ? '0.7rem' : '0.75rem',
            px: isMobile ? 0.5 : 1
          },
          borderRadius: '6px',
          m: isMobile ? 0.25 : 0.5,
          height: isMobile ? 20 : 24
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
        sx={{ 
          m: isMobile ? 0.25 : 0.5,
          height: isMobile ? 20 : 24,
          '& .MuiChip-label': {
            fontSize: isMobile ? '0.7rem' : '0.75rem',
            px: isMobile ? 0.5 : 1
          }
        }}
      />
    );
  };

  return (
    <>
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
                m: isMobile ? 0.25 : 0.5,
                height: isMobile ? 20 : 24,
                '& .MuiChip-label': {
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  px: isMobile ? 0.5 : 1
                }
              }}
            />
          ) : 'N/A'}
        </TableCell>
        <TableCell>{product.Material || 'N/A'}</TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                cursor: 'pointer',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
              onClick={handleOpenDescription}
            >
              {product.discreption}
            </Typography>
            {product.discreption && product.discreption.length > 100 && (
              <Button
                size="small"
                onClick={handleOpenDescription}
                sx={{ 
                  minWidth: 'auto', 
                  p: isMobile ? 0.25 : 0.5,
                  fontSize: isMobile ? '0.7rem' : '0.75rem'
                }}
              >
                Read More
              </Button>
            )}
          </Box>
        </TableCell>
        <TableCell>
          {product.cover_Image ? (
            <Box
              component="img"
              src={getImageUrl(product.cover_Image)}
              alt={product.name}
              sx={{
                width: isMobile ? 40 : 50,
                height: isMobile ? 40 : 50,
                objectFit: 'cover',
                borderRadius: 1,
                border: '1px solid #ddd',
                backgroundColor: '#f5f5f5'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNlMGUwZTAiLz48cGF0aCBkPSJNMjUgMjVDMjcuNzYxNCAyNSAzMCAyMi43NjE0IDMwIDIwQzMwIDE3LjIzODYgMjcuNzYxNCAxNSAyNSAxNUMyMi4yMzg2IDE1IDIwIDE3LjIzODYgMjAgMjBDMjAgMjIuNzYxNCAyMi4yMzg2IDI1IDI1IDI1WiIgZmlsbD0iI2I4YjhiOCIvPjxwYXRoIGQ9Ik0zNSAzNUwzMCAzMEwyNSAzNUwyMCAzMEwxNSAzNVY0MEgzNVYzNVoiIGZpbGw9IiNiOGI4YjgiLz48L3N2Zz4=';
              }}
            />
          ) : (
            <Box
              component="img"
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNlMGUwZTAiLz48cGF0aCBkPSJNMjUgMjVDMjcuNzYxNCAyNSAzMCAyMi43NjE0IDMwIDIwQzMwIDE3LjIzODYgMjcuNzYxNCAxNSAyNSAxNUMyMi4yMzg2IDE1IDIwIDE3LjIzODYgMjAgMjBDMjAgMjIuNzYxNCAyMi4yMzg2IDI1IDI1IDI1WiIgZmlsbD0iI2I4YjhiOCIvPjxwYXRoIGQ9Ik0zNSAzNUwzMCAzMEwyNSAzNUwyMCAzMEwxNSAzNVY0MEgzNVYzNVoiIGZpbGw9IiNiOGI4YjgiLz48L3N2Zz4="
              alt="No image"
              sx={{
                width: isMobile ? 40 : 50,
                height: isMobile ? 40 : 50,
                objectFit: 'cover',
                borderRadius: 1,
                border: '1px solid #ddd',
                backgroundColor: '#f5f5f5'
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
          <Box sx={{ display: 'flex', gap: isMobile ? 0.5 : 1 }}>
            <Tooltip title="Edit">
              <IconButton 
                size={isMobile ? "small" : "medium"}
                onClick={() => onEdit(product)}
                sx={{ 
                  color: 'secondary.main',
                  p: isMobile ? 0.5 : 1
                }}
              >
                <EditIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton 
                size={isMobile ? "small" : "medium"}
                onClick={() => onDelete(product)}
                sx={{ 
                  color: 'error.main',
                  p: isMobile ? 0.5 : 1
                }}
              >
                <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>

      <Dialog
        open={descriptionDialogOpen}
        onClose={handleCloseDescription}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>Product Description</DialogTitle>
        <DialogContent>
          <Typography 
            variant="body1" 
            sx={{ 
              whiteSpace: 'pre-wrap',
              fontSize: isMobile ? '0.875rem' : '1rem'
            }}
          >
            {product.discreption}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDescription}
            size={isMobile ? "small" : "medium"}
            sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 