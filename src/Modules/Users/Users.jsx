
// import * as React from 'react';
// import {
//   Paper, Table, TableBody, TableCell, TableContainer, TableHead,
//   TablePagination, TableRow, Button, Dialog, DialogTitle,
//   DialogContent, TextField, DialogActions, IconButton, Box
// } from '@mui/material';
// import Sidebar from '../../Component/Shared/Sidebar';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ph from '../../assets/WhatsApp Image 2025-05-06 at 12.31.39_3f99cae6.jpg';

// const columns = [
//     { id: 'email', label: 'Email', minWidth: 170 },
//     { id: 'role', label: 'Role', minWidth: 100 },
//     { id: 'createdAt', label: 'Created At', minWidth: 170 },
//     { id: 'actions', label: 'Actions', minWidth: 100 },
//   ];

// export default function Users() {
//   const [rows, setRows] = React.useState([
//     { product: 'India', description: 'IN', Price: 1324171354, Model: 3287263, img: ph, stock: 5 },
//     { product: 'China', description: 'CN', Price: 1403500365, Model: 9596961, img: ph, stock: 10 }
//   ]);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const [dialogOpen, setDialogOpen] = React.useState(false);
//   const [editIndex, setEditIndex] = React.useState(null);
//   const [formData, setFormData] = React.useState({
//     product: '', description: '', Price: '', Model: '', img: ph, stock: ''
//   });

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleOpenDialog = (index = null) => {
//     if (index !== null) {
//       setFormData(rows[index]);
//       setEditIndex(index);
//     } else {
//       setFormData({ product: '', description: '', Price: '', Model: '', img: ph, stock: '' });
//       setEditIndex(null);
//     }
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setFormData({ product: '', description: '', Price: '', Model: '', img: ph, stock: '' });
//     setEditIndex(null);
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     if (editIndex !== null) {
//       const updatedRows = [...rows];
//       updatedRows[editIndex] = formData;
//       setRows(updatedRows);
//     } else {
//       setRows([...rows, formData]);
//     }
//     handleCloseDialog();
//   };

//   const handleDelete = (index) => {
//     const updated = rows.filter((_, i) => i !== index);
//     setRows(updated);
//   };

//   return (
//     <div className="overflow-hidden flex flex-col">
//       <Sidebar />
//       <Paper sx={{ width: '100%', mt: '90px', ml: '40px', p: 2 }}>
//         <Box display="flex"  className='mr-19' justifyContent="flex-end" mb={2}>
//         <Button sx={{ backgroundColor: 'black' }} className='text-white' variant="contained" onClick={() => handleOpenDialog()}>
//   Add Product
// </Button>
//         </Box>

//         <TableContainer sx={{ maxHeight: 600 }}>
//           <Table stickyHeader size="small" aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell key={column.id} align={column.align || 'left'}>
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
//                 <TableRow hover tabIndex={-1} key={index}>
//                   {columns.map((column) => {
//                     if (column.id === 'actions') {
//                       return (
//                         <TableCell key={column.id}>
//                           <IconButton color="primary" onClick={() => handleOpenDialog(index)} size="small">
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton color="error" onClick={() => handleDelete(index)} size="small">
//                             <DeleteIcon />
//                           </IconButton>
//                         </TableCell>
//                       );
//                     }

//                     const value = row[column.id];
//                     return (
//                       <TableCell key={column.id} align={column.align || 'left'}>
//                         {column.id === 'img' ? (
//                           <img src={value} alt={row.product} style={{ width: 40, height: 40, borderRadius: 4 }} />
//                         ) : column.format && typeof value === 'number' ? (
//                           column.format(value)
//                         ) : (
//                           value
//                         )}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>

//       <Dialog open={dialogOpen} onClose={handleCloseDialog}>
//         <DialogTitle>{editIndex !== null ? 'Edit Product' : 'Add Product'}</DialogTitle>
//         <DialogContent>
//           {['product', 'description', 'Price', 'Model', 'stock'].map((field) => (
//             <TextField
//               key={field}
//               margin="dense"
//               name={field}
//               label={field.charAt(0).toUpperCase() + field.slice(1)}
//               type={field === 'Price' || field === 'Model' || field === 'stock' ? 'number' : 'text'}
//               fullWidth
//               value={formData[field]}
//               onChange={handleFormChange}
//               variant="outlined"
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button sx={{color:'black'}} onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleSave}  sx={{ backgroundColor: 'black' }} className='text-white'  variant="contained">Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
import * as React from 'react';
import {
  Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TablePagination, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, IconButton, Box
} from '@mui/material';
import Sidebar from '../../Component/Shared/Sidebar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 100 },
  { id: 'createdAt', label: 'Created At', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 100 },
];

export default function Users() {
  const [rows, setRows] = React.useState([
    { email: 'user1@example.com', role: 'Admin', createdAt: '2025-05-01' },
    { email: 'user2@example.com', role: 'User', createdAt: '2025-05-02' },
  ]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(null);
  const [formData, setFormData] = React.useState({
    email: '',
    role: '',
    createdAt: '',
  });

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      setFormData(rows[index]);
      setEditIndex(index);
    } else {
      setFormData({ email: '', role: '', createdAt: '' });
      setEditIndex(null);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({ email: '', role: '', createdAt: '' });
    setEditIndex(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedRows = [...rows];
      updatedRows[editIndex] = formData;
      setRows(updatedRows);
    } else {
      setRows([...rows, formData]);
    }
    handleCloseDialog();
  };

  const handleDelete = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  return (
    <div className="overflow-hidden flex flex-col">
      <Sidebar />
      <Paper sx={{ width: '100%', mt: '90px', ml: '40px', p: 2 }}>
        <Box display="flex" className="mr-19" justifyContent="flex-end" mb={2}>
          <Button
            sx={{ backgroundColor: 'black' }}
            className="text-white"
            variant="contained"
            onClick={() => handleOpenDialog()}
          >
            Add User
          </Button>
        </Box>

        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader size="small" aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align || 'left'}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      if (column.id === 'actions') {
                        return (
                          <TableCell key={column.id}>
                            <IconButton
                              color="primary"
                              onClick={() => handleOpenDialog(index)}
                              size="small"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(index)}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        );
                      }
                      const value = row[column.id];
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editIndex !== null ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          {['email', 'role', 'createdAt'].map((field) => (
            <TextField
              key={field}
              margin="dense"
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type={field === 'createdAt' ? 'date' : 'text'}
              fullWidth
              value={formData[field]}
              onChange={handleFormChange}
              variant="outlined"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'black' }} onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            sx={{ backgroundColor: 'black' }}
            className="text-white"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}