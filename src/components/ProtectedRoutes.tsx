// components/ProtectedRoute.tsx
import React from "react";
import { useData } from "../provider/dataProvider";
import Error from "../pages/Error";

const Loading = () => <div>Loading...</div>;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, loadingData } = useData();

  if (!data) {
    if (loadingData) return <Loading />;
    return <Error/>;
  }

  return children;
};

export default ProtectedRoute;
