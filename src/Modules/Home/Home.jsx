import React, { useEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/slice/UsersSlice/Users';
// import { fetchOrders } from '../../redux/slice/OrdersSlice/Orders';

const drawerWidth = 240;

export default function Home() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { users = { data: [] }, loading: usersLoading } = useSelector((state) => state.users);
  // const { orders = { data: [] }, loading: ordersLoading } = useSelector((state) => state.orders);
  const open = true;

  useEffect(() => {
    dispatch(fetchUsers());
    // dispatch(fetchOrders());
  }, [dispatch]);

  // Calculate counts
  const adminCount = users.data?.filter(user => user.role === 'ADMIN').length || 0;
  const userCount = users.data?.filter(user => user.role === 'USER').length || 0;
  // const orderCount = ordersLoading ? 25 : (orders.data?.length || 0); // Show placeholder number 25 while loading

  const isLoading = usersLoading;

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
      color: 'bg-black'
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
      color: 'bg-black'
    },
    // {
    //   title: 'Orders',
    //   value: orderCount,
    //   icon: (
    //     <path d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1H3zm0 2h14v10H3V5zm2 2a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z" />
    //   ),
    //   color: 'bg-black'
    // }
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
          alignItems: isMobile ? 'center' : 'flex-start',
          justifyContent: isMobile ? 'center' : 'flex-start',
          minHeight: isMobile ? 'calc(100vh - 56px)' : 'auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : isTablet
              ? '1fr 1fr'
              : '1fr 1fr 1fr',
            gap: isMobile ? '32px' : isTablet ? '24px' : '32px',
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? 500 : 'none',
            justifyItems: 'center',
          }}
        >
          {stats.map((item, index) => (
            <div
              key={index}
              className={`w-full  rounded-xl cursor-pointer shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${item.color}`}
              style={{
                minHeight: isMobile ? '260px' : '200px',
                maxWidth: isMobile ? '90vw' : 400,
                width: isMobile ? '90vw' : '100%',
                border: '2px solid black',
                padding: isMobile ? '40px 20px' : '48px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isMobile ? '28px' : '20px',
              }}
            >
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: isMobile ? 72 : 56, height: isMobile ? 72 : 56 }}
              >
                {item.icon}
              </svg>
              <h3
                className="text-xl font-semibold text-white"
                style={{ fontSize: isMobile ? '2rem' : '1.5rem' }}
              >
                {item.title}
              </h3>
              {isLoading ? (
                <CircularProgress size={isMobile ? 36 : 28} className="text-white" />
              ) : (
                <p
                  className="text-2xl font-bold text-white"
                  style={{ fontSize: isMobile ? '2.5rem' : '2rem' }}
                >
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </Box>
    </>
  );
}

