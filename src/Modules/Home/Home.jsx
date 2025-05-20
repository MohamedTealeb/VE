import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Sidebar from '../../Component/Shared/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/slice/UsersSlice/Users';
// import { fetchOrders } from '../../redux/slice/OrdersSlice/Orders';

const drawerWidth = 240;

export default function Home() {
  const dispatch = useDispatch();
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
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin-left 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          marginLeft: open ? `${drawerWidth}px` : `calc(8 * 7px + 1px)`,
          marginTop: '64px',
          display: 'block',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`w-full rounded-xl cursor-pointer shadow-lg p-10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${item.color}`}
              style={{
                minHeight: '180px',
                border: '2px solid black'
              }}
            >
              <div className="flex flex-col cursor-pointer items-center justify-center space-y-4">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {item.icon}
                </svg>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                {isLoading ? (
                  <CircularProgress size={24} className="text-white" />
                ) : (
                  <p className="text-2xl font-bold text-white">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Box>
    </>
  );
}

