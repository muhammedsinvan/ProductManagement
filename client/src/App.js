import './App.css';
import {Route,Routes} from 'react-router-dom';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
     
    </div>
  );
}

export default App;
