import './App.css';
import { useLocalState } from './util/useLocalStorage';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from "jwt-decode";

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import PrivateRoute from './util/PrivateRoute';
import AssignmentView from './Pages/AssignmentView';
import CodeReviewDashboard from './Pages/CodeReviewDashboard';
import { useState } from 'react';
import CodeReviewAssignmentView from './Pages/CodeReviewAssignmentView';



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
        </PrivateRoute>
        :
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>}
         />
         <Route exact path='/assignments/:id' element={
          roles.find((role)=> role==='ROLE_CODE_REVIEWER')?
          <PrivateRoute>
            <CodeReviewAssignmentView />
          </PrivateRoute>
          :
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
