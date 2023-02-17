import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import fetchData from "../services/fetchServices";
import { useLocalState } from "./useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isloading, setisloading] = useState(true)
  const [isvalid, setisvalid] = useState(false)
  if (jwt) {
    fetchData(`/api/auth/validate?token=${jwt}`, "GET", jwt, null).then(
      (isvalid) => {
        setisvalid(isvalid)
        setisloading(false)
    }
    );
  } else {
    return <Navigate to="/login" />;
  }

  return isloading?<div>is Loading ...</div>:isvalid?children:<Navigate to="/login" />
};

export default PrivateRoute;
