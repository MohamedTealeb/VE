import * as React from 'react';
import { Paper, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import OrderTable from './components/OrderTable';
import OrderDetailsDialog from './components/OrderDetailsDialog';
import { fetchOrders, updateStatus } from '../../redux/slice/OrdersSlice/Orders';

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [viewDialogOpen, setViewDialogOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [updateLoading, setUpdateLoading] = React.useState(false);

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
      await dispatch(updateStatus({ id: orderId, status: newStatus })).unwrap();
      toast.success('Order status updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update order status');
    } finally {
      setUpdateLoading(false);
    }
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
        />
      </div>
    </>
  );
}
