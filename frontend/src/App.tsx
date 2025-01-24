import { BrowserRouter, Route, Routes } from "react-router";

import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
