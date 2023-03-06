import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../Contexts/UserProvider";
import fetchData from "../services/fetchServices";

const PrivateRoute = ({ children }) => {
  const user = useUser();

  const [isloading, setisloading] = useState(true)
  const [isvalid, setisvalid] = useState(false)
  if (user.jwt) {
    fetchData(`/api/auth/validate?token=${user.jwt}`, "GET", user.jwt, null).then(
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
