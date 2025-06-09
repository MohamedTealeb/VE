import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Table, TableContainer, TableHead, TableBody,
  TableRow, TableCell, Chip
} from '@mui/material';

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
  if (!order) return null;

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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-medium">{order.id}</p>
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