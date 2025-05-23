import * as React from 'react';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TablePagination, IconButton, Chip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

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

export default function OrderTable({
  orders,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onView
}) {
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
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
} 