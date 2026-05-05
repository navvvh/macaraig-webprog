import { useState, useMemo } from 'react';
import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputBase,
    MenuItem,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { useTheme, createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from '../../data/user.json?raw';

const orangeBlackTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FF6B00',
            light: '#FF8C33',
            dark: '#CC5500',
            contrastText: '#fff',
        },
        secondary: {
            main: '#FF8C33',
        },
        background: {
            default: '#0A0A0A',
            paper: '#1A1A1A',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#AAAAAA',
        },
        success: {
            main: '#FF6B00',
        },
        warning: {
            main: '#CC5500',
        },
        divider: '#2A2A2A',
    },
    components: {
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
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label.Mui-focused': { color: '#FF6B00' },
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': { borderColor: '#FF6B00' },
                    },
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    '&.Mui-checked': {
                        color: '#FF6B00',
                        '& + .MuiSwitch-track': {
                            backgroundColor: '#FF6B00',
                        },
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
                    '& .MuiDataGrid-columnHeader:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderColor: '#2A2A2A',
                        backgroundColor: '#111',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: '1px solid #2A2A2A',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #2A2A2A',
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(255, 107, 0, 0.08)',
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'rgba(255, 107, 0, 0.16)',
                    },
                },
            },
        },
    },
});

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    role: 'editor',
    username: '',
    password: '',
    address: '',
    isActive: true,
};

const labelize = (value) =>
    value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
    try {
        return {
            users: JSON.parse(usersSeed).map((user, index) => ({
                id: Number(user.id) || index + 1,
                firstName: String(user.firstName ?? '').trim(),
                lastName: String(user.lastName ?? '').trim(),
                age: String(user.age ?? '').trim(),
                gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
                    ? String(user.gender ?? '').trim().toLowerCase()
                    : '',
                contactNumber: String(user.contactNumber ?? '').trim(),
                email: String(user.email ?? '').trim().toLowerCase(),
                role: roles.includes(String(user.role ?? '').trim().toLowerCase())
                    ? String(user.role ?? '').trim().toLowerCase()
                    : 'editor',
                username: String(user.username ?? '').trim().toLowerCase(),
                password: String(user.password ?? '').trim(),
                address: String(user.address ?? '').trim(),
                isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
            })),
            error: '',
        };
    } catch {
        return {
            users: [],
            error: 'Unable to read users from src/data/user.json.',
        };
    }
};

const seed = loadUsers();

