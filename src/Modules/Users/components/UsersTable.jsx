import * as React from 'react';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TablePagination, IconButton, Box, useTheme, useMediaQuery
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const getColumns = (isMobile, isTablet) => {
  const baseColumns = [
    { id: 'fullName', label: 'Full Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'phoneNumber', label: 'Phone Number', minWidth: 130 },
    { id: 'role', label: 'Role', minWidth: 100 },
    { id: 'createdAt', label: 'Created At', minWidth: 150 },
    { id: 'actions', label: 'Actions', minWidth: 100 },
  ];

  if (isMobile) {
    return baseColumns.filter(col => ['fullName', 'role', 'actions'].includes(col.id));
  }

  if (isTablet) {
    return baseColumns.filter(col => ['fullName', 'email', 'role', 'actions'].includes(col.id));
  }

  return baseColumns;
};

export default function UsersTable({
  users,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onDelete,
  isMobile,
  isTablet
}) {
  const theme = useTheme();
  const columns = getColumns(isMobile, isTablet);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer sx={{ 
        maxHeight: 600,
        '& .MuiTableCell-root': {
          px: { xs: 1, sm: 2 },
          py: { xs: 1, sm: 1.5 }
        }
      }}>
        <Table stickyHeader size={isMobile ? "small" : "medium"} aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell 
                  key={column.id} 
                  style={{ 
                    minWidth: column.minWidth,
                    whiteSpace: 'nowrap'
                  }} 
                  align={column.align || 'left'}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow hover tabIndex={-1} key={user.id}>
                {columns.map((column) => {
                  if (column.id === 'actions') {
                    return (
                      <TableCell key={column.id}>
                        <IconButton
                          color="error"
                          onClick={() => onDelete(user)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    );
                  }
                  if (column.id === 'createdAt') {
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {formatDate(user[column.id])}
                      </TableCell>
                    );
                  }
                  if (column.id === 'fullName') {
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {`${user.firstName} ${user.lastName}`}
                      </TableCell>
                    );
                  }
                  const value = user[column.id];
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        sx={{
          '.MuiTablePagination-select': {
            px: { xs: 1, sm: 2 }
          },
          '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
            m: 0
          }
        }}
      />
    </Box>
  );
} 