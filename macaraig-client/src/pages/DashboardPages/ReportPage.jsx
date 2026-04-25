import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

const monthlyData = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  revenue: [4000, 3000, 5000, 4500, 6000, 5200],
  expenses: [2400, 2100, 3200, 2800, 3600, 3000],
};

const categoryData = [
  { id: 0, value: 35, label: 'Electronics', color: '#ea580c' },
  { id: 1, value: 25, label: 'Clothing', color: '#fff' },
  { id: 2, value: 20, label: 'Food', color: '#71717a' },
  { id: 3, value: 15, label: 'Books', color: '#3f3f46' },
  { id: 4, value: 5, label: 'Other', color: '#52525b' },
];

const quarterlyBarData = {
  quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
  sales: [12000, 18500, 15300, 21000],
  returns: [800, 1200, 950, 1500],
};

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

const chartAxisSx = {
  '& .MuiChartsAxis-tickLabel': { fill: '#71717a' },
  '& .MuiChartsAxis-label': { fill: '#71717a' },
  '& .MuiChartsLegend-label': { fill: '#fff' },
};

function ReportPage() {
  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#fff', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase' }}>
        Reports <span style={{ color: '#ea580c' }}>Analytics</span>
      </Typography>

      <Typography variant="body1" sx={{ color: '#71717a', mb: 4 }}>
        Data visualization and analytics overview.
      </Typography>

      {/* Summary Cards */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography sx={labelSx}>Total Revenue</Typography>
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 900 }}>₱27,700</Typography>
          </CardContent>
        </Card>
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography sx={labelSx}>Total Expenses</Typography>
            <Typography variant="h5" sx={{ color: '#fff', fontWeight: 900 }}>₱17,100</Typography>
          </CardContent>
        </Card>
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography sx={labelSx}>Net Profit</Typography>
            <Typography variant="h5" sx={{ color: '#ea580c', fontWeight: 900 }}>₱10,600</Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* Line Chart */}
      <Card sx={{ ...cardSx, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
            Revenue vs Expenses <span style={{ color: '#ea580c' }}>(Monthly)</span>
          </Typography>
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <LineChart
              xAxis={[{ data: monthlyData.months, scaleType: 'point', label: 'Month' }]}
              series={[
                { data: monthlyData.revenue, label: 'Revenue', color: '#ea580c' },
                { data: monthlyData.expenses, label: 'Expenses', color: '#71717a' },
              ]}
              height={300}
              sx={chartAxisSx}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Bar + Pie */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
              Quarterly <span style={{ color: '#ea580c' }}>Sales vs Returns</span>
            </Typography>
            <BarChart
              xAxis={[{ data: quarterlyBarData.quarters, scaleType: 'band', label: 'Quarter' }]}
              series={[
                { data: quarterlyBarData.sales, label: 'Sales', color: '#ea580c' },
                { data: quarterlyBarData.returns, label: 'Returns', color: '#71717a' },
              ]}
              height={280}
              sx={chartAxisSx}
            />
          </CardContent>
        </Card>

        <Card sx={{ ...cardSx, flex: 1 }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
              Sales by <span style={{ color: '#ea580c' }}>Category</span>
            </Typography>
            <Box display="flex" justifyContent="center">
              <PieChart
                series={[{ data: categoryData, innerRadius: 50 }]}
                width={320}
                height={260}
                sx={{ '& .MuiChartsLegend-label': { fill: '#fff' } }}
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export default ReportPage;