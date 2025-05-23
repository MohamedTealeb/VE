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
      return image.startsWith('http') ? image : `${imageBaseUrl}/${image}`;
    }
    if (image instanceof File) return URL.createObjectURL(image);
    if (image.url) return image.url;
    return '';
  };

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
                          <IconButton color="primary" onClick={() => onEdit(category)} size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => onDelete(category)} size="small">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      );
                    }
                    if (column.id === 'image') {
                      const imgSrc = getImageUrl(category.image);
                      return (
                        <TableCell key={column.id} align={column.align || 'left'}>
                          {imgSrc ? (
                            <Box
                              component="img"
                              src={imgSrc}
                              alt={category.name}
                              sx={{
                                width: 50,
                                height: 50,
                                objectFit: 'cover',
                                borderRadius: 1,
                                border: '1px solid #ddd'
                              }}
                              onError={e => {
                                e.target.onerror = null;
                                e.target.src = '/default-image.png';
                              }}
                            />
                          ) : (
                            <Box
                              component="img"
                              src="/default-image.png"
                              alt="No image"
                              sx={{
                                width: 50,
                                height: 50,
                                objectFit: 'cover',
                                borderRadius: 1,
                                border: '1px solid #ddd'
                              }}
                            />
                          )}
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