import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Box
} from '@mui/material';

export default function ProductForm({ 
  formData, 
  onChange, 
  colors = [], 
  sizes = [] 
}) {
  // Ensure colors and sizes are arrays
  const colorsArray = Array.isArray(colors) ? colors : [];
  const sizesArray = Array.isArray(sizes) ? sizes : [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
      <TextField
        name="name"
        label="Product Name"
        value={formData.name}
        onChange={onChange}
        fullWidth
        required
      />
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={onChange}
        fullWidth
        multiline
        rows={3}
        required
      />
      <TextField
        name="price"
        label="Price"
        type="number"
        value={formData.price}
        onChange={onChange}
        fullWidth
        required
        InputProps={{
          startAdornment: '$'
        }}
      />
      <FormControl fullWidth>
        <InputLabel>Colors</InputLabel>
        <Select
          multiple
          name="colors"
          value={formData.colors}
          onChange={onChange}
          input={<OutlinedInput label="Colors" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((colorId) => {
                const color = colorsArray.find(c => c.id === colorId);
                return color ? (
                  <Chip
                    key={color.id}
                    label={color.name}
                    sx={{
                      backgroundColor: color.hexCode,
                      color: '#fff',
                      '& .MuiChip-label': {
                        textShadow: '0 0 2px rgba(0,0,0,0.5)'
                      }
                    }}
                  />
                ) : null;
              })}
            </Box>
          )}
        >
          {colorsArray.map((color) => (
            <MenuItem key={color.id} value={color.id}>
              {color.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Sizes</InputLabel>
        <Select
          multiple
          name="sizes"
          value={formData.sizes}
          onChange={onChange}
          input={<OutlinedInput label="Sizes" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((sizeId) => {
                const size = sizesArray.find(s => s.id === sizeId);
                return size ? (
                  <Chip
                    key={size.id}
                    label={size.name}
                  />
                ) : null;
              })}
            </Box>
          )}
        >
          {sizesArray.map((size) => (
            <MenuItem key={size.id} value={size.id}>
              {size.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
} 