const UsersPage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [users, setUsers] = useState(seed.users);
    const [modal, setModal] = useState({ open: false, id: null });
    const [form, setForm] = useState({ ...blankForm });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const [search, setSearch] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [filterGender, setFilterGender] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    const filteredUsers = useMemo(() => {
        const q = search.trim().toLowerCase();
        return users.filter((user) => {
            const matchSearch =
                !q ||
                user.firstName.toLowerCase().includes(q) ||
                user.lastName.toLowerCase().includes(q) ||
                user.email.toLowerCase().includes(q) ||
                user.username.toLowerCase().includes(q);
            const matchRole = !filterRole || user.role === filterRole;
            const matchGender = !filterGender || user.gender === filterGender;
            const matchStatus =
                filterStatus === '' ||
                (filterStatus === 'active' && user.isActive) ||
                (filterStatus === 'inactive' && !user.isActive);
            return matchSearch && matchRole && matchGender && matchStatus;
        });
    }, [users, search, filterRole, filterGender, filterStatus]);

    const hasActiveFilters = search || filterRole || filterGender || filterStatus !== '';

    const clearFilters = () => {
        setSearch('');
        setFilterRole('');
        setFilterGender('');
        setFilterStatus('');
    };

    const resetForm = () => {
        setForm({ ...blankForm });
        setErrors({});
    };

    const openModal = (user) => {
        setModal({ open: true, id: user?.id ?? null });
        setForm(user ? { ...blankForm, ...user } : { ...blankForm });
        setErrors({});
    };

    const closeModal = () => {
        setModal({ open: false, id: null });
        setShowPassword(false);
        resetForm();
    };

    const handleChange = ({ target: { name, value, checked, type } }) => {
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const nextErrors = {};
        const email = form.email.trim().toLowerCase();
        const username = form.username.trim().toLowerCase();

        [
            ['firstName', 'First name'],
            ['lastName', 'Last name'],
            ['age', 'Age'],
            ['gender', 'Gender'],
            ['contactNumber', 'Contact number'],
            ['email', 'Email'],
            ['role', 'Role'],
            ['username', 'Username'],
            ['password', 'Password'],
            ['address', 'Address'],
        ].forEach(([key, label]) => {
            if (!String(form[key]).trim()) {
                nextErrors[key] = `${label} is required.`;
            }
        });

        if (!nextErrors.age) {
            if (!/^\d+$/.test(form.age.trim())) {
                nextErrors.age = 'Age must be a number only.';
            } else {
                const ageNum = Number(form.age.trim());
                if (ageNum < 1 || ageNum > 120) {
                    nextErrors.age = 'Age must be between 1 and 120.';
                }
            }
        }

        if (!nextErrors.contactNumber) {
            if (!/^\d{11}$/.test(form.contactNumber.trim())) {
                nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
            }
        }

        if (!nextErrors.email) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                nextErrors.email = 'Enter a valid email address.';
            }
        }

        if (!nextErrors.email && users.some((u) => u.id !== modal.id && u.email === email)) {
            nextErrors.email = 'Email address already exists.';
        }

        if (!nextErrors.username && /\s/.test(form.username)) {
            nextErrors.username = 'Username must not contain spaces.';
        }

        if (!nextErrors.username && users.some((u) => u.id !== modal.id && u.username === username)) {
            nextErrors.username = 'Username already exists.';
        }

        if (!nextErrors.password && form.password.length < 8) {
            nextErrors.password = 'Password must be at least 8 characters.';
        }

        return nextErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = validate();
        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            return;
        }

        const nextUser = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            age: form.age.trim(),
            gender: form.gender.trim().toLowerCase(),
            contactNumber: form.contactNumber.trim(),
            email: form.email.trim().toLowerCase(),
            role: form.role.trim().toLowerCase(),
            username: form.username.trim().toLowerCase(),
            password: form.password,
            address: form.address.trim(),
            isActive: form.isActive,
        };

        setUsers((prev) =>
            modal.id
                ? prev.map((user) => (user.id === modal.id ? { ...user, ...nextUser } : user))
                : [
                    ...prev,
                    {
                        id: prev.reduce((max, user) => Math.max(max, Number(user.id) || 0), 0) + 1,
                        ...nextUser,
                    },
                ]
        );

        closeModal();
    };

    const toggleStatus = (id) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === id ? { ...user, isActive: !user.isActive } : user
            )
        );
    };

    const fieldProps = (name, label, extra = {}) => ({
        name,
        label,
        value: form[name],
        onChange: handleChange,
        error: Boolean(errors[name]),
        helperText: errors[name],
        fullWidth: true,
        ...extra,
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 88 },
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            minWidth: 178,
            valueGetter: (_, row) => `${row.firstName} ${row.lastName}`.trim(),
        },
        { field: 'username', headerName: 'Username', minWidth: 158 },
        { field: 'age', headerName: 'Age', minWidth: 90 },
        {
            field: 'gender',
            minWidth: 118,
            headerName: 'Gender',
            valueGetter: (_, row) => labelize(row.gender),
        },
        { field: 'contactNumber', headerName: 'Contact Number', minWidth: 168 },
        { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 228 },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 128,
            valueGetter: (_, row) => labelize(row.role),
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 128,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => (
                <Chip
                    size="small"
                    label={row.isActive ? 'Active' : 'Inactive'}
                    sx={{
                        backgroundColor: row.isActive ? '#FF6B00' : 'transparent',
                        color: row.isActive ? '#fff' : '#AAAAAA',
                        border: row.isActive ? 'none' : '1px solid #444',
                        fontWeight: 600,
                    }}
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 228,
            sortable: false,
            filterable: false,
            renderCell: ({ row }) => (
                <Stack direction="row" spacing={1} sx={{ py: 0.5 }}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => openModal(row)}
                        sx={{ borderColor: '#FF6B00', color: '#FF6B00' }}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => toggleStatus(row.id)}
                        sx={{
                            borderColor: row.isActive ? '#CC5500' : '#FF6B00',
                            color: row.isActive ? '#CC5500' : '#FF6B00',
                        }}
                    >
                        {row.isActive ? 'Disable' : 'Activate'}
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <ThemeProvider theme={orangeBlackTheme}>
            <Box sx={{ width: '100%', minWidth: 0, bgcolor: 'background.default', minHeight: '100vh', p: 2 }}>

                <Box
                    sx={{
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        flexWrap: 'wrap',
                        borderBottom: '2px solid #FF6B00',
                        pb: 2,
                    }}
                >
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF6B00' }}>
                            Users
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#AAAAAA', mt: 0.5 }}>
                            Manage system users, roles, and access status.
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={() => openModal()}
                        sx={{ width: { xs: '100%', sm: 'auto' } }}
                    >
                        + Add User
                    </Button>
                </Box>

                {seed.error ? (
                    <Alert severity="error" sx={{ mb: 2 }}>{seed.error}</Alert>
                ) : null}

                <Paper sx={{ p: 2, mb: 2, bgcolor: '#1A1A1A' }}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        alignItems={{ xs: 'stretch', sm: 'center' }}
                        flexWrap="wrap"
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #FF6B00',
                                borderRadius: 1,
                                px: 1.5,
                                py: 0.5,
                                flex: 1,
                                minWidth: 200,
                                bgcolor: '#111',
                            }}
                        >
                            <SearchIcon sx={{ color: '#FF6B00', mr: 1, fontSize: 20 }} />
                            <InputBase
                                placeholder="Search by name, email, or username…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                fullWidth
                                sx={{ fontSize: 14, color: '#fff' }}
                            />
                        </Box>

                        <Stack direction="row" spacing={1.5} flexWrap="wrap" alignItems="center">
                            <FilterListIcon sx={{ color: '#FF6B00', fontSize: 20 }} />

                            <TextField
                                select size="small" label="Role"
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                sx={{ minWidth: 110 }}
                            >
                                <MenuItem value="">All Roles</MenuItem>
                                {roles.map((r) => (
                                    <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select size="small" label="Gender"
                                value={filterGender}
                                onChange={(e) => setFilterGender(e.target.value)}
                                sx={{ minWidth: 110 }}
                            >
                                <MenuItem value="">All Genders</MenuItem>
                                {genders.map((g) => (
                                    <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                select size="small" label="Status"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                sx={{ minWidth: 110 }}
                            >
                                <MenuItem value="">All Status</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </TextField>

                            {hasActiveFilters && (
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={clearFilters}
                                    sx={{ borderColor: '#CC5500', color: '#CC5500' }}
                                >
                                    Clear
                                </Button>
                            )}
                        </Stack>
                    </Stack>

                    <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#AAAAAA' }}>
                        Showing {filteredUsers.length} of {users.length} user{users.length !== 1 ? 's' : ''}
                        {hasActiveFilters ? ' (filtered)' : ''}
                    </Typography>
                </Paper>

                <Paper sx={{ p: { xs: 1.5, sm: 2 }, minWidth: 0, overflow: 'hidden', bgcolor: '#1A1A1A' }}>
                    {filteredUsers.length ? (
                        <Box sx={{ height: { xs: 460, sm: 520 }, width: '100%', minWidth: 0 }}>
                            <DataGrid
                                rows={filteredUsers}
                                columns={columns}
                                disableRowSelectionOnClick
                                pageSizeOptions={[5, 10]}
                                initialState={{
                                    pagination: { paginationModel: { pageSize: 5, page: 0 } },
                                }}
                                sx={{
                                    minWidth: 0,
                                    '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                                        outline: 'none',
                                    },
                                }}
                            />
                        </Box>
                    ) : (
                        <Alert
                            severity="info"
                            sx={{ bgcolor: '#111', color: '#FF6B00', border: '1px solid #FF6B00' }}
                        >
                            {hasActiveFilters
                                ? 'No users match your search or filters. Try adjusting them.'
                                : 'No users found. Use Add User to create your first record.'}
                        </Alert>
                    )}
                </Paper>

                <Dialog
                    open={modal.open}
                    onClose={closeModal}
                    fullWidth
                    fullScreen={isMobile}
                    maxWidth="md"
                >
                    <Box component="form" onSubmit={handleSubmit}>
                        <DialogTitle sx={{ bgcolor: '#FF6B00', color: '#fff', fontWeight: 700 }}>
                            {modal.id ? 'Edit User' : 'Add User'}
                        </DialogTitle>
                        <DialogContent dividers sx={{ px: { xs: 2, sm: 3 }, bgcolor: '#1A1A1A' }}>
                            <Stack spacing={2} sx={{ pt: 1 }}>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <TextField {...fieldProps('firstName', 'First Name')} />
                                    <TextField {...fieldProps('lastName', 'Last Name')} />
                                </Stack>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <TextField
                                        {...fieldProps('age', 'Age')}
                                        inputProps={{ inputMode: 'numeric' }}
                                        helperText={errors.age || 'Numbers only'}
                                    />
                                    <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                                        {genders.map((gender) => (
                                            <MenuItem key={gender} value={gender}>
                                                {labelize(gender)}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Stack>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <TextField
                                        {...fieldProps('contactNumber', 'Contact Number')}
                                        inputProps={{ inputMode: 'numeric', maxLength: 11 }}
                                        helperText={errors.contactNumber || 'Must be 11 digits (e.g. 09171234567)'}
                                    />
                                    <TextField {...fieldProps('email', 'Email Address', { type: 'email' })} />
                                </Stack>
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                    <TextField {...fieldProps('role', 'Role', { select: true })}>
                                        {roles.map((role) => (
                                            <MenuItem key={role} value={role}>
                                                {labelize(role)}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        {...fieldProps('username', 'Username')}
                                        helperText={errors.username || 'No spaces allowed'}
                                    />
                                </Stack>
                                <TextField
                                    {...fieldProps('password', 'Password', {
                                        type: showPassword ? 'text' : 'password',
                                        slotProps: {
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            onClick={() => setShowPassword((prev) => !prev)}
                                                            onMouseDown={(e) => e.preventDefault()}
                                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            },
                                        },
                                    })}
                                    helperText={errors.password || 'At least 8 characters'}
                                />
                                <TextField
                                    {...fieldProps('address', 'Address', { multiline: true, rows: 3 })}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            name="isActive"
                                            checked={form.isActive}
                                            onChange={handleChange}
                                        />
                                    }
                                    label={form.isActive ? 'User status: Active' : 'User status: Inactive'}
                                />
                            </Stack>
                        </DialogContent>
                        <DialogActions sx={{ px: 3, py: 2, bgcolor: '#111' }}>
                            <Button onClick={closeModal} sx={{ color: '#AAAAAA' }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained">
                                {modal.id ? 'Update User' : 'Save User'}
                            </Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
};

export default UsersPage;