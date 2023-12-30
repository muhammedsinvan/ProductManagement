import './App.css';
import {Route,Routes} from 'react-router-dom';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import HomePage from './Pages/HomePage';
import ProductDetailPage from './Pages/ProductDetailPage';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/signin' element={<SignInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/detail' element={<ProductDetailPage />} />
      </Routes>
     
    </div>
  );
}

export default App;
