// import React from 'react';
// import { Box, CircularProgress } from '@mui/material';
// import Sidebar from '../../Component/Shared/Sidebar';


// const drawerWidth = 240;

// export default function Home() {
 

//   return <>
//   <Sidebar/>
  

//     <Box
//       sx={{
//         flexGrow: 1,
//         p: 3,
//         transition: 'margin-left 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
//         marginLeft: open ? `${drawerWidth}px` : `calc(8 * 7px + 1px)`,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: '64px',
//         maxWidth: '500px'
//       }}
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div
//           className="rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
//           style={{
//             background: 'linear-gradient(135deg, black 0%, white 100%)',
//             border: '2px solid black',
//           }}
//         >
//           <div className="flex flex-row items-center justify-center space-x-4">
//             <div className="text-2xl">
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-white">Admins</h3>
//             <p className="text-xl font-bold flex items-center text-white">
//               <CircularProgress size={20} className="text-white mr-2" /> 8
//             </p>
//           </div>
//         </div>
//         <div
//           className="rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
//           style={{
//             background: 'linear-gradient(135deg, black 0%, white 100%)',
//             border: '2px solid black',
//           }}
//         >
//           <div className="flex flex-row items-center justify-center space-x-4">
//             <div className="text-2xl">
//               <svg
//                 className="w-8 h-8 text-white"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1H3zm0 2h14v10H3V5zm2 2a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-white">Orders</h3>
//             <p className="text-xl font-bold flex items-center text-white">
//               <CircularProgress size={20} className="text-white mr-2" /> 15
//             </p>
//           </div>
//         </div>
//       </div>
//     </Box>



//   </>
    
// }
import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import Sidebar from '../../Component/Shared/Sidebar';

const drawerWidth = 240;

export default function Home() {
  const open = true; // تأكد أنك تعرف قيمة open

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {[ 
            { title: 'Admins', value: 8, icon: (
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            )},
            { title: 'Orders', value: 15, icon: (
              <path d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1H3zm0 2h14v10H3V5zm2 2a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H6a1 1 0 01-1-1z" />
            )}
          ].map((item, i) => (
            <div
              key={i}
              className="w-full  rounded-xl shadow-lg p-10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, black 0%, white 100%)',
                border: '2px solid black',
                minHeight: '180px',
              }}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {item.icon}
                </svg>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-2xl font-bold flex items-center text-white">
                  <CircularProgress size={24} className="text-white mr-2" /> {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </>
  );
}
