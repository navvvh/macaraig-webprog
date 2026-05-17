import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// Enhancement 2: Import ArticleIcon for Articles nav item
import ArticleIcon from "@mui/icons-material/Article";

const blackOrangeTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF6B00",
      light: "#FF8C33",
      dark: "#CC5500",
      contrastText: "#000000",
    },
    secondary: {
      main: "#FF6B00",
      contrastText: "#000000",
    },
    background: {
      default: "#0A0A0A",
      paper: "#111111",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#999999",
    },
    divider: "#2A2A2A",
    action: {
      selected: "rgba(255, 107, 0, 0.15)",
      hover: "rgba(255, 107, 0, 0.08)",
    },
  },
  typography: {
    fontFamily: "'Barlow', 'Roboto Condensed', sans-serif",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#111111",
          borderBottom: "1px solid #FF6B00",
          boxShadow: "0 0 20px rgba(255, 107, 0, 0.15)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0D0D0D",
          borderRight: "1px solid #1F1F1F",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          margin: "2px 8px",
          width: "calc(100% - 16px)",
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 107, 0, 0.15)",
            borderLeft: "3px solid #FF6B00",
            "& .MuiListItemIcon-root": { color: "#FF6B00" },
            "& .MuiListItemText-primary": { color: "#FF6B00", fontWeight: 600 },
            "&:hover": { backgroundColor: "rgba(255, 107, 0, 0.22)" },
          },
          "&:hover": { backgroundColor: "rgba(255, 107, 0, 0.08)" },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlinedInherit: {
          borderColor: "#FF6B00",
          color: "#FF6B00",
          "&:hover": {
            backgroundColor: "rgba(255, 107, 0, 0.1)",
            borderColor: "#FF8C33",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: "#1F1F1F" } },
    },
  },
});

const drawerWidth = 240;

// Enhancement 2: Added Articles nav item
const dashboardNavItems = [
  { label: "Dashboard", title: "Dashboard", to: "/dashboard", icon: DashboardIcon },
  { label: "Reports", title: "Reports", to: "/dashboard/reports", icon: AssessmentIcon },
  { label: "Users", title: "Users", to: "/dashboard/users", icon: PeopleIcon },
  { label: "Articles", title: "Articles", to: "/dashboard/articles", icon: ArticleIcon },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: { width: `calc(${theme.spacing(8)} + 1px)` },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#FF6B00", 0.08),
  border: "1px solid rgba(255, 107, 0, 0.3)",
  "&:hover": {
    backgroundColor: alpha("#FF6B00", 0.14),
    borderColor: "rgba(255, 107, 0, 0.6)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  transition: "all 0.2s ease",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#FF6B00",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#FFFFFF",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "20ch" },
    "&::placeholder": { color: "#666666", opacity: 1 },
  },
}));

const getPageTitle = (pathname) =>
  dashboardNavItems.find((t) => t.to === pathname)?.title ?? "Welcome";

const DashLayoutInner = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const navigate = useNavigate();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => navigate("/");

  return (
    <Box sx={{ display: "flex", bgcolor: "background.default", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            sx={{ marginRight: 5, color: "#FF6B00" }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontSize: "0.95rem",
              color: "#FFFFFF",
            }}
          >
            {pageTitle}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
          </Search>

          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: "#FF6B00",
              color: "#FF6B00",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              "&:hover": {
                backgroundColor: "rgba(255, 107, 0, 0.12)",
                borderColor: "#FF8C33",
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #FF6B00, #FF4500)",
            }}
          />
          <IconButton onClick={handleDrawerClose} sx={{ color: "#FF6B00" }}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List sx={{ pt: 1 }}>
          {dashboardNavItems.map(({ label, to, icon: Icon }) => (
            <ListItem key={to} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={to}
                selected={location.pathname === to}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: location.pathname === to ? "#FF6B00" : "#666666",
                    transition: "color 0.2s",
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  sx={{
                    opacity: open ? 1 : 0,
                    "& .MuiListItemText-primary": {
                      fontSize: "0.875rem",
                      fontWeight: location.pathname === to ? 600 : 400,
                      letterSpacing: "0.03em",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "background.default", color: "text.primary" }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

const DashLayout = () => (
  <ThemeProvider theme={blackOrangeTheme}>
    <DashLayoutInner />
  </ThemeProvider>
);

export default DashLayout;