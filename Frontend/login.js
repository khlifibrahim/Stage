import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
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
        <form>
          <div className="mb-3">
          
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Entrer votre email"
            />
          </div>

          <div className="mb-3">
            
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Entrer votre mot de passe"
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

        {/* Liens secondaires */}
        
      </div>
    </div>
  );
}

export default App;