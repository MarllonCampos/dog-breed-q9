import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import List from "./pages/List";
import Breed from "./pages/Breed";

const PrivateRoute: React.FC<{ path: string; element: React.ComponentType<any> }> = ({ path, element: Component }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Route path={path} element={<Component />} />;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <PrivateRoute path="/list" element={List} />
      <PrivateRoute path="/chihuahua" element={() => <Breed breed="chihuahua" />} />
      <PrivateRoute path="/husky" element={() => <Breed breed="husky" />} />
      <PrivateRoute path="/labrador" element={() => <Breed breed="labrador" />} />
      <PrivateRoute path="/pug" element={() => <Breed breed="pug" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
