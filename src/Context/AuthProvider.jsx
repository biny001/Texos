import { getActiveSession } from "@/lib/appwrite/api";
import { account } from "@/lib/appwrite/config";
import { useGetActiveUser } from "@/lib/react-query/queryAndMutations";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";

export const AuthContext = createContext();

const initialUser = {
  name: "",
  accountId: "", // corrected variable name
  username: "",
  email: "",
  password: "",
};
const InitialState = {
  user: initialUser,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => {},
};

const AuthProvider = ({ children }) => {
  const [info, setInfo] = useState(initialUser); // corrected initial state
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      setIsLoading(true);
      const user = await getActiveSession();

      if (user) {
        setInfo({
          ...info,
          accountId: user.$id,
          name: user.name,
          email: user.email,
          username: user.email,
        });
      }
      setIsLoading(false);

      console.log(user);

      if (!user) {
        navigate("/sign-in");
      }
      navigate("/");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");

    if (
      cookieFallback === "[]" || // Check if it's an empty array
      cookieFallback === null || // Check if it's null
      cookieFallback === undefined // Check if it's undefined
    ) {
      // If any of the conditions above are true, navigate to the "/sign-in" page
      navigate("/sign-up");
    }
  }, [info]);

  // console.log(info);
  return (
    <AuthContext.Provider
      value={{ info, setInfo, checkAuthUser, loading, initialUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
