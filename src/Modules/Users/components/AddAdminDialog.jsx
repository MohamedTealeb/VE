import * as React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Box
} from '@mui/material';

export default function AddAdminDialog({
  open,
  onClose,
  formData,
  onChange,
  onSubmit,
  loading,
  isMobile
}) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ 
        p: { xs: 2, sm: 3 },
        pb: { xs: 1, sm: 2 }
      }}>
        Add New Admin
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogContent sx={{ 
          p: { xs: 2, sm: 3 },
          pt: { xs: 1, sm: 2 }
        }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2, sm: 3 }
          }}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
              required
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
              required
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              required
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChange}
              required
              size={isMobile ? "small" : "medium"}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={onChange}
              required
              size={isMobile ? "small" : "medium"}
            />
          </Box>
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
            type="submit" 
            variant="contained" 
            disabled={loading}
            size={isMobile ? "small" : "medium"}
          >
            {loading ? 'Adding...' : 'Add Admin'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 