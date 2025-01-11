import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


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

    // send data b post
    axios.post('api', formData)
      .then((response) => {
        setMessage(response.data.message); // msg dyl success
        console.log('Login successful', response.data.token); 
      })
      .catch((error) => {
        setError(error.response.data.message); // msg dyl error
        console.error('Error logging in:', error.response.data.message);
      });
    }
  return (
    <div 
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light"
      style={{
        backgroundImage: 'url("background.png")', // Replace with your image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Barre supérieure */}
      <header className="w-100 d-flex justify-content-center align-items-center px-4 py-3  ">
        <nav className="w-100 d-flex justify-content-center mb-1">
          <img 
            src="logo.png" 
            alt="Logo" 
            className="w-25 "
            style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
          />
        </nav>
      </header>

      {/* Contenu principal */}
      <div className="w-100 mx-auto p-4  rounded mb-4 mt-5" style={{ maxWidth: '400px' }}>
        <div className="d-flex justify-content-center mb-4">
          {/* Updated Circle Color */}
          
        </div>

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