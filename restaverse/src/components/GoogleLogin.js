// import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// const App = () => {
//   const handleLoginSuccess = (response) => {
//     // Send the token to your backend for authentication
//     axios
//       .post('http://localhost:5000/login/authorized', {
//         token: response.credential,
//       })
//       .then((res) => {
//         console.log('User data:', res.data);
//         // You can now store the user data or redirect them to the profile page
//       })
//       .catch((err) => {
//         console.error('Login error:', err);
//       });
//   };

//   const handleLoginFailure = (error) => {
//     console.error('Login Failed:', error);
//   };

//   return (
//     <div className="App">
//       <h1>Google OAuth 2.0 Integration</h1>
      
//       <GoogleLogin 
//         onSuccess={handleLoginSuccess}
//         onError={handleLoginFailure}
//       />
//     </div>
//   );
// };

// export default App;
