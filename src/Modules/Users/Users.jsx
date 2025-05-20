import * as React from 'react';
import {
  Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TablePagination, IconButton, CircularProgress, DialogContentText, Dialog,
  DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import Sidebar from '../../Component/Shared/Sidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, removeUser } from '../../redux/slice/UsersSlice/Users';

const columns = [
  { id: 'firstName', label: 'First Name', minWidth: 120 },
  { id: 'lastName', label: 'Last Name', minWidth: 120 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phoneNumber', label: 'Phone Number', minWidth: 130 },
  { id: 'role', label: 'Role', minWidth: 100 },
  { id: 'createdAt', label: 'Created At', minWidth: 150 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { users = { data: [], total: 0 }, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to access this page');
      navigate('/login');
      return;
    }
    dispatch(fetchUsers());
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete?.id) {
      toast.error("No user selected for deletion");
      setDeleteDialogOpen(false);
      return;
    }

    try {
      await dispatch(removeUser(userToDelete.id)).unwrap();
      toast.success('User deleted successfully');
      // Refresh the users list after deletion
      dispatch(fetchUsers());
    } catch (err) {
      toast.error(err?.message || 'Failed to delete user');
    } finally {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  // Ensure we have valid data before rendering
  if (!users?.data || !Array.isArray(users.data)) {
    return (
      <div className="flex justify-center items-center h-screen">
        No users data available
      </div>
    );
  }

  const displayUsers = users.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <Toaster />
      <div className="overflow-hidden flex flex-col">
        <Sidebar />
        <Paper sx={{ width: '100%', mt: '90px', ml: '40px', p: 2 }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader size="small" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ minWidth: column.minWidth }} align={column.align || 'left'}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayUsers.map((user) => (
                  <TableRow hover tabIndex={-1} key={user.id}>
                    {columns.map((column) => {
                      if (column.id === 'actions') {
                        return (
                          <TableCell key={column.id}>
                            <IconButton
                              color="error"
                              onClick={() => handleDeleteClick(user)}
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
            count={users.total || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete user "{userToDelete?.firstName} {userToDelete?.lastName}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
