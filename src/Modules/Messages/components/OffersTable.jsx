import * as React from 'react';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TablePagination, IconButton, Chip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Typography } from '@mui/material';

const columns = [
  { id: 'id', label: 'Offer ID', minWidth: 100 },
  { id: 'title', label: 'Title', minWidth: 150 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'discount', label: 'Discount %', minWidth: 120 },
  { id: 'productId', label: 'Product ID', minWidth: 120 },
  { id: 'productName', label: 'Product Name', minWidth: 150 },
  { id: 'productPrice', label: 'Product Price', minWidth: 120 },
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

export default function OffersTable({
  offers,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onView,
  onDelete,
  onEdit
}) {
  console.log('🔍 OffersTable: Received offers:', offers);
  console.log('🔍 OffersTable: Offers length:', offers?.length || 0);
  console.log('🔍 OffersTable: Offers type:', typeof offers);
  console.log('🔍 OffersTable: Is array:', Array.isArray(offers));
  
  if (!offers || !Array.isArray(offers)) {
    console.log('🔍 OffersTable: No offers to display');
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          لا توجد عروض متاحة
        </Typography>
      </Box>
    );
  }
  
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
            {offers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(offer => (
                <TableRow hover tabIndex={-1} key={offer.id}>
                  {columns.map(column => {
                    if (column.id === 'actions') {
                      return (
                        <TableCell key={column.id}>
                          <IconButton color="primary" onClick={() => onView(offer)} size="small">
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton color="secondary" onClick={() => onEdit(offer)} size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => onDelete(offer.id)} size="small">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      );
                    }
                    if (column.id === 'status') {
                      const status = getOfferStatus(offer.expiresAt);
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
                          {formatDate(offer.expiresAt)}
                        </TableCell>
                      );
                    }
                    if (column.id === 'description') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {truncateText(offer.description)}
                        </TableCell>
                      );
                    }
                    if (column.id === 'discount') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          <Chip
                            label={`${offer.discount}% OFF`}
                            color="error"
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                      );
                    }
                    if (column.id === 'messageContent') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {offer.message?.content ? (
                            <span style={{ 
                              fontStyle: 'italic',
                              color: '#666'
                            }}>
                              {truncateText(offer.message.content, 40)}
                            </span>
                          ) : (
                            <span style={{ color: '#999', fontStyle: 'italic' }}>No Message</span>
                          )}
                        </TableCell>
                      );
                    }
                    if (column.id === 'productName') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {offer.product?.name || 'N/A'}
                        </TableCell>
                      );
                    }
                    if (column.id === 'productPrice') {
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {offer.product?.price ? `$${offer.product.price}` : 'N/A'}
                        </TableCell>
                      );
                    }
                    const value = offer[column.id];
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
        count={offers?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
} 