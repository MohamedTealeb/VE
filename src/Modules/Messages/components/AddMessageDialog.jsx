import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createNewOffer, fetchOffers, updateExistingOffer } from '../../../redux/slice/OffersSlice/Offers';
import { createNewMessage } from '../../../redux/slice/MessagesSlice/Messages';
import toast from 'react-hot-toast';

export default function AddOfferDialog({
  open,
  onClose,
  selectedOffer = null
}) {
  const dispatch = useDispatch();
  const messagesList = useSelector(state => state.messages.messages);
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    discount: '',
    productId: '',
    messageId: '',
    expiresAt: ''
  });
  const [loading, setLoading] = React.useState(false);

  // تعبئة البيانات عند فتح النموذج للتعديل
  React.useEffect(() => {
    console.log('🔍 AddOfferDialog: useEffect triggered', { selectedOffer, open });
    
    if (selectedOffer && open) {
      console.log('🔍 AddOfferDialog: Filling form with selected offer data:', selectedOffer);
      
      // تنسيق التاريخ للـ datetime-local input
      const expiresAtDate = new Date(selectedOffer.expiresAt);
      const formattedDate = expiresAtDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
      
      const formDataToSet = {
        title: selectedOffer.title || '',
        description: selectedOffer.description || '',
        discount: selectedOffer.discount?.toString() || '',
        productId: selectedOffer.productId?.toString() || '',
        messageId: selectedOffer.messageId?.toString() || '',
        expiresAt: formattedDate
      };
      
      console.log('🔍 AddOfferDialog: Setting form data:', formDataToSet);
      setFormData(formDataToSet);
    } else if (!selectedOffer && open) {
      console.log('🔍 AddOfferDialog: Resetting form for new offer');
      // إعادة تعيين النموذج عند إضافة عرض جديد
      setFormData({
        title: '',
        description: '',
        discount: '',
        productId: '',
        messageId: '',
        expiresAt: ''
      });
    }
  }, [selectedOffer, open]);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.title.trim()) {
      toast.error('العنوان مطلوب');
      return;
    }
    if (!formData.discount || isNaN(formData.discount)) {
      toast.error('نسبة الخصم مطلوبة ويجب أن تكون رقم');
      return;
    }
    if (!formData.productId || isNaN(formData.productId) || Number(formData.productId) <= 0) {
      toast.error('رقم المنتج مطلوب ويجب أن يكون رقم أكبر من 0');
      return;
    }
    if (!formData.expiresAt) {
      toast.error('تاريخ انتهاء العرض مطلوب');
      return;
    }

    try {
      setLoading(true);
      
      // تنسيق التاريخ ليكون في الشكل المطلوب
      const expiresAtDate = new Date(formData.expiresAt);
      const formattedExpiresAt = expiresAtDate.toISOString();
      
      const offerData = {
        title: formData.title.trim(),
        description: formData.description.trim() || "",
        discount: Number(formData.discount),
        productId: Number(formData.productId),
        messageId: formData.messageId ? Number(formData.messageId) : 0,
        expiresAt: formattedExpiresAt
      };
      
      // تحقق إضافي من productId
      if (!offerData.productId || offerData.productId <= 0) {
        toast.error('رقم المنتج غير صحيح');
        return;
      }
      
      // تحقق من جميع الحقول المطلوبة
      console.log('Validation check:', {
        hasTitle: !!offerData.title,
        hasDescription: !!offerData.description,
        hasDiscount: !!offerData.discount && offerData.discount > 0,
        hasProductId: !!offerData.productId && offerData.productId > 0,
        hasExpiresAt: !!offerData.expiresAt,
        titleLength: offerData.title.length,
        descriptionLength: offerData.description.length
      });
      
      console.log('Sending offer data:', offerData);
      console.log('Data type check:', {
        title: typeof offerData.title,
        description: typeof offerData.description,
        discount: typeof offerData.discount,
        productId: typeof offerData.productId,
        messageId: typeof offerData.messageId,
        expiresAt: typeof offerData.expiresAt
      });
      
      // تحقق إضافي من البيانات
      console.log('Final validation:', {
        hasTitle: !!offerData.title && offerData.title.length > 0,
        hasDiscount: !!offerData.discount && offerData.discount > 0,
        hasProductId: !!offerData.productId && offerData.productId > 0,
        hasExpiresAt: !!offerData.expiresAt,
        titleLength: offerData.title.length,
        discountValue: offerData.discount,
        productIdValue: offerData.productId,
        expiresAtValue: offerData.expiresAt
      });
      
      if (selectedOffer) {
        // تحديث عرض موجود
        console.log('Updating existing offer with ID:', selectedOffer.id);
        await dispatch(updateExistingOffer({ 
          offerId: selectedOffer.id, 
          offerData: offerData 
        })).unwrap();
        toast.success('تم تحديث العرض بنجاح');
      } else {
        // إضافة عرض جديد
        console.log('Creating new offer');
        await dispatch(createNewOffer(offerData)).unwrap();
        toast.success('تم إضافة العرض بنجاح');
      }
      
      dispatch(fetchOffers()); // تحديث القائمة
      handleClose();
    } catch (error) {
      console.error('Create/Update offer error:', error);
      console.error('Error details:', {
        message: error?.message,
        response: error?.response,
        responseData: error?.response?.data,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        stack: error?.stack
      });
      
      // طباعة تفاصيل أكثر
      console.error('Full error object:', JSON.stringify(error, null, 2));
      console.error('Error type:', typeof error);
      console.error('Error constructor:', error?.constructor?.name);
      
      let errorMessage = 'فشل في إضافة/تحديث العرض';
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error?.payload?.message) {
        errorMessage = error.payload.message;
      }
      
      console.error('Final error message:', errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ title: '', description: '', discount: '', productId: '', messageId: '', expiresAt: '' });
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {selectedOffer ? 'تعديل العرض' : 'إضافة عرض جديد'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="العنوان"
            value={formData.title}
            onChange={handleInputChange('title')}
            placeholder="عنوان العرض"
            fullWidth
            required
          />
          <TextField
            label="الوصف"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleInputChange('description')}
            placeholder="وصف العرض"
            fullWidth
          />
          <TextField
            label="نسبة الخصم (%)"
            type="number"
            value={formData.discount}
            onChange={handleInputChange('discount')}
            placeholder="مثال: 10"
            fullWidth
            required
          />
          <TextField
            label="رقم المنتج (Product ID) *"
            type="number"
            value={formData.productId}
            onChange={handleInputChange('productId')}
            placeholder="أدخل رقم المنتج المرتبط بالعرض"
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel id="message-select-label">اختر الرسالة المرتبطة (اختياري)</InputLabel>
            <Select
              labelId="message-select-label"
              value={formData.messageId}
              label="اختر الرسالة المرتبطة (اختياري)"
              onChange={handleInputChange('messageId')}
              displayEmpty
            >
              <MenuItem value="">
                <em>بدون رسالة</em>
              </MenuItem>
              {Array.isArray(messagesList) && messagesList.length > 0 ? (
                (() => {
                  const simpleMessages = messagesList.filter(msg => !msg.title && !msg.discount && !msg.expiresAt);
                  if (simpleMessages.length === 0) {
                    return (
                      <MenuItem value="" disabled>
                        لا توجد رسائل بسيطة متاحة. أضف رسائل أولاً من صفحة الرسائل.
                      </MenuItem>
                    );
                  }
                  return simpleMessages.map((msg) => (
                    <MenuItem key={msg.id} value={msg.id}>
                      {msg.content ? 
                        `${msg.content.substring(0, 50)}${msg.content.length > 50 ? '...' : ''}` : 
                        `رسالة رقم ${msg.id}`
                      }
                    </MenuItem>
                  ));
                })()
              ) : (
                <MenuItem value="" disabled>
                  لا توجد رسائل متاحة
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            label="تاريخ انتهاء العرض"
            type="datetime-local"
            value={formData.expiresAt}
            onChange={handleInputChange('expiresAt')}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={loading}>
          إلغاء
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          disabled={loading}
        >
          {loading ? 'جاري الحفظ...' : (selectedOffer ? 'تحديث العرض' : 'إضافة العرض')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Component for adding simple messages
export function AddSimpleMessageDialog({
  open,
  onClose
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    content: '',
    productId: ''
  });
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.content.trim()) {
      toast.error('محتوى الرسالة مطلوب');
      return;
    }

    try {
      setLoading(true);
      
      const messageData = {
        content: formData.content.trim(),
        productId: formData.productId ? Number(formData.productId) : 0,
        messageId: 0 // إرسال messageId كرقم 0
      };
      
      console.log('Sending message data:', messageData);
      
      await dispatch(createNewMessage(messageData)).unwrap();
      toast.success('تم إضافة الرسالة بنجاح');
      setFormData({ content: '', productId: '' });
      onClose();
    } catch (error) {
      console.error('Create message error:', error);
      const errorMessage = error?.response?.data?.message || error?.message || 'فشل في إضافة الرسالة';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ content: '', productId: '' });
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
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
          <TextField
            label="رقم المنتج (اختياري)"
            type="number"
            value={formData.productId}
            onChange={handleInputChange('productId')}
            placeholder="اترك فارغ أو أدخل رقم المنتج"
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={loading}>
          إلغاء
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          disabled={loading}
        >
          {loading ? 'جاري الإضافة...' : 'إضافة الرسالة'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 