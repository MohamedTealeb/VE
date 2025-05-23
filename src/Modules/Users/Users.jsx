import * as React from 'react';
import { Paper, CircularProgress, FormControl, InputLabel, Select, MenuItem, Button, Box, useTheme, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, removeUser } from '../../redux/slice/UsersSlice/Users';
import { addAdmin } from '../../Apis/Auth/AddAdmin/AddAdmin_Api';
import UsersTable from './components/UsersTable';
import AddAdminDialog from './components/AddAdminDialog';
import DeleteConfirmation from './components/DeleteConfirmation';

export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState(null);
  const [roleFilter, setRoleFilter] = React.useState('all');
  const [addAdminDialogOpen, setAddAdminDialogOpen] = React.useState(false);
  const [newAdmin, setNewAdmin] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });

  const { users = { data: [], total: 0 }, loading, error } = useSelector((state) => state.users);
  const { loading: addAdminLoading } = useSelector((state) => state.addAdmin);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to access this page');
      navigate('/login');
      return;
    }
    dispatch(fetchUsers());
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => setPage(newPage);
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
      dispatch(fetchUsers());
    } catch (err) {
      toast.error(err?.message || 'Failed to delete user');
    } finally {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleAddAdminClick = () => setAddAdminDialogOpen(true);
  const handleAddAdminClose = () => {
    setAddAdminDialogOpen(false);
    setNewAdmin({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: ''
    });
  };

  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addAdmin(newAdmin)).unwrap();
      toast.success('Admin added successfully');
      handleAddAdminClose();
      dispatch(fetchUsers());
    } catch (err) {
      toast.error(err.message || 'Failed to add admin');
    }
  };

  const handleNewAdminChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin(prev => ({
      ...prev,
      [name]: value
    }));
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

  if (!users?.data || !Array.isArray(users.data)) {
    return (
      <div className="flex justify-center items-center h-screen">
        No users data available
      </div>
    );
  }

  const filteredUsers = users.data.filter(user => {
    if (roleFilter === 'all') return true;
    return user.role?.toLowerCase() === roleFilter.toLowerCase();
  });

  return (
    <>
      <Toaster />
      <Box sx={{ 
        bgcolor: 'white', 
        minHeight: '100vh', 
        p: { xs: 1, sm: 2, md: 3 }
      }}>
        <Paper sx={{ 
          width: '100%', 
          mt: { xs: '60px', sm: '70px', md: '90px' }, 
          ml: { xs: 0, sm: '20px', md: '40px' }, 
          p: { xs: 1, sm: 2, md: 3 },
          borderRadius: '8px'
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: { xs: 2, sm: 0 },
            mb: 2,
            px: { xs: 1, sm: 2 }
          }}>
            <FormControl sx={{ 
              minWidth: { xs: '100%', sm: 200 },
              mb: { xs: 2, sm: 0 }
            }}>
              <InputLabel id="role-filter-label">Filter by Role</InputLabel>
              <Select
                labelId="role-filter-label"
                value={roleFilter}
                label="Filter by Role"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{ 
                backgroundColor: 'black',
                borderRadius: '8px',
                width: { xs: '100%', sm: 'auto' }
              }}
              startIcon={<AddIcon />}
              onClick={handleAddAdminClick}
            >
              Add Admin
            </Button>
          </Box>

          <UsersTable
            users={filteredUsers}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onDelete={handleDeleteClick}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </Paper>

        <AddAdminDialog
          open={addAdminDialogOpen}
          onClose={handleAddAdminClose}
          formData={newAdmin}
          onChange={handleNewAdminChange}
          onSubmit={handleAddAdminSubmit}
          loading={addAdminLoading}
          isMobile={isMobile}
        />

        <DeleteConfirmation
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          userName={userToDelete ? `${userToDelete.firstName} ${userToDelete.lastName}` : ''}
          isMobile={isMobile}
        />
      </Box>
    </>
  );
}
