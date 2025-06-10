import * as React from 'react';
import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TablePagination, IconButton, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'image', label: 'Image', minWidth: 200 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function CategoryTable({
  categories,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  imageBaseUrl
}) {
  const getImageUrl = (image) => {
    if (!image) return '';
    if (typeof image === 'string') {
      return image.startsWith('http') ? image : `${imageBaseUrl}${image.startsWith('/') ? '' : '/'}${image}`;
    }
    if (image instanceof File) return URL.createObjectURL(image);
    if (image.url) return image.url;
    return '';
  };

  // Cleanup image URLs when component unmounts
  React.useEffect(() => {
    return () => {
      categories.forEach(category => {
        if (category.image instanceof File) {
          URL.revokeObjectURL(URL.createObjectURL(category.image));
        }
      });
    };
  }, [categories]);

  return (
    <>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align || 'left'}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(category => (
                <TableRow hover tabIndex={-1} key={category.id}>
                  {columns.map(column => {
                    if (column.id === 'actions') {
                      return (
                        <TableCell key={column.id}>
                          <IconButton 
                            color="primary" 
                            onClick={() => onEdit(category)} 
                            size="small"
                            aria-label={`Edit ${category.name}`}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            color="error" 
                            onClick={() => onDelete(category)} 
                            size="small"
                            aria-label={`Delete ${category.name}`}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      );
                    }
                    if (column.id === 'image') {
                      const imgSrc = getImageUrl(category.image);
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          <Box
                            component="img"
                            src={imgSrc || '/default-image.png'}
                            alt={category.name}
                            sx={{
                              width: 50,
                              height: 50,
                              objectFit: 'cover',
                              borderRadius: 1,
                              border: '1px solid #ddd',
                              display: 'block'
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/default-image.png';
                            }}
                          />
                        </TableCell>
                      );
                    }
                    const value = category[column.id];
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </>
  );
} 