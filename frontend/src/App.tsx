import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import AuthLayout from "./auth/AuthLayout";
import MainNav from "./components/MainNav";
import CreateTenant from "./pages/Tenants/CreateTenant";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Workspaces from "./pages/Workspaces/Workspaces";
import WorkspaceSettings from "./pages/Workspaces/WorkspaceSettings";
import WorkspaceDashboard from "./pages/Workspaces/WorkspaceManagement/WorkspaceDashboard";
import PageNotFound from "./pages/PageNotFound";
import WorkspaceManagementLayout from "./pages/Workspaces/WorkspaceManagement/WorkspaceManagementLayout";
import VehiclesList from "./pages/Vehicles/VehiclesList";
import VehicleDetails from "./pages/Vehicles/VehicleDetails/VehicleDetails";
import UpgradeTenant from "./pages/Tenants/UpgradeTenant";

function App() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        localStorage.setItem("token", JSON.stringify(token));
      });
    }
  }, [isAuthenticated]);

  return (
    <>
      <MainNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="/get-started" element={<CreateTenant />} />
          <Route path="/upgrade-tenant" element={<UpgradeTenant />} />
          <Route path="/workspaces" element={<Workspaces />} />
          <Route path="/workspaces/:workspaceId/management" element={<WorkspaceManagementLayout />}>
            <Route index={true} path={"dashboard"} element={<WorkspaceDashboard />} />
            <Route path={"vehicles"} element={<VehiclesList />} />
            <Route path={"vehicles/:vehicleId"} element={<VehicleDetails />} />
          </Route>
          <Route
            path="/workspaces/:id/settings"
            element={<WorkspaceSettings />}
          />
          <Route path="/fleets" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
