import * as React from 'react';
import { Paper, CircularProgress, TextField, Button, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import OrderTable from './components/OrderTable';
import OrderDetailsDialog from './components/OrderDetailsDialog';
import { fetchOrders, updateStatus, deleteOrderById } from '../../redux/slice/OrdersSlice/Orders';
import FilterListIcon from '@mui/icons-material/FilterList';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [viewDialogOpen, setViewDialogOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [userIdFilter, setUserIdFilter] = React.useState('');
  const [productIdFilter, setProductIdFilter] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [orderToDelete, setOrderToDelete] = React.useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to access this page');
      navigate('/login');
      return;
    }
    dispatch(fetchOrders());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'An error occurred');
    }
  }, [error]);

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
      setUpdateLoading(true);
      if (newStatus === 'CANCELLED') {
        await dispatch(deleteOrderById(orderId)).unwrap();
        toast.success('Order cancelled and deleted successfully');
      } else {
        await dispatch(updateStatus({ id: orderId, status: newStatus })).unwrap();
        toast.success('Order status updated successfully');
      }
      // Refresh orders list after status update
      await dispatch(fetchOrders());
    } catch (error) {
      console.error('Status update error:', error);
      toast.error(error.message || 'Failed to update order status');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleFilter = () => {
    dispatch(fetchOrders({ userId: userIdFilter, productId: productIdFilter }));
    setShowFilters(false);
  };

  const handleShowFilters = () => setShowFilters(true);
  const handleCancelFilters = () => {
    setUserIdFilter('');
    setProductIdFilter('');
    setShowFilters(false);
    dispatch(fetchOrders()); // Show all orders again

    // Open dialog for the first order if available
    if (orders && orders.length > 0) {
      setSelectedOrder(orders[0]);
      setViewDialogOpen(true);
    }
  };

  const handleRequestCancel = () => {
    setOrderToDelete(selectedOrder);
    setConfirmDialogOpen(true);
  };

  if (loading) {
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
        <div style={{ display: 'flex', gap: 16, margin: 16, alignItems: 'center' }}>
          {!showFilters && (
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleShowFilters}
              className='text-black'
            >
            Filter
            </Button>
          )}
          {showFilters && (
            <>
              <TextField
                label="User ID"
                value={userIdFilter}
                onChange={e => setUserIdFilter(e.target.value)}
                size="small"
              />
              <TextField
                label="Product ID"
                value={productIdFilter}
                onChange={e => setProductIdFilter(e.target.value)}
                size="small"
              />
              <Button variant="contained" onClick={handleFilter}>بحث</Button>
              <Button variant="outlined" color="error" onClick={handleCancelFilters}>إلغاء</Button>
            </>
          )}
        </div>
        <Paper sx={{ width: '100%', mt: '90px', ml: '40px', p: 2 }}>
          <OrderTable
            orders={orders || []}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onView={handleViewOrder}
          />
        </Paper>

        <OrderDetailsDialog
          open={viewDialogOpen}
          onClose={handleCloseViewDialog}
          order={selectedOrder}
          onUpdateStatus={handleUpdateStatus}
          loading={updateLoading}
          onRequestCancel={handleRequestCancel}
        />
        <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
          <DialogTitle>Are you sure you want to cancel and delete this order?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
              No
            </Button>
            <Button
              onClick={async () => {
                if (orderToDelete) {
                  await handleUpdateStatus(orderToDelete.id, 'CANCELLED');
                }
                setConfirmDialogOpen(false);
                setOrderToDelete(null);
                setViewDialogOpen(false);
              }}
              color="error"
              variant="contained"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
