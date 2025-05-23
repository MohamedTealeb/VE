import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Table, TableContainer, TableHead, TableBody,
  TableRow, TableCell, Chip
} from '@mui/material';

const statusColors = {
  pending: 'warning',
  processing: 'info',
  completed: 'success',
  cancelled: 'error'
};

export default function OrderDetailsDialog({
  open,
  onClose,
  order,
  onUpdateStatus,
  loading
}) {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Order Information</h3>
              <p>Order Number: {order.orderNumber}</p>
              <p>Date: {order.createdAt}</p>
              <p>Status: 
                <Chip
                  label={order.status}
                  color={statusColors[order.status.toLowerCase()]}
                  size="small"
                  className="ml-2"
                />
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Customer Information</h3>
              <p>Name: {order.customerName}</p>
              <p>Email: {order.customerEmail}</p>
              <p>Phone: {order.customerPhone}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Order Items</h3>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Total Amount</h3>
              <p className="text-lg">${order.totalAmount.toFixed(2)}</p>
            </div>
            <div className="space-x-2">
              <Button
                variant="contained"
                color="primary"
                onClick={() => onUpdateStatus(order.id, 'processing')}
                disabled={loading || order.status === 'processing'}
              >
                Process
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => onUpdateStatus(order.id, 'completed')}
                disabled={loading || order.status === 'completed'}
              >
                Complete
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => onUpdateStatus(order.id, 'cancelled')}
                disabled={loading || order.status === 'cancelled'}
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