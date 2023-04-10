import React from "react";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import List from "./pages/List";
import Breed from "./pages/Breed";

const PrivateRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};
const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />

        <Route
          path="/:breed"
          element={
            <PrivateRoute>
              <Breed />
            </PrivateRoute>
          }
        />

        <Route
          path="/list"
          element={
            <PrivateRoute>
              <List />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
