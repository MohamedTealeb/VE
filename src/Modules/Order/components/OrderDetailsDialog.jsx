import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Table, TableContainer, TableHead, TableBody,
  TableRow, TableCell, Chip
} from '@mui/material';
import { useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from 'react';
import { getAllGovernments } from '../../../Apis/Governments/Governments';

const statusColors = {
  PENDING: 'warning',
  DELIVERED: 'success',
  CANCELED: 'error',
  CANCELLED: 'error',
  PROCESSING: 'info',
  ACCEPTED: 'success',
};

export default function OrderDetailsDialog({
  open,
  onClose,
  order,
  onUpdateStatus,
  loading,
  onRequestCancel
}) {
  // Get colors and sizes from Redux
  const colors = useSelector(state => state.colors.colors || []);
  const sizes = useSelector(state => state.sizes.sizes || []);

  const [governments, setGovernments] = useState([]);

  useEffect(() => {
    if (open) {
      const fetchGovernments = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await getAllGovernments(token);
          setGovernments(res.data);
        } catch (err) {
          setGovernments([]);
        }
      };
      fetchGovernments();
    }
  }, [open]);

  // دالة للحصول على اسم المحافظة
  const getGovernmentName = (id) => {
    const gov = governments.find(g => g.id === id);
    return gov ? gov.name : id;
  };

  if (!order) return null;

  // Map product color/size IDs to full objects
  const availableColors = (order.product?.colors || [])
    .map(pc => colors.find(c => c.id === pc.colorId))
    .filter(Boolean);
  const availableSizes = (order.product?.sizes || [])
    .map(ps => sizes.find(s => s.id === ps.sizeId))
    .filter(Boolean);

  // Debug logging
  console.log('Order:', order);
  console.log('Global colors:', colors);
  console.log('Global sizes:', sizes);
  console.log('Product colors:', order.product?.colors);
  console.log('Product sizes:', order.product?.sizes);
  console.log('Available colors:', availableColors);
  console.log('Available sizes:', availableSizes);

  const selectedColor = colors.find(c => c.id === order.colorId);
  const selectedSize = sizes.find(s => s.id === order.sizeId);

  const SHIPPING_FEES = 70;
  const grandTotal = (order.total || 0) + SHIPPING_FEES;

  const handleDeliver = async () => {
    try {
      await onUpdateStatus(order.id, 'DELIVERED');
      onClose();
    } catch (error) {
      console.error('Failed to deliver order:', error);
    }
  };

  const handleCancel = async () => {
    try {
      await onUpdateStatus(order.id, 'CANCELED');
      onClose();
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <div className="space-y-6">
          {/* Order Main Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Order Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><b>Order ID:</b> {order.id}</div>
              <div>
                <b>Status:</b> 
                <Chip label={order.status} color={statusColors[order.status] || 'default'} size="small" style={{ fontWeight: 'bold', fontSize: 15 }} />
              </div>
              <div style={{ gridColumn: '1 / span 2', fontSize: 18, color: '#1976d2', fontWeight: 'bold' }}><b>Total Price:</b> {order.total} EGP</div>
              <div style={{ gridColumn: '1 / span 2', fontSize: 16 }}><b>Shipping Fees:</b> {SHIPPING_FEES} EGP</div>
              <div style={{ gridColumn: '1 / span 2', fontSize: 20, color: '#d32f2f', fontWeight: 'bold' }}><b>Grand Total:</b> {grandTotal} EGP</div>
              <div><b>Address:</b> {order.address}</div>
              <div><b>Phone:</b> {order.phone}</div>
              <div><b>Governorate:</b> {getGovernmentName(order.governmentId)}</div>
              <div><b>Created At:</b> {order.createdAt}</div>
              <div><b>Updated At:</b> {order.updatedAt}</div>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">User Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><b>User ID:</b> {order.user?.id}</div>
              <div><b>Email:</b> {order.user?.email}</div>
              <div><b>Name:</b> {order.user?.firstName} {order.user?.lastName}</div>
              <div><b>Role:</b> {order.user?.role}</div>
              <div><b>Phone Number:</b> {order.user?.phoneNumber}</div>
              <div><b>Created At:</b> {order.user?.createdAt}</div>
            </div>
          </div>

          {/* Items Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Order Items</h3>
            {order.items?.map((item, idx) => (
              <div key={item.id} style={{ marginBottom: 16, padding: 8, background: '#fff', borderRadius: 4 }}>
                <b>Item #{idx + 1}</b><br />
                <b>Quantity:</b> {item.quantity}<br />
                <b>Color:</b> {item.color?.name} ({item.color?.hex})<br />
                <b>Size:</b> {item.size?.label}<br />
                <b>Product:</b> {item.product?.name} (ID: {item.product?.id})<br />
                <b>Price:</b> {item.product?.price}<br />
                <b>Description:</b> {item.product?.discreption}<br />
                <b>Cover Image:</b> {item.product?.cover_Image && <img src={item.product?.cover_Image.startsWith('/') ? (import.meta.env.VITE_IMAGEURL + item.product?.cover_Image) : item.product?.cover_Image} alt="" style={{ maxWidth: 80, verticalAlign: 'middle', borderRadius: 8, border: '1px solid #eee' }} />}<br />
                <b>Images:</b>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {item.product?.images?.map(img => (
                    <img key={img.id} src={img.url.startsWith('/') ? (import.meta.env.VITE_IMAGEURL + img.url) : img.url} alt="product" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button
              variant="contained"
              color="success"
              onClick={handleDeliver}
              disabled={loading || order.status === 'DELIVERED'}
            >
              Deliver
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancel}
              disabled={loading || order.status === 'CANCELED'}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
} 