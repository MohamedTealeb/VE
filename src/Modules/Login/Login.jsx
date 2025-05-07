// import React from 'react'
// import logo from '../../assets/WhatsApp Image 2025-05-06 at 12.31.39_3f99cae6.jpg'
// export default function Login() {
//   return<>
  
//   <div class="text-white flex justify-center bg-black items-center h-screen">
  
// <div class="w-1/2 h-screen  lg:block">
//   <img src={logo} alt="Placeholder Image" class="object-cover w-full h-full"/>
// </div>

// <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
//   <h1 class="text-2xl font-semibold mb-4">Login</h1>
//   <form action="#" method="POST">
  
//     <div class="mb-4">
//       <label for="username" class="block text-white">Username</label>
//       <input type="text" id="username" name="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"/>
//     </div>
    
//     <div class="mb-4">
//       <label for="password" class="block text-gray-600">Password</label>
//       <input type="password" id="password" name="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"/>
//     </div>
 
//     <div class="mb-4 flex items-center">
//       <input type="checkbox" id="remember" name="remember" class="text-blue-500"/>
//       <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
//     </div>
    
//     <div class="mb-6 text-blue-500">
//       <a href="#" class="hover:underline">Forgot Password?</a>
//     </div>
   
//     <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
//   </form>

 
// </div>
// </div>
  
  
  
//   </>
// }
import React from 'react';
import logo from '../../assets/WhatsApp Image 2025-05-06 at 12.31.39_3f99cae6.jpg';

export default function Login() {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#050608]">
      {/* الصورة في الأعلى على الهواتف، وفي الجانب الأيسر على الشاشات الكبيرة */}
      <div className="w-full lg:w-1/2 h-screen">
        <img
          src={logo}
          alt="Background Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* حاوية الفورم */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-36">
        <div className="w-full max-w-md text-white">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form action="#" method="POST">
            <div className="mb-4">
              <label htmlFor="username" className="block text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-white bg-transparent"
                autoComplete="off"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-whote bg-transparent"
                autoComplete="off"
              />
            </div>

            

            
            <button
              type="submit"
              className="bg-white hover:bg-black hover:text-white cursor-pointer  text-black font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}