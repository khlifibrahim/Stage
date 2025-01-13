// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';


// function App() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault(); 

//     const formData = {
//       username,
//       password,
//     };

//     // send data b post
//     axios.post('http://localhost:5000/api/login', formData, )
//       .then((response) => {
//         setMessage(response.data.message); // msg dyl success
//         console.log('Login successful', response.data.token); 
//       })
//       .catch((error) => {
//         setError(error.response.data.message); // msg dyl error
//         console.error('Error logging in:', error.response.data.message);
//       });
//     }
  
    
//     return (
//       <div 
//         className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light"
//         style={{
//           backgroundImage: 'url("entr.png")', 
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         {/* Barre supérieure */}
//         <header className="w-100 text-center py-3   "
//            style={{
//             position: 'absolute',
//             top: '0',
//             left: '0',
//             right: '0',
//           }}
//         >
          
//             <img 
//               src="./src/assets/logo.png" 
//               alt="Logo" 
//               className="w-25 "
//               style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
//             />
          
//         </header>
  
//         {/* Contenu principal */}
//         <div className="p-4  rounded shadow" style={{ maxWidth: '400px', width: '100%'  }}>
          
  
//           {/* Formulaire */}
//           <form  onSubmit={handleSubmit}>
//             <div className="mb-3">
            
//               <input
//                 type="text"
//                 id="username"
//                 className="form-control"
//                 placeholder="Entrer votre nom d'utilisateur"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
    
//               />
//             </div>
  
//             <div className="mb-3">
              
//               <input
//                 type="password"
//                 id="password"
//                 className="form-control"
//                 placeholder="Entrer votre mot de passe"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
    
//               />
//             </div>
  
            
//             <button
//               type="submit"
//               className="btn w-50 mt-4 "
//               style={{ backgroundColor: '#081640', color: 'white' ,display: 'block', marginLeft: 'auto', marginRight: 'auto'  }} 
//             >
//               Se connecter
//             </button>
//           </form>
          
//            {message && <div className="alert alert-success mt-3">{message}</div>}
//           {error && <div className="alert alert-danger mt-3">{error}</div>}
  
          
//         </div>
//       </div>
//     );
// }

// export default App;

import React, { useState } from 'react';
import axios from 'axios';
// import logo from ''

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      username,
      password,
    };

    // Send data via POST
    axios
      .post('http://localhost:5000/api/auth/login', formData)
      .then((response) => {
        setMessage(response.data.message); // Success message
        console.log('Login successful', response.data.token);
      })
      .catch((error) => {
        setError(error.response.data.message); // Error message
        console.error('Error logging in:', error.response.data.message);
      });
  };

  return (
    <div 
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light"
      style={{
        backgroundImage: 'url("entr.png")', // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Barre supérieure */}
      <header className="w-100 text-center py-3   "
         style={{
          position: 'absolute',
          top: '0', // Place le logo tout en haut
          left: '0',
          right: '0',
        }}
      >
        
          <img 
            src="logo.png" 
            alt="Logo" 
            className="w-25 "
            style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
          />
        
      </header>

      {/* Contenu principal */}
      <div className="p-4  rounded shadow" style={{ maxWidth: '400px', width: '100%'  }}>
        

        {/* Formulaire */}
        <form  onSubmit={handleSubmit}>
          <div className="mb-3">
          
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Entrer votre nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
  
            />
          </div>

          <div className="mb-3">
            
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Entrer votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
  
            />
          </div>

          {/* Button with Custom Color */}
          <button
            type="submit"
            className="btn w-50 mt-4 "
            style={{ backgroundColor: '#081640', color: 'white' ,display: 'block', marginLeft: 'auto', marginRight: 'auto'  }} // Set button background color
          >
            Se connecter
          </button>
        </form>

         {/* Display messages */}
         {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        
      </div>
    </div>
  );
}

export default App;