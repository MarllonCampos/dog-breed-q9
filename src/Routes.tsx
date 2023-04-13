import React from "react";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import List from "./pages/List";
import { Storage } from "./services/storage";
import BreedGallery from "./components/BreedGallery";

const PrivateRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const token = Storage.getToken();

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
          path="/list"
          element={
            <PrivateRoute>
              <List />
            </PrivateRoute>
          }
        >
          <Route path=":breed" element={<BreedGallery />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
