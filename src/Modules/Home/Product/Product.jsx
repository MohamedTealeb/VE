import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Sidebar from '../../../Component/Shared/Sidebar';
import ph from '../../../assets/WhatsApp Image 2025-05-06 at 12.31.39_3f99cae6.jpg';

const columns = [
  { id: 'product', label: 'Product', minWidth:50 },
  { id: 'description', label: 'Description', minWidth: 50 },
  {
    id: 'Price',
    label: 'Price',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Model',
    label: 'Model',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'img',
    label: 'Image',
   
  },
  {
    id: 'stock',
    label: 'Stock',
   
  },
];

function createData(product, description, Price, Model, img,stock) {
  return { product, description, Price, Model, img,stock };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263, ph,5),
  createData('China', 'CN', 1403500365, 9596961, ph,10),
  createData('Italy', 'IT', 60483973, 301340, ph),
  createData('United States', 'US', 327167434, 9833520, ph),
  createData('Canada', 'CA', 37602103, 9984670, ph),
  createData('Australia', 'AU', 25475400, 7692024, ph),
  createData('Germany', 'DE', 83019200, 357578, ph),
  createData('Ireland', 'IE', 4857000, 70273, ph),
  createData('Mexico', 'MX', 126577691, 1972550, ph),
  createData('Japan', 'JP', 126317000, 377973, ph),
  createData('France', 'FR', 67022000, 640679, ph),
  createData('United Kingdom', 'GB', 67545757, 242495, ph),
  createData('Russia', 'RU', 146793744, 17098246, ph),
  createData('Nigeria', 'NG', 200962417, 923768, ph),
  createData('Brazil', 'BR', 210147125, 8515767, ph),
  createData('India', 'IN', 1324171354, 3287263, ph,5),
  createData('China', 'CN', 1403500365, 9596961, ph,10),
  createData('Italy', 'IT', 60483973, 301340, ph),
  createData('United States', 'US', 327167434, 9833520, ph),
  createData('Canada', 'CA', 37602103, 9984670, ph),
  createData('Australia', 'AU', 25475400, 7692024, ph),
  createData('Germany', 'DE', 83019200, 357578, ph),
  createData('Ireland', 'IE', 4857000, 70273, ph),
  createData('Mexico', 'MX', 126577691, 1972550, ph),
  createData('Japan', 'JP', 126317000, 377973, ph),
  createData('France', 'FR', 67022000, 640679, ph),
  createData('United Kingdom', 'GB', 67545757, 242495, ph),
  createData('Russia', 'RU', 146793744, 17098246, ph),
  createData('Nigeria', 'NG', 200962417, 923768, ph),
  createData('Brazil', 'BR', 210147125, 8515767, ph),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className='overflow-auto flex flex-col'>
      <Sidebar />
      <Paper sx={{ width: '100%', marginTop: '90px', marginLeft: '90px' }}>
        <TableContainer sx={{ maxHeight: 500,  }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowIndex) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'img' ? (
                            <img
                              src={value}
                              alt={row.product}
                              style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                            />
                          ) : column.format && typeof value === 'number' ? (
                            column.format(value)
                          ) : (
                            value
                          )}
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
    </div>
  );
}
