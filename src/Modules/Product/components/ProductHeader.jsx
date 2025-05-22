import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function ProductHeader({ onAdd }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', marginRight: '30px' }}>
      <h2 className="text-2xl font-semibold">Products</h2>
      <Button
        variant="contained"
        style={{ 
          marginRight: '30px', 
          backgroundColor: 'black',
          borderRadius: '8px'
        }}
        startIcon={<AddIcon />}
        onClick={onAdd}
      >
        Add Product
      </Button>
    </div>
  );
} 