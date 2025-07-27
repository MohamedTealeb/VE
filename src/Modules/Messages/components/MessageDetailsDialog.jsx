import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MessageDetailsDialog({
  open,
  onClose,
  message,
  onRequestDelete
}) {
  if (!message) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const statusColors = {
    READ: 'success',
    UNREAD: 'warning'
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Message Details</Typography>
          <Chip
            label={message.status || 'UNREAD'}
            color={statusColors[message.status] || 'warning'}
            size="small"
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Message ID
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {message.id}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Created At
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {formatDate(message.createdAt)}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Content
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
            {message.content}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Product ID
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {message.productId}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Product Name
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {message.product?.name || 'No name available'}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Product Price
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {message.product?.price ? (
              <span style={{ textDecoration: 'line-through', color: '#666' }}>${message.product.price}</span>
            ) : (
              <span style={{ color: 'text.secondary' }}>No price available</span>
            )}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Price After 20% Discount
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {message.product?.price ? (
              <span style={{ 
                fontWeight: 'bold', 
                color: '#e91e63',
                fontSize: '1.2em'
              }}>
                ${(message.product.price * 0.8).toFixed(2)}
              </span>
            ) : (
              <span style={{ color: 'text.secondary' }}>No price available</span>
            )}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Stock
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {message.product?.stock !== undefined ? (
              <span style={{ 
                fontWeight: 'bold',
                color: message.product.stock > 0 ? 'green' : 
                      message.product.stock === 0 ? 'orange' : 'red'
              }}>
                {message.product.stock}
              </span>
            ) : (
              <span style={{ color: 'text.secondary' }}>No stock information</span>
            )}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Target Gender
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {message.product?.target_gender ? (
              <span style={{ 
                textTransform: 'capitalize',
                fontWeight: 'bold',
                color: message.product.target_gender === 'male' ? '#1976d2' : 
                      message.product.target_gender === 'female' ? '#e91e63' : '#9c27b0'
              }}>
                {message.product.target_gender}
              </span>
            ) : (
              <span style={{ color: 'text.secondary' }}>No gender specified</span>
            )}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Material
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {message.product?.Material || 'No material information'}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Description
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
            {message.product?.discreption || 'No description available'}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" color="text.secondary">
            Product Image
          </Typography>
          <Box sx={{ mb: 2 }}>
            {message.product?.cover_Image ? (
              <img 
                src={`${import.meta.env.VITE_IMAGEURL}${message.product.cover_Image}`}
                alt="Product" 
                style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlMGUwZTAiLz48cGF0aCBkPSJNMTAwIDEwMEMxMTUuMDQ2IDEwMCAxMjcgODguMDQ2IDEyNyA3M0MxMjcgNTcuOTU0IDExNS4wNDYgNDYgMTAwIDQ2Qzg0Ljk1NCA0NiA3MyA1Ny45NTQgNzMgNzNDNzMgODguMDQ2IDg0Ljk1NCAxMDAgMTAwIDEwMFoiIGZpbGw9IiNiOGI4YjgiLz48cGF0aCBkPSJNMTQwIDE0MEwxMjAgMTIwTDEwMCAxNDBMMTgwIDEyMEwxNDAgMTQwVjE2MEgxNDBWMjAwWiIgZmlsbD0iI2I4YjhiOCIvPjwvc3ZnPg==';
                }}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                No image available
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button 
          onClick={onRequestDelete} 
          color="error" 
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
} 