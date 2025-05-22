import React from 'react';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  IconButton, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function ColorTable({ 
  colors = [], 
  onAdd, 
  onEdit, 
  onDelete 
}) {
  // Ensure colors is an array
  const colorsArray = Array.isArray(colors) ? colors : [];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', marginRight: '30px' }}>
        <h2 className="text-2xl font-semibold">Colors</h2>
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
          Add Color
        </Button>
      </div>

      <TableContainer sx={{ 
        maxHeight: 600,
        overflowX: 'auto',
        bgcolor: 'white',
        borderRadius: '8px'
      }}>
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: 'white' }}>Color Name</TableCell>
              <TableCell sx={{ bgcolor: 'white' }}>Color</TableCell>
              <TableCell sx={{ bgcolor: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colorsArray.map((color) => (
              <TableRow hover tabIndex={-1} key={color.id}>
                <TableCell>{color.name}</TableCell>
                <TableCell>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: color.hexCode,
                      borderRadius: '4px'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(color)}
                    size="small"
                    sx={{ borderRadius: '6px' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(color)}
                    size="small"
                    sx={{ borderRadius: '6px' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
} 