import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, DialogContentText, Box
} from '@mui/material';

export default function DeleteConfirmation({
  open,
  onClose,
  onConfirm,
  userName,
  isMobile
}) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ 
        p: { xs: 2, sm: 3 },
        pb: { xs: 1, sm: 2 }
      }}>
        Confirm Delete
      </DialogTitle>
      <DialogContent sx={{ 
        p: { xs: 2, sm: 3 },
        pt: { xs: 1, sm: 2 }
      }}>
        <DialogContentText>
          Are you sure you want to delete user "{userName}"? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ 
        p: { xs: 2, sm: 3 },
        pt: { xs: 1, sm: 2 }
      }}>
        <Button 
          onClick={onClose}
          size={isMobile ? "small" : "medium"}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained"
          size={isMobile ? "small" : "medium"}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
} 