import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import ProductForm from './ProductForm';

export default function ProductDialog({ 
  open, 
  onClose, 
  onSave, 
  product = null,
  colors = [],
  sizes = []
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    colors: [],
    sizes: []
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        colors: product.colors || [],
        sizes: product.sizes || []
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        colors: [],
        sizes: []
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {product ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <ProductForm
            formData={formData}
            onChange={handleChange}
            colors={colors}
            sizes={sizes}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            style={{ 
              backgroundColor: 'black',
              borderRadius: '8px'
            }}
          >
            {product ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 