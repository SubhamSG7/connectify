import React from "react";
import { useSelector } from "react-redux";

function PrivateRoute({ children }) {
  const { valid, profileResponse } = useSelector((state) => state.profileSlice);
  if (valid) return <>{children}</>;
  return <div>{profileResponse.message}</div>;
}

export default PrivateRoute;
