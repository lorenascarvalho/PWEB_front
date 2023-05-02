import { BrowserRouter } from 'react-router-dom'
import Rotas from './routes/Rotas'
import AuthProvider from './contexts/auth'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ToastContainer autoClose={3000} />
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;