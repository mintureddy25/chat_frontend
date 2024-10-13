import Singup from "./features/Auth/signUp";

import { Route, Routes } from "react-router-dom";
import Dashboard from "./features/Dashboard/dashboard";
import Login from "./features/Auth/login";

function App() {
  return (
    <>
    <Routes>
    <Route path="/signup" element={<Singup />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/" element={<Login />} />

    </Routes>
    </>
    
  );
}

export default App;
