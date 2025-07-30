import * as React from 'react';
import { Paper, CircularProgress, Button, Chip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchMessages, deleteMessageById, createNewMessage } from '../../redux/slice/MessagesSlice/Messages';
import { fetchProducts } from '../../redux/slice/ProductsSlice/Products';
import AddIcon from '@mui/icons-material/Add';
import MessagesTable from './components/SimpleMessagesTable';
import SimpleMessageDetailsDialog from './components/SimpleMessageDetailsDialog';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DeleteConfirmation from './components/DeleteConfirmation';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

export default function SimpleMessages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messages, loading, error } = useSelector((state) => state.messages);
  const { products } = useSelector((state) => state.products);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [viewDialogOpen, setViewDialogOpen] = React.useState(false);
  const [selectedMessage, setSelectedMessage] = React.useState(null);
  const [messageToDelete, setMessageToDelete] = React.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    content: '',
    productId: ''
  });
  const [submitLoading, setSubmitLoading] = React.useState(false);
  const imageBaseUrl = 'https://api.ryo-egypt.com';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to access this page');
      navigate('/login');
      return;
    }
    dispatch(fetchMessages());
    dispatch(fetchProducts());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'An error occurred');
    }
  }, [error]);

  // Filter simple messages (without offer fields)
  const filteredMessages = React.useMemo(() => {
    if (!messages || !Array.isArray(messages)) {
      return [];
    }
    
    // Filter messages that don't have offer fields (title, discount, expiresAt)
    return [...messages]
      .filter(message => !message.title && !message.discount && !message.expiresAt)
      .sort((a, b) => {
        // Sort by createdAt in descending order (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [messages]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedMessage(null);
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await dispatch(deleteMessageById(messageId)).unwrap();
      toast.success('تم حذف الرسالة بنجاح');
      dispatch(fetchMessages());
    } catch (error) {
      console.error('Delete message error:', error);
      toast.error(error.message || 'فشل في حذف الرسالة');
    }
  };

  const handleDeleteFromTable = (messageId) => {
    const message = messages.find(m => m.id === messageId);
    setMessageToDelete(message);
    setDeleteDialogOpen(true);
  };

  const handleRequestDelete = () => {
    setMessageToDelete(selectedMessage);
    setDeleteDialogOpen(true);
  };

  const handleAddMessage = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setFormData({ content: '', productId: '' });
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
  
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitMessage = async () => {
    if (!formData.content.trim()) {
      toast.error('محتوى الرسالة مطلوب');
      return;
    }

    try {
      setSubmitLoading(true);
      
      const messageData = {
        content: formData.content.trim(),
        productId: formData.productId && formData.productId !== '' ? Number(formData.productId) : 0,
        messageId: 0
      };
      
      console.log('Sending message data:', messageData);
      
      await dispatch(createNewMessage(messageData)).unwrap();
      toast.success('تم إضافة الرسالة بنجاح');
      setFormData({ content: '', productId: '' });
      setAddDialogOpen(false);
      dispatch(fetchMessages()); // Refresh the list
    } catch (error) {
      console.error('Create message error:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'فشل في إضافة الرسالة';
      toast.error(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="overflow-hidden mt-20 flex flex-col">
        <div style={{ display: 'flex', gap: 16, margin: '20px 16px', alignItems: 'center', flexWrap: 'wrap', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '8px' }}>
          {/* Messages Summary */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip 
              label={`Total Messages: ${filteredMessages.length}`} 
              color="primary" 
              variant="outlined"
            />
          </div>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddMessage}
            style={{ marginLeft: 'auto', marginRight: '10px' }}
          >
            إضافة رسالة جديدة
          </Button>
        </div>
        
        {/* Messages Section */}
        <Paper sx={{ width: '100%', mt: '20px', ml: '40px', p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            الرسائل
          </Typography>
          <MessagesTable
            messages={filteredMessages}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
                         onView={handleViewMessage}
             onDelete={handleDeleteFromTable}
          />
        </Paper>

        <SimpleMessageDetailsDialog
          open={viewDialogOpen}
          onClose={handleCloseViewDialog}
          message={selectedMessage}
          onRequestDelete={handleRequestDelete}
        />
        
        {/* Add Message Dialog */}
        <Dialog 
          open={addDialogOpen} 
          onClose={handleCloseAddDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            إضافة رسالة جديدة
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="محتوى الرسالة"
                multiline
                rows={4}
                value={formData.content}
                onChange={handleInputChange('content')}
                placeholder="اكتب محتوى الرسالة هنا..."
                fullWidth
                required
              />
              <FormControl fullWidth>
                <InputLabel>المنتج (اختياري)</InputLabel>
                <Select
                  value={formData.productId}
                  onChange={handleInputChange('productId')}
                  label="المنتج (اختياري)"
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>لا يوجد منتج</em>
                  </MenuItem>
                  {products && products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                        <img
                          className="MuiBox-root css-ke6aw4"
                          src={`${imageBaseUrl}${product.cover_Image}`}
                          alt={product.name}
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: 'cover',
                            borderRadius: 4,
                            border: '1px solid #e0e0e0'
                          }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {product.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            السعر: {product.price} - المخزون: {product.stock}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="primary" disabled={submitLoading}>
              إلغاء
            </Button>
            <Button 
              onClick={handleSubmitMessage} 
              color="primary" 
              variant="contained"
              disabled={submitLoading}
            >
              {submitLoading ? 'جاري الإضافة...' : 'إضافة الرسالة'}
            </Button>
          </DialogActions>
        </Dialog>

        <DeleteConfirmation
          open={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false);
            setMessageToDelete(null);
          }}
          onConfirm={async () => {
            if (messageToDelete) {
              await handleDeleteMessage(messageToDelete.id);
            }
            setDeleteDialogOpen(false);
            setMessageToDelete(null);
            setViewDialogOpen(false);
          }}
          title="تأكيد حذف الرسالة"
          message="هل أنت متأكد من حذف هذه الرسالة؟"
          itemName={messageToDelete?.content ? 
            `${messageToDelete.content.substring(0, 50)}${messageToDelete.content.length > 50 ? '...' : ''}` : 
            ''
          }
        />
      </div>
    </>
  );
} 