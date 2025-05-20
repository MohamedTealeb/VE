import * as React from 'react';
import {
  Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TablePagination, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, IconButton, Box, CircularProgress, DialogContentText, Chip
} from '@mui/material';
import Sidebar from '../../Component/Shared/Sidebar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'orderNumber', label: 'Order Number', minWidth: 120 },
  { id: 'customerName', label: 'Customer Name', minWidth: 150 },
  { id: 'totalAmount', label: 'Total Amount', minWidth: 120 },
  { id: 'status', label: 'Status', minWidth: 120 },
  { id: 'createdAt', label: 'Order Date', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

const statusColors = {
  pending: 'warning',
  processing: 'info',
  completed: 'success',
  cancelled: 'error'
};

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [viewDialogOpen, setViewDialogOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to access this page');
      navigate('/login');
      return;
    }
    // TODO: Add fetchOrders dispatch here
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      // TODO: Add update order status logic here
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !orders?.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="overflow-hidden flex flex-col">
        <Sidebar />
        <Paper sx={{ width: '100%', mt: '90px', ml: '40px', p: 2 }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader size="small" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(order => (
                    <TableRow hover tabIndex={-1} key={order.id}>
                      {columns.map(column => {
                        if (column.id === 'actions') {
                          return (
                            <TableCell key={column.id}>
                              <IconButton color="primary" onClick={() => handleViewOrder(order)} size="small">
                                <VisibilityIcon />
                              </IconButton>
                            </TableCell>
                          );
                        }
                        if (column.id === 'status') {
                          return (
                            <TableCell key={column.id} align={column.align || 'left'}>
                              <Chip
                                label={order.status}
                                color={statusColors[order.status.toLowerCase()]}
                                size="small"
                              />
                            </TableCell>
                          );
                        }
                        if (column.id === 'totalAmount') {
                          return (
                            <TableCell key={column.id} align={column.align || 'left'}>
                              ${order.totalAmount.toFixed(2)}
                            </TableCell>
                          );
                        }
                        const value = order[column.id];
                        return (
                          <TableCell key={column.id} align={column.align || 'left'}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={orders?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <Dialog open={viewDialogOpen} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent>
            {selectedOrder && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Order Information</h3>
                    <p>Order Number: {selectedOrder.orderNumber}</p>
                    <p>Date: {selectedOrder.createdAt}</p>
                    <p>Status: 
                      <Chip
                        label={selectedOrder.status}
                        color={statusColors[selectedOrder.status.toLowerCase()]}
                        size="small"
                        className="ml-2"
                      />
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Customer Information</h3>
                    <p>Name: {selectedOrder.customerName}</p>
                    <p>Email: {selectedOrder.customerEmail}</p>
                    <p>Phone: {selectedOrder.customerPhone}</p>
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
                        {selectedOrder.items?.map((item, index) => (
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
                    <p className="text-lg">${selectedOrder.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'processing')}
                      disabled={loading || selectedOrder.status === 'processing'}
                    >
                      Process
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'completed')}
                      disabled={loading || selectedOrder.status === 'completed'}
                    >
                      Complete
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'cancelled')}
                      disabled={loading || selectedOrder.status === 'cancelled'}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
