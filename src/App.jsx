import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Usuarios } from './components/Usuarios/Usuarios';
import { Implementos } from './components/Implementos/Implementos';
import { Ejercicios } from './components/Ejercicios/Ejercicios';
import { Comunidad } from './components/Comunidad/Comunidad';
import { Gestion } from './components/Gestion/Gestion';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { Login } from './components/Login/Login';
import { LayoutWithSidebar } from './components/LayoutWithSideBar';
import { RecuperarContrasena } from './components/RecuperarContrasena/RecuperarContrasena';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/*" element={<LayoutWithSidebar />}>
          <Route path="" element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="implementos" element={<Implementos />} />
          <Route path="ejercicios" element={<Ejercicios />} />
          <Route path="comunidad" element={<Comunidad />} />
          <Route path="gestion" element={<Gestion />} />
        </Route>

      </Routes>


    </Router>
  )
}

export default App
