import { useEffect } from 'react';
import './App.css';
import { useLocalState } from './util/useLocalStorage';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './util/PrivateRoute';
import AssignmentView from './components/AssignmentView';



function App() {
  const [jwt, setJwt] = useLocalState("", "jwt")



  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/dashboard' element={
        <PrivateRoute>
        <Dashboard />
        </PrivateRoute>}
         />
         <Route exact path='/assignments/:id' element={
        <PrivateRoute>
        <AssignmentView/>
        </PrivateRoute>}
         />
        <Route exact path='/login' element={<Login />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
