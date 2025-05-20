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
  const [formData, setFormData] = React.useState({ name: '', image: null });
  const [imagePreview, setImagePreview] = React.useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [categoryToDelete, setCategoryToDelete] = React.useState(null);

  // Base URL from env for image src
  const baseImageUrl = import.meta.env.VITE_BASEURL;
  const imageBaseUrl = import.meta.env.VITE_IMAGEURL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to access this page');
      navigate('/login');
      return;
    }
    dispatch(fetchCategories());
  }, [dispatch, navigate]);

  useEffect(() => {
    let shouldShowToast = false;

    if (success) {
      shouldShowToast = true;
  
      dispatch(clearSuccess());
    }
    if (error) {
      shouldShowToast = true;
      if (error.message === 'Access denied') {
        toast.error('You do not have permission to access this resource');
      } else {
        toast.error(error.message || 'An error occurred');
      }
      dispatch(clearError());
    }

    // Cleanup function to clear states when component unmounts
    return () => {
      if (shouldShowToast) {
        dispatch(clearSuccess());
        dispatch(clearError());
      }
    };
  }, [success, error, dispatch]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (category = null) => {
    if (category) {
      setFormData({ name: category.name, image: null });
      setImagePreview(`${imageBaseUrl}/${category.imageurl}`); // تأكد اسم الحقل في بياناتك
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
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
      if (formData.image) formDataToSend.append('image', formData.image);

      if (editId) {
        await dispatch(editCategory({ id: editId, categoryData: formDataToSend })).unwrap();
      } else {
        await dispatch(addCategory(formDataToSend)).unwrap();
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Save category error:', error);
      toast.error(error.message || 'Failed to save category');
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

  // دالة لجلب رابط الصورة الصحيح
  const getImageUrl = (image) => {
    if (!image) return '';
    if (typeof image === 'string') {
      return image.startsWith('http') ? image : `${imageBaseUrl}/${image}`;
    }
    if (image instanceof File) return URL.createObjectURL(image);
    if (image.url) return image.url;
    return '';
  };

  React.useEffect(() => {
    return () => {
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

          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              sx={{ backgroundColor: 'black',marginRight:'30px' }}
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
                  {columns.map(column => (
                    <TableCell key={column.id} align={column.align || 'left'}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {categories
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(category => (
                    <TableRow hover tabIndex={-1} key={category.id}>
                      {columns.map(column => {
                        if (column.id === 'actions') {
                          return (
                            <TableCell key={column.id}>
                              <IconButton color="primary" onClick={() => handleOpenDialog(category)} size="small">
                                <EditIcon />
                              </IconButton>
                              <IconButton color="error" onClick={() => handleDeleteClick(category)} size="small">
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          );
                        }
                        if (column.id === 'image') {
                          const imgSrc = getImageUrl(category.image); // أو category.image حسب اسم الحقل
                          return (
                            <TableCell key={column.id} align={column.align || 'left'}>
                              {imgSrc ? (
                                <Box
                                  component="img"
                                  src={imgSrc}
                                  alt={category.name}
                                  sx={{
                                    width: 50,
                                    height: 50,
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                    border: '1px solid #ddd'
                                  }}
                                  onError={e => {
                                    e.target.onerror = null;
                                    e.target.src = '/default-image.png';
                                  }}
                                />
                              ) : (
                                <Box
                                  component="img"
                                  src="/default-image.png"
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

        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{editId ? 'Edit Category' : 'Add Category'}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Upload Image
              <input type="file" hidden onChange={handleImageChange} accept="image/*" />
            </Button>
            {imagePreview && (
              <Box
                component="img"
                src={imagePreview}
                alt="Preview"
                sx={{ width: 150, height: 150, mt: 2, objectFit: 'cover', borderRadius: 1 }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete category "{categoryToDelete?.name}"?
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
