import React, { useContext } from "react";
export const AuthContext = React.createContext({
  user: null,
});
function useAuthContext() {
  const { user } = useContext(AuthContext);
  return { user };
}

export default useAuthContext;
