import {withAuthenticationRequired} from "@auth0/auth0-react";
import { Outlet } from "react-router";

const AuthLayout = () => {
    const ProtectedOutlet = withAuthenticationRequired(Outlet, {
      onRedirecting: () => <div>Redirecting you to the login page...</div>,
    });
  
    return <ProtectedOutlet />;
  };

export default AuthLayout;