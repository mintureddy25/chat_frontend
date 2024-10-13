import Singup from "./features/Auth/signUp";
import ChatScreen from "./features/Chat/chat";
import ChatApp from "./features/Chat/chat1";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./features/Dashboard/dashboard";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<ChatApp />} />
      <Route path="/Dashboard" element={<Dashboard />} />

    </Routes>
    </>
    
  );
}

export default App;
