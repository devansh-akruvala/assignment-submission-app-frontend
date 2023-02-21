import './App.css';
import { useLocalState } from './util/useLocalStorage';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from "jwt-decode";

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './util/PrivateRoute';
import AssignmentView from './components/AssignmentView';
import CodeReviewDashboard from './components/CodeReviewDashboard';
import { useState } from 'react';



function App() {
  
  const [jwt, setJwt] = useLocalState("", "jwt")
  
  const getRolesFromJWT=()=>{
    if(jwt){
    const decoded = jwt_decode(jwt);
    return decoded.authorities;
  }else{
    return []
  }
  }
  
  
  const [roles, setroles] = useState(getRolesFromJWT())



  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/dashboard' element={
        roles.find((role)=> role==='ROLE_CODE_REVIEWER')?
        <PrivateRoute>
        <CodeReviewDashboard />
        </PrivateRoute>:
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
