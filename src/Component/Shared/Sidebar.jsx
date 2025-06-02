import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/WhatsApp Image 2025-05-06 at 12.31.39_3f99cae6.jpg';
import { getAllOrders } from '../../Apis/Orders/Orders';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.standard,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.standard,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(!isMobile);
  const [orderCount, setOrderCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const response = await getAllOrders();
        if (Array.isArray(response)) {
          setOrderCount(response.length);
        }
      } catch (error) {
        console.error('Error fetching order count:', error);
      }
    };

    fetchOrderCount();
    // Refresh order count every minute
    const interval = setInterval(fetchOrderCount, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'Product', icon: <InventoryIcon />, path: '/product' },
    { text: 'Category', icon: <CategoryIcon />, path: '/category' },
    { 
      text: 'Order', 
      icon: (
        <Badge badgeContent={orderCount} color="error">
          <ShoppingCartIcon />
        </Badge>
      ), 
      path: '/orders' 
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarStyled position="fixed" sx={{ background: 'black' }} open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBarStyled>
      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            background: '#050608',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
          },
        }}
        variant={isMobile ? "temporary" : "persistent"}
        open={open}
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <img
            src={logo}
            alt="Small Logo"
            style={{
              width: '250px',
              height: '150px',
              marginRight: '0px',
              display: open ? 'block' : 'none',
              transition: 'display 0.3s ease-in-out',
            }}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon style={{ color: '#FFFFFF' }} />
            ) : (
              <ChevronLeftIcon style={{ color: '#FFFFFF' }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) {
                    handleDrawerClose();
                  }
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  transition: 'all 0.3s ease-in-out',
                  borderRadius: '8px',
                  margin: '4px 8px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  ...(location.pathname === item.path && {
                    backgroundColor: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'black',
                    },
                    '& .MuiListItemText-primary': {
                      color: 'black',
                    },
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    transition: 'color 0.3s ease-in-out',
                  }}
                >
                  {React.cloneElement(item.icon, { 
                    style: { 
                      color: location.pathname === item.path ? 'black' : '#FFFFFF',
                      transition: 'color 0.3s ease-in-out'
                    } 
                  })}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: location.pathname === item.path ? 'black' : '#FFFFFF',
                    transition: 'all 0.3s ease-in-out',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
