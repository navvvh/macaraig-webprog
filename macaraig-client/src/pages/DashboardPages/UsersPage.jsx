import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { DataGrid } from '@mui/x-data-grid';

const users = [
  { id: 1, firstName: 'Jon', lastName: 'Snow', age: 14, email: 'jon.snow@mail.com', role: 'Viewer', status: 'Active' },
  { id: 2, firstName: 'Cersei', lastName: 'Lannister', age: 31, email: 'cersei.l@mail.com', role: 'Admin', status: 'Active' },
  { id: 3, firstName: 'Jaime', lastName: 'Lannister', age: 31, email: 'jaime.l@mail.com', role: 'Editor', status: 'Inactive' },
  { id: 4, firstName: 'Arya', lastName: 'Stark', age: 11, email: 'arya.stark@mail.com', role: 'Viewer', status: 'Active' },
  { id: 5, firstName: 'Daenerys', lastName: 'Targaryen', age: null, email: 'dany.t@mail.com', role: 'Admin', status: 'Active' },
  { id: 6, firstName: null, lastName: 'Melisandre', age: 150, email: 'mel@mail.com', role: 'Editor', status: 'Inactive' },
  { id: 7, firstName: 'Ferrara', lastName: 'Clifford', age: 44, email: 'ferrara.c@mail.com', role: 'Viewer', status: 'Active' },
  { id: 8, firstName: 'Rossini', lastName: 'Frances', age: 36, email: 'rossini.f@mail.com', role: 'Editor', status: 'Active' },
  { id: 9, firstName: 'Harvey', lastName: 'Roxie', age: 65, email: 'harvey.r@mail.com', role: 'Viewer', status: 'Inactive' },
];

const columns = [
  {
    field: 'avatar',
    headerName: '',
    width: 60,
    sortable: false,
    renderCell: (params) => (
      <Avatar sx={{ width: 32, height: 32, fontSize: 14, bgcolor: '#ea580c', color: '#fff' }}>
        {(params.row.firstName?.[0] || params.row.lastName?.[0] || '?').toUpperCase()}
      </Avatar>
    ),
  },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'email', headerName: 'Email', width: 200 },
  {
    field: 'role',
    headerName: 'Role',
    width: 120,
    renderCell: (params) => {
      const colors = { Admin: '#ea580c', Editor: '#fff', Viewer: '#71717a' };
      return (
        <Chip
          label={params.value}
          size="small"
          sx={{
            backgroundColor: 'transparent',
            border: `1px solid ${colors[params.value]}`,
            color: colors[params.value],
            fontWeight: 700,
            fontSize: '0.7rem',
          }}
        />
      );
    },
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        sx={{
          backgroundColor: params.value === 'Active' ? '#ea580c' : 'transparent',
          border: params.value === 'Active' ? 'none' : '1px solid #27272a',
          color: params.value === 'Active' ? '#fff' : '#71717a',
          fontWeight: 700,
          fontSize: '0.7rem',
        }}
      />
    ),
  },
];

const totalUsers = users.length;
const activeUsers = users.filter((u) => u.status === 'Active').length;
const adminCount = users.filter((u) => u.role === 'Admin').length;

const cardSx = {
  backgroundColor: '#000',
  border: '2px solid #27272a',
  borderRadius: 2,
  transition: 'border-color 0.2s',
  '&:hover': { borderColor: '#ea580c' },
};

const labelSx = {
  color: '#71717a',
  textTransform: 'uppercase',
  fontSize: '0.7rem',
  letterSpacing: '0.2em',
  fontWeight: 700,
};

const gridSx = {
  backgroundColor: '#000',
  color: '#fff',
  border: '2px solid #27272a',
  '& .MuiDataGrid-columnHeaders': { backgroundColor: '#18181b' },
  '& .MuiDataGrid-columnHeaderTitle': { color: '#fff' },
  '& .MuiDataGrid-cell': { color: '#fff', borderColor: '#27272a' },
  '& .MuiDataGrid-footerContainer': { backgroundColor: '#18181b' },
  '& .MuiTablePagination-root': { color: '#fff' },
  '& .MuiTablePagination-selectIcon': { color: '#fff' },
  '& .MuiDataGrid-row:hover': { backgroundColor: '#18181b' },
  '& .MuiCheckbox-root': { color: '#ea580c' },
  '& .MuiDataGrid-row.Mui-selected': { backgroundColor: '#1a0800' },
  '& .MuiIconButton-root': { color: '#fff' },
};

function UsersPage() {
  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
        Users <span style={{ color: '#ea580c' }}>Management</span>
      </Typography>

      <Typography variant="body1" sx={{ color: '#71717a', mb: 4 }}>
        Manage and review user accounts and roles.
      </Typography>

      {/* Summary Cards */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography sx={labelSx}>Total Users</Typography>
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 900 }}>{totalUsers}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography sx={labelSx}>Active Users</Typography>
            <Typography variant="h5" sx={{ color: '#ea580c', fontWeight: 900 }}>{activeUsers}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography sx={labelSx}>Admins</Typography>
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 900 }}>{adminCount}</Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* DataGrid */}
      <Box sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 9 } } }}
          pageSizeOptions={[5, 9]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={gridSx}
        />
      </Box>
    </Box>
  );
}

export default UsersPage;