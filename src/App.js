import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SearchBar from "./components/SearchBar";
import LoginPage from "./authentication/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SearchBar />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

//function creation for protected route
export function ProtectedRoute({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
