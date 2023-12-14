import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  BrowserRouter,
  Route,
  Router,
  Switch,
  Redirect,
} from "react-router-dom";

import { Box, Spinner } from "@chakra-ui/react";

import { useAuthContext } from "hooks/useAuthContext";
import { useState, useEffect } from "react";

//IMPORT LAYOUTS (LAZEM A CREATE COMPONENT /connected le view)
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import PatientLayout from "layouts/Patient.js";
import PharmacistLayout from "layouts/Pharmacist.js";
import RTLLayout from "layouts/RTL.js";

function App() {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  // this part is to make sure that the user is loaded before rendering the app
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    ); // loading screen

  if (!user)
    return (
      <BrowserRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <Route render={() => <Redirect to="/auth" />} />
        </Switch>
      </BrowserRouter>
    );

  if (user.userType === "Admin")
    return (
      <BrowserRouter>
        <Switch>
          <Route path={`/admin`} component={AdminLayout} />
          <Route render={() => <Redirect to="/admin" />} />
        </Switch>
      </BrowserRouter>
    );
  if (user.userType === "Pharmacist")
    return (
      <BrowserRouter>
        <Switch>
          <Route path={`/pharmacist`} component={PharmacistLayout} />
          <Route render={() => <Redirect to="/pharmacist" />} />
        </Switch>
      </BrowserRouter>
    );

  if (user.userType === "Patient")
    return (
      <BrowserRouter>
        <Switch>
          <Route path={`/patient`} component={PatientLayout} />
          <Route render={() => <Redirect to="/patient" />} />
        </Switch>
      </BrowserRouter>
    );

  return (
    <BrowserRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route render={() => <Redirect to="/auth" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
