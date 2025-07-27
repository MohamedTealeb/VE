import * as React from 'react';
import { Paper, CircularProgress, TextField, Button, IconButton, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
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
  
  // Debug logging
  console.log('Order component - orders:', orders);
  console.log('Order component - loading:', loading);
  console.log('Order component - error:', error);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [viewDialogOpen, setViewDialogOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState('all');
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
    console.log('Dispatching fetchOrders...');
    dispatch(fetchOrders());
  }, [dispatch, navigate]);

  // Fetch orders when status filter changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    const filters = {};
    if (statusFilter && statusFilter !== 'all') filters.status = statusFilter;
    
    console.log('Fetching orders with status filter:', filters);
    dispatch(fetchOrders(filters));
  }, [statusFilter, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'An error occurred');
    }
  }, [error]);

  // Filter orders based on current filters
  const filteredOrders = React.useMemo(() => {
    console.log('Orders value:', orders, 'Type:', typeof orders, 'Is Array:', Array.isArray(orders));
    
    // Ensure orders is always an array
    if (!orders || !Array.isArray(orders)) {
      console.warn('Orders is not an array, returning empty array. Orders:', orders);
      return [];
    }
    
    return orders
      .filter(order => {
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        
        return matchesStatus;
      })
      .sort((a, b) => {
        // Sort by createdAt in descending order (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [orders, statusFilter]);

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
        await dispatch(updateStatus({ id: orderId, status: newStatus })).unwrap();
        toast.success('Order status updated successfully');
      await dispatch(fetchOrders());
    } catch (error) {
      console.error('Status update error:', error);
      toast.error(error.message || 'Failed to update order status');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleShowFilters = () => setShowFilters(true);
  const handleFilter = () => setShowFilters(false);
  const handleCancelFilters = () => {
    setStatusFilter('all');
    setShowFilters(false);
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
      <div className="overflow-hidden mt-20 flex flex-col">
        <div style={{ display: 'flex', gap: 16, margin: '20px 16px', alignItems: 'center', flexWrap: 'wrap', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '8px' }}>
          {/* Status Summary */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip 
              label={`Pending: ${filteredOrders.filter(o => o.status === 'PENDING').length}`} 
              color="warning" 
              variant="outlined"
              onClick={() => setStatusFilter('PENDING')}
              style={{ cursor: 'pointer' }}
            />
            <Chip 
              label={`Delivered: ${filteredOrders.filter(o => o.status === 'DELIVERED').length}`} 
              color="success" 
              variant="outlined"
              onClick={() => setStatusFilter('DELIVERED')}
              style={{ cursor: 'pointer' }}
            />
            <Chip 
              label={`Canceled: ${filteredOrders.filter(o => o.status === 'CANCELED').length}`} 
              color="error" 
              variant="outlined"
              onClick={() => setStatusFilter('CANCELED')}
              style={{ cursor: 'pointer' }}
            />
            <Chip 
              label={`All: ${filteredOrders.length}`} 
              color="primary" 
              variant="outlined"
              onClick={() => setStatusFilter('all')}
              style={{ cursor: 'pointer' }}
            />
          </div>
        
          {!showFilters && (
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleShowFilters}
              className='text-black'
              style={{ marginLeft: 'auto' }}
            >
            Filter
            </Button>
          )}
          {showFilters && (
            <>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="DELIVERED">Delivered</MenuItem>
                  <MenuItem value="CANCELED">Canceled</MenuItem>
               
                </Select>
              </FormControl>
              <Button variant="contained" onClick={handleFilter}>Filter</Button>
              <Button variant="outlined" color="error" onClick={handleCancelFilters}>Cancel</Button>
            </>
          )}
        </div>
        <Paper sx={{ width: '100%', mt: '20px', ml: '40px', p: 2 }}>
          <OrderTable
            orders={filteredOrders}
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
                  await handleUpdateStatus(orderToDelete.id, 'CANCELED');
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
