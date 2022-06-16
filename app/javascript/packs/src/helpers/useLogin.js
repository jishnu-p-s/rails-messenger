import { useState, useEffect } from "react";
import { isLoggedin } from "../helpers/apiRequest";

function useLogin() {
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState(null);
  useEffect(() => {
    if (
      sessionStorage.getItem("session_id") &&
      sessionStorage.getItem("_csrf_token")
    ) {
      isLoggedin().then((res) => {
        if (res.success) {
          setuser(res.data.username);
        }
        setloading(false);
      });
    } else {
      setloading(false);
    }
  }, []);
  return { loading, user };
}

export default useLogin;
