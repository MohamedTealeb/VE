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
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

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

  // Function to check if message comes from an offer
  const isFromOffer = (message) => {
    return message.offerId || message.title || message.discount || message.expiresAt;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6">
            تفاصيل الرسالة
          </Typography>
          {isFromOffer(message) && (
            <Chip
              icon={<LocalOfferIcon />}
              label="من العرض"
              color="success"
              size="small"
              variant="filled"
            />
          )}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* Message Details */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h6">
                  معلومات الرسالة
                </Typography>
                {isFromOffer(message) && (
                  <Chip
                    icon={<LocalOfferIcon />}
                    label="رسالة من العرض"
                    color="success"
                    size="small"
                    variant="outlined"
                  />
                )}
              </Box>
              <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>رقم الرسالة:</strong> {message.id}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>المحتوى:</strong>
                </Typography>
                <Box sx={{ 
                  p: 2, 
                  backgroundColor: 'white', 
                  borderRadius: 1, 
                  border: '1px solid #ddd',
                  position: 'relative'
                }}>
                  {isFromOffer(message) && (
                    <Box sx={{ mb: 1 }}>
                      <Chip
                        label="OFFER"
                        color="success"
                        size="small"
                        variant="filled"
                        sx={{ 
                          fontSize: '0.7rem',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                  )}
                  {isFromOffer(message) && (
                    <Chip
                      icon={<LocalOfferIcon />}
                      label="من العرض"
                      color="success"
                      size="small"
                      variant="outlined"
                      sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        right: 8,
                        fontSize: '0.7rem'
                      }}
                    />
                  )}
                  <Typography variant="body2" sx={{ 
                    whiteSpace: 'pre-wrap',
                    pr: isFromOffer(message) ? 8 : 0
                  }}>
                    {message.content}
                  </Typography>
                </Box>
                <Typography variant="body1" gutterBottom>
                  <strong>رقم المنتج:</strong> {message.productId || 'غير مرتبط بمنتج'}
                </Typography>
                {isFromOffer(message) && (
                  <Typography variant="body2" color="success.main" sx={{ mt: 1, fontStyle: 'italic' }}>
                    ⚠️ هذه الرسالة مرتبطة بعرض وتم إنشاؤها تلقائياً
                  </Typography>
                )}
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
                        variant="outlined"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>الجنس المستهدف:</strong>
                      <Chip
                        label={message.product.target_gender}
                        color={message.product.target_gender === 'male' ? 'primary' : 
                              message.product.target_gender === 'female' ? 'secondary' : 'default'}
                        size="small"
                        variant="outlined"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body1" gutterBottom>
                      <strong>الوصف:</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      p: 2, 
                      backgroundColor: 'white', 
                      borderRadius: 1, 
                      border: '1px solid #ddd',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {message.product.discreption || 'لا يوجد وصف'}
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
                        src={`https://api.ryo-egypt.com${message.product.cover_Image}`}
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
                          e.target.src = '/default-product.png';
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
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  لا يوجد منتج مرتبط بهذه الرسالة
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
        {onRequestDelete && (
          <Button
            onClick={onRequestDelete}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            حذف الرسالة
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
} 