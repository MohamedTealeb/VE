import * as React from 'react';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TablePagination, IconButton, Chip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const columns = [
  { id: 'id', label: 'Order ID', minWidth: 100 },
  { id: 'createdAt', label: 'Created At', minWidth: 150 },
  { id: 'user', label: 'Email', minWidth: 200 },
  { id: 'orderPhone', label: 'Order Phone', minWidth: 150 },
  { id: 'userPhone', label: 'User Phone', minWidth: 150 },

  { id: 'status', label: 'Status', minWidth: 120 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

const statusColors = {
  PENDING: 'warning',
  PROCESSING: 'info',
  ACCEPTED: 'success',
  CANCELLED: 'error',
  DELIVERED: 'success',
  CANCELED: 'error'
};

export default function OrderTable({
  orders,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onView
}) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <>
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
                          <IconButton color="primary" onClick={() => onView(order)} size="small">
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
                            color={statusColors[order.status]}
                            size="small"
                          />
                        </TableCell>
                      );
                    }
                    if (column.id === 'user') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {order.user?.email}
                        </TableCell>
                      );
                    }
                    if (column.id === 'orderPhone') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {order.phone}
                        </TableCell>
                      );
                    }
                    if (column.id === 'userPhone') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {order.user?.phoneNumber}
                        </TableCell>
                      );
                    }
                    if (column.id === 'product') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {order.product?.name}
                        </TableCell>
                      );
                    }
                    if (column.id === 'createdAt') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {formatDate(order.createdAt)}
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
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
} 