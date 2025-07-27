import * as React from 'react';
import { Paper, CircularProgress, Button, Chip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchOffers, deleteOfferById } from '../../redux/slice/OffersSlice/Offers';
import AddIcon from '@mui/icons-material/Add';
import OffersTable from './components/OffersTable';
import OfferDetailsDialog from './components/OfferDetailsDialog';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import AddMessageDialog from './components/AddMessageDialog';
import DeleteConfirmation from './components/DeleteConfirmation';

export default function Offers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { offers, loading, error } = useSelector((state) => state.offers);
  
  // Debug logging
  console.log('Offers component - offers:', offers);
  console.log('Offers component - loading:', loading);
  console.log('Offers component - error:', error);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [viewDialogOpen, setViewDialogOpen] = React.useState(false);
  const [selectedOffer, setSelectedOffer] = React.useState(null);
  const [offerToDelete, setOfferToDelete] = React.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to access this page');
      navigate('/login');
      return;
    }
    console.log('🔍 Starting to fetch offers...');
    console.log('🔍 Token:', token ? 'Present' : 'Missing');
    console.log('🔍 API URL:', import.meta.env.VITE_API_URL || 'https://api.ryo-egypt.com');
    dispatch(fetchOffers());
  }, [dispatch, navigate]);

  useEffect(() => {
    console.log('🔍 Offers state changed:', {
      offers: offers,
      loading: loading,
      error: error,
      offersLength: offers?.length || 0
    });
  }, [offers, loading, error]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'An error occurred');
    }
  }, [error]);

  // Filter and sort offers
  const sortedOffers = React.useMemo(() => {
    console.log('🔍 Messages.jsx: Filtering offers:', offers);
    if (!offers || !Array.isArray(offers)) {
      console.log('🔍 Messages.jsx: No offers or not array:', offers);
      return [];
    }
    
    const filteredOffers = offers.filter(offer => 
      offer.title && offer.discount && offer.expiresAt
    );
    console.log('🔍 Messages.jsx: Filtered offers:', filteredOffers);
    
    return [...filteredOffers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [offers]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewOffer = (offer) => {
    setSelectedOffer(offer);
    setViewDialogOpen(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedOffer(null);
  };

  const handleDeleteOffer = async (offerId) => {
    try {
      await dispatch(deleteOfferById(offerId)).unwrap();
      toast.success('تم حذف العرض بنجاح');
      dispatch(fetchOffers());
    } catch (error) {
      console.error('Delete offer error:', error);
      toast.error(error.message || 'فشل في حذف العرض');
    }
  };

  const handleDeleteFromTable = (offerId) => {
    const offer = offers.find(o => o.id === offerId);
    setOfferToDelete(offer);
    setDeleteDialogOpen(true);
  };

  const handleRequestDelete = () => {
    setOfferToDelete(selectedOffer);
    setDeleteDialogOpen(true);
  };

  const handleAddOffer = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setSelectedOffer(null); // إعادة تعيين العرض المحدد
  };

  const handleEditOffer = (offer) => {
    console.log('🔍 Editing offer:', offer);
    setSelectedOffer(offer);
    setAddDialogOpen(true);
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
          {/* Offers Summary */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Chip 
              label={`Total Offers: ${sortedOffers.length}`} 
              color="primary" 
              variant="outlined"
            />
            <Chip 
              label={`Active Offers: ${sortedOffers.filter(offer => new Date(offer.expiresAt) > new Date()).length}`} 
              color="success" 
              variant="outlined"
            />
            <Chip 
              label={`Expired Offers: ${sortedOffers.filter(offer => new Date(offer.expiresAt) <= new Date()).length}`} 
              color="error" 
              variant="outlined"
            />
          </div>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddOffer}
            style={{ marginLeft: 'auto', marginRight: '10px' }}
          >
            إضافة عرض جديد
          </Button>
        </div>
        
        {/* Offers Section */}
        <Paper sx={{ width: '100%', mt: '20px', ml: '40px', p: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            العروض
          </Typography>
          <OffersTable
            offers={sortedOffers}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onView={handleViewOffer}
            onDelete={handleDeleteFromTable}
            onEdit={handleEditOffer}
          />
        </Paper>

        <OfferDetailsDialog
          open={viewDialogOpen}
          onClose={handleCloseViewDialog}
          offer={selectedOffer}
          onRequestDelete={handleRequestDelete}
        />
        
        <DeleteConfirmation
          open={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false);
            setOfferToDelete(null);
          }}
          onConfirm={async () => {
            if (offerToDelete) {
              await handleDeleteOffer(offerToDelete.id);
            }
            setDeleteDialogOpen(false);
            setOfferToDelete(null);
            setViewDialogOpen(false);
          }}
          title="تأكيد حذف العرض"
          message="هل أنت متأكد من حذف هذا العرض؟"
          itemName={offerToDelete?.title || ''}
        />
        
        <AddMessageDialog
          open={addDialogOpen}
          onClose={handleCloseAddDialog}
          selectedOffer={selectedOffer}
        />
        
      </div>
    </>
  );
} 