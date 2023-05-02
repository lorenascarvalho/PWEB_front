import { Routes, Route } from 'react-router-dom';
import NaoEncontrado from '../pages/NaoEncontrado';
import Login from '../pages/Login';
import NovoUsuario from '../pages/NovoUsuario';
import Chamado from '../pages/Chamado';
import Perfil from '../pages/Perfil';
import Cliente from '../pages/Cliente';
import NovoChamado from '../pages/Chamado/NovoChamado';
import PrivateRoute from './PrivateRoute';

export default function Rotas() {
   return (
      <Routes>
         <Route path='/'          element={<Login/>}/>
         <Route path='/cadastro'  element={<NovoUsuario/>}/>
         <Route 
            path='/chamados'
            element={
               <PrivateRoute>
                  <Chamado/>
               </PrivateRoute>
            }
         />
         <Route 
            path='/perfil'   
            element={
               <PrivateRoute>
                  <Perfil />
               </PrivateRoute>
            }
         />
         <Route 
            path='/clientes'
            element={
               <PrivateRoute>
                  <Cliente/>
               </PrivateRoute>
            }
         />
         <Route 
            path='/novochamado'
            element={
               <PrivateRoute>
                  <NovoChamado/>
               </PrivateRoute>
            }
         />
         <Route path='/*' element={<NaoEncontrado/>}/>
       </Routes> 
    );
}
