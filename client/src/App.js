import React from 'react';
import { BrowserRouter} from 'react-router-dom'
import Register from './components/user/RegistrationForm'
import './app.css'
import MainNav from './components/common/mainNav'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <MainNav/>      
          <Register/>
      </div>
      
    </BrowserRouter>
  )
}

export default App;
