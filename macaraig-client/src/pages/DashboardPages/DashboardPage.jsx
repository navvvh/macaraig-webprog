import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Gauge } from '@mui/x-charts/Gauge';
import { Typography, CardContent, Card } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const validAgeRows = rows.filter((row) => row.age !== null);
const averageAge = (
  validAgeRows.reduce((sum, row) => sum + row.age, 0) / validAgeRows.length
).toFixed(1);

const cardSx = {
  backgroundColor: '#000',
  border: '2px solid #27272a',
  color: '#fff',
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

const chartAxisSx = {
  '& .MuiChartsAxis-tickLabel': { fill: '#71717a' },
  '& .MuiChartsAxis-label': { fill: '#71717a' },
  '& .MuiChartsLegend-label': { fill: '#fff' },
};

function DashboardPage() {
  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
        Dashboard <span style={{ color: '#ea580c' }}>Overview</span>
      </Typography>

     
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <Card sx={cardSx}>
          <CardContent>
            <Typography sx={labelSx}>Total Users</Typography>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 900 }}>{rows.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={cardSx}>
          <CardContent>
            <Typography sx={labelSx}>Average Age</Typography>
            <Typography variant="h4" sx={{ color: '#ea580c', fontWeight: 900 }}>{averageAge}</Typography>
          </CardContent>
        </Card>
      </Stack>

     
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Gauge width={100} height={100} value={50} />
        <Gauge width={100} height={100} value={35} valueMin={10} valueMax={60} />
      </Stack>

      
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>Quarterly Sales</Typography>
            <BarChart
              series={[
                { data: [35, 44, 24, 34], label: 'Series 1', color: '#ea580c' },
                { data: [51, 6, 49, 30], label: 'Series 2', color: '#71717a' },
              ]}
              height={290}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
              sx={chartAxisSx}
            />
          </CardContent>
        </Card>

        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>Distribution</Typography>
            <PieChart
              series={[{
                data: [
                  { id: 0, value: 10, label: 'Series A', color: '#ea580c' },
                  { id: 1, value: 15, label: 'Series B', color: '#fff' },
                  { id: 2, value: 20, label: 'Series C', color: '#71717a' },
                ],
              }]}
              width={300}
              height={200}
              sx={{ '& .MuiChartsLegend-label': { fill: '#fff' } }}
            />
          </CardContent>
        </Card>
      </Stack>

      
      <Typography variant="h5" gutterBottom sx={{ color: '#fff', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
        Users <span style={{ color: '#ea580c' }}>Overview</span>
      </Typography>
      <Box sx={{ height: 400, width: '100%', mb: 4 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={gridSx}
        />
      </Box>

      
      <Typography variant="h5" gutterBottom sx={{ color: '#fff', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
        Location <span style={{ color: '#ea580c' }}>Map</span>
      </Typography>
      <Box sx={{ height: 500, width: '100%', border: '2px solid #27272a', borderRadius: 2, overflow: 'hidden' }}>
        <MapContainer center={[14.640253, 120.994314]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[14.640253, 120.994314]}>
            <Popup>National University-Manila <br /> #551 F Jhohson St, Sampaloc, Manila</Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  );
}

export default DashboardPage;