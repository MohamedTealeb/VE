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
  Divider,
  Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SimpleMessageDetailsDialog({
  open,
  onClose,
  message,
  onRequestDelete
}) {
  if (!message) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        تفاصيل الرسالة
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* Message Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                معلومات الرسالة
              </Typography>
              <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>رقم الرسالة:</strong> {message.id}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>المحتوى:</strong>
                </Typography>
                <Typography variant="body2" sx={{ 
                  p: 2, 
                  backgroundColor: 'white', 
                  borderRadius: 1, 
                  border: '1px solid #ddd',
                  whiteSpace: 'pre-wrap'
                }}>
                  {message.content}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>رقم المنتج:</strong> {message.productId || 'غير مرتبط بمنتج'}
                </Typography>
              </Box>
            </Grid>

            {/* Product Details */}
            {message.product && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    معلومات المنتج المرتبط
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body1" gutterBottom>
                      <strong>اسم المنتج:</strong> {message.product.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>السعر:</strong> 
                      <span style={{ 
                        fontWeight: 'bold', 
                        color: '#1976d2',
                        fontSize: '1.1em',
                        marginLeft: '8px'
                      }}>
                        ${message.product.price}
                      </span>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>المخزون:</strong>
                      <Chip
                        label={message.product.stock}
                        color={message.product.stock > 10 ? 'success' : 
                              message.product.stock > 0 ? 'warning' : 'error'}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body1" gutterBottom>
                      <strong>الجنس المستهدف:</strong>
                      <Chip
                        label={message.product.target_gender}
                        color={message.product.target_gender === 'male' ? 'primary' : 
                              message.product.target_gender === 'female' ? 'secondary' : 'default'}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>الوصف:</strong> {message.product.discreption || 'لا يوجد وصف'}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>تاريخ الإنشاء:</strong> {formatDate(message.product.createdAt)}
                    </Typography>
                  </Box>
                </Grid>

                {message.product.cover_Image && (
                  <Grid item xs={12}>
                    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                      <Typography variant="body1" gutterBottom>
                        <strong>صورة المنتج:</strong>
                      </Typography>
                      <img 
                        src={`${import.meta.env.VITE_IMAGEURL}${message.product.cover_Image}`}
                        alt={message.product.name}
                        style={{ 
                          maxWidth: '200px', 
                          maxHeight: '200px', 
                          objectFit: 'cover', 
                          borderRadius: '8px',
                          border: '2px solid #ddd'
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNlMGUwZTAiLz48cGF0aCBkPSJNMTAwIDEwMEMxMTUuMDQ2IDEwMCAxMjcgODguMDQ2IDEyNyA3M0MxMjcgNTcuOTU0IDExNS4wNDYgNDYgMTAwIDQ2Qzg0Ljk1NCA0NiA3MyA1Ny45NTQgNzMgNzNDNzMgODguMDQ2IDg0Ljk1NCAxMDAgMTAwIDEwMFoiIGZpbGw9IiNiOGI4YjgiLz48cGF0aCBkPSJNMTQwIDE0MEwxMjAgMTIwTDEwMCAxNDBMODAgMTIwTDYwIDE0MFYxNjBIMTQwVjE0MFoiIGZpbGw9IiNiOGI4YjgiLz48L3N2Zz4=';
                        }}
                      />
                    </Box>
                  </Grid>
                )}
              </>
            )}

            {!message.product && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  هذه الرسالة غير مرتبطة بأي منتج
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          إغلاق
        </Button>
        <Button
          onClick={onRequestDelete}
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          حذف الرسالة
        </Button>
      </DialogActions>
    </Dialog>
  );
} 