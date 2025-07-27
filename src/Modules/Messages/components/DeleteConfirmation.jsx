import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

export default function DeleteConfirmation({
  open,
  onClose,
  onConfirm,
  title = "تأكيد الحذف",
  message = "هل أنت متأكد من حذف هذا العنصر؟",
  itemName = ""
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" />
        {title}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body1">
            {message}
          </Typography>
          {itemName && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
              العنصر: {itemName}
            </Typography>
          )}
          <Typography variant="body2" color="error" sx={{ mt: 2, fontWeight: 'bold' }}>
            ⚠️ هذا الإجراء لا يمكن التراجع عنه!
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          إلغاء
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
} 