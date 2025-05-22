import React from 'react';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  IconButton, Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function SizeTable({ 
  sizes, 
  onAdd, 
  onEdit, 
  onDelete 
}) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', marginRight: '30px' }}>
        <h2 className="text-2xl font-semibold">Sizes</h2>
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
          Add Size
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
              <TableCell sx={{ bgcolor: 'white' }}>Size Name</TableCell>
              <TableCell sx={{ bgcolor: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sizes.map((size) => (
              <TableRow hover tabIndex={-1} key={size.id}>
                <TableCell>{size.name}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(size)}
                    size="small"
                    sx={{ borderRadius: '6px' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(size)}
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