import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Table, TableContainer, TableHead, TableBody,
  TableRow, TableCell, Chip
} from '@mui/material';

const statusColors = {
  PENDING: 'warning',
  PROCESSING: 'info',
  COMPLETED: 'success',
  CANCELLED: 'error'
};

export default function OrderDetailsDialog({
  open,
  onClose,
  order,
  onUpdateStatus,
  loading
}) {
  if (!order) return null;

  const handleCancel = async () => {
    try {
      await onUpdateStatus(order.id, 'CANCELLED');
      onClose();
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Order Information</h3>
              <p>Order ID: {order.id}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <div className="flex items-center">
                <span>Status: </span>
                <Chip
                  label={order.status}
                  color={statusColors[order.status]}
                  size="small"
                  className="ml-2"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">User Information</h3>
              <p>Name: {order.user?.firstName} {order.user?.lastName}</p>
              <p>Email: {order.user?.email}</p>
              <p>Phone: {order.user?.phoneNumber}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Product Information</h3>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Material</TableCell>
                    <TableCell>Target Gender</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{order.product?.name}</TableCell>
                    <TableCell>${order.product?.price}</TableCell>
                    <TableCell>{order.product?.Material}</TableCell>
                    <TableCell>{order.product?.target_gender}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Product Description</h3>
              <p className="text-sm">{order.product?.discreption}</p>
            </div>
            <div className="space-x-2">
              <Button
                variant="contained"
                color="success"
                onClick={() => onUpdateStatus(order.id, 'COMPLETED')}
                disabled={loading || order.status === 'COMPLETED'}
              >
                Complete
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleCancel}
                disabled={loading || order.status === 'CANCELLED'}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
} 