import * as React from 'react';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TablePagination, IconButton, Chip, Box, Typography
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const columns = [
  { id: 'id', label: 'Message ID', minWidth: 100 },
  { id: 'content', label: 'Content', minWidth: 200 },
  { id: 'source', label: 'Source', minWidth: 120 },
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

  // Function to check if message comes from an offer
  const isFromOffer = (message) => {
    // Check if message has offer-related fields or if it's linked to an offer
    return message.offerId || message.title || message.discount || message.expiresAt;
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
                <TableRow 
                  hover 
                  tabIndex={-1} 
                  key={message.id}
                  sx={{
                    backgroundColor: isFromOffer(message) ? '#e8f5e8' : 'inherit',
                    '&:hover': {
                      backgroundColor: isFromOffer(message) ? '#c8e6c9' : undefined
                    }
                  }}
                >
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
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {isFromOffer(message) && (
                              <Chip
                                label="OFFER"
                                color="success"
                                size="small"
                                variant="filled"
                                sx={{ 
                                  fontSize: '0.6rem',
                                  fontWeight: 'bold',
                                  alignSelf: 'flex-start'
                                }}
                              />
                            )}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {isFromOffer(message) && (
                                <Chip
                                  icon={<LocalOfferIcon />}
                                  label="From Offer"
                                  color="success"
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              )}
                              <Typography variant="body2">
                                {truncateText(message.content)}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                      );
                    }
                    if (column.id === 'source') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {isFromOffer(message) ? (
                            <Chip
                              icon={<LocalOfferIcon />}
                              label="Offer"
                              color="success"
                              size="small"
                              variant="filled"
                            />
                          ) : (
                            <Chip
                              label="Direct"
                              color="primary"
                              size="small"
                              variant="outlined"
                            />
                          )}
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