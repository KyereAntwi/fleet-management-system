import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import AuthLayout from "./auth/AuthLayout";
import MainNav from "./components/MainNav";

function App() {
  return(
    <>
      <MainNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="/workspaces" element={<Home />} />
          <Route path="/fleets" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
