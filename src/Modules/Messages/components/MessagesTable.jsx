import * as React from 'react';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TablePagination, IconButton, Chip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'id', label: 'Offer ID', minWidth: 100 },
  { id: 'title', label: 'Title', minWidth: 150 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'discount', label: 'Discount %', minWidth: 120 },
  { id: 'messageId', label: 'Message ID', minWidth: 120 },
  { id: 'messageContent', label: 'Message Content', minWidth: 200 },
  { id: 'expiresAt', label: 'Expires At', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 120 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

const statusColors = {
  ACTIVE: 'success',
  EXPIRED: 'error',
  PENDING: 'warning'
};

export default function MessagesTable({
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

  const getOfferStatus = (expiresAt) => {
    const now = new Date();
    const expiryDate = new Date(expiresAt);
    if (expiryDate > now) {
      return 'ACTIVE';
    } else {
      return 'EXPIRED';
    }
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
                    if (column.id === 'status') {
                      const status = getOfferStatus(message.expiresAt);
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          <Chip
                            label={status}
                            color={statusColors[status] || 'warning'}
                            size="small"
                          />
                        </TableCell>
                      );
                    }
                    if (column.id === 'expiresAt') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {formatDate(message.expiresAt)}
                        </TableCell>
                      );
                    }
                    if (column.id === 'description') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {truncateText(message.description)}
                        </TableCell>
                      );
                    }
                    if (column.id === 'discount') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          <Chip
                            label={`${message.discount}% OFF`}
                            color="error"
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                      );
                    }
                    if (column.id === 'productImage') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {message.product?.cover_Image ? (
                            <img 
                              src={`${import.meta.env.VITE_IMAGEURL}${message.product.cover_Image}`}
                              alt="Product" 
                              style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNlMGUwZTAiLz48cGF0aCBkPSJNMjUgMjVDMjcuNzYxNCAyNSAzMCAyMi43NjE0IDMwIDIwQzMwIDE3LjIzODYgMjcuNzYxNCAxNSAyNSAxNUMyMi4yMzg2IDE1IDIwIDE3LjIzODYgMjAgMjBDMjAgMjIuNzYxNCAyMi4yMzg2IDI1IDI1IDI1WiIgZmlsbD0iI2I4YjhiOCIvPjxwYXRoIGQ9Ik0zNSAzNUwzMCAzMEwyNSAzNUwyMCAzMEwxNSAzNVY0MEgzNVYzNVoiIGZpbGw9IiNiOGI4YjgiLz48L3N2Zz4=';
                              }}
                            />
                          ) : (
                            <span>No Image</span>
                          )}
                        </TableCell>
                      );
                    }
                    if (column.id === 'productPrice') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {message.product?.price ? (
                            <span style={{ textDecoration: 'line-through', color: '#666' }}>${message.product.price}</span>
                          ) : (
                            <span>No Price</span>
                          )}
                        </TableCell>
                      );
                    }
                    if (column.id === 'productDiscount') {
                      const originalPrice = message.product?.price;
                      const discountedPrice = originalPrice ? originalPrice * 0.8 : null;
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {discountedPrice ? (
                            <span style={{ 
                              fontWeight: 'bold', 
                              color: '#e91e63',
                              fontSize: '1.1em'
                            }}>
                              ${discountedPrice.toFixed(2)}
                            </span>
                          ) : (
                            <span>No Price</span>
                          )}
                        </TableCell>
                      );
                    }
                    if (column.id === 'productName') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {message.product?.name ? (
                            <span>{message.product.name}</span>
                          ) : (
                            <span>No Name</span>
                          )}
                        </TableCell>
                      );
                    }
                    if (column.id === 'productStock') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {message.product?.stock !== undefined ? (
                            <span style={{ 
                              color: message.product.stock > 0 ? 'green' : 
                                    message.product.stock === 0 ? 'orange' : 'red',
                              fontWeight: 'bold'
                            }}>
                              {message.product.stock}
                            </span>
                          ) : (
                            <span>No Stock</span>
                          )}
                        </TableCell>
                      );
                    }
                    if (column.id === 'productGender') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {message.product?.target_gender ? (
                            <span style={{ 
                              textTransform: 'capitalize',
                              color: message.product.target_gender === 'male' ? '#1976d2' : 
                                    message.product.target_gender === 'female' ? '#e91e63' : '#9c27b0'
                            }}>
                              {message.product.target_gender}
                            </span>
                          ) : (
                            <span>No Gender</span>
                          )}
                        </TableCell>
                      );
                    }
                    if (column.id === 'messageContent') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {message.messageContent ? (
                            <span style={{ 
                              fontStyle: 'italic',
                              color: '#666'
                            }}>
                              {truncateText(message.messageContent, 40)}
                            </span>
                          ) : (
                            <span style={{ color: '#999', fontStyle: 'italic' }}>No Message</span>
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