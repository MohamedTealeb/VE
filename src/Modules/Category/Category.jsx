import * as React from 'react';
import {
  Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TablePagination, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, IconButton, Box, CircularProgress, DialogContentText
} from '@mui/material';
import Sidebar from '../../Component/Shared/Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  fetchCategories,
  addCategory,
  editCategory,
  removeCategory,
  clearError,
  clearSuccess
} from '../../redux/slice/CategoriesSlice/Categories';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'image', label: 'Image', minWidth: 200 },
  { id: 'createdAt', label: 'Created At', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading, error, success } = useSelector((state) => state.categories);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: '',
    image: null
  });
  const [imagePreview, setImagePreview] = React.useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [categoryToDelete, setCategoryToDelete] = React.useState(null);

  // Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to access this page');
      navigate('/login');
      return;
    }
    console.log('Fetching categories...');
    dispatch(fetchCategories());
  }, [dispatch, navigate]);

  // Handle success and error messages
  useEffect(() => {
    if (success) {
      toast.success('Operation completed successfully!');
      dispatch(clearSuccess());
    }
    if (error) {
      console.error('Category error:', error);
      if (error.message === 'Access denied') {
        toast.error('You do not have permission to access this resource');
        // Optionally redirect to home or login
        // navigate('/login');
      } else {
        toast.error(error.message || 'An error occurred');
      }
      dispatch(clearError());
    }
  }, [success, error, dispatch]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (category = null) => {
    if (category) {
      setFormData({
        name: category.name,
        image: null
      });
      setImagePreview(category.image);
      setEditId(category.id);
    } else {
      setFormData({ name: '', image: null });
      setImagePreview('');
      setEditId(null);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({ name: '', image: null });
    setImagePreview('');
    setEditId(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add a category');
        navigate('/login');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      console.log('Sending form data:', {
        name: formData.name,
        hasImage: !!formData.image
      });

      if (editId) {
        await dispatch(editCategory({ 
          id: editId, 
          categoryData: formDataToSend 
        })).unwrap();
      } else {
        await dispatch(addCategory(formDataToSend)).unwrap();
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Save category error:', error);
      if (error.message === 'Access denied') {
        toast.error('You do not have permission to add/edit categories');
      } else {
        toast.error(error.message || 'Failed to save category');
      }
    }
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (categoryToDelete) {
        await dispatch(removeCategory(categoryToDelete.id)).unwrap();
        toast.success('Category deleted successfully');
      }
    } catch (error) {
      console.error('Delete category error:', error);
      toast.error(error.message || 'Failed to delete category');
    } finally {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  // Add function to handle image display
  const getImageUrl = (image) => {
    if (!image) return '';
    // If image is a URL string, return it directly
    if (typeof image === 'string') return image;
    // If image is a File object, create object URL
    if (image instanceof File) return URL.createObjectURL(image);
    // If image is an object with url property
    if (image.url) return image.url;
    return '';
  };

  // Cleanup object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup any object URLs created for image previews
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (loading && !categories.length) {
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
        <Sidebar />
        <Paper sx={{ width: '100%', mt: '90px', ml: '40px', p: 2 }}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error.message}
            </div>
          )}
          
          <Box display="flex" className="mr-19" justifyContent="flex-end" mb={2}>
            <Button
              sx={{ backgroundColor: 'black' }}
              className="text-white"
              variant="contained"
              onClick={() => handleOpenDialog()}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Add Category'}
            </Button>
          </Box>

          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader size="small" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {categories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((category) => (
                    <TableRow hover tabIndex={-1} key={category.id}>
                      {columns.map((column) => {
                        if (column.id === 'actions') {
                          return (
                            <TableCell key={column.id}>
                              <IconButton
                                color="primary"
                                onClick={() => handleOpenDialog(category)}
                                size="small"
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="error"
                                onClick={() => handleDeleteClick(category)}
                                size="small"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          );
                        }
                        if (column.id === 'image') {
                          const imageUrl = getImageUrl(category.image);
                          return (
                            <TableCell key={column.id} align={column.align || 'left'}>
                              {imageUrl ? (
                                <Box
                                  component="img"
                                  src={imageUrl}
                                  alt={category.name}
                                  sx={{
                                    width: 50,
                                    height: 50,
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                    border: '1px solid #ddd'
                                  }}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/50';
                                  }}
                                />
                              ) : (
                                <Box
                                  component="img"
                                  src="https://via.placeholder.com/50"
                                  alt="No image"
                                  sx={{
                                    width: 50,
                                    height: 50,
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                    border: '1px solid #ddd'
                                  }}
                                />
                              )}
                            </TableCell>
                          );
                        }
                        const value = category[column.id];
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
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{editId ? 'Edit Category' : 'Add Category'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={formData.name}
              onChange={handleFormChange}
              variant="outlined"
              required
              error={error && error.field === 'name'}
              helperText={error && error.field === 'name' ? error.message : ''}
            />
            <Box mt={2}>
              <input
                accept="image/*"
                type="file"
                id="image-upload"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Upload Image
                </Button>
              </label>
            </Box>
            {imagePreview && (
              <Box mt={2} display="flex" justifyContent="center">
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    objectFit: 'contain',
                    borderRadius: 1,
                    border: '1px solid #ddd'
                  }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: 'black' }} onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              sx={{ backgroundColor: 'black' }}
              className="text-white"
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">
            Delete Category
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete the category "{categoryToDelete?.name}"? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              color="error" 
              variant="contained"
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}