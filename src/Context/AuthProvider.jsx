import { getActiveSession, getCurrentUser } from "@/lib/appwrite/api";
import { account } from "@/lib/appwrite/config";
import {
  useGetActiveUser,
  useGetInitalAvatar,
} from "@/lib/react-query/queryAndMutations";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [url, setAvatarUrl] = useState("");
  const { mutate: getAvatar, isPending } = useGetInitalAvatar();

  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
      setIsLoading(true);

      const user = await getCurrentUser();
      if (user) {
        setInfo((prevUser) => ({
          ...prevUser,
          accountId: user?.$id,
          name: user?.name,
          username: user?.username,
          email: user?.email,
          avatarUrl: user?.avatarUrl,
        }));

        setIsAuthenticated(true);

        return true;
      }

      setIsLoading(false);

      return false;
    } catch (error) {
      console.log("Error: ", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const cookieFallback = localStorage.getItem("cookieFallback");
  useEffect(() => {
    if (
      cookieFallback === "[]" || // Check if it's an empty array
      cookieFallback === null || // Check if it's null
      cookieFallback === undefined // Check if it's undefined
    ) {
      // If any of the conditions above are true, navigate to the "/sign-in" page
      navigate("/sign-up");
    }
    const fetchData = async () => {
      const isAuthenticated = await checkAuthUser();
      if (!isAuthenticated) {
        navigate("/sign-up");
      }
    };

    fetchData();
  }, []);

  // console.log(avatarUrl);
  return (
    <AuthContext.Provider
      value={{
        info,
        setInfo,
        checkAuthUser,
        loading,
        initialUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
