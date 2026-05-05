import { useRef } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const orangeBlackTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FF6B00',
            light: '#FF8C33',
            dark: '#CC5500',
            contrastText: '#fff',
        },
        background: {
            default: '#0A0A0A',
            paper: '#1A1A1A',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#AAAAAA',
        },
        divider: '#2A2A2A',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #2A2A2A',
                    backgroundImage: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    background: 'linear-gradient(135deg, #FF6B00, #CC5500)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #FF8C33, #FF6B00)',
                    },
                },
                outlinedPrimary: {
                    borderColor: '#FF6B00',
                    color: '#FF6B00',
                    '&:hover': {
                        borderColor: '#FF8C33',
                        backgroundColor: 'rgba(255, 107, 0, 0.08)',
                    },
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: '1px solid #2A2A2A',
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#FF6B00',
                        color: '#fff',
                        fontWeight: 700,
                    },
                    '& .MuiDataGrid-columnHeader svg': {
                        color: '#fff',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(255, 107, 0, 0.08)',
                    },
                    '& .MuiDataGrid-cell': {
                        borderColor: '#2A2A2A',
                        outline: 'none',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderColor: '#2A2A2A',
                        backgroundColor: '#111',
                    },
                },
            },
        },
    },
});

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150, editable: true },
    { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
    { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
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

const ReportsPage = () => {
    const printRef = useRef(null);

    const handlePrint = () => {
        const printContent = printRef.current;
        if (!printContent) return;

        const printWindow = window.open('', '_blank', 'width=1200,height=900');
        if (!printWindow) return;

        const headMarkup = Array.from(
            document.querySelectorAll('style, link[rel="stylesheet"]')
        )
            .map((node) => node.outerHTML)
            .join('');

        const exportedAt = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(new Date());

        printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Print Report</title>
                    ${headMarkup}
                    <style>
                        @page {
                            size: A4;
                            margin: 16mm;
                        }
                        * {
                            box-sizing: border-box;
                        }
                        body {
                            margin: 0;
                            font-family: Arial, Helvetica, sans-serif;
                            background: #0A0A0A;
                            color: #FFFFFF;
                        }
                        .report-shell {
                            padding: 28px;
                            background: #0A0A0A;
                        }
                        .report-header {
                            margin-bottom: 24px;
                            padding-bottom: 14px;
                            border-bottom: 3px solid #FF6B00;
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-end;
                        }
                        .report-header h1 {
                            margin: 0 0 6px;
                            font-size: 28px;
                            font-weight: 700;
                            color: #FF6B00;
                        }
                        .report-header p {
                            margin: 0;
                            font-size: 13px;
                            color: #AAAAAA;
                            line-height: 1.5;
                        }
                        .report-badge {
                            background: #FF6B00;
                            color: #fff;
                            padding: 4px 14px;
                            border-radius: 20px;
                            font-size: 12px;
                            font-weight: 700;
                            white-space: nowrap;
                        }
                        .report-content .MuiCard-root {
                            box-shadow: none !important;
                            border: 1px solid #2A2A2A !important;
                            background: #1A1A1A !important;
                            break-inside: avoid;
                            page-break-inside: avoid;
                            margin-bottom: 16px;
                        }
                        .report-content .MuiCardContent-root {
                            padding: 20px;
                        }
                        .report-content svg {
                            max-width: 100%;
                        }
                        .report-content .MuiTypography-h6 {
                            color: #FF6B00 !important;
                        }
                        .report-footer {
                            margin-top: 32px;
                            padding-top: 12px;
                            border-top: 1px solid #2A2A2A;
                            font-size: 11px;
                            color: #555;
                            display: flex;
                            justify-content: space-between;
                        }
                    </style>
                </head>
                <body>
                    <main class="report-shell">
                        <header class="report-header">
                            <div>
                                <h1>Reports Summary</h1>
                                <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
                                <p>Prepared on ${exportedAt}</p>
                            </div>
                            <div class="report-badge">OFFICIAL REPORT</div>
                        </header>
                        <section class="report-content">
                            ${printContent.outerHTML}
                        </section>
                        <footer class="report-footer">
                            <span>Generated by the Reports Module</span>
                            <span>${exportedAt}</span>
                        </footer>
                    </main>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    return (
        <ThemeProvider theme={orangeBlackTheme}>
            <Box sx={{ width: '100%', minWidth: 0, bgcolor: 'background.default', minHeight: '100vh', p: 2 }}>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                    spacing={2}
                    sx={{
                        mb: 4,
                        pb: 2,
                        borderBottom: '2px solid #FF6B00',
                    }}
                >
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF6B00' }}>
                            Reports
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Report analytics overview showing generated reports, category breakdown, and current completion performance.
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                        <Button variant="contained">Generate</Button>
                        <Button variant="outlined" onClick={handlePrint}>Export</Button>
                        <Button variant="outlined">Filter</Button>
                    </Stack>
                </Stack>

                <Stack ref={printRef} spacing={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ color: '#FF6B00' }}>
                                Monthly Report Output
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                This chart compares how many reports were generated and how many were completed across the last four months.
                            </Typography>
                            <BarChart
                                series={[
                                    { data: [18, 24, 20, 27], label: 'Generated', color: '#FF6B00' },
                                    { data: [12, 19, 17, 23], label: 'Completed', color: '#CC5500' },
                                ]}
                                height={300}
                                xAxis={[
                                    {
                                        data: ['January', 'February', 'March', 'April'],
                                        scaleType: 'band',
                                        label: 'Months',
                                    },
                                ]}
                                sx={{
                                    '& .MuiChartsAxis-tickLabel': { fill: '#AAAAAA' },
                                    '& .MuiChartsAxis-label': { fill: '#AAAAAA' },
                                    '& .MuiChartsLegend-label': { fill: '#FFFFFF' },
                                }}
                            />
                        </CardContent>
                    </Card>

                    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
                        <Card sx={{ flex: 1 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ color: '#FF6B00' }}>
                                    Report Category Share
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    This chart shows the distribution of report requests by category for the current reporting period.
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <PieChart
                                        series={[
                                            {
                                                data: [
                                                    { id: 0, value: 14, label: 'Sales', color: '#FF6B00' },
                                                    { id: 1, value: 10, label: 'Users', color: '#CC5500' },
                                                    { id: 2, value: 8, label: 'Inventory', color: '#FF8C33' },
                                                    { id: 3, value: 6, label: 'Finance', color: '#994000' },
                                                ],
                                            },
                                        ]}
                                        width={280}
                                        height={220}
                                        sx={{
                                            '& .MuiChartsLegend-label': { fill: '#FFFFFF' },
                                        }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>

                        <Card sx={{ flex: 1 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ color: '#FF6B00' }}>
                                    Completion Rate
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    The gauge highlights the current percentage of reports completed on time based on the latest reporting cycle.
                                </Typography>
                                <Box
                                    sx={{
                                        minHeight: 220,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Gauge
                                        width={180}
                                        height={180}
                                        value={78}
                                        sx={{
                                            '& .MuiGauge-valueText': { fill: '#FF6B00' },
                                            '& .MuiGauge-referenceArc': { fill: '#2A2A2A' },
                                            '& .MuiGauge-valueArc': { fill: '#FF6B00' },
                                        }}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Stack>

                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ color: '#FF6B00', mb: 2 }}>
                                Report Data Table
                            </Typography>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
        </ThemeProvider>
    );
};

export default ReportsPage;