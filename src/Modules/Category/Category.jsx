import * as React from 'react';
import { Paper, Box, Button, CircularProgress } from '@mui/material';
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
import CategoryTable from './components/CategoryTable';
import CategoryForm from './components/CategoryForm';
import DeleteConfirmation from './components/DeleteConfirmation';

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
    if (success) {
      dispatch(clearSuccess());
    }
    if (error) {
      if (error.message === 'Access denied') {
        toast.error('You do not have permission to access this resource');
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
      setFormData({ name: category.name, image: null });
      setImagePreview(`${imageBaseUrl}/${category.imageurl}`);
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
        <Paper sx={{ width: '100%', mt: '90px', ml: '40px', p: 2 }}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error.message}
            </div>
          )}

          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              sx={{ backgroundColor: 'black', marginRight: '30px' }}
              className="text-white"
              variant="contained"
              onClick={() => handleOpenDialog()}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Add Category'}
            </Button>
          </Box>

          <CategoryTable
            categories={categories}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onEdit={handleOpenDialog}
            onDelete={handleDeleteClick}
            imageBaseUrl={imageBaseUrl}
          />
        </Paper>

        <CategoryForm
          open={dialogOpen}
          onClose={handleCloseDialog}
          formData={formData}
          onFormChange={handleFormChange}
          onImageChange={handleImageChange}
          onSave={handleSave}
          loading={loading}
          imagePreview={imagePreview}
          isEdit={!!editId}
        />

        <DeleteConfirmation
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          categoryName={categoryToDelete?.name}
        />
      </div>
    </>
  );
}
