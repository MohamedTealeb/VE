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

export default function OfferDetailsDialog({
  open,
  onClose,
  offer,
  onRequestDelete
}) {
  if (!offer) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getOfferStatus = (expiresAt) => {
    const now = new Date();
    const expiryDate = new Date(expiresAt);
    if (expiryDate > now) {
      return { status: 'ACTIVE', color: 'success' };
    } else {
      return { status: 'EXPIRED', color: 'error' };
    }
  };

  const status = getOfferStatus(offer.expiresAt);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        تفاصيل العرض
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* Offer Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                معلومات العرض
              </Typography>
              <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>رقم العرض:</strong> {offer.id}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>العنوان:</strong> {offer.title}
                </Typography>
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
                  {offer.description || 'لا يوجد وصف'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>نسبة الخصم:</strong>
                  <Chip
                    label={`${offer.discount}% OFF`}
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>تاريخ انتهاء العرض:</strong> {formatDate(offer.expiresAt)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>الحالة:</strong>
                  <Chip
                    label={status.status}
                    color={status.color}
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Box>
            </Grid>

            {/* Message Details */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                الرسالة المرتبطة
              </Typography>
              <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="body1" gutterBottom>
                  <strong>رقم الرسالة:</strong> {offer.messageId || 'غير مرتبط برسالة'}
                </Typography>
                {offer.message?.content && (
                  <>
                    <Typography variant="body1" gutterBottom>
                      <strong>محتوى الرسالة:</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      p: 2, 
                      backgroundColor: 'white', 
                      borderRadius: 1, 
                      border: '1px solid #ddd',
                      whiteSpace: 'pre-wrap',
                      fontStyle: 'italic',
                      color: '#666'
                    }}>
                      {offer.message.content}
                    </Typography>
                  </>
                )}
              </Box>
            </Grid>

            {/* Product Details (if available) */}
            {offer.product && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    معلومات المنتج
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body1" gutterBottom>
                      <strong>اسم المنتج:</strong> {offer.product.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>السعر الأصلي:</strong> 
                      <span style={{ 
                        fontWeight: 'bold', 
                        color: '#666',
                        fontSize: '1.1em',
                        marginLeft: '8px',
                        textDecoration: 'line-through'
                      }}>
                        ${offer.product.price}
                      </span>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>السعر بعد الخصم:</strong> 
                      <span style={{ 
                        fontWeight: 'bold', 
                        color: '#e91e63',
                        fontSize: '1.2em',
                        marginLeft: '8px'
                      }}>
                        ${(offer.product.price * (1 - offer.discount / 100)).toFixed(2)}
                      </span>
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                    <Typography variant="body1" gutterBottom>
                      <strong>المخزون:</strong>
                      <Chip
                        label={offer.product.stock}
                        color={offer.product.stock > 10 ? 'success' : 
                              offer.product.stock > 0 ? 'warning' : 'error'}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>الجنس المستهدف:</strong>
                      <Chip
                        label={offer.product.target_gender}
                        color={offer.product.target_gender === 'male' ? 'primary' : 
                              offer.product.target_gender === 'female' ? 'secondary' : 'default'}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                  </Box>
                </Grid>
              </>
            )}

            {!offer.messageId && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  هذا العرض غير مرتبط بأي رسالة
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
          حذف العرض
        </Button>
      </DialogActions>
    </Dialog>
  );
} 