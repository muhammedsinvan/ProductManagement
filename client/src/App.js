import './App.css';
import {Route,Routes} from 'react-router-dom';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import HomePage from './Pages/HomePage';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
     
    </div>
  );
}

export default App;
