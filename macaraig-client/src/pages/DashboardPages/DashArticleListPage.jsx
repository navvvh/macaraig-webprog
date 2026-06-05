import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Alert, Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent,
    DialogTitle, InputBase, Paper, Stack, TextField, Typography, useMediaQuery,
} from '@mui/material';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

const API_URL = 'http://localhost:5000/api/articles';

const orangeBlackTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#FF6B00', light: '#FF8C33', dark: '#CC5500', contrastText: '#fff' },
        background: { default: '#0A0A0A', paper: '#1A1A1A' },
        text: { primary: '#FFFFFF', secondary: '#AAAAAA' },
        divider: '#2A2A2A',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    background: 'linear-gradient(135deg, #FF6B00, #CC5500)',
                    '&:hover': { background: 'linear-gradient(135deg, #FF8C33, #FF6B00)' },
                },
                outlinedPrimary: {
                    borderColor: '#FF6B00', color: '#FF6B00',
                    '&:hover': { borderColor: '#FF8C33', backgroundColor: 'rgba(255, 107, 0, 0.08)' },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': { color: '#FF6B00' },
                    '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#FF6B00' } },
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: '1px solid #2A2A2A',
                    '& .MuiDataGrid-columnHeader': { backgroundColor: '#FF6B00', color: '#fff', fontWeight: 700 },
                    '& .MuiDataGrid-columnHeader svg': { color: '#fff' },
                    '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(255, 107, 0, 0.08)' },
                    '& .MuiDataGrid-cell': { borderColor: '#2A2A2A', outline: 'none' },
                    '& .MuiDataGrid-columnHeader:focus': { outline: 'none' },
                    '& .MuiDataGrid-footerContainer': { borderColor: '#2A2A2A', backgroundColor: '#111' },
                },
            },
        },
        MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', border: '1px solid #2A2A2A' } } },
        MuiDialog: { styleOverrides: { paper: { backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' } } },
    },
});

const blankForm = { title: '', image: '', content: '' };

const DashArticleListPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const [articleList, setArticleList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState({ open: false, id: null });
    const [form, setForm] = useState({ ...blankForm });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    const getToken = () => localStorage.getItem('token');

    const fetchArticles = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            const data = await res.json();
            // DataGrid requires an `id` field — map _id to id
            setArticleList(data.map(a => ({ ...a, id: a._id })));
        } catch (err) {
            console.error('Failed to fetch articles:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (!token || !user) { navigate('/'); return; }
        if (user.role === 'editor') { navigate('/dashboard'); return; }
        fetchArticles();
    }, []);

    const filteredArticles = useMemo(() => {
        const q = search.trim().toLowerCase();
        return articleList.filter(a =>
            !q || a.title.toLowerCase().includes(q) || a.name.toLowerCase().includes(q)
        );
    }, [articleList, search]);

    const openModal = (article) => {
        setModal({ open: true, id: article?.id ?? null });
        setForm(article
            ? {
                title: article.title,
                image: article.image || '',
                content: Array.isArray(article.content)
                    ? article.content.join('\n\n')
                    : (article.preview || ''),
            }
            : { ...blankForm }
        );
        setErrors({});
        setSubmitError('');
    };

    const closeModal = () => {
        setModal({ open: false, id: null });
        setForm({ ...blankForm });
        setErrors({});
        setSubmitError('');
    };

    const handleChange = ({ target: { name, value } }) => {
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const nextErrors = {};
        if (!form.title.trim()) nextErrors.title = 'Title is required.';
        if (!form.content.trim()) nextErrors.content = 'Content is required.';
        if (form.image.trim() && !/^https?:\/\/.+/.test(form.image.trim())) {
            nextErrors.image = 'Image URL must start with http:// or https://';
        }
        return nextErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nextErrors = validate();
        if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }

        const contentArray = form.content
            .split(/\n{2,}/)
            .map(p => p.trim())
            .filter(Boolean);

        const isEdit = Boolean(modal.id);
        const url = isEdit ? `${API_URL}/${modal.id}` : API_URL;
        const method = isEdit ? 'PUT' : 'POST';

        const body = {
            title: form.title,
            image: form.image.trim(),
            preview: contentArray[0] || '',
            content: contentArray,
            ...(isEdit ? {} : {
                name: form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                status: 'published',
            }),
        };

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const err = await res.json();
                setSubmitError(err.message || 'Something went wrong.');
                return;
            }

            await fetchArticles();
            closeModal();
        } catch (err) {
            setSubmitError('Network error. Please try again.');
        }
    };

    const toggleStatus = async (id) => {
        const article = articleList.find(a => a.id === id);
        const newStatus = article.status === 'published' ? 'draft' : 'published';

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) await fetchArticles();
        } catch (err) {
            console.error('Failed to toggle status:', err);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, valueGetter: (value) => value?.slice(-5) },
        { field: 'title', headerName: 'Title', flex: 1, minWidth: 200 },
        { field: 'name', headerName: 'Slug', minWidth: 180 },
        {
            field: 'preview', headerName: 'Preview', flex: 1.5, minWidth: 250,
            renderCell: ({ row }) => (
                <Typography variant="caption" sx={{ color: '#AAAAAA', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {row.preview}
                </Typography>
            ),
        },
        {
            field: 'status', headerName: 'Status', minWidth: 120,
            renderCell: ({ row }) => (
                <Chip size="small"
                    label={row.status === 'published' ? 'Published' : 'Draft'}
                    sx={{
                        backgroundColor: row.status === 'published' ? '#FF6B00' : 'transparent',
                        color: row.status === 'published' ? '#fff' : '#AAAAAA',
                        border: row.status === 'published' ? 'none' : '1px solid #444',
                        fontWeight: 600,
                    }}
                />
            ),
        },
        {
            field: 'actions', headerName: 'Actions', minWidth: 220, sortable: false, filterable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
                    <Button size="small" variant="outlined" onClick={() => openModal(row)}
                        sx={{ borderColor: '#FF6B00', color: '#FF6B00' }}>Edit</Button>
                    <Button size="small" variant="outlined" onClick={() => toggleStatus(row.id)}
                        sx={{ borderColor: row.status === 'published' ? '#CC5500' : '#FF6B00', color: row.status === 'published' ? '#CC5500' : '#FF6B00' }}>
                        {row.status === 'published' ? 'Unpublish' : 'Publish'}
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <ThemeProvider theme={orangeBlackTheme}>
            <Box sx={{ width: '100%', minWidth: 0, bgcolor: 'background.default', minHeight: '100vh', p: 2 }}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap', borderBottom: '2px solid #FF6B00', pb: 2 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF6B00' }}>Articles</Typography>
                        <Typography variant="body2" sx={{ color: '#AAAAAA', mt: 0.5 }}>
                            Manage articles available on the Article List Page.
                        </Typography>
                    </Box>
                    <Button variant="contained" onClick={() => openModal()} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                        + Add Article
                    </Button>
                </Box>

                <Paper sx={{ p: 2, mb: 2, bgcolor: '#1A1A1A' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #FF6B00', borderRadius: 1, px: 1.5, py: 0.5, bgcolor: '#111' }}>
                        <SearchIcon sx={{ color: '#FF6B00', mr: 1, fontSize: 20 }} />
                        <InputBase placeholder="Search by title or slug…" value={search}
                            onChange={(e) => setSearch(e.target.value)} fullWidth sx={{ fontSize: 14, color: '#fff' }} />
                    </Box>
                    <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#AAAAAA' }}>
                        Showing {filteredArticles.length} of {articleList.length} article{articleList.length !== 1 ? 's' : ''}
                    </Typography>
                </Paper>

                <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden', bgcolor: '#1A1A1A' }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                            <CircularProgress sx={{ color: '#FF6B00' }} />
                        </Box>
                    ) : filteredArticles.length ? (
                        <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%' }}>
                            <DataGrid rows={filteredArticles} columns={columns} disableRowSelectionOnClick
                                pageSizeOptions={[5, 10]}
                                initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
                                sx={{ minWidth: 0, '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': { outline: 'none' } }}
                            />
                        </Box>
                    ) : (
                        <Alert severity="info" sx={{ bgcolor: '#111', color: '#FF6B00', border: '1px solid #FF6B00' }}>
                            No articles match your search.
                        </Alert>
                    )}
                </Paper>

                <Dialog open={modal.open} onClose={closeModal} fullWidth fullScreen={isMobile} maxWidth="md">
                    <Box component="form" onSubmit={handleSubmit}>
                        <DialogTitle sx={{ bgcolor: '#FF6B00', color: '#fff', fontWeight: 700 }}>
                            {modal.id ? 'Edit Article' : 'Add Article'}
                        </DialogTitle>
                        <DialogContent dividers sx={{ px: { xs: 2, sm: 3 }, bgcolor: '#1A1A1A' }}>
                            <Stack spacing={2} sx={{ pt: 1 }}>
                                {submitError && (
                                    <Alert severity="error" sx={{ bgcolor: '#2a0000', color: '#ff6b6b', border: '1px solid #ff4444' }}>
                                        {submitError}
                                    </Alert>
                                )}
                                <TextField
                                    name="title"
                                    label="Title"
                                    value={form.title}
                                    onChange={handleChange}
                                    error={Boolean(errors.title)}
                                    helperText={errors.title}
                                    fullWidth
                                />
                                <TextField
                                    name="image"
                                    label="Image URL"
                                    placeholder="https://example.com/image.jpg"
                                    value={form.image}
                                    onChange={handleChange}
                                    error={Boolean(errors.image)}
                                    helperText={errors.image || 'Paste a direct image link (optional)'}
                                    fullWidth
                                />
                                {form.image && !errors.image && (
                                    <Box sx={{ border: '1px solid #2A2A2A', borderRadius: 1, overflow: 'hidden', height: 160 }}>
                                        <img
                                            src={form.image}
                                            alt="Preview"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </Box>
                                )}
                                <TextField
                                    name="content"
                                    label="Content (separate paragraphs with a blank line)"
                                    value={form.content}
                                    onChange={handleChange}
                                    error={Boolean(errors.content)}
                                    helperText={errors.content}
                                    fullWidth
                                    multiline
                                    rows={8}
                                />
                            </Stack>
                        </DialogContent>
                        <DialogActions sx={{ px: 3, py: 2, bgcolor: '#111' }}>
                            <Button onClick={closeModal} sx={{ color: '#AAAAAA' }}>Cancel</Button>
                            <Button type="submit" variant="contained">
                                {modal.id ? 'Update Article' : 'Save Article'}
                            </Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
};

export default DashArticleListPage;