import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Table, TableContainer, TableHead, TableBody,
  TableRow, TableCell, Chip
} from '@mui/material';
import { useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';

const statusColors = {
  PENDING: 'warning',
  DELIVERED: 'success',
  CANCELED: 'error'
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
          {/* Order Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Order Information</h3>
            <div className="flex gap-6 items-start mb-4">
              {/* Product Image */}
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={`${import.meta.env.VITE_IMAGEURL}${order.product?.cover_Image}`}
                  alt={order.product?.name}
                  className="w-full h-full object-cover rounded-lg border"
                />
              </div>
              {/* Order Info Grid */}
              <div className="flex-grow">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Product Name</p>
                    <p className="font-medium">{order.product?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Color</p>
                    {order.color ? (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-blue-500"
                          style={{ backgroundColor: order.color.hex || order.color.code || '#ccc', position: 'relative' }}
                        >
                          <CheckIcon style={{ color: 'white', fontSize: 20, position: 'absolute' }} />
                        </div>
                        <span className="ml-1 text-base font-medium">{order.color.name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">No color chosen</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Size</p>
                    {order.size ? (
                      <div
                        className="px-4 py-2 rounded border bg-blue-500 text-white border-blue-500 text-center text-base font-semibold relative"
                        style={{ minWidth: 40, textAlign: 'center' }}
                      >
                        {order.size.label}
                        <CheckIcon style={{ color: 'white', fontSize: 16, position: 'absolute', top: 2, right: 2 }} />
                      </div>
                    ) : (
                      <span className="text-gray-400">No size chosen</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Product ID</p>
                    <p className="font-medium">{order.productId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">User ID</p>
                    <p className="font-medium">{order.userId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Chip
                      label={order.status}
                      color={statusColors[order.status]}
                      size="small"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Quantity</p>
                    <p className="font-medium">{order.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-medium">${order.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created At</p>
                    <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Updated At</p>
                    <p className="font-medium">{new Date(order.updatedAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium">{order.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{order.phone}</p>
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">User Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">User ID</p>
                <p className="font-medium">{order.user?.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="font-medium">{order.user?.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{order.user?.firstName} {order.user?.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{order.user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="font-medium">{order.user?.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created At</p>
                <p className="font-medium">{new Date(order.user?.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Product Information</h3>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Material</TableCell>
                    <TableCell>Target Gender</TableCell>
                    <TableCell>Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{order.product?.name}</TableCell>
                    <TableCell>${order.product?.price}</TableCell>
                    <TableCell>{order.product?.Material}</TableCell>
                    <TableCell>{order.product?.target_gender}</TableCell>
                    <TableCell>{order.product?.category}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          {/* Product Description */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Product Description</h3>
            <p className="text-sm">{order.product?.discreption}</p>
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