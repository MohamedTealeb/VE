import React, { useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/slice/UsersSlice/Users';
import { fetchOrders } from '../../redux/slice/OrdersSlice/Orders';

const drawerWidth = 240;

export default function Home() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { users = { data: [] }, loading: usersLoading } = useSelector((state) => state.users);
  const { orders = [], loading: ordersLoading } = useSelector((state) => state.orders);
  const open = true;

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchOrders());
  }, [dispatch]);

  // Calculate counts with proper null checks
  const adminCount = users?.data?.filter(user => user?.role === 'ADMIN')?.length || 0;
  const userCount = users?.data?.filter(user => user?.role === 'USER')?.length || 0;
  const orderCount = orders?.length || 0;

  const isLoading = usersLoading || ordersLoading;

  const stats = [
    {
      title: 'Admins',
      value: adminCount,
      icon: (
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      ),
      gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
    },
    {
      title: 'Users',
      value: userCount,
      icon: (
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        />
      ),
      gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
    },
    {
      title: 'Orders',
      value: orderCount,
      icon: (
        <path d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1H3zm0 2h14v10H3V5zm2 2a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z" />
      ),
      gradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
    }
  ];

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          p: isMobile ? 1 : isTablet ? 2 : 3,
          transition: 'margin-left 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          marginLeft: open ? (isMobile ? 0 : `${drawerWidth}px`) : `calc(8 * 7px + 1px)`,
          marginTop: isMobile ? '56px' : '64px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          minHeight: isMobile ? 'calc(100vh - 56px)' : 'auto',
          gap: 4,
          background: '#f8f9fa'
        }}
      >
        {/* Top row with Admin and Users */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '24px' : '32px',
            width: '100%',
            maxWidth: isMobile ? '90vw' : '800px',
            justifyItems: 'flex-start',
          }}
        >
          {stats.slice(0, 2).map((item, index) => (
            <div
              key={index}
              style={{
                minHeight: isMobile ? '250px' : '300px',
                width: '100%',
                background: item.gradient,
                borderRadius: '16px',
                padding: isMobile ? '32px 20px' : '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isMobile ? '24px' : '28px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                }
              }}
            >
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                style={{ 
                  width: isMobile ? 80 : 96, 
                  height: isMobile ? 80 : 96,
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                }}
              >
                {item.icon}
              </svg>
              <h3
                style={{ 
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  color: '#ffffff',
                  fontWeight: 600,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  margin: 0,
                  letterSpacing: '0.5px'
                }}
              >
                {item.title}
              </h3>
              {isLoading ? (
                <CircularProgress 
                  size={isMobile ? 40 : 48} 
                  sx={{ color: '#ffffff' }} 
                />
              ) : (
                <p
                  style={{ 
                    fontSize: isMobile ? '2.5rem' : '3rem',
                    color: '#ffffff',
                    fontWeight: 700,
                    margin: 0,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    letterSpacing: '0.5px'
                  }}
                >
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom row with Orders */}
        <div
          style={{
            width: '100%',
            maxWidth: isMobile ? '90vw' : '800px',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <div
            style={{
              minHeight: isMobile ? '250px' : '300px',
              width: '100%',
              background: stats[2].gradient,
              borderRadius: '16px',
              padding: isMobile ? '32px 20px' : '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '24px' : '28px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
              }
            }}
          >
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              style={{ 
                width: isMobile ? 80 : 96, 
                height: isMobile ? 80 : 96,
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
              }}
            >
              {stats[2].icon}
            </svg>
            <h3
              style={{ 
                fontSize: isMobile ? '2rem' : '2.5rem',
                color: '#ffffff',
                fontWeight: 600,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                margin: 0,
                letterSpacing: '0.5px'
              }}
            >
              {stats[2].title}
            </h3>
            {isLoading ? (
              <CircularProgress 
                size={isMobile ? 40 : 48} 
                sx={{ color: '#ffffff' }} 
              />
            ) : (
              <p
                style={{ 
                  fontSize: isMobile ? '2.5rem' : '3rem',
                  color: '#ffffff',
                  fontWeight: 700,
                  margin: 0,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  letterSpacing: '0.5px'
                }}
              >
                {stats[2].value}
              </p>
            )}
          </div>
        </div>
      </Box>
    </>
  );
}

