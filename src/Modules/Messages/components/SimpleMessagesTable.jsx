import * as React from 'react';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TablePagination, IconButton, Chip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'id', label: 'Message ID', minWidth: 100 },
  { id: 'content', label: 'Content', minWidth: 200 },
  { id: 'productId', label: 'Product ID', minWidth: 120 },
  { id: 'productName', label: 'Product Name', minWidth: 150 },
  { id: 'productPrice', label: 'Product Price', minWidth: 120 },
  { id: 'productStock', label: 'Stock', minWidth: 100 },
  { id: 'productGender', label: 'Gender', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function SimpleMessagesTable({
  messages,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onView,
  onDelete
}) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
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
            {messages?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(message => (
                <TableRow hover tabIndex={-1} key={message.id}>
                  {columns.map(column => {
                    if (column.id === 'actions') {
                      return (
                        <TableCell key={column.id}>
                          <IconButton color="primary" onClick={() => onView(message)} size="small">
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => onDelete(message.id)} size="small">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      );
                    }
                    if (column.id === 'content') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {truncateText(message.content)}
                        </TableCell>
                      );
                    }
                    if (column.id === 'productName') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {message.product?.name ? (
                            <span style={{ fontWeight: 'bold' }}>{message.product.name}</span>
                          ) : (
                            <span style={{ color: '#999', fontStyle: 'italic' }}>No Product</span>
                          )}
                        </TableCell>
                      );
                    }
                    if (column.id === 'productPrice') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {message.product?.price ? (
                            <span style={{ 
                              fontWeight: 'bold', 
                              color: '#1976d2',
                              fontSize: '1.1em'
                            }}>
                              ${message.product.price}
                            </span>
                          ) : (
                            <span style={{ color: '#999', fontStyle: 'italic' }}>No Price</span>
                          )}
                        </TableCell>
                      );
                    }
                    if (column.id === 'productStock') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {message.product?.stock !== undefined ? (
                            <Chip
                              label={message.product.stock}
                              color={message.product.stock > 10 ? 'success' : 
                                    message.product.stock > 0 ? 'warning' : 'error'}
                              size="small"
                              variant="outlined"
                            />
                          ) : (
                            <span style={{ color: '#999', fontStyle: 'italic' }}>No Stock</span>
                          )}
                        </TableCell>
                      );
                    }
                    if (column.id === 'productGender') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {message.product?.target_gender ? (
                            <Chip
                              label={message.product.target_gender}
                              color={message.product.target_gender === 'male' ? 'primary' : 
                                    message.product.target_gender === 'female' ? 'secondary' : 'default'}
                              size="small"
                              variant="outlined"
                            />
                          ) : (
                            <span style={{ color: '#999', fontStyle: 'italic' }}>No Gender</span>
                          )}
                        </TableCell>
                      );
                    }
                    const value = message[column.id];
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
        count={messages?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
} 