import React from 'react';
import { BrowserRouter} from 'react-router-dom'
import Register from './components/user/RegistrationForm'
import './app.css'


function App() {
  return (
    <BrowserRouter>
      <div className="App">     
          <Register/>
      </div>
      
    </BrowserRouter>
  )
}

export default App;
